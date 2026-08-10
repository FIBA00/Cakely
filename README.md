<div align="center">

<img src="./imgs/guzo-logo-lockup.png" alt="Guzolink" width="360" />

### A lightweight marketplace platform where local merchants create online shops and sell products

[![CI](https://github.com/<owner>/<repo>/actions/workflows/ci.yml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/ci.yml)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](./LICENSE)
[![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

</div>

---

## Overview

# Cakely: Multi-Tenant Custom Confectionery Architecture & E-Commerce Platform

## 1. Executive Summary

Cakely is a specialized B2B2C Software-as-a-Service (SaaS) platform built for local bakeries and artisanal cake shops. The platform eliminates communication friction by introducing a visual, interactive ordering ecosystem for highly customized confectionery. Cakely automates the intake of complex design specifications, allowing bakery owners to scale their custom operations efficiently while providing customers with a transparent, frustration-free design experience.

## 2. Core Problem Statement

* The Customization Disconnect: Custom cake orders involve highly specific variables (flavors, tiers, dietary restrictions, reference photos). Traditional phone or text orders result in miscommunicated details and costly order errors.
* Hidden Technical Details: Customers struggle to understand structural constraints, portions, or how specific ingredient choices impact final pricing, leading to unexpected costs and post-purchase frustration.
* Admin Bottlenecks for Bakeries: Local shop owners spend excessive unpaid hours manually back-and-forth quoting, tracking custom design parameters, and managing erratic deposit collections.

## 3. Key Value Propositions

* Frictionless Customization Engine: Customers visually build and configure their custom cake requests independently, minimizing manual design consultation time.
* Absolute Order Transparency: Real-time itemized price updates and visual design confirmations ensure absolute alignment between customer expectations and bakery output.
* Turnkey Multi-Tenant Scaling: Independent local bakeries instantly launch a robust, feature-rich digital storefront complete with enterprise-grade custom order management tools.

## 4. Pillar Features & Capabilities

### 🎂 Interactive Custom Cake Builder

* Visual Parameter Configurator: Step-by-step custom wizard for selecting layers, tiers, flavors, frostings, fillings, and exterior decorative textures.
* Reference & Vector Upload Matrix: Dedicated asset upload nodes for customers to attach design inspiration photos, color hex codes, and custom topper text.
* Dynamic Constraint Validator: Smart system logic that prevents structurally impossible combinations (e.g., matching a heavy fondant design with an unsupported, ultra-soft whipped cream base).

### 🏢 Multi-Tenant Architectural Layer

* Isolated Database Architecture: Secure, logically separated vendor data layers to isolate client records, operational logs, and financial accounting per bakery tenant.
* White-Label Customization Suite: Complete control for shop owners over their digital storefront brand identity, operating hours, custom pricing rules, and menu availability.
* Centralized Core Updates: Rolling platform enhancements and feature additions deploy across all boutique tenants simultaneously without affecting individual custom store configurations.

### 📊 Dual-Sided Operations Dashboards

* Bakery Owner Dashboard:
* Interactive Kitchen Prep Matrix: Visual, status-driven kanban boards sorting upcoming custom orders by baking schedule, decorating phases, and final packaging deadlines.
   * Dynamic Quote & Invoice Manager: Instantly convert complex customer configurations into final actionable invoices with integrated structural deposit terms.
   * Ingredient & Inventory Forecaster: Aggregated metrics breaking down exact bulk ingredient requirements (flour, sugar, specific extracts) based on the upcoming week’s custom orders.
* Customer Experience Hub:
* Live Order Blueprint: A dedicated summary interface displaying all finalized custom design specs, selected flavors, and approved reference graphics.
   * Real-Time Milestone Tracker: Status notifications informing the customer when their cake enters the baking phase, the assembly phase, and when it is ready for collection or transit.
   * Historical Past-Order Ledger: Quick-reorder modules allowing users to duplicate previous configurations for recurring yearly celebrations or family events.

## 5. Target Audience Segments

* Boutique Artisanal Bakeries: Micro and small business cake studios specializing in highly detailed wedding, birthday, and corporate event centerpieces.
* Home-Based Confectioners: Registered independent home bakers seeking professional order tracking, structured deposit handling, and client intake software.
* High-Volume Local Pastry Chains: Regional bakery networks requiring a multi-location digital ordering framework to handle custom requests across distinct physical branches.

## 6. Implementation Strategy

* Phase 1: Construct the core multi-tenant engine alongside the multi-step custom cake configuration flow for text-and-menu inputs.
* Phase 2: Launch the specialized kitchen operations kanban board and deploy secure, automated stripe/credit card milestone payment infrastructure.
* Phase 3: Introduce web-optimized 3D or real-time preview tools to give customers immediate, basic structural visuals of their selected cake dimensions.



## Tech Stack

<div align="left">

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?logo=jest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)

</div>

| Layer           | Stack                                  |
| --------------- | -------------------------------------- |
| **Backend**     | Node.js · Express · Mongoose (MongoDB) |
| **Frontend**    | Vite · Vanilla JS · Tailwind CSS       |
| **Payments**    | Stripe (pluggable provider)            |
| **Dev tooling** | nodemon · Jest · Supertest             |
| **CI/CD**       | GitHub Actions                         |

## Repository Layout

```text
├── backend/            # Express API — merchants, shops, products, orders
├── guzolink_client/    # Vite frontend — merchant dashboard & storefront
├── imgs/               # Screenshots and README assets
└── scripts/            # Utility scripts (seed data, demo merchant)
```

## Quick Start

**Prerequisites:** Node.js 18+, npm, a running MongoDB instance.

```bash
# Backend
cd backend
npm install
npm run dev          # dev server with auto-reload
npm run start         # production server (defaults to PORT 9000)

# Frontend
cd guzolink_client
npm install
npm run dev
```

## Environment Variables

Backend config resolves in priority order: `backend/envs/.env.local` → `backend/envs/.env.prod` → `backend/.env`.

```env
PORT=9000
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=1d

DB_URI=mongodb://localhost:27017/Guzolink
HOST=localhost
DB_NAME=Guzolink

PAYMENTS_PROVIDER_KEY=sk_test_yourStripeKeyHere
```

## API Reference

| Method   | Endpoint             | Description                    | Auth  |
| -------- | -------------------- | ------------------------------ | :---: |
| `POST`   | `/api/auth/register` | Register a new merchant        |   –   |
| `POST`   | `/api/auth/login`    | Authenticate and receive a JWT |   –   |
| `GET`    | `/api/shops`         | List active shops              |   –   |
| `POST`   | `/api/shops`         | Create a shop                  |   ✅   |
| `GET`    | `/api/products`      | Fetch product catalog          |   –   |
| `POST`   | `/api/products`      | Add a product                  |   ✅   |
| `PUT`    | `/api/products/:id`  | Update a product               |   ✅   |
| `DELETE` | `/api/products/:id`  | Remove a product               |   ✅   |

## Scripts

| Command                                  | Where              | Does                                     |
| ---------------------------------------- | ------------------ | ---------------------------------------- |
| `npm run dev`                            | `backend/`         | Start dev server (nodemon)               |
| `npm start`                              | `backend/`         | Start production server                  |
| `npm test`                               | `backend/`         | Run Jest + Supertest suite               |
| `node src/scripts/createDemoMerchant.js` | `backend/`         | Seed a demo merchant, shop, and products |
| `npm run dev`                            | `guzolink_client/` | Start Vite dev server                    |
| `npm run build`                          | `guzolink_client/` | Build production assets                  |
| `npm run preview`                        | `guzolink_client/` | Preview the production build locally     |

## Contributing

Issues and PRs are welcome — please include a clear description of the change and its rationale.

## Team

Fraol Bulti · Daniel · Gemechis Bekena

## License

[ISC](./LICENSE)
