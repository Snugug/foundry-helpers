export class SpellSchoolDialog extends Application {
  constructor(
    options = Object.assign(Dialog.defaultOptions, {
      resizable: false,
      title: 'Choose spell school to apply',
      minimizable: false,
    }),
  ) {
    super(options);
    this._schools = [
      'abjuration',
      'conjuration',
      'divination',
      'enchantment',
      'evocation',
      'illusion',
      'necromancy',
      'transmutation',
    ];
  }

  activateListeners(html) {
    super.activateListeners(html);
    const buttons = html.find('[name="school"]');

    if (buttons.length) {
      buttons.on('click', (e) => {
        const controlled = Object.values(canvas.activeLayer._controlled);
        const { value } = e.target;

        for (const c of controlled) {
          if (value === 'reset') {
            Tagger.removeTags(c, this._schools);
          } else {
            Tagger.addTags(c, ['ase-detect', value]);
          }
        }
      });
    }
  }

  getData() {
    let innerContent = '';
    innerContent = `${this._schools
      .map((school) => `<button name="school" value="${school}">${school}</button>`)
      .join('')}
      <button name="school" value="reset">RESET</button>
      <style type="text/css">#spellSchoolDialog { display: flex; gap: .5rem; flex-direction: column; }</style>`;

    var content = `<div id="spellSchoolDialog">${innerContent}</div>`;
    var contentsObject = { content: `${content}` };
    return contentsObject;
  }
}
