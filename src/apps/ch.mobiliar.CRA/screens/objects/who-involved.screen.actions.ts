import { Screen } from '../../../../shared/screens';
import { WhoInvolvedSelectors } from '../selectors/who-involved.selectors';
import { Contexts, DeviceType } from '../../../../shared/helpers';
import { alertDialog } from '../../../../shared/screens';

const deviceType: string = browser.capabilities['deviceType'];

class WhoInvolvedScreen extends Screen {
    private selector = new WhoInvolvedSelectors();

    private defineDefaultScreenElements(): Array<WebdriverIO.Element> {
        const defaultScreenElements: Array<WebdriverIO.Element> = [];
        defaultScreenElements.push(
            this.selector.title,
            this.selector.defaultYetPartnerIcon,
            this.selector.yetPartnerInfo,
            this.selector.searchPartnerButton
        );
        return defaultScreenElements;
    }

    public waitForDisplay() {
        super.waitForElementsDisplay(this.defineDefaultScreenElements());
    }

    private waitForNotDisplay() {
        super.waitUntilElementsNotDisplay(this.defineDefaultScreenElements());
    }

    public tapSearchPartnerButton(): void {
        this.selector.searchPartnerButton.click();
        this.waitForNotDisplay();
    }

    private defineAddedPartnerScreenElements(): Array<WebdriverIO.Element> {
        const addedPartnerScreenElements: Array<WebdriverIO.Element> = [];
        addedPartnerScreenElements.push(
            this.selector.title,
            this.selector.defaultYetPartnerIcon,
            this.selector.partnerName,
            this.selector.partnerNumber,
            this.selector.removePartnerDataButton,
            this.selector.nextButton
        );
        return addedPartnerScreenElements;
    }

    public getPartnerDetailsInfo(): Array<string> {
        const partnerInfo: Array<string> = [];
        partnerInfo.push(
            this.selector.title.getText(),
            this.selector.partnerName.getText(),
            this.selector.partnerDOB.getText(),
            this.selector.partnerNumber.getText()
        );
        const partnerContactLabels = this.selector.partnerContactLabels;

        for (let index in partnerContactLabels) {
            partnerInfo.push(partnerContactLabels[index].getText());
        }
        const partnerContacts = this.selector.partnerContacts;

        for (let index in partnerContacts) {
            partnerInfo.push(partnerContacts[index].getText());
        }
        return partnerInfo;
    }

    public waitForAddedPartnerDisplay() {
        super.waitForElementsDisplay(this.defineAddedPartnerScreenElements());
    }

    public tapPhoneNumbersButton(): void {
        this.selector.phoneNumbersButton.click();
        Contexts.switchToNative();
    }

    public tapOpenMailComposerButton(): void {
        this.selector.openMailComposerButton.click();
    }

    public tapRemovePartnerDataButton(): void {
        this.selector.removePartnerDataButton.click();
        alertDialog.waitForAlertDialog();
        alertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay('Remove');
    }

    public tapNextButton(): void {
        this.selector.nextButton.click();
    }
}

const expectedDefaultNavigationMenu: Array<string> = [
    "Who'\ts involved?",
    'Where and when did it happen?',
    'What happened?',
    'Next Steps',
    'No notes added',
    'Attachments'
];

export const whoInvolvedScreen = new WhoInvolvedScreen();
