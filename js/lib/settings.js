export function registerSettings() {
  game.settings.register(this.ID, 'settings', {
    name: this.i18n('SnugugsLittleHelpers.settings.name'),
    hint: this.i18n('SnugugsLittleHelpers.settings.hint'),
    scope: 'world',
    config: true,
    default: false,
    choices: {
      yes: this.i18n('SnugugsLittleHelpers.settings.true'),
      no: this.i18n('SnugugsLittleHelpers.settings.false'),
    },
    type: String,
  });
}
