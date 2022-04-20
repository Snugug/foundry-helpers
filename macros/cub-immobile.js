const setter = 'Immobile';
const lookups = ['Paralyzed', 'Petrified', 'Stunned', 'Exhaustion 5', 'Grappled', 'Restrained', 'Unconscious'];

const label = args[1].efData.label;
const switcher = args[0];

if (switcher === 'on') {
  await game.cub.addCondition(setter);
} else {
  const conditions = game.cub
    .getConditions()
    .conditions.map((c) => c.name)
    .filter((c) => c !== setter);
  let stillSet = false;

  for (const c of conditions) {
    if (lookups.includes(c)) {
      stillSet = true;
    }
  }

  if (stillSet === false) {
    await game.cub.removeCondition(setter);
  }
}
