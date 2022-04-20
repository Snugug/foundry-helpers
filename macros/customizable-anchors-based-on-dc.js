/**
 * Customizable Anchors Based on DC
 * @param {string[]} options - Arguments to the macro to determine anchors. Allowed values are:
 *   - x - A single number
 *   - x-y - A range where the number is greater to or equal to x and less than y
 *   - <x - Any number less than x
 *   - <=x - Any number less than or equal to x
 *   - >x - Any number greater than x
 *   - >=x - Any number greater than or equal to x
 *   - crit-success|crit(ical) - Roll the highest die face
 *   - crit(ical)-fail(ure)|fumble - Roll the lowest die face
 * Example input:
 *   >=18 >15 10-14 crit fumble
 *   This will create the following anchors:
 *     check >= 18  - All tokens that rolled an 18 or higher
 *     check > 15   - All tokens that rolled higher than a 15
 *     check 10-14  - All tokens that rolled a 10 or higher, but less than 14
 *     check crit   - All tokens that rolled the highest die face
 *     check fumble - All tokens that rolled the lowest die face
 */
const results = arguments[0].value.tokenresults;
const options = arguments[0].args;

// Associate tokens with their rolls
const actors = await Promise.all(
  results.map(async (r) => ({
    roll: {
      total: r.roll.total,
      dice: r.terms[0].result[0].result,
      options: r.terms[0].options,
    },
    token: await fromUuid(r.uuid),
  })),
);

// Determine anchors for each token
const goto = options
  .map((opt) => {
    // If it's a number, use it directly
    const r = {
      anchor: opt,
    };

    if (!isNaN(opt) || /^\d+$/.test(opt)) {
      r.min = parseInt(opt);
      r.max = parseInt(opt) + 1;
    } else if (/^\d+-\d+$/.test(opt)) {
      const [min, max] = opt.split('-');
      r.min = parseInt(min);
      r.max = parseInt(max);
    } else if (/^<\d+$/.test(opt)) {
      r.min = -Infinity;
      r.max = parseInt(opt.slice(1));
    } else if (/^>\d+$/.test(opt)) {
      r.min = parseInt(opt.slice(1));
      r.max = Infinity;
    } else if (/^<=\d+$/.test(opt)) {
      r.min = -Infinity;
      r.max = parseInt(opt.slice(2)) + 1;
    } else if (/^>=\d+$/.test(opt)) {
      r.min = parseInt(opt.slice(2));
      r.max = Infinity;
    } else if (/^crit(ical)?(-success)?$/.test(opt)) {
      r.option = 'critical';
    } else if (/^(crit(ical)?-fail(ure)?|fumble)$/.test(opt)) {
      r.option = 'fumble';
    } else {
      return null;
    }

    return r;
  })
  .filter((r) => r)
  .map((range) => ({
    tag: `check ${range.anchor}`,
    tokens: actors
      .filter((a) => {
        if (range.option) {
          return a.roll.options[range.option] === a.roll.dice;
        } else {
          return a.roll.total >= range.min && a.roll.total < range.max;
        }
      })
      .map((a) => a.token),
  }))
  .filter((r) => r.tokens.length);

return { goto };
