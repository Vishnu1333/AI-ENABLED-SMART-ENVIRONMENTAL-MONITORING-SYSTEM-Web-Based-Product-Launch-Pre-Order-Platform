# AERIS AI — AI-Enabled Smart Environmental Monitoring System
## Web-Based Product Launch & Pre-Order Platform

AERIS AI is an academic project for ITM3207 (IT Project Management) that presents an AI-enabled environmental monitoring product through an editorial product website, a pre-order demonstration flow, an admin console, and a Project Control Center aligned with the group's project-management report.

> **Project status: Academic demo — not a production commerce or environmental monitoring service.** The frontend is a client-side React application. Environmental telemetry, anomaly metrics, payment, and several administrative behaviours are simulated or demo-only. No production sensor network, backend API, database, payment processor, or customer authentication is connected.

**Repository:** [GitHub](https://github.com/Vishnu1333/AI-ENABLED-SMART-ENVIRONMENTAL-MONITORING-SYSTEM-Web-Based-Product-Launch-Pre-Order-Platform)

---

## Contents

- [Project overview](#project-overview)
- [Key features](#key-features)
- [Project Control Center](#project-control-center)
- [Customer and project lifecycles](#customer-and-project-lifecycles)
- [Technology stack](#technology-stack)
- [Routes](#routes)
- [Quick start](#quick-start)
- [Build and quality checks](#build-and-quality-checks)
- [Deployment on Vercel](#deployment-on-vercel)
- [Project structure](#project-structure)
- [Data persistence and demo limitations](#data-persistence-and-demo-limitations)
- [Security and privacy notes](#security-and-privacy-notes)
- [ITM3207 report alignment](#itm3207-report-alignment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Project overview

The project proposes a web-based launch and pre-order experience for an AI-enabled environmental monitoring system intended for places such as offices, schools, hospitals, and commercial spaces. The product concept concerns environmental indicators such as temperature, humidity, and air quality.

The website communicates the concept through product storytelling and interactive visualizations. It also models a customer pre-order journey and gives the project team a dedicated control area to present project-management artefacts from the ITM3207 report.

### Main objectives represented by the project

- Present the environmental monitoring product, capabilities, use cases, and technical information.
- Provide responsive product discovery and a demonstration pre-order/checkout journey.
- Show an order confirmation and a demo order-tracking interface.
- Provide administrative screens for product and order operations.
- Make project governance artefacts available through the Project Control Center.
- Clearly distinguish implemented UI and demo behaviour from production-ready capabilities.

## Key features

### Public product experience

- High-contrast editorial interface with responsive layouts and motion.
- Interactive 3D product presentation using React Three Fiber and Three.js.
- Product details, specifications, and capability presentation.
- Environmental telemetry visualisation for the product concept.
- Anomaly-detection visualisation illustrating a proposed monitoring workflow.
- Pre-order allocation and multi-step checkout demonstration.
- Order confirmation and order tracking screens.
- Accessibility considerations such as visible focus styles and reduced-motion support where implemented.

### Admin console

The admin console contains demonstration screens for dashboard metrics, products, orders, customers, analytics, and project information. The UI is intended for academic demonstration; it is not a secured, production administration system.

### Project Control Center

Available at `/admin/project`, this section consolidates project-management information aligned with the assignment report:

1. Overview and executive KPIs
2. Project charter
3. Objectives and KPIs
4. Scope (in-scope and out-of-scope)
5. Deliverables D1–D9
6. Stakeholder register and power/interest matrix
7. Budget planning allocation
8. Risk management and risk heatmap
9. Work Breakdown Structure (WBS)
10. Project milestone gates
11. Quality and security verification register
12. Deployment readiness
13. Handover checklist

The report's budget ceiling is RM500,000. The displayed budget is a planning allocation, not evidence of actual expenditure or a vendor quotation. Project data is intended to reflect the report; the report remains the authoritative source if any discrepancy is found.

## Customer and project lifecycles

These are intentionally separate concepts.

**Customer order lifecycle (commercial demonstration):**

`PRE-ORDER REGISTERED → PRICE CONFIRMED → CHASSIS ASSEMBLY → QUALITY TESTING → DISPATCH & COMMISSIONING`

This is a conceptual product fulfilment journey, not a live logistics integration.

**Project delivery lifecycle (software governance):**

`CHARTER → REQUIREMENTS → DESIGN → INTEGRATION → FEATURE COMPLETE → TEST ACCEPTANCE → OPERATIONAL READINESS → RELEASE → REVIEW`

This tracks software-project gates, not individual customer orders.

## Technology stack

- **UI:** React
- **Build tool / development server:** Vite
- **Routing:** React Router
- **3D graphics:** Three.js, React Three Fiber, and Drei
- **Animation:** Framer Motion and GSAP
- **Icons:** Lucide React
- **Styling:** CSS and CSS Modules
- **Linting:** Oxlint
- **Hosting target:** Vercel (static frontend deployment)

Versions and scripts are defined in `package.json`. The lockfile should be used for reproducible installs.

## Routes

| Route | Purpose |
|---|---|
| `/` | Public landing page and product story |
| `/product` | Product selection and specifications |
| `/checkout` | Demonstration pre-order checkout |
| `/order-confirmation` | Order confirmation |
| `/track-order` | Order tracking |
| `/track-order/:orderId` | Tracking for a selected order |
| `/admin` | Admin console |
| `/admin/project` | ITM3207 Project Control Center |

Unknown routes currently fall back to the landing page.

## Quick start

### Prerequisites

- Node.js compatible with the Vite version in `package.json`
- npm
- Git (for cloning)

Check your versions:

```bash
node --version
npm --version
```

### Clone and install

```bash
git clone https://github.com/Vishnu1333/AI-ENABLED-SMART-ENVIRONMENTAL-MONITORING-SYSTEM-Web-Based-Product-Launch-Pre-Order-Platform.git
cd AI-ENABLED-SMART-ENVIRONMENTAL-MONITORING-SYSTEM-Web-Based-Product-Launch-Pre-Order-Platform
npm ci
```

### Run the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal. Vite usually uses `http://localhost:5173` unless the port is busy.

### Create a production build locally

```bash
npm run build
npm run preview
```

The production output is generated in `dist/`. Do not commit `node_modules/` or generated build output unless there is a deliberate project-specific reason.

## Build and quality checks

Run the available checks before pushing:

```bash
npm run build
npm run lint
```

A successful build confirms that Vite can compile the frontend; it does **not** prove that payment, authentication, real telemetry, privacy compliance, or production operational readiness has been implemented. Manually test the key public and admin routes after each major change.

## Deployment on Vercel

This project is a Vite single-page application (SPA). Vercel should build the app and serve the generated `dist` directory. A rewrite is required so deep links such as `/admin/project` and `/track-order/ORDER-ID` are served by the SPA entry point.

### Option A — Import the GitHub repository (recommended)

1. Push the latest project source to the GitHub repository.
2. Sign in to [Vercel](https://vercel.com/).
3. Select **Add New → Project**.
4. Import the repository **Vishnu1333/AI-ENABLED-SMART-ENVIRONMENTAL-MONITORING-SYSTEM-Web-Based-Product-Launch-Pre-Order-Platform**.
5. Set the framework preset to **Vite** if Vercel does not detect it automatically.
6. Use these settings:

   | Setting | Value |
   |---|---|
   | Framework preset | Vite |
   | Install command | `npm ci` |
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Root directory | Repository root |

7. Select **Deploy** and wait for the build to finish.
8. Open the generated deployment URL and test the public, checkout, tracking, admin, and Project Control routes.
9. In Vercel's project settings, confirm that deployments are linked to the intended GitHub repository and production branch (normally `main`).

No environment variables are required by the current frontend configuration. Do not add private keys or credentials to client-side source code. If future integrations require secrets, store them in Vercel project environment variables and access them through a secure server-side service.

### Option B — Deploy with the Vercel CLI

Install/use the Vercel CLI and authenticate in your own terminal:

```bash
npm install
npm run build
npx vercel
```

Follow the interactive prompts to link the local project to the correct Vercel project. After verifying the preview deployment, deploy production with:

```bash
npx vercel --prod
```

The GitHub/Vercel web integration is generally easier for ongoing deployments because new commits to the production branch can trigger automatic deployments.

### SPA deep-link configuration

The repository should include `vercel.json` with the following rewrite:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This allows client-side React Router routes to resolve when opened directly or refreshed. The Vercel deployment URL is created by Vercel; it is not hard-coded here.

## Project structure

A simplified map of the important application areas:

```text
.
├── public/                     # Public static assets
├── src/
│   ├── components/             # Shared UI and feature components
│   │   └── admin/              # Admin-specific components
│   ├── context/                # Shared React application state
│   ├── data/
│   │   └── projectData.js      # Central project-control datasets
│   ├── pages/                  # Route-level screens
│   ├── utils/                  # Utilities and demo API helpers
│   ├── App.jsx                 # Application routes and providers
│   └── main.jsx                # Frontend entry point
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── vercel.json                 # SPA routing for Vercel
└── README.md
```

The exact file tree may evolve as the project develops.

## Data persistence and demo limitations

The current implementation is predominantly frontend-only.

- **Persistence:** Selected demo state such as orders and products is stored in browser `localStorage`. It is local to a browser profile/device and is not a shared central database.
- **Telemetry:** The environmental dashboard uses simulated client-side values; it is not connected to real sensors or an IoT ingestion service.
- **Anomaly detection:** The anomaly interface is a visual demonstration. Its displayed confidence/lead-time figures should not be interpreted as results from a validated deployed ML model.
- **Payment:** Checkout is a demonstration flow. No live payment gateway or card processing should be assumed.
- **Authentication:** Public customer login and registration were removed from this demo. The current admin UI is not a substitute for real authentication or role-based server authorization.
- **Orders and fulfilment:** Order statuses are demonstration data. No production inventory, warehouse, courier, or commissioning system is connected.
- **PDF/manifest:** Verify the actual deployed browser behaviour before presenting this capability as a generated downloadable PDF; print-based output is not the same as a server-generated PDF document.
- **Hosting:** A successful Vercel deployment publishes the frontend; it does not automatically add an API, database, device integration, or secure backend.

The application should therefore be described as a **functional visual prototype / academic demo**, not as a production-ready e-commerce platform or validated environmental safety system.

## Security and privacy notes

- Do not use real payment-card data in the demonstration.
- Do not enter sensitive personal information into a publicly accessible demo.
- Treat client-side localStorage as editable by the user and unsuitable for authorization, payment records, or regulated data.
- Do not put secrets, private API keys, access tokens, or credentials in frontend variables or source files.
- Before production use, implement server-side authentication and authorization, durable server-managed order storage, payment-provider integration, input validation, audit logging, monitoring, backups, and security testing.
- The current demo's direct admin route must be treated as publicly accessible unless a separate access-control layer is configured.

## ITM3207 report alignment

The Project Control Center is designed to surface the report's planning and governance artefacts:

| Report area | Project representation |
|---|---|
| Project mandate and justification | Project Charter |
| Objectives and success measures | Objectives & KPIs |
| Scope baseline | In-scope / Out-of-scope |
| Deliverable baseline | D1–D9 |
| Stakeholder engagement | Stakeholder register + Power/Interest matrix |
| Cost planning | RM500,000 budget allocation |
| Risk management | Risk register, P×I formula, 5×5 heatmap |
| Work decomposition | WBS packages 1.0–9.0 |
| Governance and acceptance | Milestone gates G1–G9 |
| Verification | Quality & Security section |
| Operational release | Deployment readiness |
| Transition | Handover checklist |

The report defines a **RM500,000 budget ceiling**, including a contingency allocation. Displayed category figures are planning estimates and should not be presented as actual spend. Deliverable and milestone statuses should stay honest and reflect available evidence; do not label work production-complete without corresponding implementation and approval evidence.

## Troubleshooting

### A deep link returns a 404 on Vercel

Confirm that `vercel.json` exists at the repository root and contains the SPA rewrite shown above. Redeploy after committing the configuration.

### Vercel build fails

- Check the deployment build log.
- Confirm the root directory contains `package.json` and `package-lock.json`.
- Confirm the build command is `npm run build` and output directory is `dist`.
- Try `npm ci && npm run build` locally using a compatible Node.js version.
- Avoid committing a local `node_modules` directory; dependency installation should happen during the cloud build.

### Changes do not appear after deploy

Ensure the commit was pushed to the branch configured as Production in Vercel. Check the latest deployment's commit SHA and build status, then hard-refresh the browser.

### Orders differ between computers

This is expected while orders are stored in browser localStorage. Separate browsers/devices do not share data. Shared production data requires a backend and database.

## Contributing

For academic development and maintenance:

1. Create a feature branch.
2. Keep the public experience responsive and preserve accessible interaction patterns.
3. Keep project-report data centralized in `src/data/projectData.js` where practical.
4. Avoid describing simulated values as live measurements or validated model results.
5. Run `npm run build` and `npm run lint`.
6. Review changes for secrets, customer data, generated artifacts, and accidental `node_modules` additions before committing.

## License

No license has been specified in this repository yet. Unless a license is added, the code should not be assumed to be available for unrestricted reuse. Add a LICENSE file if the project requires a formal reuse policy.
