---
title: "Taiga on AWS — Production Infrastructure"
description: "Production deployment of Taiga (open-source Agile PM) on AWS with Docker Swarm Multi-AZ, Terraform, Ansible, full CI/CD pipeline and Prometheus/Grafana monitoring."
pubDate: 2026-04-01
stack: ["AWS", "Terraform", "Ansible", "Docker Swarm", "GitLab CI/CD", "Traefik", "Prometheus", "Grafana", "PostgreSQL"]
github: "https://github.com/aberdjeghloul/taiga-aws-infra"
gitlab: "https://gitlab.com/abdelrhamane-devops/taiga-project/infra-projet"
live: "https://taiga.devagilles.fr"
---

## Overview

Automated deployment of [Taiga](https://taiga.io) on AWS with high availability architecture across 2 availability zones.

## Architecture

- **3 Masters** running Traefik (reverse proxy + TLS) and Prometheus/Grafana
- **6 Workers** running the Taiga application stack (Docker Swarm)
- **RDS PostgreSQL** Multi-AZ for the database
- **EFS** for shared static/media files across workers
- **NLB** for cross-zone load balancing
- **S3** for automated daily backups

## CI/CD Pipeline

```
dev → main       →  Integration tests (pytest) + SonarCloud analysis
main → staging   →  Docker build → push :staging → deploy to staging
staging → prod   →  Docker build → push :latest  → deploy to production
```

## Key Features

- One-command deployment: `./deploy.sh prod`
- Automated backups to S3 (daily cron, 30-day retention)
- Full monitoring: CPU, RAM, disk, HTTP metrics, container metrics
- Automatic TLS certificate via ACM + Route53
- SSH access via bastion with custom port (security hardening)
