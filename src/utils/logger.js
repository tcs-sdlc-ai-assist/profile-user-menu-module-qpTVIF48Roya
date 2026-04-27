/**
 * Logging utility for consistent error diagnostics throughout the application.
 * Wraps console calls with structured formatting and correlation support.
 */

const LOG_PREFIX = '[InvestPortal]';

/**
 * Generates a simple correlation ID for log tracing.
 * @returns {string} A unique correlation identifier.
 */
function generateCorrelationId() {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Formats a log message with a consistent prefix and optional context.
 * @param {string} level - The log level (INFO, WARN, ERROR).
 * @param {string} message - The log message.
 * @param {object} [context] - Optional context object for structured logging.
 * @returns {string} The formatted log message.
 */
function formatMessage(level, message, context) {
  const timestamp = new Date().toISOString();
  const correlationId = (context && context.correlationId) || generateCorrelationId();
  return `${LOG_PREFIX} [${level}] [${timestamp}] [${correlationId}] ${message}`;
}

/**
 * Logs an informational message to the console.
 * @param {string} message - The message to log.
 * @param {object} [context] - Optional context data.
 */
export function info(message, context) {
  const formatted = formatMessage('INFO', message, context);
  if (context) {
    console.info(formatted, context);
  } else {
    console.info(formatted);
  }
}

/**
 * Logs a warning message to the console.
 * @param {string} message - The message to log.
 * @param {object} [context] - Optional context data.
 */
export function warn(message, context) {
  const formatted = formatMessage('WARN', message, context);
  if (context) {
    console.warn(formatted, context);
  } else {
    console.warn(formatted);
  }
}

/**
 * Logs an error message to the console.
 * @param {string} message - The message to log.
 * @param {Error|object} [error] - Optional error object or context data.
 */
export function error(message, error) {
  const context = error instanceof Error ? { errorMessage: error.message, stack: error.stack } : error;
  const formatted = formatMessage('ERROR', message, context);
  if (context) {
    console.error(formatted, context);
  } else {
    console.error(formatted);
  }
}

const logger = {
  info,
  warn,
  error,
  generateCorrelationId,
};

export default logger;