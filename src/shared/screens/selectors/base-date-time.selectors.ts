export class BaseDateTimeSelectors {
    private readonly selectors = {
        datePicker: 'div.date-picker ion-datetime',
        calendarIcon: 'mobi-icon.calendar-icon',
        timePicker: 'div.time-picker ion-datetime',
        pickerColumns: 'div.picker-columns ion-picker-column',
        pickerButtons: 'div.picker-toolbar div button'
    };

    public get datePicker(): WebdriverIO.Element {
        return $(this.selectors.datePicker);
    }

    public get timePicker(): WebdriverIO.Element {
        return $(this.selectors.timePicker);
    }

    public get calendarIcon(): WebdriverIO.Element {
        return $(this.selectors.calendarIcon);
    }

    public get donePickerButton(): WebdriverIO.Element {
        return browser.$$(this.selectors.pickerButtons)[1];
    }

    public getPickerColumnAtIndex(index: number): WebdriverIO.Element {
        return browser.$$(this.selectors.pickerColumns)[index].$('.picker-opts');
    }
}
