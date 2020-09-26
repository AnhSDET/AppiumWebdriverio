import { BaseDateTimeSelectors } from '../selectors/base-date-time.selectors';
import { Screen } from '../screen';
import Gestures from '../../helpers/gestures';

export class BaseDateTimeScreenActions extends Screen {
    private baseDateTimeSelectors = new BaseDateTimeSelectors();

    constructor() {
        super();
    }

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.baseDateTimeSelectors.datePicker);
        super.waitForElementDisplay(this.baseDateTimeSelectors.timePicker);
    }

    public selectDefaultDateTime(): void {
        this.waitForDisplay();
        this.selectDefaultDate();
        this.selectDefaultTime();
    }

    public selectDefaultDate(): void {
        this.baseDateTimeSelectors.datePicker.click();
        this.baseDateTimeSelectors.donePickerButton.click();
        super.waitUntilElementNotDisplay(this.baseDateTimeSelectors.donePickerButton);
    }

    public selectDefaultTime(): void {
        this.baseDateTimeSelectors.timePicker.click();
        this.baseDateTimeSelectors.donePickerButton.click();
        super.waitUntilElementNotDisplay(this.baseDateTimeSelectors.donePickerButton);
    }

    public selectRandomDate() {
        super.waitForElementDisplay(this.baseDateTimeSelectors.datePicker);
        this.baseDateTimeSelectors.datePicker.click();
        Gestures.dragAndDropWebviewElement(this.baseDateTimeSelectors.getPickerColumnAtIndex(0), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.baseDateTimeSelectors.getPickerColumnAtIndex(1), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.baseDateTimeSelectors.getPickerColumnAtIndex(2), 0, -50, false);

        this.baseDateTimeSelectors.donePickerButton.click();
    }
}
