import { MODULE } from '../../core/constants.js';
import { i18n } from '../../core/helpers.js';
import { CRUD } from '../../core/crud.js';

export const controlController = new CRUD(MODULE.FLAGS.CC, 'Control controller', {
  edit: [],
  play: [],
});

let view;
let editing = false;

export function toggle(hidden) {
  if (!hidden) {
    hidden = game.users.get(game.userId)?.getFlag('snugugs-little-helpers', 'control-view-hidden');
  }

  $('.edit-hidden').removeClass('.edit-hidden');
  $('.play-hidden').removeClass('.play-hidden');

  if (hidden) {
    for (const control of hidden.edit) {
      document.querySelector(control).classList.add('edit-hidden');
    }
    for (const control of hidden.play) {
      document.querySelector(control).classList.add('play-hidden');
    }
  }
}

export function managePlayState(userId, action) {
  let view = game.users.get(userId)?.getFlag(MODULE.ID, MODULE.FLAGS.VIEW);
  if (view === undefined) {
    game.users.get(userId)?.setFlag(MODULE.ID, MODULE.FLAGS.VIEW, 'edit');
  }

  if (action === 'toggle') {
    if (view === 'edit') {
      game.users.get(userId)?.setFlag(MODULE.ID, MODULE.FLAGS.VIEW, 'play');
      view = 'play';
    } else {
      game.users.get(userId)?.setFlag(MODULE.ID, MODULE.FLAGS.VIEW, 'edit');
      view = 'edit';
    }
  }

  if (/^set:(edit|play)$/i.test(action)) {
    game.users.get(userId)?.setFlag(MODULE.ID, MODULE.FLAGS.VIEW, action.replace(/^set:/i, ''));
    view = action.replace(/^set:/i, '');
  }

  return view;
}

export function addToggleClasses() {
  const controls = controlController.get();

  const { edit, play } = controls;

  $('.cc--edit-hidden').removeClass('cc--edit-hidden');
  $('.cc--play-hidden').removeClass('cc--play-hidden');

  if (edit && Array.isArray(edit)) {
    $(edit.join(', ')).addClass(`cc--edit-hidden`);
  }
  if (play && Array.isArray(play)) {
    $(play.join(', ')).addClass(`cc--play-hidden`);
  }

  if (editing) {
    const selected = controls[view].join(', ');
    $(selected).addClass('cc--selected');
  }
}

export function ready() {
  $('#sidebar-tabs .item').on('contextmenu', selectElement);
  $(document).on('contextmenu', '.control-tool, .scene-control', selectElement);

  document.body.classList.add(`${MODULE.FLAGS.VIEW}:${view}`);
  addToggleClasses();
}

function selectElement(e) {
  if (!editing) return;
  // control-tool[data-tool]
  // scene-control[data-control]
  // #sidebar-tabs .item[data-tab]
  const control = e.target.closest('.control-tool, .scene-control, #sidebar-tabs .item');

  if (control) {
    e.stopPropagation();

    control.classList.toggle(`cc--selected`);

    const selected = [...document.querySelectorAll(`.cc--selected`)]
      .map((elem) => {
        if (elem.classList.contains('control-tool')) {
          return `.control-tool[data-tool="${elem.dataset.tool}"]`;
        } else if (elem.classList.contains('scene-control')) {
          return `.scene-control[data-control="${elem.dataset.control}"]`;
        } else if (elem.classList.contains('item')) {
          return `#sidebar-tabs .item[data-tab="${elem.dataset.tab}"]`;
        }
        return false;
      })
      .filter((elem) => elem);

    // const current = JSON.parse(localStorage.getItem(MODULE.FLAGS.CC) || '{"edit":[],"play":[]}');
    // current[view] = selected;
    // localStorage.setItem(MODULE.FLAGS.CC, JSON.stringify(current));

    const current = controlController.get();
    current[view] = selected;
    controlController.set(current);

    // localStorage.setItem('cc-test', JSON.stringify(selected));
  }
}

const icons = {
  edit: 'fa-feather-alt',
  play: 'fa-dice-d20',
  change: 'fa-wrench',
};

const editingHUD = document.createElement('aside');
editingHUD.classList.add('paused', 'cc--toggle__editing');
editingHUD.id = 'pause';
editingHUD.innerHTML = `<img src="modules/snugugs-little-helpers/images/cog.svg"><h3>Toggling <i class="fas" title="${view}"><span>${view}</span></i> Controls</h3>`;

export function setup(html) {
  // find the element which has our logged in user's id
  const loggedInUserListItem = html.find(`[data-user-id="${game.userId}"]`);
  view = managePlayState(game.userId);

  let icon = icons[view];

  // insert a button at the end of this element
  loggedInUserListItem.append(
    `<button type='button' class='cc--toggle flex0' title='${i18n(
      'Snugugs-Little-Helpers.play-view',
    )}'><i class='fas ${icon} cc--toggle__icon'></i></button>`,
  );

  // const toggle = $(loggedInUserListItem).find('.play-toggle .fas');

  html.on('contextmenu', '.cc--toggle', (event) => {
    event.stopPropagation();
    editingHUD.querySelector('i').classList.remove(icons.play, icons.edit);
    editingHUD.querySelector('i').classList.add(icons[view]);
    editingHUD.querySelector('i').title = view;

    document.body.classList.toggle(`${MODULE.FLAGS.VIEW}:select`);

    if (editing) {
      editing = false;
      document.body.classList.add(`${MODULE.FLAGS.VIEW}:${view}`);
      document.body.removeChild(editingHUD);
      $('.cc--selected').removeClass('cc--selected');
      addToggleClasses();
    } else {
      editing = true;
      document.body.classList.remove(`${MODULE.FLAGS.VIEW}:${view}`);
      document.body.appendChild(editingHUD);
      const current = controlController.get();
      const selected = current[view].join(', ');
      $(selected).addClass('cc--selected');
    }
  });

  html.on('click', '.cc--toggle', (event) => {
    if (!editing) {
      document.body.classList.remove(`${MODULE.FLAGS.VIEW}:${view}`);
      view = managePlayState(game.userId, 'toggle');
      document.body.classList.add(`${MODULE.FLAGS.VIEW}:${view}`);
      addToggleClasses();
      icon = icons[view];
    }
  });
}
