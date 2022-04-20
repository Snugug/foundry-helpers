if (game.moulinette) {
  // Possible sources:
  // User Data => data
  // Core Data => public
  // The Bazaar => forge-bazaar
  // My Asset Library => forgevtt

  const sources = [
    { type: 'images', publisher: 'Systems', pack: 'DnD 5e Icons', source: 'data', path: 'systems/dnd5e/icons' },
    { type: 'images', publisher: 'Imported', pack: 'D&D Beyond', source: 'forgevtt', path: 'DnDBeyond/images' },
    { type: 'images', publisher: 'Imported', pack: 'D&D Beyond', source: 'forgevtt', path: 'ddb-images' },
    { type: 'images', publisher: 'Bazaar', pack: 'Combat Utility Belt', source: 'forge-bazaar', path: 'modules/combat-utility-belt/icons' },
    { type: 'images', publisher: 'Caeora', pack: 'Assets', source: 'forgevtt', path: 'modules/caeora-patreon-maps-tokens-assets/Assets' },
    { type: 'images', publisher: 'Caeora', pack: 'Tokens', source: 'forgevtt', path: 'modules/caeora-patreon-maps-tokens-assets/Tokens' },
    { type: 'images', publisher: 'Caeora', pack: 'Maps', source: 'forgevtt', path: 'modules/caeora-patreon-maps-tokens-assets/Maps' },
  ];

  const customSources = sources.map((s) => s.path);
  game.moulinette.sources = game.moulinette.sources.filter((s) => !customSources.includes(s.path));

  game.moulinette.sources = game.moulinette.sources.concat(sources).flat();
  ui.notifications.info('Sources added!');
}
