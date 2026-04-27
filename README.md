# Invest Portal User Menu

A responsive investment portal user interface built with React and Vite, featuring a top navigation bar, profile dropdown menu with keyboard navigation, mock authentication, and accessible UI components.

## Tech Stack

- **React 18** — Component-based UI library
- **Vite 5** — Fast build tool and development server
- **React Router 6** — Client-side routing with `BrowserRouter`
- **lucide-react** — Icon library for menu item icons
- **prop-types** — Runtime prop type validation
- **CSS Modules** — Scoped component styling with CSS custom properties
- **Vitest** — Unit testing framework
- **React Testing Library** — Component testing utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Opens the app at [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
```

Outputs optimized static files to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for verification.

### Run Tests

```bash
npm test
```

Runs the full test suite once with Vitest.

```bash
npm run test:watch
```

Runs tests in watch mode for development.

## Folder Structure

```
invest-portal-user-menu/
├── index.html                          # HTML entry point
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
├── vitest.config.js                    # Vitest configuration
├── vitest.setup.js                     # Test setup (jest-dom matchers)
├── vercel.json                         # Vercel SPA rewrite rules
├── src/
│   ├── main.jsx                        # React DOM entry point
│   ├── App.jsx                         # Root component with routing
│   ├── index.css                       # Global styles and CSS custom properties
│   ├── constants.js                    # Route paths, navigation items, menu items, storage keys
│   ├── components/
│   │   ├── ErrorBoundary.jsx           # Error boundary with retry support
│   │   ├── ErrorBoundary.module.css
│   │   ├── ErrorBoundary.test.jsx
│   │   ├── Layout.jsx                  # Page layout with navigation bar and outlet
│   │   ├── Layout.module.css
│   │   ├── MenuItem.jsx                # Individual menu item with icon and NavLink
│   │   ├── MenuItem.module.css
│   │   ├── MenuItem.test.jsx
│   │   ├── NavigationBar.jsx           # Top navigation bar with profile button
│   │   ├── NavigationBar.module.css
│   │   ├── NavigationBar.test.jsx
│   │   ├── ProfileMenu.jsx             # Dropdown/slide-in profile menu
│   │   ├── ProfileMenu.module.css
│   │   ├── ProfileMenu.test.jsx
│   │   └── ProtectedRoute.jsx          # Authentication route guard
│   ├── context/
│   │   ├── MenuContext.jsx             # Menu state provider and useMenu hook
│   │   └── MenuContext.test.jsx
│   ├── data/
│   │   └── mockData.js                # Mock user, session, and menu data
│   ├── hooks/
│   │   ├── useClickOutside.js          # Click outside detection hook
│   │   ├── useKeyboardNavigation.js    # Keyboard navigation hook for menus
│   │   └── useMediaQuery.js            # Responsive media query hook
│   ├── pages/
│   │   ├── AccountsPage.jsx            # Accounts page (default landing)
│   │   ├── ActivityPage.jsx            # Activity/transactions page
│   │   ├── BankManagementPage.jsx      # Bank management page
│   │   ├── BeneficiariesPage.jsx       # Beneficiaries page
│   │   ├── CommunicationPreferencesPage.jsx  # Communication preferences page
│   │   ├── CostBasisPage.jsx           # Cost basis page
│   │   ├── DocumentsPage.jsx           # Documents page
│   │   ├── HoldingsPage.jsx            # Holdings page
│   │   ├── LoginPage.jsx               # Mock login page
│   │   ├── LoginPage.module.css
│   │   ├── NotFoundPage.jsx            # 404 page
│   │   ├── PageStyles.module.css       # Shared page styles
│   │   ├── ProductsServicesPage.jsx    # Products & services page
│   │   ├── ProfilePage.jsx             # User profile page
│   │   └── SecurityPage.jsx            # Security settings page
│   ├── test/
│   │   └── setup.js                    # Test setup file
│   └── utils/
│       ├── auth.js                     # Mock authentication utilities
│       ├── logger.js                   # Structured logging utility
│       └── storage.js                  # localStorage/sessionStorage wrapper
```

## Features

### Top Navigation Bar

- Sticky header with primary navigation items: Accounts, Holdings, Activity, Documents, Products & Services
- Active state highlighting via React Router `NavLink` with `aria-current="page"` support
- Profile icon button with `aria-haspopup` and `aria-expanded` attributes

### Profile Dropdown Menu

- Desktop: dropdown panel positioned below the profile button
- Mobile (≤768px): slide-in panel from the right with semi-transparent overlay
- Displays user name, menu items with icons, and a logout action
- Menu items: Profile, Communication Preferences, Security, Bank Management, Beneficiaries, Cost Basis, Logout

### Keyboard Navigation

- **ArrowDown / ArrowUp** — Move focus between menu items
- **Home / End** — Jump to first or last menu item
- **Enter / Space** — Select the focused menu item
- **Escape** — Close the menu
- **Tab** — Dismiss the menu
- Focus wraps cyclically through all menu items

### Mock Authentication

- Simulated login/logout flow using `localStorage` with `sessionStorage` fallback
- Session data includes token and expiration timestamp
- Protected routes redirect unauthenticated users to `/login`
- Any email/password combination is accepted on the login page

### Error Handling

- `ErrorBoundary` component catches rendering errors and displays a user-friendly message with a retry button
- Structured logger with `[InvestPortal]` prefix, ISO timestamps, and correlation IDs
- Loading and error states for async menu data fetching

### Responsive Design

- Dropdown menu on desktop viewports
- Slide-in panel with overlay on mobile viewports (≤768px)
- Scroll lock on `document.body` when mobile panel is open
- Touch-friendly targets with `-webkit-tap-highlight-color: transparent` and `touch-action: manipulation`

## Accessibility

- ARIA navigation landmark with `aria-label="Primary navigation"`
- Profile menu uses `role="menu"` with `aria-label="User menu"`
- Menu items use `role="menuitem"` with proper `tabIndex` management
- Profile button includes `aria-haspopup="true"` and `aria-expanded` state
- Active navigation items marked with `aria-current="page"`
- Icon elements marked with `aria-hidden="true"`
- Error states use `role="alert"` for screen reader announcements
- Loading states use `role="status"` for screen reader announcements
- Focus-visible outlines on all interactive elements
- Click outside to close via `mousedown` and `touchstart` event listeners
- WCAG AA compliant color palette defined as CSS custom properties

## CSS Custom Properties

The design token system is defined in `src/index.css` and includes:

- **Colors** — Primary palette, neutral grays, semantic colors (success, warning, error, info)
- **Typography** — Font families, sizes, weights, line heights, letter spacing
- **Spacing** — 0–20 scale in rem units
- **Border Radius** — sm, md, lg, xl, full
- **Shadows** — sm, md, lg, xl
- **Transitions** — fast (150ms), base (200ms), slow (300ms)
- **Z-Index** — dropdown (100), sticky (200), overlay (300), modal (400), toast (500)
- **Layout** — Header height (3.5rem), max content width (80rem)

## Deployment

### Vercel

The project includes a `vercel.json` configuration with SPA rewrite rules for client-side routing:

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

Deploy by connecting the repository to Vercel or using the Vercel CLI:

```bash
npx vercel
```

### Static Hosting

Run `npm run build` and serve the `dist/` directory from any static file server. Ensure all routes are rewritten to `index.html` for client-side routing support.

## License

Private