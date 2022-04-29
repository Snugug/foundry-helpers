import { MODULE } from '../constants.js';
import { CRUD } from '../crud.js';

export const conditionRegister = new CRUD(MODULE.FLAGS.CONDITIONS, 'Stacked conditions');

/**
 * @param {string} check - The condition to check
 * @param {boolean} toggle - Whether the condition is being turned on or off
 */
export async function toggleStackedCondition(check, toggle) {
  for (const [condition, registered] of Object.entries(conditionRegister.get())) {
    // Ensure the checked condition is in the register
    if (registered.includes(check)) {
      if (toggle) {
        // If the check is being turned on, apply the dynamic condition
        await game.cub.addCondition(condition);
      } else {
        // Otherwise, check if the dynamic condition should be removed
        let conditions = game.cub.getConditions()?.conditions;

        // Conditions will be an object if there's only one, and an array if there are are multiple. This ensures we have a consistent data structure to work from
        if (!Array.isArray(conditions)) {
          conditions = [conditions];
        }

        // If there are conditions, check if the dynamic condition is still set
        if (conditions.length) {
          let filtered = conditions.map((c) => c?.name).filter((c) => c !== condition);

          let stillSet = false;

          for (const c of filtered) {
            if (registered.includes(c)) {
              stillSet = true;
              break;
            }
          }

          // If there are no register conditions still set, remove the dynamic condition
          if (stillSet === false) {
            await game.cub.removeCondition(condition);
          }
        }
      }
    }
  }
}

/**
 * Applies, or removes, a condition when another condition is set
 * @param {string} condition - A condition to dynamically apply
 * @returns {object}
 */
export function applyCondition(condition) {
  return {
    /**
     *
     * @param {string[]} r - Array of conditions to apply the primary condition to
     * @returns {Promise<null>}
     */
    to(r) {
      conditionRegister.add(condition, r);
    },
  };
}

/**
 * Removes stacked condition from the register
 * @param {string} condition - The condition to remove
 */
export function removeStackedCondition(condition) {
  delete conditionRegister.remove(condition);
}

/**
 * Removes all stacked conditions from the register
 */
export function resetStackedConditions() {
  conditionRegister.reset();
}
