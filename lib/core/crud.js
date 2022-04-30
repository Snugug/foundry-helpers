import { MODULE } from './constants.js';
import { log } from './logger.js';

/**
 * CRUD for objects. Objects are good.
 */
export class CRUD {
  constructor(flag, name, init = {}) {
    this._flag = flag;
    this._name = name;
    this._register = init;

    Hooks.on('ready', () => {
      const data = game.user?.getFlag(MODULE.ID, this._flag);
      if (MODULE.DEBUG) {
        log.info('Initial data');
        log.info(data);
      }

      if (data) {
        this._register = data;
      }
    });
  }

  get() {
    return this._register;
  }

  set(r) {
    this._register = r;
    this.save(this._register);
  }

  add(c, r) {
    this._register[c] = r;
    this.save(this._register);
  }

  remove(c) {
    delete this._register[c];
    this.save(this._register);
  }

  reset() {
    this._register = {};
    this.save(this._register);
  }

  save(args = this._register, overwrite = true, gmOnly = false) {
    const save = gmOnly && !game.user.isGM ? false : true;
    if (MODULE.DEBUG) {
      log.info(this._flag);
      log.info(`Save: ${save}`);
      log.info(`GM: ${game.user.isGM}`);
      log.info(`GM Only: ${gmOnly}`);
      log.info(`Overwrite: ${overwrite}`);
      log.info(args);
    }

    if (save) {
      if (overwrite) {
        game.user?.unsetFlag(MODULE.ID, this._flag);
      }
      game.user?.setFlag(MODULE.ID, this._flag, args);
      log.info(`${this._name} updated`);
    }
  }
}
