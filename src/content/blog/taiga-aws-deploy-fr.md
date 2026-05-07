---
title: "Déployer Taiga en production sur AWS : Docker Swarm, Terraform, Ansible et GitLab CI/CD"
description: "Retour d'expérience sur le déploiement complet de Taiga (outil de gestion de projet open-source) en production sur AWS — architecture Multi-AZ, Infrastructure as Code, pipeline CI/CD automatisé et monitoring Prometheus/Grafana."
pubDate: 2026-05-01
lang: fr
---

## Contexte

[Taiga](https://taiga.io) est une plateforme de gestion de projet open-source (Scrum, Kanban) que j'ai déployée en production sur AWS dans le cadre de mon bootcamp DevOps. L'objectif : produire une infrastructure robuste, automatisée de bout en bout, avec un vrai pipeline CI/CD et un monitoring opérationnel.

Résultat : **https://taiga.devagilles.fr**

---

## Architecture

L'infrastructure repose sur un cluster Docker Swarm en Multi-AZ avec 3 masters et 6 workers répartis sur 3 zones de disponibilité AWS (eu-west-3a/b/c).

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
          └── Workers (×6) — Stack Taiga complète
                 ├── taiga-back      (Django REST API)
                 ├── taiga-front     (Angular SPA)
                 ├── taiga-async     (Celery worker)
                 ├── taiga-events    (WebSocket)
                 └── taiga-gateway   (Nginx)

RDS PostgreSQL Multi-AZ + EFS (fichiers partagés) + S3 (backups)
```

**Pourquoi Docker Swarm plutôt que Kubernetes ?** Pour un bootcamp, Swarm offre le bon niveau de complexité : orchestration native Docker, rolling updates, placement constraints — sans la surcharge opérationnelle de k8s.

---

## Infrastructure as Code — Terraform

Toute l'infrastructure est provisionnée avec Terraform. Les ressources principales :

- **VPC** avec subnets publics/privés sur 3 AZ
- **EC2** : 3 masters (t3.small) + 6 workers (t3.medium) + 1 bastion (t4g.nano ARM)
- **NLB** avec target groups HTTP/HTTPS
- **RDS PostgreSQL** Multi-AZ (db.t3.micro)
- **EFS** pour les fichiers statiques/médias partagés entre workers
- **S3** pour les backups automatiques
- **Route53** + **ACM** pour le TLS automatique

```hcl
# Exemple : placement du bastion sur NAT instance (ARM, ~3$/mois)
resource "aws_instance" "bastion" {
  ami           = data.aws_ami.fck_nat.id
  instance_type = "t4g.nano"
  subnet_id     = aws_subnet.public_az1.id
  ...
}
```

Un point notable : l'utilisation d'une **fck-nat instance** (ARM) en lieu et place d'une NAT Gateway AWS (~32$/mois) — économie de ~95% sur ce composant.

---

## Provisionnement — Ansible

Ansible prend le relais après Terraform pour configurer les nœuds :

1. Installation Docker + configuration du daemon
2. Initialisation du Swarm sur le master AZ1
3. Jointure des masters 2 et 3 comme managers
4. Jointure des 6 workers
5. Déploiement des stacks Docker (staging et production)
6. Configuration des backups cron vers S3

L'inventaire est généré dynamiquement depuis les outputs Terraform :

```bash
ansible-playbook -i inventory/aws_ec2.yml playbooks/deploy.yml
```

---

## Pipeline CI/CD — GitLab

Le pipeline couvre trois environnements avec promotion manuelle :

```
dev → main
  └── Tests d'intégration (pytest) + analyse SonarCloud

main → staging
  └── Build Docker → push :staging → deploy staging

staging → prod  (déclenchement manuel)
  └── Build Docker → push :latest → deploy production
```

Le déploiement se fait via SSH depuis le runner GitLab vers le bastion, puis vers le master Swarm :

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

Prometheus scrape 9 nœuds toutes les 15 secondes avec une rétention de 15 jours.

**Métriques collectées :**
- **Node Exporter** : CPU, RAM, disque, réseau (par nœud)
- **cAdvisor** : métriques des containers Docker
- **Traefik** : latence HTTP, taux d'erreur, requêtes actives

Grafana expose les dashboards sur le master AZ1 derrière le NLB, protégé par un mot de passe.

---

## Leçons apprises

**1. EFS vs volumes locaux** — L'utilisation d'EFS pour les fichiers statiques a nécessité une attention particulière aux permissions (uid/gid des containers Django). Un montage NFS mal configuré coupe les uploads silencieusement.

**2. Rolling updates Swarm** — Configurer `update_config.parallelism: 1` et `failure_action: rollback` sur les services critiques évite les coupures lors des déploiements.

**3. Bastion + NAT** — Combiner le bastion SSH avec une fck-nat instance permet de réduire les coûts tout en conservant l'accès sécurisé aux instances privées.

**4. SonarCloud** — Intégrer SonarCloud dès le début du pipeline force à maintenir la qualité du code (coverage, code smells) avant chaque merge.

---

## Références

- Code source : [github.com/aberdjeghloul/taiga-aws-infra](https://github.com/aberdjeghloul/taiga-aws-infra)
- Pipeline CI/CD : [gitlab.com/abdelrhamane-devops/taiga-project/infra-projet](https://gitlab.com/abdelrhamane-devops/taiga-project/infra-projet)
- Live : [taiga.devagilles.fr](https://taiga.devagilles.fr)
