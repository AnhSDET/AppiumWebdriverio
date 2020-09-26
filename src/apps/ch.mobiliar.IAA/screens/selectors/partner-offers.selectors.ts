export class PartnerOffersSelectors {
    private readonly selectors = {
        offers: 'div mobi-card.view-only'
    };

    public get offers(): Array<WebdriverIO.Element> {
        return $$(this.selectors.offers);
    }

    public get offerTitlesAndContents(): Array<WebdriverIO.Element> {
        let titles: Array<WebdriverIO.Element> = $$(this.selectors.offers.concat(' span.title'));
        let contents: Array<WebdriverIO.Element> = $$(this.selectors.offers.concat(' div.content div'));
        let titlesAndContents: Array<WebdriverIO.Element>;
        titlesAndContents = titles.concat(contents);
        return titlesAndContents;
    }
}
