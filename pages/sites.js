const { I } = inject();
const { cardsList, dismissPopover } = require('../src/utils.js');

module.exports = {

  locators: {
    card: locate('coral-masonry-item').as('card'),
    tools: locate('coral-tab').withAttr({ title: 'Tools'}).as('Tools')
  },

  values: {
    visibleCards: 5
  },

  iAmOnPage: () => {
    I.amOnPage('/aem/start.html');
    I.seeInTitle('AEM Start');
  },

  iValidatePage: () => {
    I.seeNumberOfVisibleElements(module.exports.locators.card, module.exports.values.visibleCards);
  },

  listCards: async () => {
    return cardsList(I, module.exports.locators.card);
  },

  iClickOn: async (target) => {
    I.click(target.name);
    I.seeInTitle(target.title);
    await dismissPopover(I);
  },

  iOpenTools: () => {
    I.click(module.exports.locators.tools);
  }


}
