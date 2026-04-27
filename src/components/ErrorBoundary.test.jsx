import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ErrorBoundary from './ErrorBoundary.jsx';

vi.mock('../utils/logger.js', () => ({
  default: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    generateCorrelationId: vi.fn(() => 'test-correlation-id'),
  },
}));

function ProblemChild() {
  throw new Error('Test rendering error');
}

function GoodChild() {
  return <div data-testid="good-child">Hello, World!</div>;
}

describe('ErrorBoundary', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    vi.restoreAllMocks();
  });

  describe('Rendering children normally', () => {
    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <GoodChild />
        </ErrorBoundary>,
      );

      expect(screen.getByTestId('good-child')).toBeInTheDocument();
      expect(screen.getByText('Hello, World!')).toBeInTheDocument();
    });

    it('does not display error UI when no error occurs', () => {
      render(
        <ErrorBoundary>
          <GoodChild />
        </ErrorBoundary>,
      );

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    });

    it('renders multiple children without error', () => {
      render(
        <ErrorBoundary>
          <div data-testid="child-1">First</div>
          <div data-testid="child-2">Second</div>
        </ErrorBoundary>,
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });

  describe('Error display', () => {
    it('displays the default error message when a child throws', () => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Unable to load menu. Please try again.')).toBeInTheDocument();
    });

    it('displays a custom error message when provided', () => {
      render(
        <ErrorBoundary message="Something went wrong!">
          <ProblemChild />
        </ErrorBoundary>,
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    });

    it('renders the Try Again button when an error occurs', () => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      expect(retryButton).toBeInTheDocument();
    });

    it('renders custom fallback when provided', () => {
      const fallback = <div data-testid="custom-fallback">Custom error UI</div>;

      render(
        <ErrorBoundary fallback={fallback}>
          <ProblemChild />
        </ErrorBoundary>,
      );

      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
      expect(screen.getByText('Custom error UI')).toBeInTheDocument();
      expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    });

    it('does not render children when an error has been caught', () => {
      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );

      expect(screen.queryByTestId('good-child')).not.toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('Error logging', () => {
    it('logs the error via logger when a child throws', async () => {
      const logger = (await import('../utils/logger.js')).default;

      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );

      expect(logger.error).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        'ErrorBoundary caught a rendering error.',
        expect.any(Error),
      );
    });

    it('logs the component stack trace when available', async () => {
      const logger = (await import('../utils/logger.js')).default;

      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );

      // componentDidCatch is called with error and errorInfo containing componentStack
      const errorCalls = logger.error.mock.calls;
      const stackCall = errorCalls.find(
        (call) => call[0] === 'Component stack trace.',
      );
      expect(stackCall).toBeDefined();
      expect(stackCall[1]).toHaveProperty('componentStack');
    });
  });

  describe('Retry button resets error state', () => {
    it('resets error state and re-renders children when Try Again is clicked', async () => {
      const user = userEvent.setup();
      let shouldThrow = true;

      function ConditionalChild() {
        if (shouldThrow) {
          throw new Error('Conditional error');
        }
        return <div data-testid="recovered-child">Recovered!</div>;
      }

      render(
        <ErrorBoundary>
          <ConditionalChild />
        </ErrorBoundary>,
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Unable to load menu. Please try again.')).toBeInTheDocument();

      // Fix the error condition before retrying
      shouldThrow = false;

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      await user.click(retryButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
      expect(screen.getByTestId('recovered-child')).toBeInTheDocument();
      expect(screen.getByText('Recovered!')).toBeInTheDocument();
    });

    it('shows error again if child still throws after retry', async () => {
      const user = userEvent.setup();

      render(
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>,
      );

      expect(screen.getByRole('alert')).toBeInTheDocument();

      const retryButton = screen.getByRole('button', { name: 'Try Again' });
      await user.click(retryButton);

      // ProblemChild always throws, so error should reappear
      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByText('Unable to load menu. Please try again.')).toBeInTheDocument();
    });
  });

  describe('Default props', () => {
    it('has default message prop', () => {
      expect(ErrorBoundary.defaultProps.message).toBe('Unable to load menu. Please try again.');
    });

    it('has default fallback prop as null', () => {
      expect(ErrorBoundary.defaultProps.fallback).toBeNull();
    });
  });
});