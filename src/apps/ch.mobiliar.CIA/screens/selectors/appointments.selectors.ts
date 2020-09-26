export class AppointmentsSelectors {
    private readonly selectors = {
        dateAndTimeLabel: 'mobi-item-datetime ion-label',
        inputtedDate: 'mobi-item-datetime div.date-picker',
        inputtedTime: 'mobi-item-datetime div.time-picker',
        locationOfInspectionLabel: 'mobi-item-textarea ion-label',
        inspectionLocation: 'mobi-item-textarea div.input__content',
        contacts: 'mobi-item-input div.input__content div',
        plusButtons: 'ion-grid ion-row ion-col.subtitle__action'
    };

    public get dateAndTimeLabel(): WebdriverIO.Element {
        return $(this.selectors.dateAndTimeLabel);
    }

    public get inputtedDate(): WebdriverIO.Element {
        return $(this.selectors.inputtedDate);
    }

    public get inputtedTime(): WebdriverIO.Element {
        return $(this.selectors.inputtedTime);
    }

    public get inspectionLocation(): WebdriverIO.Element {
        return $(this.selectors.inspectionLocation);
    }

    public get contacts(): WebdriverIO.Element[] {
        return $$(this.selectors.contacts);
    }

    public get plusButtonsInsuranceAndPerson(): WebdriverIO.Element[] {
        return $$(this.selectors.plusButtons);
    }
}
