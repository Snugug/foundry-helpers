import { MODULE } from './lib/constants.js';
import {
  applyCondition,
  conditionRegister,
  toggleTieredCondition,
  removeTieredCondition,
  resetTieredCondition,
} from './lib/cub/apply-condition.js';

export class SnugugsLittleHelpers {
  static applyCondition = applyCondition;
  static removeTieredCondition = removeTieredCondition;
  static resetTieredCondition = resetTieredCondition;

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
      toggleTieredCondition(condition, true);
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
    toggleTieredCondition(condition, false);
  } else {
    console.log('Not a condition');
  }
});
