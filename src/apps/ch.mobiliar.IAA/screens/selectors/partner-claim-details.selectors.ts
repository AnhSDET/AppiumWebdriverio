export class PartnerClaimDetailsSelectors {
    private readonly claimDetailsSelectors = {
        paymentTitle: '',
        paymentErrorIcon: '',
        paymentErrorMessage: 'mobi-item-card mobi-hint div.container span',
        paymentSection: 'div.payment-container',
        compensation: 'div.payment-container ion-row:nth-of-type(1)',
        netCost: 'div.payment-container ion-row:nth-of-type(2)',
        responsibleEmployeeCard: 'app-responsible-employee mobi-item-card mobi-card',
        claimDetails: 'mobi-item-text ion-item'
    };

    public get claimDetails(): WebdriverIO.Element[] {
        return $$(this.claimDetailsSelectors.claimDetails);
    }

    public get claimLabels(): WebdriverIO.Element[] {
        return $$(this.claimDetailsSelectors.claimDetails.concat(' ion-label'));
    }

    public get claimContents(): WebdriverIO.Element[] {
        return $$(this.claimDetailsSelectors.claimDetails.concat(' div.item-content'));
    }

    public get claimNumber(): Array<WebdriverIO.Element> {
        let claimNumberLabel: WebdriverIO.Element = $$(this.claimDetailsSelectors.claimDetails.concat(' ion-label'))[0];
        let claimNumber: WebdriverIO.Element = $$(this.claimDetailsSelectors.claimDetails.concat(' div.item-content'))[0];

        let claimNumberSelectors: Array<WebdriverIO.Element> = [];
        claimNumberSelectors.push(claimNumberLabel, claimNumber);

        return claimNumberSelectors;
    }

    public getClaimDetails(): Array<WebdriverIO.Element>[] {
        let claimDetails: Array<WebdriverIO.Element>[] = [];

        let label: WebdriverIO.Element;
        let content: WebdriverIO.Element;
        const size: number = this.claimDetails.length;

        for (let i = 0; i < size; i++) {
            label = this.claimLabels[i];
            content = this.claimContents[i];
            claimDetails.push([label, content]);
        }

        return claimDetails;
    }

    public get damageDate(): WebdriverIO.Element {
        return $$(this.claimDetailsSelectors.claimDetails)[1];
    }

    public get paymentTitle(): WebdriverIO.Element {
        return $(this.claimDetailsSelectors.paymentTitle);
    }

    public get paymentErrorIcon(): WebdriverIO.Element {
        return $(this.claimDetailsSelectors.paymentErrorIcon);
    }

    public get paymentErrorMessage(): WebdriverIO.Element {
        const paymentErorMessage: string = this.claimDetailsSelectors.paymentErrorMessage;
        const paymentErrorElement: WebdriverIO.Element = $(paymentErorMessage);
        if (paymentErrorElement.isExisting()) {
            return paymentErrorElement;
        } else {
            return;
        }
    }

    public get paymentSection(): WebdriverIO.Element {
        return $(this.claimDetailsSelectors.paymentSection);
    }

    public get compensation(): WebdriverIO.Element[] {
        return $$(this.claimDetailsSelectors.compensation.concat(' ion-col'));
    }

    public get netCost(): WebdriverIO.Element[] {
        return $$(this.claimDetailsSelectors.netCost.concat(' ion-col'));
    }

    public get responsibleEmployeeCard(): WebdriverIO.Element {
        return $(this.claimDetailsSelectors.responsibleEmployeeCard);
    }

    public get employeeCardTitleAndContent(): Array<WebdriverIO.Element> {
        let title: WebdriverIO.Element = $(this.claimDetailsSelectors.responsibleEmployeeCard.concat(' span'));
        let contents: WebdriverIO.Element = $(this.claimDetailsSelectors.responsibleEmployeeCard.concat(' div.content div'));
        let titleAndContents: Array<WebdriverIO.Element> = [];
        titleAndContents.push(title, contents);
        return titleAndContents;
    }
}
