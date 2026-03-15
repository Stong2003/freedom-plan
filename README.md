# FirePath (FIRE Planner MVP)

FirePath is a launch-ready MVP for deterministic FIRE (Financial Independence / Retire Early) planning.

It helps users:
- build a structured FIRE Plan,
- review projected timeline outcomes,
- compare built-in scenario tradeoffs,
- and share a client-ready report via browser Print / Save as PDF.

---

## What the app does

FirePath provides an end-to-end planning flow across five routes:
- `/` — product overview, quick-start actions, and MVP status
- `/plan` — guided multi-step FIRE Plan questionnaire
- `/results` — deterministic projection output + explainability
- `/scenarios` — deterministic scenario comparison and delta analysis
- `/report` — polished report surface + export actions

The app is intentionally backend-free in v1 so it runs locally and demos reliably with only frontend dependencies.

---

## Core user flow

1. **Start Plan** from Home or Header CTA.
2. Complete the 6-step plan flow on `/plan`.
3. Review deterministic outputs on `/results`.
4. Stress-test assumptions on `/scenarios`.
5. Share a polished report from `/report` using **Print / Save as PDF**.

If required inputs are missing, the app shows intentional fallback messaging and can use sample data to keep demos moving.

---

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hook Form + Zod**
- **Zustand** (client state)
- **Recharts**

---

## Implemented features (v1)

- App-wide layout, navigation, metadata groundwork, and launch-oriented branding
- Deterministic FIRE calculation engine (no Monte Carlo in v1)
- Plan builder with validation, step navigation, save/review flow
- Results page with milestones, timeline chart, assumptions, and strategy guidance
- Scenario comparison with editable assumptions and plain-English deltas
- Report composition pipeline with export actions and structured sections
- Launch polish states:
  - empty states,
  - loading/skeleton scaffolding,
  - fallback/sample-data messaging,
  - app-level `not-found` and error UI

---

## Deterministic v1 model (what this means)

FirePath v1 is a **deterministic planning tool**. It applies fixed assumptions and rule-based calculations to produce consistent outputs for the same inputs.

Included now:
- fixed-return style projection
- inflation + withdrawal assumptions
- scenario deltas across predefined adjustment dimensions

Deferred intentionally:
- Monte Carlo probability modeling
- tax-location / withdrawal sequencing optimization
- account-level contribution constraints and jurisdiction-specific logic

---

## Mock fallback behavior

For launch demos, FirePath can gracefully continue when user input is incomplete:
- Results/scenarios/report can use sample baseline data when needed.
- The UI explicitly tells users when sample/fallback data is being used.
- This avoids blank screens during first-run demos while preserving transparency.

---

## Local setup

### Requirements
- Node.js 18+
- npm 9+

### Install and run

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

### Build and start

```bash
npm run build
npm run start
```

---

## Deployment notes (MVP)

- No backend services are required.
- No auth/database setup is required.
- No external AI API keys are required.
- Current export flow is browser-native Print / Save as PDF.

### Deployment checklist

- [ ] Install dependencies: `npm install`
- [ ] Validate local dev: `npm run dev`
- [ ] Validate production build: `npm run build`
- [ ] Validate production runtime: `npm run start`
- [ ] Confirm route flow: `/` → `/plan` → `/results` → `/scenarios` → `/report`
- [ ] Confirm fallback messaging appears when plan data is incomplete
- [ ] Confirm report export opens browser print dialog

---

## MVP status

### Works now
- End-to-end deterministic planning experience
- Scenario comparison workflow
- Client-ready report view + print/PDF path
- Polished navigation, metadata, and launch-ready fallback/error states

### Coming later
- Advanced stochastic simulation (Monte Carlo)
- Deeper tax and withdrawal logic
- Rich export/sharing workflows beyond browser print
- Optional backend persistence and collaboration capabilities

---

## Recommended next steps

1. Add unit tests for deterministic engine and scenario delta calculations.
2. Add integration tests for core route flow and fallback states.
3. Add richer chart accessibility and keyboard/ARIA refinements.
4. Add CI checks for typecheck/lint/build.
5. Add deployment target config (e.g., Vercel) and release workflow notes.
