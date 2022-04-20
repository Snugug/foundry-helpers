/**
 * Checks if the provided door is open
 * @param {string} door - The door to check
 * @param {string} anchor - The anchor to goto
 */

const anchor = arguments[0].args[1] || 'open';
const door = canvas.walls.doors.find((d) => d.id === arguments[0].args[0]);

if (door.isOpen) {
  const goto = [
    {
      tokens: arguments[0].value.tokens,
      tag: `anchor-${anchor}`,
    },
  ];

  return { goto };
}
