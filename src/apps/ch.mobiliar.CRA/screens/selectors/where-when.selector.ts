export class WhereWhenSelector {
    private readonly selectors = {
        claimPlaceScreenIdentity: '',
        backButton: '',
        nextButton: '',
        searchInput: '',
        suggestionTitle: '',
        suggestionList: '',
        suggestionItems: '',
        partnerCurrentLocation: '',
        partnerHomeAddressItem: '',
        dateSelectBox: '',
        timeSelectBox: '',
        searchedLocationItems: '',
        pickerButtons: '',
        pickerColumns: ''
    };

    public get claimPlaceScreenIdentity(): WebdriverIO.Element {
        return browser.$(this.selectors.claimPlaceScreenIdentity);
    }

    public get backButton(): WebdriverIO.Element {
        return browser.$(this.selectors.backButton);
    }

    public get nextButton(): WebdriverIO.Element {
        return browser.$(this.selectors.nextButton);
    }

    public get searchInput(): WebdriverIO.Element {
        return browser.$(this.selectors.searchInput);
    }

    public get suggestionList(): WebdriverIO.Element {
        return browser.$(this.selectors.suggestionList);
    }

    public get suggestionItems(): WebdriverIO.Element {
        return browser.$(this.selectors.suggestionItems);
    }

    public get suggestionTitle(): WebdriverIO.Element {
        return browser.$(this.selectors.suggestionTitle);
    }

    public get partnerCurrentLocation(): WebdriverIO.Element {
        return browser.$(this.selectors.partnerCurrentLocation);
    }

    public get searchedLocationItems(): WebdriverIO.Element[] {
        return browser.$$(this.selectors.searchedLocationItems);
    }

    public get partnerHomeAddressItem(): WebdriverIO.Element {
        return browser.$(this.selectors.partnerHomeAddressItem);
    }

    public get dateSelectBox(): WebdriverIO.Element {
        return browser.$(this.selectors.dateSelectBox);
    }

    public get timeSelectBox(): WebdriverIO.Element {
        return browser.$(this.selectors.timeSelectBox);
    }

    public get donePickerButton(): WebdriverIO.Element {
        return browser.$$(this.selectors.pickerButtons)[1];
    }

    public get cancelPickerButton(): WebdriverIO.Element {
        return browser.$$(this.selectors.pickerButtons)[0];
    }

    public getPickerColumnAtIndex(index: number): WebdriverIO.Element {
        return browser.$$(this.selectors.pickerColumns)[index].$('.picker-opts');
    }
}
