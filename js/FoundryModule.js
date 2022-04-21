export class FoundryModule {
  constructor(name, flags = {}, templates = {}) {
    this._name = name;
    this._flags = flags;
    this._templates = templates;

    // Register the debug flag
    Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
      registerPackageDebugFlag(this._name);
    });
  }

  async run(fn, ...args) {
    return fn.bind(this)(...args);
  }

  i18n(key) {
    return game.i18n.localize(key);
  }

  log(...args) {
    console.log(this._name, '|', ...args);
  }

  error(...args) {
    console.error(this._name, '|', ...args);
  }

  warn(...args) {
    console.warn(this._name, '|', ...args);
  }

  get ID() {
    return this._name;
  }
  get FLAGS() {
    return this._flags;
  }
  get TEMPLATES() {
    return this._templates;
  }
}
