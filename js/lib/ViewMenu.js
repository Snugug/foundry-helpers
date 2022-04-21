import { getControls } from './get-controls.js';
import { toggleControlDisplay } from './toggle-control-display.js';

export class ViewMenu extends FormApplication {
  constructor(object, options) {
    super(object, options);
  }

  static get defaultOptions() {
    const defaults = super.defaultOptions;

    const overrides = {
      height: 'auto',
      id: 'view-mode',
      template: 'modules/snugugs-little-helpers/templates/view-menu.hbs',
      title: 'Control and Tool Visibility',
      userId: game.userId,
    };

    const mergedOptions = foundry.utils.mergeObject(defaults, overrides);

    return mergedOptions;
  }

  getData() {
    const controls = getControls();

    return {
      controls,
    };
  }

  activateListeners(html) {
    const sceneControls = html.find('[value*=".scene-control"');
    sceneControls.on('change', (e) => {
      const children = $(e.target).closest('._s-view-menu--list-item').find('._s-view-menu--list');
      children.find('._s-form-group--checkbox').prop('disabled', !e.target.checked);
    });

    const tabs = new Tabs({
      navSelector: '.tabs',
      contentSelector: '.content',
      initial: 'tab1',
      callback() {
        tabs.activate(tabs.active);
      },
    });
    tabs.bind(html.get()[0]);

    const reset = html.find('[name="reset"]');
    reset.on('click', (e) => {
      e.preventDefault();
      html.find('[type="checkbox"]').prop('checked', true);
    });
  }

  async _updateObject(event, formData) {
    const editControls = formData['edit-controls'].filter((c) => c);
    const editDefault = formData['edit-default'].filter((c) => c);
    const playControls = formData['play-controls'].filter((c) => c);
    const playDefault = formData['play-default'].filter((c) => c);

    const hidden = {
      edit: editDefault.filter((c) => !editControls.includes(c)),
      play: playDefault.filter((c) => !playControls.includes(c)),
    };

    // Save hidden!
    game.users.get(game.userId)?.setFlag('snugugs-little-helpers', 'control-view-hidden', hidden);
    toggleControlDisplay(hidden);
  }
}
