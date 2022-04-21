import { FoundryModule } from './FoundryModule.js';
import { ViewMenu } from './lib/ViewMenu.js';
import { toggleControlDisplay } from './lib/toggle-control-display.js';

export class SnugugsLittleHelper extends FoundryModule {
  constructor() {
    const id = 'snugugs-little-helpers';
    super(
      id,
      {
        VIEW: 'control-view-mode',
        HIDDEN: 'control-view-hidden',
      },
      {
        VIEWMENU: `modules/snugugs-little-helpers/templates/view-menu.hbs`,
      },
    );
  }

  async init() {
    game.settings.registerMenu(this.ID, 'viewMenu', {
      name: this.i18n('Snugugs-Little-Helpers.settings.view-menu.name'),
      label: this.i18n('Snugugs-Little-Helpers.settings.view-menu.label'),
      hint: this.i18n('Snugugs-Little-Helpers.settings.view-menu.hint'),
      icon: 'fas fa-sliders-h',
      type: ViewMenu,
      restricted: true,
    });
  }

  ready() {
    toggleControlDisplay();
  }

  managePlayState(userId, action) {
    const view = game.users.get(userId)?.getFlag(this.ID, this.FLAGS.VIEW);
    if (view === undefined) {
      game.users.get(userId)?.setFlag(this.ID, this.FLAGS.VIEW, 'edit');
    }

    if (action === 'toggle') {
      if (view === 'edit') {
        game.users.get(userId)?.setFlag(this.ID, this.FLAGS.VIEW, 'play');
      } else {
        game.users.get(userId)?.setFlag(this.ID, this.FLAGS.VIEW, 'edit');
      }
    }

    if (/^set:(edit|play)$/i.test(action)) {
      game.users.get(userId)?.setFlag(this.ID, this.FLAGS.VIEW, action.replace(/^set:/i, ''));
    }

    return view;
  }

  setupPlayToggle(html) {
    if (game.user.isGM) {
      // find the element which has our logged in user's id
      const loggedInUserListItem = html.find(`[data-user-id="${game.userId}"]`);

      let view = this.managePlayState(game.userId);

      const icons = {
        edit: 'fa-feather-alt',
        play: 'fa-dice-d20',
      };

      document.body.classList.add(`${this.FLAGS.VIEW}:${view}`);

      // insert a button at the end of this element
      loggedInUserListItem.append(`<button type='button' class='play-toggle flex0' title='${this.i18n('Snugugs-Little-Helpers.play-view')}'><i class='fas ${icons[view]} play-toggle--icon'></i></button>`);

      html.on('click', '.play-toggle', (event) => {
        document.body.classList.remove(`${this.FLAGS.VIEW}:${view}`);
        view = this.managePlayState(game.userId, 'toggle');
      });
    }
  }
}

// button: true,
//         onClick: () => {
//           this.log('Snugug View');
//           ui.notifications.info('Snugug View');
//         },
