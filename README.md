# CivicResolve Administration Console

CivicResolve is an institutional municipal administration and civic grievance triage platform engineered for local government authorities, public works departments, and zonal municipal officers. The platform provides a centralized, high-density operational console for receiving citizen issue reports, coordinating field contractor dispatch, monitoring Service Level Agreement (SLA) windows, and maintaining immutable public audit records.

---

## Technical Stack

The web interface is built using a modern frontend architecture focused on runtime performance, accessibility, and robust memory management:

- **Build Engine & Bundler:** Vite
- **UI Framework:** React.js (v19)
- **Styling Architecture:** Tailwind CSS & Custom Design System (Classic Govt Trust palette: Deep Government Blue `#1E3A5F`, Slate Neutral `#475569`, Off-White Foundation `#F7F9FB`, and Institutional Amber `#D97706`)
- **Motion & Interpolation Engine:** GSAP (GreenSock Animation Platform) with `@gsap/react` and `ScrollTrigger` (utilizing scoped context execution for zero-leak cleanup and 60+ FPS telemetry updates)
- **Backend & Database Service:** Supabase (PostgreSQL with real-time replication)

---

## Architectural Modules & Core Capabilities

### 1. Multi-Jurisdiction Ward Management & Triage Filters
- **Geo-Ward Quick Switch:** Live jurisdiction filtering across administrative zones (Ward 01: Central Commercial, Ward 02: North Industrial, Ward 03: Westside Residential, Ward 04: Riverfront Logistics, or City-wide Aggregate).
- **Workflow Queue Selectors:** Instant segmentation across complaint states (`Urgent / SLA Breach`, `Pending Triage`, `Active Field Execution`, and `Resolved & Certified`).
- **Operational View Modes:** Switch between Standard Audit Ledger, SLA Risk Matrix, and Zonal Department Allocation views.

### 2. Live Municipal Grievance Intake & Dispatch Ledger
- High-density tabular ledger presenting real-time public intake records.
- Standardized data columns including Case Reference IDs, incident summaries, verified citizen UIDs, physical addresses with coordinates, assigned departmental units, SLA countdown timers, and semantic status tags.
- Keyboard-accessible row interaction for instant inspection.

### 3. Interactive Dispatch Dossier Side-Drawer
- Sliding administrative dossier drawer providing complete case visibility:
  - **Citizen Evidentiary Submission:** Submitter credentials, contact logs, and structured incident narrative.
  - **Photographic Evidence Gallery:** Verified inspection thumbnails accompanied by GPS EXIF metadata and timestamp validation.
  - **Contractor Dispatch Controls:** Role-based contractor unit assignment (`Public Works Division Alpha`, `Municipal Grid Unit 02`, `Sanitation Logistics Fleet 04`, `Emergency Water Board Rapid Response`), priority escalation, and departmental directives.
  - **Immutable Audit Trail:** Chronological timeline recording all triage actions, officer IDs, and status modifications.
  - **Work Order Generation:** Direct generation and printing of standardized municipal work orders.

### 4. Real-Time Telemetry & Analytical Visualizations
- **Metric Overview Strip:** Real-time KPI panels tracking total intake, pending reviews, active work orders, resolution rates, and SLA breach risks with smooth, utilitarian numerical interpolations.
- **Weekly Intake & Resolution Velocity Chart:** 2D solid vector coordinate chart displaying 7-day rolling comparative intake against certified case closures.
- **Status Distribution Breakdown:** Flat coordinate ring chart accompanied by high-density percentage allocation tables.

### 5. Role-Based Access Control (RBAC) & Audit Compliance
- Dynamic role switcher supporting Municipal Commissioners (Executive Clearance), Zonal Triage Officers, Field Crew Supervisors, and Public Records Auditors.
- Cryptographic SHA-256 ledger integrity verification modal.
- Export routines supporting formatted municipal CSV logs and digitally signed JSON audit ledgers for Section 508 and public records compliance.

---

## Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm (v9.0.0 or higher)

### Setup Instructions

1. Clone the repository and navigate to the project root:
   ```bash
   git clone https://github.com/saurabhkun/CivicResolve-Web.git
   cd CivicResolve-Web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Access the administrative interfaces in your web browser:
   - **Primary Administrative Console:** `http://localhost:3000/motion-dashboard.html`
   - **Live Preview Portal:** `http://localhost:3000/preview.html`
   - **Standard Overview:** `http://localhost:3000/dashboard.html`

---

## Production Build & Deployment

### Static Production Build
To compile optimized static assets for production deployment:
```bash
npm run build
```
Compiled assets will be output to the `dist/` directory.

### Local Preview of Production Bundle
To test the production build locally:
```bash
npm run preview
```

### GitHub Pages Deployment Configuration
To deploy the compiled application to GitHub Pages:

1. Ensure the `base` property in `vite.config.js` matches your repository path if deploying to a subpath:
   ```javascript
   // vite.config.js
   export default defineConfig({
     base: '/CivicResolve-Web/',
     plugins: [react()],
     // ...
   });
   ```

2. Build and push the `dist/` directory to the `gh-pages` branch:
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

---

## Compliance & Legal Disclaimers

This software is designed to comply with municipal open records standards and Section 508 accessibility guidelines. All grievance records, dispatch logs, and geospatial coordinates are managed in accordance with local statutory public records retention policies.