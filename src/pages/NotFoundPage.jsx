import { Link } from 'react-router-dom';
import { ROUTES } from '../constants.js';

/**
 * NotFoundPage component renders a 404 error page for unmatched routes.
 * Provides a link back to the accounts/home page.
 * Implements FR-006 unauthorized access handling for unknown routes.
 *
 * @returns {import('react').ReactElement}
 */
function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 'var(--spacing-4)',
        fontFamily: 'var(--font-family-sans)',
        backgroundColor: 'var(--color-bg-secondary)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '28rem',
          backgroundColor: 'var(--color-bg-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--spacing-8)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-tight)',
            margin: 0,
            marginBottom: 'var(--spacing-2)',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-tight)',
            margin: 0,
            marginBottom: 'var(--spacing-4)',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--line-height-normal)',
            margin: 0,
            marginBottom: 'var(--spacing-6)',
          }}
        >
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to={ROUTES.HOME}
          style={{
            display: 'inline-block',
            padding: 'var(--spacing-3) var(--spacing-6)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 'var(--font-weight-semibold)',
            lineHeight: 'var(--line-height-normal)',
            color: 'var(--color-text-inverse)',
            backgroundColor: 'var(--color-primary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            transition: 'background-color var(--transition-fast)',
          }}
        >
          Back to Accounts
        </Link>
      </div>
    </div>
  );
}

NotFoundPage.displayName = 'NotFoundPage';

export { NotFoundPage };
export default NotFoundPage;