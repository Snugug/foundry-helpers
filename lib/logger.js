import { MODULE } from './constants.js';

export const log = {
  info: (...args) => console.log(`${MODULE.ID} | `, ...args),
  warn: (...args) => console.warn(`${MODULE.ID} | `, ...args),
  error: (...args) => console.error(`${MODULE.ID} | `, ...args),
};
