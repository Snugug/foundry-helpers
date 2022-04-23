import { MODULE } from './lib/constants.js';
import {
  applyCondition,
  conditionRegister,
  toggleStackedCondition,
  removeStackedCondition,
  resetStackedConditions,
} from './lib/cub/stacked-conditions.js';

export class SnugugsLittleHelpers {
  static applyCondition = applyCondition;
  static removeStackedCondition = removeStackedCondition;
  static resetStackedConditions = resetStackedConditions;

  static async init() {
    game.SnugugsLittleHelpers = this;
  }

  static async ready() {
    // Get registered conditions
    if (game.user.isGM) {
      const existingConditions = game.user?.getFlag(MODULE.ID, MODULE.FLAGS.CONDITIONS);

      if (existingConditions) {
        conditionRegister.set(existingConditions);
      }
    }
  }
}

Hooks.on('init', () => {
  SnugugsLittleHelpers.init();
});

Hooks.on('ready', () => {
  SnugugsLittleHelpers.ready();
});

Hooks.on('createActiveEffect', (args) => {
  if (args.data) {
    const isCondition = args.data?.flags?.['combat-utility-belt']?.conditionId;

    if (isCondition) {
      const condition = args.data.label;
      console.log('Adding ' + condition);
      toggleStackedCondition(condition, true);
    } else {
      console.log('Not a condition');
    }
  }
});

Hooks.on('deleteActiveEffect', (args) => {
  const isCondition = args.data?.flags?.['combat-utility-belt']?.conditionId;

  if (isCondition) {
    const condition = args.data.label;
    console.log('Removing ' + condition);
    toggleStackedCondition(condition, false);
  } else {
    console.log('Not a condition');
  }
});
