export class MODULE {
  static ID = 'snugugs-little-helpers';

  static FLAGS = {
    CONDITIONS: 'tiered-conditions',
  };

  static get DEBUG() {
    return game?.modules?.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);
  }
}
