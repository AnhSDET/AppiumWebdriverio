import { DeviceType } from '../../../../shared/helpers';
import { Screen } from '../../../../shared/screens';
import { WhereWhenSelector } from '../selectors/where-when.selector';
import Gestures from '../../../../shared/helpers/gestures';

const deviceType = browser.capabilities['deviceType'];

class WhereWhenScreen extends Screen {
    private selector = new WhereWhenSelector();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const whereWhenScreenElements: Array<WebdriverIO.Element> = [];
        whereWhenScreenElements.push(
            this.selector.claimPlaceScreenIdentity
            //todo
        );
        return whereWhenScreenElements;
    }

    public waitForDisplay() {
        super.waitForElementsDisplay(this.defineScreenElements());
    }

    public isClaimPlaceScreenDisplayed(): boolean {
        return this.selector.claimPlaceScreenIdentity.isDisplayed();
    }

    public tapSearchInput(): void {
        this.selector.searchInput.click();
    }

    public tapNextButton(): void {
        this.selector.nextButton.click();
    }

    public selectPartnerHomeAddress() {
        this.tapSearchInput();
        if (deviceType === DeviceType.iPad) {
            Gestures.dragAndDropWebviewElement(this.selector.suggestionTitle, 0, -150);
        }
        Gestures.tapWebviewElement(this.selector.partnerHomeAddressItem);
    }

    public selectSuggestedItemAtIndex(index: number) {
        this.selector.suggestionItems[index].click();
    }

    public selectDate() {
        this.selector.dateSelectBox.click();
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(0), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(1), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(2), 0, -50, false);

        this.selector.donePickerButton.click();
    }

    public selectTime() {
        this.selector.timeSelectBox.click();
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(0), 0, -200, false);
        Gestures.dragAndDropWebviewElement(this.selector.getPickerColumnAtIndex(1), 0, -200, false);

        this.selector.donePickerButton.click();
    }

    public selectDateTime() {
        this.selectDate();
        this.selectTime();
    }
}

export const whereWhenScreen = new WhereWhenScreen();
