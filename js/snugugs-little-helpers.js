import { SnugugsLittleHelper } from './module.js';

const snugugHelpers = new SnugugsLittleHelper();

Hooks.on('init', async () => {
  await snugugHelpers.init();
});

Hooks.on('ready', () => {
  snugugHelpers.ready();
});

Hooks.on('renderPlayerList', (playerList, html) => snugugHelpers.setupPlayToggle(html));
