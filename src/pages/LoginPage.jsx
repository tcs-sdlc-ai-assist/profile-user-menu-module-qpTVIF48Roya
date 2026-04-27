import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth.js';
import { ROUTES } from '../constants.js';
import logger from '../utils/logger.js';

/**
 * LoginPage component renders a simple mock login form.
 * On submit, calls auth.login() to store session data in storage
 * and redirects the user to the main application home route.
 * Serves as the redirect target for unauthorized access and logout.
 *
 * @returns {import('react').ReactElement}
 */
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback((event) => {
    setPassword(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setError(null);
      setLoading(true);

      try {
        if (!email.trim() || !password.trim()) {
          setError('Please enter both email and password.');
          setLoading(false);
          return;
        }

        const success = login();

        if (success) {
          logger.info('User logged in successfully. Redirecting to home.');
          navigate(ROUTES.HOME, { replace: true });
        } else {
          setError('Login failed. Please try again.');
          logger.error('Login failed. auth.login() returned false.');
          setLoading(false);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setError(message);
        logger.error('Login error.', err);
        setLoading(false);
      }
    },
    [email, password, navigate],
  );

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
          maxWidth: '24rem',
          backgroundColor: 'var(--color-bg-primary)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          padding: 'var(--spacing-8)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
            textAlign: 'center',
            marginBottom: 'var(--spacing-2)',
            lineHeight: 'var(--line-height-tight)',
          }}
        >
          Invest Portal
        </h1>
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            textAlign: 'center',
            marginBottom: 'var(--spacing-6)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          Sign in to your account
        </p>

        {error && (
          <div
            role="alert"
            style={{
              padding: 'var(--spacing-3) var(--spacing-4)',
              backgroundColor: 'var(--color-error-light)',
              border: '1px solid var(--color-error)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-error)',
              fontSize: 'var(--font-size-sm)',
              lineHeight: 'var(--line-height-normal)',
              marginBottom: 'var(--spacing-4)',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 'var(--spacing-4)' }}>
            <label
              htmlFor="login-email"
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-1)',
                lineHeight: 'var(--line-height-normal)',
              }}
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="john.doe@example.com"
              autoComplete="email"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)',
              }}
            />
          </div>

          <div style={{ marginBottom: 'var(--spacing-6)' }}>
            <label
              htmlFor="login-password"
              style={{
                display: 'block',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-1)',
                lineHeight: 'var(--line-height-normal)',
              }}
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: 'var(--spacing-2) var(--spacing-3)',
                fontSize: 'var(--font-size-sm)',
                lineHeight: 'var(--line-height-normal)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-primary)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                transition: 'border-color var(--transition-fast)',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 'var(--spacing-3) var(--spacing-4)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: 'var(--line-height-normal)',
              color: 'var(--color-text-inverse)',
              backgroundColor: loading ? 'var(--color-gray-400)' : 'var(--color-primary)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            textAlign: 'center',
            marginTop: 'var(--spacing-4)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          Use any email and password to sign in with mock credentials.
        </p>
      </div>
    </div>
  );
}

LoginPage.displayName = 'LoginPage';

export { LoginPage };
export default LoginPage;