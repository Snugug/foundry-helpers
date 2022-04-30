import { MODULE } from './lib/core/constants.js';
import { log } from './lib/core/logger.js';
import {
  applyCondition,
  conditionRegister,
  toggleStackedCondition,
  removeStackedCondition,
  resetStackedConditions,
} from './lib/modules/cub/stacked-conditions.js';
import {
  setup as setupControlController,
  addToggleClasses as controlControllers,
  controlController,
  ready as controlControllerReady,
} from './lib/modules/control-controller/control-display.js';

export class SnugugsLittleHelpers extends MODULE {
  static applyCondition = applyCondition;
  static removeStackedCondition = removeStackedCondition;
  static resetStackedConditions = resetStackedConditions;
  static log = log;

  static async init() {
    game.SnugugsLittleHelpers = this;
  }

  static async ready() {
    // Get registered conditions
    if (game.user.isGM) {
      const existingConditions = game.user?.getFlag(this.ID, this.FLAGS.CONDITIONS);
      const existingControlledControls = game.user?.getFlag(this.ID, this.FLAGS.CC);

      if (existingConditions) {
        conditionRegister.set(existingConditions);
      }
      if (existingControlledControls) {
        controlController.set(existingControlledControls);
      }

      controlControllerReady();
    }
  }
}

Hooks.on('init', () => {
  SnugugsLittleHelpers.init();
});

Hooks.on('ready', () => {
  SnugugsLittleHelpers.ready();
});

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(SnugugsLittleHelpers.ID);
});

Hooks.on('renderPlayerList', (playerList, html) => setupControlController(html));

Hooks.on('renderSceneControls', (sceneControl, html) => {
  controlControllers(html);
});

Hooks.on('createActiveEffect', (args) => {
  if (args.data) {
    const isCondition = args.data?.flags?.['combat-utility-belt']?.conditionId;

    if (isCondition) {
      const condition = args.data.label;
      SnugugsLittleHelpers.log.info('Adding ' + condition);
      toggleStackedCondition(condition, true);
    } else {
      SnugugsLittleHelpers.log.info('Not a condition');
    }
  }
});

Hooks.on('deleteActiveEffect', (args) => {
  const isCondition = args.data?.flags?.['combat-utility-belt']?.conditionId;

  if (isCondition) {
    const condition = args.data.label;
    SnugugsLittleHelpers.log.info('Removing ' + condition);
    toggleStackedCondition(condition, false);
  } else {
    SnugugsLittleHelpers.log.info('Not a condition');
  }
});
