const { I } = inject();
const sites = require('../sites.js');

sites.values.visibleCards = 9;

module.exports = {

    ...sites,

    iAmOnPage: () => {
        sites.iAmOnPage();
    }

}
