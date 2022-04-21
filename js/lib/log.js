export class Log {
  constructor(name) {
    this.name = name;

    this.debug = this._createLoger('log', 'DEBUG');
    this.log = this._createLoger();
    this.warn = this._createLoger('warn');
    this.error = this._createLoger('error');
  }

  _createLoger(type = 'log', prefix = '') {
    return (...args) => console[type](`${prefix ? prefix + ': ' : ''}${this._name} | `, ...args);
  }
}
