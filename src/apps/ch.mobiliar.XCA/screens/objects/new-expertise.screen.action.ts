import { Screen } from '../../../../shared/screens/';
import { Contexts } from '../../../../shared/helpers/';
import { NewExpertiseSelector } from '../selectors/new-expertise.selector';

class NewExpertiseScreen extends Screen {
    private selector = new NewExpertiseSelector();

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.selector.newExpertiseScreenTitle);
        super.waitForElementDisplay(this.selector.closeNewExpertiseScreenButton);
    }

    public waitUntilElementNotExist(): void {
        super.waitUntilElementNotExist(this.selector.newExpertiseScreenTitle && this.selector.closeNewExpertiseScreenButton);
    }

    public isNewExpertiseScreenDisplayed(): boolean {
        Contexts.switchToWebview();
        return this.selector.newExpertiseScreenTitle.isDisplayed() && this.selector.closeNewExpertiseScreenButton.isDisplayed();
    }

    public getNewExpertiseTitle(): string {
        return this.selector.newExpertiseScreenTitle.getText();
    }

    public tapCloseNewExpertiseScreenButton(): void {
        this.selector.closeNewExpertiseScreenButton.click();
        Contexts.switchToNative();
    }

    public isActionSheetOptionsDisplayed(): Array<boolean> {
        let actionSheetOptionStates: Array<boolean> = [];
        Contexts.switchToNative();
        actionSheetOptionStates.push(this.selector.optScanQRCodeLater.isDisplayed(), this.selector.optAbortCreationExpertise.isDisplayed());
        return actionSheetOptionStates;
    }

    public getActionSheet(): WebdriverIO.Element {
        return this.selector.optScanQRCodeLater;
    }

    public getActionSheetOptions(): Array<string> {
        let actionSheetOptions: Array<string> = [];
        Contexts.switchToNative();
        const scanQRCodeLaterSheetOptionText = this.selector.optScanQRCodeLater.getText();
        const optAbortCreationExpertiseText = this.selector.optAbortCreationExpertise.getText();

        actionSheetOptions.push(scanQRCodeLaterSheetOptionText, optAbortCreationExpertiseText);

        return actionSheetOptions;
    }

    public tapOptScanQRcodeLater(): void {
        Contexts.doTasksInNativeContext(() => {
            this.selector.optScanQRCodeLater.click();
        });
        super.waitUntilElementNotExist(this.selector.newExpertiseScreenTitle);
    }

    public tapOptAbortCreationOfExpertise(): void {
        Contexts.doTasksInNativeContext(() => {
            this.selector.optAbortCreationExpertise.click();
        });
        super.waitUntilElementNotExist(this.selector.newExpertiseScreenTitle);
    }
}

export const newExpertiseScreen = new NewExpertiseScreen();

const expectedActionSheet: Array<string> = ['Scan QR code later', 'Abort creation of expertise'];
const expectedActionSheetStates: Array<boolean> = [true, true];

export { expectedActionSheet, expectedActionSheetStates };
