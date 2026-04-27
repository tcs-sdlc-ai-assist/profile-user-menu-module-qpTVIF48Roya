# Deployment

This document describes how to deploy the Invest Portal User Menu application to Vercel and other static hosting environments.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [Vercel Deployment](#vercel-deployment)
  - [Git Integration (Recommended)](#git-integration-recommended)
  - [Vercel CLI](#vercel-cli)
  - [Vercel Project Settings](#vercel-project-settings)
- [SPA Rewrite Configuration](#spa-rewrite-configuration)
- [Environment Variables](#environment-variables)
- [CI/CD via Vercel Git Integration](#cicd-via-vercel-git-integration)
- [Other Static Hosting](#other-static-hosting)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 18+ and npm 9+
- A [Vercel](https://vercel.com) account (for Vercel deployment)
- Git repository hosted on GitHub, GitLab, or Bitbucket (for Vercel Git integration)

## Build Configuration

The project uses Vite as the build tool. The production build is created with:

```bash
npm run build
```

| Setting          | Value          |
| ---------------- | -------------- |
| Build Command    | `npm run build` |
| Output Directory | `dist`         |
| Install Command  | `npm install`  |
| Dev Command      | `npm run dev`  |
| Node Version     | 18.x or later |

The build outputs optimized static files (HTML, CSS, JS) to the `dist/` directory. No server-side rendering is required — the application is a fully client-side single-page application (SPA).

## Vercel Deployment

### Git Integration (Recommended)

The simplest way to deploy is through Vercel's Git integration:

1. Push your code to a Git repository on GitHub, GitLab, or Bitbucket.
2. Log in to [vercel.com](https://vercel.com) and click **Add New Project**.
3. Import your repository from the Git provider.
4. Vercel auto-detects the Vite framework. Confirm the following settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

Vercel will build and deploy the application. A unique URL is assigned to the deployment automatically.

### Vercel CLI

You can also deploy directly from the command line using the Vercel CLI:

```bash
# Install the Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy from the project root
vercel

# Deploy to production
vercel --prod
```

The CLI will prompt you to link the project to your Vercel account and configure the build settings on first run.

### Vercel Project Settings

If you need to configure the project manually in the Vercel dashboard:

1. Go to **Project Settings** → **General**.
2. Set **Framework Preset** to **Vite**.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.
5. Set **Install Command** to `npm install`.
6. Set **Node.js Version** to **18.x**.

## SPA Rewrite Configuration

The project includes a `vercel.json` file at the repository root that configures SPA rewrites for client-side routing:

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

This configuration ensures that all routes (e.g., `/accounts`, `/profile`, `/security`) are served by `index.html`, allowing React Router to handle routing on the client side. Without this rewrite rule, navigating directly to a route or refreshing the page on a non-root route would result in a 404 error.

Vercel automatically reads `vercel.json` from the repository root during deployment — no additional configuration is needed.

## Environment Variables

This application does **not** require any environment variables for deployment. All data is mocked on the client side, and there are no external API endpoints, secrets, or keys to configure.

If you extend the application in the future to connect to real APIs, you would add environment variables in the Vercel dashboard under **Project Settings** → **Environment Variables**. In the application code, access them via `import.meta.env.VITE_*` (Vite requires the `VITE_` prefix for client-exposed variables).

## CI/CD via Vercel Git Integration

When your repository is connected to Vercel via Git integration, the following CI/CD workflow is automatic:

| Trigger                        | Action                                                        |
| ------------------------------ | ------------------------------------------------------------- |
| Push to `main` (or production branch) | Vercel creates a **Production Deployment** at the project's production URL. |
| Push to any other branch       | Vercel creates a **Preview Deployment** with a unique URL.    |
| Pull request opened/updated    | Vercel creates a **Preview Deployment** and posts the URL as a comment on the PR. |

### Build Pipeline

For each deployment, Vercel runs the following steps automatically:

1. **Install** — Runs `npm install` to install dependencies.
2. **Build** — Runs `npm run build` to produce the `dist/` output.
3. **Deploy** — Serves the `dist/` directory with the SPA rewrite rules from `vercel.json`.

### Running Tests Before Deployment

Vercel does not run tests by default. To run the test suite as part of the build, you can modify the build command in the Vercel dashboard or `vercel.json`:

```json
{
  "buildCommand": "npm test && npm run build",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that `npm test` (which runs `vitest run`) passes before the production build is created. If any test fails, the build will fail and the deployment will not proceed.

### Branch Protection

For production deployments, it is recommended to:

1. Set your production branch (e.g., `main`) in **Project Settings** → **Git**.
2. Enable branch protection rules on your Git provider to require passing status checks before merging.
3. Use Vercel's preview deployments to verify changes before merging to the production branch.

## Other Static Hosting

The application can be deployed to any static hosting provider. Run the build and serve the `dist/` directory:

```bash
npm run build
```

### Important: SPA Routing

Ensure your hosting provider rewrites all routes to `index.html`. Without this, direct navigation to routes like `/accounts` or `/profile` will return a 404 error.

**Netlify** — Add a `_redirects` file to the `public/` directory:

```
/*    /index.html   200
```

**Nginx** — Add the following to your server configuration:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache** — Add a `.htaccess` file to the `dist/` directory:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

**GitHub Pages** — GitHub Pages does not natively support SPA rewrites. Use a `404.html` redirect workaround or deploy to a provider that supports rewrites.

## Troubleshooting

### 404 on page refresh

The SPA rewrite rule is not configured correctly. Ensure `vercel.json` is present at the repository root and contains the rewrite rule shown above. For other hosting providers, configure the equivalent rewrite.

### Build fails with missing dependencies

Run `npm install` locally and verify the build succeeds with `npm run build` before deploying. Ensure `package.json` is committed to the repository.

### Blank page after deployment

Open the browser developer console and check for errors. Common causes:

- Asset paths are incorrect — Vite uses relative paths by default, which should work on Vercel.
- JavaScript errors preventing React from rendering — check the console for stack traces.

### Preview deployment URL not working

Verify that the Git integration is properly connected in the Vercel dashboard under **Project Settings** → **Git**. Ensure the repository has granted Vercel the necessary permissions.