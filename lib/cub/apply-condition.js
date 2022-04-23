/**
 * Applies, or removes, a condition when another condition is set
 * @param {string} condition - A condition to dynamically apply
 * @returns {object}
 */
export function applyCondition(condition) {
  let register = [];
  return {
    /**
     *
     * @param {string[]} r - Array of conditions to apply the primary condition to
     * @returns {Promise<null>}
     */
    to(r) {
      register = r;

      /**
       * @param {string} check - The condition to check
       * @param {string} toggle - Whether the condition is being turned on or off
       */
      return async function conditionTest(check, toggle) {
        // Ensure the checked condition is in the register
        if (register.includes(check)) {
          if (toggle === 'on') {
            // If the check is being turned on, apply the dynamic condition
            await game.cub.addCondition(condition);
          } else {
            // Otherwise, check if the dynamic condition should be removed
            let conditions = game.cub.getConditions()?.conditions;

            // Conditions will be an object if there's only one, and an array if there are are multiple. This ensures we have a consistent data structure to work from
            if (!Array.isArray(conditions)) {
              conditions = [conditions];
            }

            console.log(conditions);

            // If there are conditions, check if the dynamic condition is still set
            if (conditions.length) {
              let filtered = conditions.map((c) => c.name).filter((c) => c !== condition);

              let stillSet = false;

              for (const c of filtered) {
                if (register.includes(c)) {
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
      };
    },
  };
}
