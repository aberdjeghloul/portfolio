---
title: "Taiga on AWS — Production Infrastructure"
description: "Production deployment of Taiga (open-source Agile PM) on AWS with Docker Swarm Multi-AZ, Terraform, Ansible, full CI/CD pipeline and Prometheus/Grafana monitoring."
pubDate: 2026-04-01
stack: ["AWS", "Terraform", "Ansible", "Docker Swarm", "GitLab CI/CD", "Traefik", "Prometheus", "Grafana", "PostgreSQL"]
github: "https://github.com/aberdjeghloul/taiga-aws-infra"
gitlab: "https://gitlab.com/abdelrhamane-devops/taiga-project/infra-projet"
live: "https://taiga.devagilles.fr"
context:
  fr: "Projet de certification La Capsule (janvier–mars 2026), réalisé en équipe de 4 ingénieurs DevOps. Ma spécialité : la CI/CD — 3 pipelines GitLab CI/CD (build → registry → SonarCloud → déploiement sans interruption), tests unitaires, E2E et de charge (Locust)."
  en: "La Capsule certification project (January–March 2026), built by a team of 4 DevOps engineers. My specialty: CI/CD — 3 GitLab CI/CD pipelines (build → registry → SonarCloud → zero-downtime deployment), unit, E2E and load testing (Locust)."
---

## Overview

Certification project for the Titre Pro Administrateur Système DevOps (La Capsule, January–March 2026), delivered by a team of 4 DevOps engineers.

Automated deployment of [Taiga](https://taiga.io) on AWS with high availability architecture across 2 availability zones.

## Architecture

- **3 Masters** running Traefik (reverse proxy + TLS) and Prometheus/Grafana
- **6 Workers** running the Taiga application stack (Docker Swarm)
- **RDS PostgreSQL** Multi-AZ for the database
- **EFS** for shared static/media files across workers
- **NLB** for cross-zone load balancing
- **S3** for automated daily backups

## CI/CD Pipeline [![pipeline status](https://gitlab.com/abdelrhamane-devops/taiga-project/infra-projet/badges/main/pipeline.svg)](https://gitlab.com/abdelrhamane-devops/taiga-project/infra-projet/-/pipelines)

My role in the team of 4: designing and building the **3 GitLab CI/CD pipelines**.

- **Flow:** build → push to container registry → SonarCloud quality gate → zero-downtime deployment
- **Testing:** unit tests, end-to-end (E2E) tests and load testing with Locust

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
