# Fertilizer Connect

A responsive dashboard concept for connecting farmers, government officers, and fertilizer distributors through a transparent token-based distribution workflow.

## Current version

This first version is a browser-ready frontend prototype built with semantic HTML, CSS, and vanilla JavaScript. It includes:

- Government district overview dashboard
- Farmer request table with search
- Token and seasonal stock metrics
- Responsive mobile navigation
- New fertilizer request modal with validation
- Accessible labels, buttons, status messages, and responsive layout

The current data is local demo data. The `.env.example` file reserves the production configuration needed for a PostgreSQL and API migration.

## Run locally

No installation is needed for this frontend version. Open `index.html` directly in a browser, or use the VS Code Live Server extension.

From the project folder, a simple local server can also be started with Python:

```powershell
python -m http.server 5500
```

Then open `http://localhost:5500`.

## Project structure

```text
fertilizer-connect/
├── index.html       # Dashboard markup and accessible content
├── styles.css       # Responsive visual system and layout
├── app.js           # Modal, search, navigation, and form behavior
├── .env.example     # Reserved production environment variables
├── .gitignore       # Git exclusions
└── README.md        # Setup and project notes
```

## Production roadmap

The planned production stack is Next.js, TypeScript, PostgreSQL, Prisma, Auth.js, and Tailwind CSS. The main backend entities should be users, farmer profiles, fertilizer requests, allocation batches, tokens, distribution points, and redemption events. Token approval and redemption must be server-side transactions with audit history; the browser prototype must not be used for real distribution data.

## GitHub

```powershell
git init
git add .
git commit -m "Create Fertilizer Connect dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fertilizer-connect.git
git push -u origin main
```
