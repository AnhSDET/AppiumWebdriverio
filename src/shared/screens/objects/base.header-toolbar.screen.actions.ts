import { Screen } from '../screen';
import { BaseHeaderToolbarSelectors } from '../selectors/base.header-toolbar.selectors';
import { alertDialog } from './alert-dialog.screen.actions';
import { Contexts, DeviceType } from '../../helpers';

const deviceType = browser.capabilities['deviceType'];

export class BaseHeaderToolbarScreen extends Screen {
    private baseHeaderToolbarSelectors = new BaseHeaderToolbarSelectors();

    constructor(appName?: string) {
        super();
        this.baseHeaderToolbarSelectors = new BaseHeaderToolbarSelectors(appName);
    }

    public waitForDisplay(): void {
        this.baseHeaderToolbarSelectors.homeScreenNavigationButton;
    }

    public getiPhonePageDetailsHeaderTitle(): string {
        return this.baseHeaderToolbarSelectors.detailsPageHeaderTitle.getText();
    }

    public isSendButtonDisplaying(): boolean {
        return this.baseHeaderToolbarSelectors.sendButton.isDisplayed();
    }

    public isBackButtonDisplaying(): boolean {
        return this.baseHeaderToolbarSelectors.backButton.isDisplayed();
    }

    public tapSendButtonAndConfirm(): void {
        this.tapSendButton();
        alertDialog.tapAlertDialogButtonSecond();
        super.waitUntilElementNotDisplay(this.baseHeaderToolbarSelectors.homeScreenNavigationButton);
    }

    public tapSendButton(): void {
        if (deviceType == DeviceType.iPhone) {
            if (this.isSendButtonDisplaying() == true) {
                this.baseHeaderToolbarSelectors.sendButton.click();
            } else {
                if (this.baseHeaderToolbarSelectors.backButton.isDisplayed() == true) {
                    this.tapBackButtonIphone();
                } else {
                    throw Error('Iphone: Send button and Back button is not display - invalid test case');
                }
            }
        } else {
            if (this.isSendButtonDisplaying() == true) {
                this.baseHeaderToolbarSelectors.sendButton.click();
            } else {
                throw Error('iPad - Send button NOT display-Terminate the test case');
            }
        }
    }

    public tapHomeScreenNavigationButton(): void {
        this.baseHeaderToolbarSelectors.homeScreenNavigationButton.click();
        super.waitUntilElementNotDisplay(this.baseHeaderToolbarSelectors.homeScreenNavigationButton);
    }

    public tapBackButtonIphone(): void {
        if (deviceType == DeviceType.iPhone) {
            super.waitForElementDisplay(this.baseHeaderToolbarSelectors.backButton);
            this.baseHeaderToolbarSelectors.backButton.click();
            super.waitUntilElementNotDisplay(this.baseHeaderToolbarSelectors.backButton);
        } else {
            return;
        }
    }

    public waitForActionMenuDisplay(): void {
        super.waitForElementDisplay(this.baseHeaderToolbarSelectors.actionMenuIcon);
    }

    public tapActionMenuButton(): void {
        this.baseHeaderToolbarSelectors.actionMenuIcon.click();
    }

    public unmarkAsFavorite(): void {
        this.tapActionMenuButton();
        if (deviceType == DeviceType.iPhone) {
            Contexts.doTasksInNativeContext(() => {
                this.baseHeaderToolbarSelectors.actionSheetUnmark.click();
            });
        } else this.baseHeaderToolbarSelectors.actionsOnMenu[0].click();
    }

    public syncPartnerData(): void {
        this.tapActionMenuButton();
        if (deviceType == DeviceType.iPhone) {
            Contexts.doTasksInNativeContext(() => {
                this.baseHeaderToolbarSelectors.actionSheetSynchronize.click();
            });
        } else this.baseHeaderToolbarSelectors.actionsOnMenu[1].click();
    }

    public downloadAllDocs(): void {
        this.tapActionMenuButton();
        if (deviceType == DeviceType.iPhone) {
            Contexts.doTasksInNativeContext(() => {
                this.baseHeaderToolbarSelectors.actionSheetDownload.click();
            });
        } else this.baseHeaderToolbarSelectors.actionsOnMenu[2].click();
    }

    public createFreeTextTask(): void {
        this.tapActionMenuButton();
        if (deviceType == DeviceType.iPhone) {
            Contexts.doTasksInNativeContext(() => {
                this.baseHeaderToolbarSelectors.actionSheetCreate.click();
            });
        } else this.baseHeaderToolbarSelectors.actionsOnMenu[3].click();
    }
}
