# MediFastBD Landing Website

A professional, modern, responsive landing page for MediFastBD — a cross-platform digital medicine marketplace and healthcare management platform.

**Tagline:** Find Medicine • Compare • Save Time

## Tech Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JavaScript (IntersectionObserver, no dependencies)

## Structure

```
website/
├── index.html          # Main landing page
├── css/
│   └── style.css       # All styles
├── js/
│   └── script.js       # Animations, nav, config
├── assets/
│   ├── logo/
│   ├── screenshots/    # App screenshot placeholders
│   ├── icons/
│   └── images/
├── favicon/            # Favicon files
├── robots.txt
├── sitemap.xml
└── README.md
```

## Run Locally

No build step required. Open `index.html` in a browser, or use a local server:

```bash
# Using Python
cd website
python -m http.server 8000

# Using Node.js (npx)
npx serve website

# Using PHP
cd website
php -S localhost:8000
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Push the `website/` folder contents to a GitHub repository
2. Go to **Settings > Pages**
3. Set **Source** to "Deploy from a branch"
4. Select your branch and folder (`/website` or `/root`)
5. Save — your site will be live at `https://username.github.io/repo-name/`

## Configuration

All download/app URLs are defined in `js/script.js`:

```javascript
const CONFIG = {
    webAppUrl: "WEB_APP_URL",
    androidUrl: "ANDROID_DOWNLOAD_URL",
    windowsUrl: "WINDOWS_DOWNLOAD_URL",
    githubUrl: "GITHUB_REPOSITORY_URL"
};
```

Replace the placeholder values with your actual URLs. All buttons using `data-config` attributes will update automatically.

## Screenshot Placeholders

Replace placeholder mockups with real screenshots at:

- `assets/screenshots/customer-home.png`
- `assets/screenshots/search.png`
- `assets/screenshots/pharmacy.png`
- `assets/screenshots/emergency.png`
- `assets/screenshots/admin-dashboard.png`
- `assets/screenshots/pharmacy-dashboard.png`

Search for `<!-- Replace the above mockup` comments in `index.html` to find exact locations.

## Logo

Replace the SVG logo in `index.html` and `footer` with your actual logo file in `assets/logo/`.

## Sections Included

1. Sticky responsive navbar
2. Hero section with phone mockup
3. Trust/value strip
4. Problem section
5. Solution section with process flow
6. Real acquisition cost (unique feature)
7. Medicine search with mockup
8. Emergency mode
9. Medicine management
10. Ordering experience
11. Pharmacy owner section with dashboard mockup
12. Admin & business intelligence
13. Business model diagram
14. Cross-platform download cards
15. How it works (4 steps)
16. About section
17. Final CTA
18. Full footer

## License

© 2026 MediFastBD. All rights reserved.
