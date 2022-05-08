import { MODULE } from './lib/core/constants.js';
import { log } from './lib/core/logger.js';
import {
  applyCondition,
  toggleStackedCondition,
  removeStackedCondition,
  resetStackedConditions,
} from './lib/modules/cub/stacked-conditions.js';
import {
  setup as setupControlController,
  addToggleClasses as controlControllers,
  ready as controlControllerReady,
} from './lib/modules/control-controller/control-display.js';
import { SpellSchoolDialog } from './lib/modules/ase/setup-detect-magic.js';

export class SnugugsLittleHelpers extends MODULE {
  static applyCondition = applyCondition;
  static removeStackedCondition = removeStackedCondition;
  static resetStackedConditions = resetStackedConditions;
  static log = log;

  static api = {
    spellSchoolDialog: new SpellSchoolDialog(),
    getTiles() {
      const layer = canvas.activeLayer;
      function getChildren(child, i = []) {
        if (child.children && child.children.length > 0) {
          for (const c of child.children) {
            const baby = getChildren(c, i);
            i.push(c);
            i = i.concat(baby);
          }
        } else {
          return child;
        }

        return i;
      }
      const tiles = getChildren(layer).filter((c) => c.constructor.name === 'Tile');
      return tiles;
    },
  };

  static async init() {
    game.SnugugsLittleHelpers = this;
  }

  static async ready() {
    // Get registered conditions
    if (game.user.isGM) {
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

// Add ASE Detection tags to tokens when they're created
Hooks.on('createToken', (token) => {
  if (Tagger) {
    const evil = ['Aberration', 'Fiend', 'Undead'];
    const good = ['Celestial', 'Elemental', 'Fey'];
    const all = good.concat(evil).flat();

    let type = token?.data?.document?._actor?.labels?.creatureType;

    let found = false;
    if (!all.includes(type)) {
      for (const g of good) {
        if (type.includes(g)) {
          type = g;
          found = true;
          break;
        }
      }
      if (!found) {
        for (const e of evil) {
          if (type.includes(e)) {
            type = e;
            found = true;
            break;
          }
        }
      }
    }

    if (all.includes(type)) {
      const alignment =
        token?.data?.document?._actor?.data?.data?.details?.alignment?.toLowerCase();

      if (alignment.includes('evil')) {
        Tagger.addTags(token, ['ase-detect', 'evil']);
      } else if (alignment.includes('good')) {
        Tagger.addTags(token, ['ase-detect', 'good']);
      } else if (evil.includes(type)) {
        Tagger.addTags(token, ['ase-detect', 'evil']);
      } else if (good.includes(type)) {
        Tagger.addTags(token, ['ase-detect', 'good']);
      }
    }
  }
});
