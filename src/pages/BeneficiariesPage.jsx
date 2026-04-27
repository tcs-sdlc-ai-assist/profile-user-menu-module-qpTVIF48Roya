import { useMenu } from '../context/MenuContext.jsx';

/**
 * BeneficiariesPage component renders a placeholder beneficiaries page
 * displaying user beneficiary information from the menu context (mock data).
 * Accessible via the /beneficiaries route from the profile dropdown menu.
 *
 * @returns {import('react').ReactElement}
 */
function BeneficiariesPage() {
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
        Beneficiaries
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
              Primary Beneficiary
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              Jane Doe — Spouse (50%)
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
              Secondary Beneficiary
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              James Doe — Child (25%)
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
              Contingent Beneficiary
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              Sarah Doe — Child (25%)
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
              Total Beneficiaries
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              3 beneficiaries designated
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
              Last Updated
            </p>
            <p
              style={{
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-success)',
                lineHeight: 'var(--line-height-normal)',
                margin: 0,
              }}
            >
              Up to date — reviewed on Jan 15, 2024
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
        This is a placeholder beneficiaries page displaying mock data.
      </p>
    </div>
  );
}

BeneficiariesPage.displayName = 'BeneficiariesPage';

export { BeneficiariesPage };
export default BeneficiariesPage;