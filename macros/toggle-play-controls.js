/**
 * Toggles controls between a "play" view and a "build" view
 */
window.snugug = window.snugug || {};

if (!window.snugug.style) {
  const style = document.createElement('style');
  style.id = 'snugug-style';

  /**
   * To find these styles, open your Foundry game in Chrome, press F12 to open Chrome Dev Tools, select the control you want to hide (https://developer.chrome.com/docs/devtools/css/reference/#select), (it will be highlighted on the screen, and show up in a nested structure in the inspector), find the nearest parent item that has either "control-tool" or "scene-control" in the "class" attribute, and add a new line with the relevant information here.
   */
  style.innerHTML = `
  #config-presets-open,
  .scene-control[data-control=effects],
  .scene-control[data-control=dungeondraw],
  .control-tool[data-tool=convenient-effects],
  .control-tool[data-tool=remove-convenient-effects],
  .control-tool[data-tool=calendar],
  .control-tool[data-tool=lsnpc-loot-seeder],
  .control-tool[data-tool=togglelootable],
  .control-tool[data-tool=prefabs],
  .control-tool[data-tool=linkEncounter],
  .control-tool[data-tool=TAStartTokenAttach],
  .control-tool[data-tool=TAToggleQuickEdit] {
    display: none !important;
  }`;
  window.snugug.style = style;
}

if (!window.snugug.display) {
  window.snugug.display = 'edit';
}

if (window.snugug.display === 'edit') {
  document.head.appendChild(window.snugug.style);
  window.snugug.display = 'play';
} else {
  document.head.removeChild(window.snugug.style);
  window.snugug.display = 'edit';
}
