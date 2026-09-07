# AGENTS.md — MediFastBD Landing Page

## Project Identity

- **Name:** MediFastBD
- **Tagline:** Finding Medicine Faster, Cheaper & Closer.
- **Team:** Nexora Labs
- **University:** University of Frontier Technology Bangladesh
- **Department:** Department of Software Engineering

## Architecture

- **Type:** Static website (HTML/CSS/JS)
- **Build process:** None — pure static files
- **External dependencies:** Google Fonts only (Inter + Noto Sans Bengali)
- **JavaScript:** Vanilla JS, zero libraries, zero npm packages
- **Entry point:** `index.html`
- **Deployment target:** Vercel (via GitHub)

## Folder Structure

```
website/
├── index.html                  # Main landing page (single-page)
├── css/
│   └── style.css               # All styles (~2800 lines)
├── js/
│   └── script.js               # All scripts (~1200 lines)
├── favicon/
│   └── favicon.svg             # SVG favicon
├── assets/
│   ├── logo/
│   │   └── medifastbd-icon.svg # Brand logo (used in navbar + footer)
│   ├── icons/
│   │   ├── flutter-original.svg    # Flutter tech icon
│   │   └── firebase-original.svg   # Firebase tech icon
│   ├── screenshots/             # Real app screenshots
│   │   ├── customer-dashboard-1.png
│   │   ├── customer-dashboard-2.png
│   │   ├── find-medicines-1.png
│   │   ├── find-medicines-2.png
│   │   ├── emergency-medicine.png
│   │   ├── nearby-hospitals.jpg
│   │   ├── pharmacy-1-overview.png
│   │   ├── pharmacy-2-orders.png
│   │   ├── pharmacy-3-inventory.png
│   │   ├── pharmacy-4-messages.png
│   │   ├── pharmacy-5-more-verified.png
│   │   └── pharmacy-6-more-requests.png
│   ├── images/
│   │   └── poster/
│   │       └── video-poster.jpg    # (future) Video thumbnail
│   ├── videos/
│   │   └── medifastbd-demo.mp4     # (future) Competition demo video
│   └── downloads/
│       ├── MediFastBD.apk          # (future) Android APK
│       ├── MediFastBD-Windows.exe  # (future) Windows app
│       └── MediFastBD-Project-Poster.pdf  # (future) Competition poster
├── robots.txt
├── sitemap.xml
├── README.md
└── AGENTS.md                   # This file
```

## Configuration

All configurable URLs are in `js/script.js` at the top:

```javascript
const CONFIG = {
    webAppUrl: "...",           // Web app URL
    androidUrl: "...",          // Android download URL
    windowsUrl: "...",          // Windows download URL
    githubUrl: "...",           // GitHub repository URL
    demoVideoUrl: "...",        // Demo video path
    posterUrl: "..."            // Poster/download URL
};
```

HTML elements with `data-config="keyName"` will automatically use these values.
When a CONFIG value equals the placeholder string (e.g., "WEB_APP_URL"), the button is disabled gracefully.

## Development Commands

```bash
# Run locally (any of these):
npx serve .
python -m http.server 8000
php -S localhost:8000

# No build step needed — edit files directly
# No npm install needed
```

## Deployment (Vercel)

1. Push to GitHub repository (private)
2. Connect repository to Vercel
3. Vercel auto-detects static site
4. No build configuration needed
5. Every push triggers automatic deployment

## Asset Conventions

- **Screenshots:** PNG format, placed in `assets/screenshots/`
- **Videos:** MP4 format, placed in `assets/videos/`
- **Downloads:** Original format, placed in `assets/downloads/`
- **Posters:** JPG/PNG format, placed in `assets/images/poster/`
- **Logos:** SVG format, placed in `assets/logo/`
- **All paths are relative** (no Windows paths, no absolute URLs for local assets)

## Important Rules

- **No secrets** in HTML/CSS/JS/public assets
- **No fake statistics** (ratings, reviews, user counts)
- **No external JavaScript** except Google Fonts
- **All image paths use forward slashes** (Vercel runs on Linux)
- **index.html is the entry point**
- **Do not remove working functionality** when making changes
- **MediFast AI appears only once** as a feature
- **CareLink is separate** from MediFast AI
- **Emergency Medicine Mode** is NOT ambulance service

## Verification Steps

After any change:
1. Open `index.html` in browser
2. Check all navigation links scroll to correct sections
3. Check all images load (no broken paths)
4. Check mobile responsiveness (hamburger menu, stacked layouts)
5. Check dark mode toggle works
6. Check language toggle (EN/BN) works
7. Check browser console for errors
8. Verify no Windows-specific paths in code

## Section Order (24 sections)

1. Hero (`#home`)
2. Trust Strip (`#features`)
3. Problem (`#problem`)
4. Solution (`#solution`)
5. Acquisition Cost (`#acquisition`)
6. Medicine Search (`#search`)
7. Emergency Mode (`#emergency`)
8. Nearby Hospitals (`#hospitals`)
9. MediFast AI (`#medifast-ai`)
10. CareLink (`#carelink`)
11. Management (`#management`)
12. Ordering (`#ordering`)
13. Pharmacy Owner (`#for-pharmacies`)
14. Admin (`#business`)
15. Business Model (`#business-model`)
16. Cross-Platform Download (`#download`)
17. How It Works (`#how-it-works`)
18. Core Features (`#core-features`)
19. What Makes Different (`#different`)
20. About (`#about`)
21. App Preview (`#app-preview`)
22. Demo Video (`#demo`)
23. Trust & Security (`#trust`)
24. Final CTA (`#web-app`)
