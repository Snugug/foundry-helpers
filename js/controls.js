const sceneControls = new SceneControls();

const controls = sceneControls.controls.map((control, i) => {
  control.selector = `#controls .scene-control[data-control="${control.name}"]`;
  controls.tools = controls.tools.map((c2) => {
    c2.selector = `#controls > ol:nth-child(${i + 1}) .control-tool[data-control="${c2.name}"]`;
  });
});

console.log(controls);
