export class SummarySelectors {
    private readonly selectors = {
        claimStatusLabel: '',
        pageTitle: '',
        homeButton: '',
        claimStatusDescriptionLabel: '',
        claimInfo: '',
        partnerTitleLabel: '',
        partnerDOB: '',
        partnerAddress: '',
        getClaimNumberButton: '',
        beginInspectionButton: '',
        registerAnotherClaimButton: ''
    };

    public get pageTitle(): WebdriverIO.Element {
        return browser.$(this.selectors.pageTitle);
    }

    public get claimStatusLabel(): WebdriverIO.Element {
        return browser.$(this.selectors.claimStatusLabel);
    }

    public get claimStatusDescriptionLabel(): WebdriverIO.Element {
        return browser.$(this.selectors.claimStatusDescriptionLabel);
    }

    public get claimNumberLabel(): WebdriverIO.Element {
        return browser.$$(this.selectors.claimInfo)[0];
    }

    public get claimDateLabel(): WebdriverIO.Element {
        return browser.$$(this.selectors.claimInfo)[1];
    }

    public get claimPlaceLabel(): WebdriverIO.Element {
        return browser.$$(this.selectors.claimInfo)[2];
    }

    public get claimDescriptionLabel(): WebdriverIO.Element {
        return browser.$$(this.selectors.claimInfo)[3];
    }

    public get partnerTitleLabel(): WebdriverIO.Element {
        return browser.$(this.selectors.partnerTitleLabel);
    }

    public get partnerDOB(): WebdriverIO.Element {
        return browser.$(this.selectors.partnerDOB);
    }

    public get partnerAddress(): WebdriverIO.Element {
        return browser.$(this.selectors.partnerAddress);
    }

    public get getClaimNumberButton(): WebdriverIO.Element {
        return browser.$(this.selectors.getClaimNumberButton);
    }

    public get beginInspectionButton(): WebdriverIO.Element {
        return browser.$(this.selectors.beginInspectionButton);
    }

    public get registerAnotherClaimButton(): WebdriverIO.Element {
        return browser.$(this.selectors.registerAnotherClaimButton);
    }
}
