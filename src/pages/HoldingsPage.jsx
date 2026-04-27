import { useMenu } from '../context/MenuContext.jsx';

/**
 * HoldingsPage component renders a placeholder holdings page
 * displaying user holdings information from the menu context (mock data).
 * Accessible via the /holdings route from the top navigation bar.
 *
 * @returns {import('react').ReactElement}
 */
function HoldingsPage() {
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
        Holdings
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
              US Equities
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              AAPL — 50 shares — $8,750.00
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
              Index Funds
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              VTI — 120 shares — $28,440.00
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
              Bonds
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              BND — 200 shares — $15,320.00
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
              Cash & Equivalents
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              $35,024.21
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
              Total Holdings Value
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-success)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              $87,534.21
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
        This is a placeholder holdings page displaying mock data.
      </p>
    </div>
  );
}

HoldingsPage.displayName = 'HoldingsPage';

export { HoldingsPage };
export default HoldingsPage;