---
title: "Monitoring Stack"
description: "One-command monitoring stack — Prometheus + Grafana + Node Exporter + cAdvisor via Docker Compose. Ready to deploy on any Linux server."
pubDate: 2026-04-15
stack: ["Prometheus", "Grafana", "Node Exporter", "cAdvisor", "Docker Compose"]
github: "https://github.com/aberdjeghloul/monitoring-stack"
---

## Overview

A self-contained monitoring stack deployable in seconds on any Docker host. Extracted from the production setup used in the [Taiga AWS Infrastructure](https://github.com/aberdjeghloul/taiga-aws-infra) project.

## What's included

| Service | Port | Role |
|---|---|---|
| Prometheus | 9090 | Metrics collection & storage |
| Grafana | 3000 | Dashboards & visualization |
| Node Exporter | 9100 | System metrics (CPU, RAM, disk) |
| cAdvisor | 8080 | Docker container metrics |

## Quick Start

```bash
git clone https://github.com/aberdjeghloul/monitoring-stack.git
cd monitoring-stack
docker compose up -d
```

Open Grafana at http://localhost:3000 (admin / admin).

## Key Features

- Auto-provisioned Prometheus datasource
- Dashboard auto-provisioning from JSON files
- 15-day metrics retention
- Hot-reload Prometheus config without restart
