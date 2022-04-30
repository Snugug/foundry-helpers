import { MODULE } from './constants.js';

/**
 * Logs out a stack trace
 * @param {boolean} force - Force a stack trace
 */
function trace(force = false) {
  if (force || MODULE.DEBUG) {
    const stack = new Error().stack.replace(/^Error\n/, '');
    console.log(stack);
  }
}

export const log = {
  info: (...args) => {
    console.log(`${MODULE.ID} | `, ...args);
    trace(false);
  },
  warn: (...args) => {
    console.warn(`${MODULE.ID} | `, ...args);
    trace(false);
  },
  error: (...args) => {
    console.error(`${MODULE.ID} | `, ...args);
    trace(false);
  },
};
