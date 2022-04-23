import { applyCondition } from './lib/cub/apply-condition.js';

export class SnugugsLittleHelpers {
  static applyCondition = applyCondition;

  static async init() {
    game.SnugugsLittleHelpers = this;
  }
}

Hooks.on('init', () => {
  SnugugsLittleHelpers.init();
});

// Hooks.on('createActiveEffect', (args) => {
//   if (args.data) {
//     const isCondition = args.data?.flags?.['combat-utility-belt']?.conditionId;

//     if (isCondition) {
//       const condition = args.data.label;
//       console.log('Adding ' + condition);
//     } else {
//       console.log('Not a condition');
//     }
//   }
// });

// Hooks.on('deleteActiveEffect', (args) => {
//   const isCondition = args.data?.flags?.['combat-utility-belt']?.conditionId;

//   if (isCondition) {
//     const condition = args.data.label;
//     console.log('Removing ' + condition);
//   } else {
//     console.log('Not a condition');
//   }
// });
