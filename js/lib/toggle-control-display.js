export function toggleControlDisplay(hidden) {
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
