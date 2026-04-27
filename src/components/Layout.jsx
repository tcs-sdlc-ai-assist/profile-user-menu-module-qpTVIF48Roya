import { Outlet } from 'react-router-dom';
import { MenuContextProvider } from '../context/MenuContext.jsx';
import NavigationBar from './NavigationBar.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

/**
 * Layout component that wraps page content with the NavigationBar at the top
 * and an ErrorBoundary around the content area. Uses React Router Outlet for
 * nested route rendering. Wrapped in MenuContextProvider to provide menu state
 * to all descendant components.
 *
 * @returns {import('react').ReactElement}
 */
function Layout() {
  return (
    <MenuContextProvider>
      <NavigationBar />
      <main
        style={{
          flex: 1,
          maxWidth: 'var(--max-content-width)',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--spacing-4)',
        }}
      >
        <ErrorBoundary message="Unable to load page content. Please try again.">
          <Outlet />
        </ErrorBoundary>
      </main>
    </MenuContextProvider>
  );
}

Layout.displayName = 'Layout';

export { Layout };
export default Layout;