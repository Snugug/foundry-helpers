export class MODULE {
  static ID = 'snugugs-little-helpers';

  static FLAGS = {
    CONDITIONS: 'tiered-conditions',
    CC: 'control-controller',
    VIEW: 'cc--view-mode',
  };

  static TEMPLATES = {
    VIEWMENU: `modules/snugugs-little-helpers/templates/view-menu.hbs`,
  };

  static get DEBUG() {
    return game?.modules?.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);
  }
}
