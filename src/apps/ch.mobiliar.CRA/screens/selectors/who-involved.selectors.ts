export class WhoInvolvedSelectors {
    private readonly selectors = {
        title: "ion-header div ion-title.title div.toolbar-title=Who's involved?",
        defaultYetPartnerIcon: 'div.default-avatar',
        yetPartnerInfo: 'div.avatar p',
        searchPartnerButton: '',
        claimPartnerScreenIdentity: '',
        partnerName: 'div.general h2',
        partnerDOB: 'div.personal span:nth-of-type(1)',
        partnerNumber: 'div.personal span:nth-of-type(2)',
        partnerContractLabels: 'div.child-page-content mobi-item-text',
        partnerContacts: 'div.child-page-content mobi-item-text div',
        phoneNumbersButton: 'span.btn-action ion-icon.test_btnShowPhoneNumbers',
        openMailComposerButton: 'span.btn-action ion-icon.test_btnOpenMailComposer',
        removePartnerDataButton: '',
        backButton: '',
        nextButton: ''
    };

    public get partnerContactLabels(): WebdriverIO.Element[] {
        return $$(this.selectors.partnerContractLabels);
    }

    public get partnerContacts(): WebdriverIO.Element[] {
        return $$(this.selectors.partnerContacts);
    }

    public get partnerName(): WebdriverIO.Element {
        return $(this.selectors.partnerName);
    }

    public get partnerDOB(): WebdriverIO.Element {
        return $(this.selectors.partnerDOB);
    }

    public get partnerNumber(): WebdriverIO.Element {
        return $(this.selectors.partnerNumber);
    }

    public get yetPartnerInfo(): WebdriverIO.Element {
        return $(this.selectors.yetPartnerInfo);
    }

    public get searchPartnerButton(): WebdriverIO.Element {
        return $(this.selectors.searchPartnerButton);
    }

    public get title(): WebdriverIO.Element {
        return $(this.selectors.title);
    }

    public get defaultYetPartnerIcon(): WebdriverIO.Element {
        return $(this.selectors.defaultYetPartnerIcon);
    }

    public get claimPartnerScreenIdentity(): WebdriverIO.Element {
        return browser.$(this.selectors.claimPartnerScreenIdentity);
    }

    public get phoneNumbersButton(): WebdriverIO.Element {
        return browser.$(this.selectors.phoneNumbersButton);
    }

    public get openMailComposerButton(): WebdriverIO.Element {
        return browser.$(this.selectors.openMailComposerButton);
    }

    public get removePartnerDataButton(): WebdriverIO.Element {
        return browser.$(this.selectors.removePartnerDataButton);
    }

    public get backButton(): WebdriverIO.Element {
        return browser.$(this.selectors.backButton);
    }

    public get nextButton(): WebdriverIO.Element {
        return browser.$(this.selectors.nextButton);
    }
}
