# Changelog

All notable changes to the Invest Portal User Menu project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-01

### Added

- **Top Navigation Bar** — Sticky header with primary navigation items (Accounts, Holdings, Activity, Documents, Products & Services) using React Router NavLink with active state highlighting and `aria-current="page"` support.
- **Profile Dropdown Menu** — Desktop dropdown panel triggered by a profile icon button in the navigation bar, displaying user name, menu items with icons, and a logout action. Renders with `role="menu"` and `aria-label="User menu"` for screen reader accessibility.
- **Responsive Slide-In Panel** — On viewports 768px and below, the profile menu renders as a slide-in panel from the right with a semi-transparent overlay and a close button, with `document.body` scroll lock while open.
- **Keyboard Navigation** — Full keyboard support for the profile menu including ArrowUp/ArrowDown to move focus between items, Home/End to jump to first/last item, Enter/Space to select, Escape to close, and Tab to dismiss. Focus wraps cyclically through menu items.
- **Touch Accessibility** — Tap-friendly touch targets with `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation` on interactive elements for mobile usability.
- **Click Outside to Close** — Custom `useClickOutside` hook that listens for `mousedown` and `touchstart` events outside the menu container to automatically close the profile menu.
- **Error Boundary** — `ErrorBoundary` class component wrapping page content and the profile menu, catching rendering errors and displaying a user-friendly error message with a "Try Again" button to reset state. Logs errors via the structured logger.
- **Mock Authentication** — Simulated login/logout flow using `localStorage` (with `sessionStorage` fallback) to store mock user and session data. Includes `isAuthenticated`, `login`, `logout`, `getCurrentUser`, and `getSession` utility functions.
- **Route Guards** — `ProtectedRoute` component that checks authentication status before rendering child routes, redirecting unauthenticated users to the login page at `/login`.
- **Menu Context** — `MenuContextProvider` using React Context to manage menu open/close state, menu items, loading/error states, user session data, and logout handling. Exposes a `useMenu` custom hook with a guard that throws if used outside the provider.
- **Menu Items with Icons** — `MenuItem` component using `react-router-dom` `NavLink` with forwarded refs, icon rendering via `lucide-react` (User, Mail, Lock, Landmark, Users, Calculator, LogOut), active/focused state styling, and keyboard event handling.
- **Profile Menu Pages** — Placeholder pages for all profile menu destinations:
  - Profile (`/profile`) — Displays user name, email, and user ID.
  - Communication Preferences (`/comm-preferences`) — Displays notification and statement preferences.
  - Security (`/security`) — Displays password, 2FA, login notification, and trusted device settings.
  - Bank Management (`/bank-management`) — Displays linked bank accounts and verification status.
  - Beneficiaries (`/beneficiaries`) — Displays primary, secondary, and contingent beneficiary designations.
  - Cost Basis (`/cost-basis`) — Displays cost basis method, unrealized/realized gains, and tax lot information.
- **Navigation Pages** — Placeholder pages for all top navigation bar destinations:
  - Accounts (`/accounts`) — Default landing page displaying mock account balances.
  - Holdings (`/holdings`) — Displays mock portfolio holdings by asset class.
  - Activity (`/activity`) — Displays mock recent transactions and activity.
  - Documents (`/documents`) — Displays mock statements, tax documents, and trade confirmations.
  - Products & Services (`/products-services`) — Displays available investment products and services.
- **Login Page** — Mock login form at `/login` accepting any email/password combination, storing session data and redirecting to the home route on success.
- **404 Page** — Catch-all `NotFoundPage` for unmatched routes with a link back to the accounts page.
- **Structured Logger** — Logging utility (`src/utils/logger.js`) with `info`, `warn`, and `error` methods, consistent `[InvestPortal]` prefix, ISO timestamps, and correlation ID generation for log tracing.
- **Storage Utility** — `src/utils/storage.js` with `getItem`, `setItem`, `removeItem`, and `clearAll` functions supporting `localStorage` with `sessionStorage` fallback and JSON serialization.
- **Media Query Hook** — `useMediaQuery` custom hook for responsive behavior detection, used to switch between dropdown and slide-in panel rendering modes.
- **CSS Custom Properties** — Comprehensive design token system in `src/index.css` covering colors (WCAG AA compliant primary palette), spacing scale, typography, border radius, shadows, transitions, z-index layers, and layout constants.
- **CSS Modules** — Scoped component styles using CSS Modules for NavigationBar, ProfileMenu, MenuItem, ErrorBoundary, Layout, LoginPage, and shared page styles.
- **Test Suite** — Unit tests using Vitest and React Testing Library for ErrorBoundary, MenuItem, NavigationBar, ProfileMenu, and MenuContext covering rendering, accessibility attributes, keyboard navigation, click interactions, loading/error states, and logout flow.
- **Vercel Configuration** — `vercel.json` with SPA rewrite rules for client-side routing support.