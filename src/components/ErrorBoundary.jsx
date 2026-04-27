import { Component } from 'react';
import PropTypes from 'prop-types';
import logger from '../utils/logger.js';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('ErrorBoundary caught a rendering error.', error);
    if (errorInfo && errorInfo.componentStack) {
      logger.error('Component stack trace.', { componentStack: errorInfo.componentStack });
    }
  }

  handleReset() {
    this.setState({
      hasError: false,
      error: null,
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-6)',
            backgroundColor: 'var(--color-error-light)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-error)',
            color: 'var(--color-error)',
            fontFamily: 'var(--font-family-sans)',
            fontSize: 'var(--font-size-sm)',
            lineHeight: 'var(--line-height-normal)',
            gap: 'var(--spacing-4)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--color-error)',
            }}
          >
            {this.props.message || 'Unable to load menu. Please try again.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-error)',
              color: 'var(--color-text-inverse)',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
              lineHeight: 'var(--line-height-normal)',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  message: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  fallback: null,
  message: 'Unable to load menu. Please try again.',
};

export { ErrorBoundary };
export default ErrorBoundary;