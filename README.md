# Snugug's Little Helpers

A collection of Foundry VTT helpers.

## Tiered Difficulty Check

Tiered Difficulty Check is a macro for use with [Monk's Active Tile Triggers](https://foundryvtt.com/packages/monks-active-tiles) and [Monk's TokenBar](https://foundryvtt.com/packages/monks-tokenbar). It allows you to request a roll from your players and then, instead of setting a single DC, you run the macro to check a range of DCs, and then take action based on the results. This macro must be imported into your world in order to use.

![Screenshot of the configured macro action and tile with anchors](https://user-images.githubusercontent.com/377188/164716747-bb4c628e-456d-4c52-8050-3f96f33a69a1.png)

To set it up, start by including a `Request Roll` action. The only required settings for it are `Continue with: All Tokens` and `Continue if: Always`. This will ensure that the rolls are made and then get passed onto the macro.

Next, add a `Run Macro` action, setting it to `Tiered Difficulty Check`. If you don't see the macro in the dropdowns, make sure you import it from the module. Then, pass in the checks you want in `Args`. Each check should be space separated, with no space inside them. Check options are:

- `x` - An exact match of for `x`
- `x-y` - Any number greater than or equal to `x` and less than or equal to `y`
- `>x` - Any number greater than `x`
- `>=x` - Any number greater than or equal to `x`
- `<x` - Any number less than `x`
- `<=x` - Any number less than or equal to `x`
- `crit-success`, `crit`, `critical`, `critical-success` - A roll of the highest dice face, regardless of total (for instance, rolling a 20 on a d20)
- - `crit-fail`, `crit-failure`, `critical-fail`, `critical-failure`, `fumble` - A roll of the lowest dice face, regardless of roll total (for instance, rolling a 1 on a d20)

If a token matches one of these options, they'll be added to a group. Tokens that match multiple options will be placed into multiple groups. For instance, if you passed in `>=18 >15 10-15 crit fumble` into `Args`, a token that rolled a 20 on a d20 will be placed into the `>=18` group, the `>15` group, and the `crit` group, a token that had a total of an 11 will be placed into the `10-15` group, and a token that rolled a 1 on a d20 will be placed into the `fumble` group.

With the tokens grouped, you can now set up a `Anchor` actions for each group. The anchor will be named `check {{option}}` with `{{option}}` being the option, the previous arguments would create anchors `check >=18`, `check >15`, `check 10-15`, `check crit`, and `check fumble`.

With your anchors created, it's time to add the actions in that you'd like to happen for each anchor!

## Stacked Conditions

Stacked Conditions provides you with the ability to automatically apply a condition if another has been applied, for instance adding the `Incapacitated` condition to a token that is `Unconscious`. It requires [Combat Utility Belt](https://foundryvtt.com/packages/combat-utility-belt/) and [Dynamic Active Effects](https://foundryvtt.com/packages/dae). Use this to show players all of their stacked conditions, and allows you to write a condition's active effects once and reuse it.

To set up stacked conditions, create a script macro with the following in it:

```js
game.SnugugsLittleHelpers
  // The condition you want to apply
  .applyCondition('Incapacitated')
  // The list of conditions that should get this condition
  .to(['Paralyzed', 'Petrified', 'Stunned', 'Unconscious']);
```

Each condition must match the name of a condition in Combat Utility Belt's Condition Lab. You can have multiple copies of this in your marco, each with a different condition to apply. Execute the macro to add your mappings and save them for future use.

To remove a mapping, at the bottom of your macro, write `game.SnugugsLittleHelpers.removeStackedCondition('Condition')` with the condition you want to remove and execute it. To reset all mappings, write `game.SnugugsLittleHelpers.resetStackedConditions()` and execute it, or use the `Reset Stacked Conditions` macro that comes with this module.

**Bonus:** The `exports` folder of this module contains `cub-dnd5e-condition-map.json`, a set of D&D 5e conditions pre-configured with [Midi QoL](https://foundryvtt.com/packages/midi-qol) effects, including an `Immobile` condition. There is also an `Add Stacked Conditions` macro that comes with this module that you can run to add mappings for `Incapacitated` and `Immobile` based on the D&D 5e rules.

## Add Moulinette Sources

Add Moulinette Sources is a macro for use with [Moulinette](https://foundryvtt.com/packages/moulinette-core) and its suite of modules. You should import this module into your world and edit the `sources` array as needed.

When executed, the macro adds the provided sources to Moulinette's index while ensuring there aren't duplicates with existing sources (so can be run multiple times in a row with different sources). Once run, go into Moulinette and run indexing for any of the items you've added.
