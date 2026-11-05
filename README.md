# Safeer E Aman

Marketing site for **Safeer E Aman**, an independent travel consultancy in Lahore, Pakistan. The site presents ethical visa guidance, destination itineraries, Umrah facilitation, ticketing, and documentation advisory as a cinematic, scroll-driven experience.

## Stack

- React 18 + TypeScript
- Vite 6
- React Router 7
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis (smooth scroll)
- Three.js (globe, passport, and canvas moments)

## Getting started

```bash
npm install
npm run dev
```

The Vite dev server prints the local URL (typically `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check with `tsc`, then production build |
| `npm run preview` | Serve the production build locally |

## Project layout

```
src/
  App.tsx                 # Routes, Lenis, page transitions
  components/             # Homepage sections, 3D canvases, shared UI
  pages/                  # About, contact, privacy, terms, services, destinations
  data/travelData.ts      # Business copy, destinations, services
  types/                  # Shared TypeScript types
public/
  brand/                  # Logo and favicons
```

## Routes

- `/` — cinematic home
- `/about`, `/contact`, `/privacy`, `/terms`
- Service pages such as visa consultancy, visit / business / study / work visas, documentation, Umrah, flights, and accommodation
- Destination pages for Turkey, the UK, Schengen, and Saudi Arabia

SPA routing on Vercel is handled by `vercel.json` (all paths rewrite to `index.html`).

## Content

Update business details, destinations, and services in `src/data/travelData.ts`. Page copy and SEO live in `index.html` and the corresponding page components.
