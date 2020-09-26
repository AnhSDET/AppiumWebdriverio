export class PartnerRelationsSelectors {
    private readonly selectors = {
        relationStates: 'div.sub-header',
        partners: 'div.child-page-content mobi-card',
        activePartners: 'div.child-page-content div:nth-of-type(1) mobi-card',
        terminatedPartners: 'div.child-page-content div:nth-of-type(2) mobi-card'
    };

    public get partners(): Array<WebdriverIO.Element> {
        return $$(this.selectors.partners);
    }

    public get relationStates(): Array<WebdriverIO.Element> {
        return $$(this.selectors.relationStates);
    }

    public get partnerTitlesAndContents(): Array<WebdriverIO.Element> {
        let titles: Array<WebdriverIO.Element> = $$(this.selectors.partners.concat(' div.main-container div.container span.title'));
        let partnerNumberAndDOB: Array<WebdriverIO.Element> = $$(this.selectors.partners.concat(' div.content div'));
        let contractAndRole: Array<WebdriverIO.Element> = $$(this.selectors.partners.concat(' mobi-icon-text div div.content'));
        let roleLabels: Array<WebdriverIO.Element> = $$(this.selectors.partners.concat(' mobi-icon-text div span.title'));
        let titlesAndContents: Array<WebdriverIO.Element>;
        titlesAndContents = titles.concat(partnerNumberAndDOB, contractAndRole, roleLabels);
        return titlesAndContents;
    }

    public get activePartners(): Array<WebdriverIO.Element> {
        return $$(this.selectors.activePartners);
    }

    public get terminatedPartners(): Array<WebdriverIO.Element> {
        return $$(this.selectors.activePartners);
    }
}
