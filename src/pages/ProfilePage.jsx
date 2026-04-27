import { useMenu } from '../context/MenuContext.jsx';

/**
 * ProfilePage component renders a placeholder profile page displaying
 * user profile information from the menu context (mock data).
 * Accessible via the /profile route from the profile dropdown menu.
 *
 * @returns {import('react').ReactElement}
 */
function ProfilePage() {
  const { user } = useMenu();

  return (
    <div
      style={{
        maxWidth: '40rem',
        margin: '0 auto',
        padding: 'var(--spacing-6)',
      }}
    >
      <h1
        style={{
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--spacing-6)',
          lineHeight: 'var(--line-height-tight)',
        }}
      >
        Profile
      </h1>

      <div
        style={{
          backgroundColor: 'var(--color-bg-primary)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          padding: 'var(--spacing-6)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-4)',
            marginBottom: 'var(--spacing-6)',
            paddingBottom: 'var(--spacing-6)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              fontSize: 'var(--font-size-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              flexShrink: 0,
              textTransform: 'uppercase',
              letterSpacing: 'var(--letter-spacing-wide)',
            }}
            aria-hidden="true"
          >
            {user && user.initials ? user.initials : 'U'}
          </div>
          <div>
            <p
              style={{
                fontSize: 'var(--font-size-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-tight)',
                margin: 0,
              }}
            >
              {user ? user.name : 'User'}
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
                marginTop: 'var(--spacing-1)',
              }}
            >
              {user ? user.email : 'No email available'}
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-4)',
          }}
        >
          <div>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
                marginBottom: 'var(--spacing-1)',
              }}
            >
              Full Name
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              {user ? user.name : '—'}
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
                marginBottom: 'var(--spacing-1)',
              }}
            >
              Email Address
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              {user ? user.email : '—'}
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-wide)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
                marginBottom: 'var(--spacing-1)',
              }}
            >
              User ID
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
                fontFamily: 'var(--font-family-mono)',
              }}
            >
              {user ? user.id : '—'}
            </p>
          </div>
        </div>
      </div>

      <p
        style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginTop: 'var(--spacing-4)',
          lineHeight: 'var(--line-height-normal)',
        }}
      >
        This is a placeholder profile page displaying mock user data.
      </p>
    </div>
  );
}

ProfilePage.displayName = 'ProfilePage';

export { ProfilePage };
export default ProfilePage;