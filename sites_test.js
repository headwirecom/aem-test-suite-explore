
Feature('Sites');

Before(login => {
    login('admin'); 
 });

Scenario('test sites screen', async (I, sites) => {

    sites.iAmOnPage();
    sites.iValidatePage();
    const cards = await sites.listCards();
    I.say(cards);
});

Scenario('test tools - search facets', async (I, sites) => {

    sites.iAmOnPage();
    sites.iOpenTools();
    I.click(locate('coral-card-title').withText('Search Forms').as('Search Forms'));
    I.seeInTitle('AEM Sites | Custom Search Facets');
});

Scenario('test tools - crxde', async (I, sites) => {

    sites.iAmOnPage();
    sites.iOpenTools();
    I.click(locate('coral-card-title').withText('CRXDE Lite').as('CRXDE Lite'));
    I.seeInTitle('CRXDE Lite');
    I.waitForText('Save All');
    I.closeCurrentTab();
});
