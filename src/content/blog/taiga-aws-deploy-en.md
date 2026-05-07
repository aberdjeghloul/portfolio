---
title: "Deploying Taiga to Production on AWS: Docker Swarm, Terraform, Ansible and GitLab CI/CD"
description: "A full walkthrough of deploying Taiga (open-source project management) to production on AWS — Multi-AZ architecture, Infrastructure as Code, automated CI/CD pipeline and Prometheus/Grafana monitoring."
pubDate: 2026-05-01
lang: en
---

## Context

[Taiga](https://taiga.io) is an open-source project management platform (Scrum, Kanban) that I deployed to production on AWS as part of my DevOps bootcamp. The goal: a robust infrastructure, fully automated end to end, with a real CI/CD pipeline and operational monitoring.

Result: **https://taiga.devagilles.fr**

---

## Architecture

The infrastructure runs on a Docker Swarm cluster in Multi-AZ with 3 managers and 6 workers spread across 3 AWS availability zones (eu-west-3a/b/c).

```
Internet
   │
   ▼
NLB (Cross-AZ, eu-west-3)
   │
   ├── Master AZ1 — Traefik + Prometheus + Grafana
   ├── Master AZ2 — Traefik
   └── Master AZ3 — Traefik
          │
          └── Workers (×6) — Full Taiga stack
                 ├── taiga-back      (Django REST API)
                 ├── taiga-front     (Angular SPA)
                 ├── taiga-async     (Celery worker)
                 ├── taiga-events    (WebSocket)
                 └── taiga-gateway   (Nginx)

RDS PostgreSQL Multi-AZ + EFS (shared files) + S3 (backups)
```

**Why Docker Swarm over Kubernetes?** For a bootcamp project, Swarm hits the right complexity level: native Docker orchestration, rolling updates, placement constraints — without the operational overhead of k8s.

---

## Infrastructure as Code — Terraform

The entire infrastructure is provisioned with Terraform. Key resources:

- **VPC** with public/private subnets across 3 AZs
- **EC2**: 3 managers (t3.small) + 6 workers (t3.medium) + 1 bastion (t4g.nano ARM)
- **NLB** with HTTP/HTTPS target groups
- **RDS PostgreSQL** Multi-AZ (db.t3.micro)
- **EFS** for static/media files shared across workers
- **S3** for automated backups
- **Route53** + **ACM** for automatic TLS

```hcl
# Bastion using fck-nat AMI (ARM instance, ~$3/month)
resource "aws_instance" "bastion" {
  ami           = data.aws_ami.fck_nat.id
  instance_type = "t4g.nano"
  subnet_id     = aws_subnet.public_az1.id
  ...
}
```

A notable choice: using a **fck-nat instance** (ARM) instead of an AWS NAT Gateway (~$32/month) — ~95% cost saving on this component.

---

## Provisioning — Ansible

Ansible takes over after Terraform to configure the nodes:

1. Docker installation + daemon configuration
2. Swarm initialization on master AZ1
3. Masters 2 and 3 join as managers
4. 6 workers join the Swarm
5. Docker stack deployments (staging and production)
6. Cron backups to S3

The inventory is dynamically generated from Terraform outputs:

```bash
ansible-playbook -i inventory/aws_ec2.yml playbooks/deploy.yml
```

---

## CI/CD Pipeline — GitLab

The pipeline covers three environments with manual promotion to production:

```
dev → main
  └── Integration tests (pytest) + SonarCloud analysis

main → staging
  └── Docker build → push :staging → deploy to staging

staging → prod  (manual trigger)
  └── Docker build → push :latest → deploy to production
```

Deployment is done via SSH from the GitLab runner through the bastion to the Swarm manager:

```yaml
deploy:prod:
  stage: deploy
  script:
    - ssh bastion "ssh master 'docker stack deploy -c /opt/taiga/docker-compose.yml taiga'"
  when: manual
  only:
    - tags
```

---

## Monitoring — Prometheus / Grafana

Prometheus scrapes 9 nodes every 15 seconds with a 15-day retention.

**Collected metrics:**
- **Node Exporter**: CPU, RAM, disk, network (per node)
- **cAdvisor**: Docker container metrics
- **Traefik**: HTTP latency, error rate, active requests

Grafana dashboards are exposed on master AZ1 behind the NLB, password protected.

---

## Lessons Learned

**1. EFS vs local volumes** — Using EFS for static files required careful attention to permissions (uid/gid of Django containers). A misconfigured NFS mount silently breaks file uploads.

**2. Swarm rolling updates** — Setting `update_config.parallelism: 1` and `failure_action: rollback` on critical services prevents downtime during deployments.

**3. Bastion + NAT** — Combining the SSH bastion with a fck-nat instance reduces costs while keeping secure access to private instances.

**4. SonarCloud** — Integrating SonarCloud from the start of the pipeline enforces code quality (coverage, code smells) before every merge.

---

## References

- Source code: [github.com/aberdjeghloul/taiga-aws-infra](https://github.com/aberdjeghloul/taiga-aws-infra)
- CI/CD pipeline: [gitlab.com/abdelrhamane-devops/taiga-project/infra-projet](https://gitlab.com/abdelrhamane-devops/taiga-project/infra-projet)
- Live: [taiga.devagilles.fr](https://taiga.devagilles.fr)
