export function getControls() {
  const sceneControls = new SceneControls();
  const hidden = game.users.get(game.userId)?.getFlag('snugugs-little-helpers', 'control-view-hidden') || {
    edit: [],
    play: [],
  };

  return sceneControls.controls.map((control, i) => {
    control.selector = `#controls .scene-control[data-control="${control.name}"]`;
    control.title = game.i18n.localize(control.title);
    control.checked = {
      edit: !hidden.edit.includes(control.selector),
      play: !hidden.play.includes(control.selector),
    };

    control.tools = control.tools.map((c2) => {
      c2.selector = `#controls > ol:nth-child(${i + 2}) .control-tool[data-tool="${c2.name}"]`;
      c2.title = game.i18n.localize(c2.title);
      c2.checked = {
        edit: !hidden.edit.includes(c2.selector),
        play: !hidden.play.includes(c2.selector),
      };
      return c2;
    });

    return control;
  });
}
