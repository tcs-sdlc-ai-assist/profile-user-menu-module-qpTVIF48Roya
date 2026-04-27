import { useMenu } from '../context/MenuContext.jsx';

/**
 * CostBasisPage component renders a placeholder cost basis page
 * displaying user cost basis information from the menu context (mock data).
 * Accessible via the /cost-basis route from the profile dropdown menu.
 *
 * @returns {import('react').ReactElement}
 */
function CostBasisPage() {
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
        Cost Basis
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
              Default Cost Basis Method
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              First In, First Out (FIFO)
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
              Unrealized Gains
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-success)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              +$12,450.32
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
              Realized Gains (YTD)
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              $3,215.78
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
              Total Cost Basis
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              $87,534.21
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
              Tax Lots
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              24 open tax lots
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
        This is a placeholder cost basis page displaying mock data.
      </p>
    </div>
  );
}

CostBasisPage.displayName = 'CostBasisPage';

export { CostBasisPage };
export default CostBasisPage;