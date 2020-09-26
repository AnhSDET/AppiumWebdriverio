import { alertDialog, Screen } from '../../../../shared/screens';
import { MenuSelectors } from '../selectors/menu.selectors';
import { DeviceType } from '../../../../shared/helpers';

const deviceType: string = browser.capabilities['deviceType'];

class MenuClaim extends Screen {
    private selector = new MenuSelectors();

    private defineDefaultMenuScreenElements(): Array<WebdriverIO.Element> {
        const menuScreenElements: Array<WebdriverIO.Element> = [];
        const menuNavigationElments = this.selector.menuNavigation;
        if (deviceType === DeviceType.iPad) {
            menuScreenElements.push(this.selector.homeButton, this.selector.topRightDeleteClaimButton, this.selector.topRightRegisterButton);
            menuScreenElements.concat(menuNavigationElments);
            return menuScreenElements;
        } else {
            menuScreenElements.push(
                this.selector.homeButton,
                this.selector.topRightRegisterButton,
                this.selector.bottomRegisterButton,
                this.selector.bottomDeleteButton
            );
            menuScreenElements.concat(menuNavigationElments);
            return menuScreenElements;
        }
    }

    public waitForDisplay() {
        super.waitForElementsDisplay(this.defineDefaultMenuScreenElements());
    }

    private waitForNotDisplay() {
        super.waitUntilElementsNotDisplay(this.defineDefaultMenuScreenElements());
    }

    public tapHomeButton(): void {
        this.selector.homeButton.click();
        this.waitForNotDisplay();
    }

    private processDeleteClaimAlert() {
        alertDialog.waitForAlertDialog();
        alertDialog.tapAlertDialogButtonAndWaitForAlertNotDisplay('Delete');
        this.waitForNotDisplay();
    }

    public deleteClaim(): void {
        if (deviceType === DeviceType.iPad) {
            this.selector.topRightDeleteClaimButton.click();
            this.processDeleteClaimAlert();
        } else {
            this.selector.bottomDeleteButton.click();
            this.processDeleteClaimAlert();
        }
    }

    public tapTopRightRegisterButton(): void {
        this.selector.topRightRegisterButton.click();
    }

    public tapBottomRegisterButtoniPhone(): void {
        if (deviceType === DeviceType.iPhone) {
            this.selector.bottomRegisterButton.click();
        } else {
            return;
        }
    }

    public tapBottomBeginInspectionButton(): void {
        this.selector.bottomBeginInspectionButton.click();
    }

    public tapBottomGetClaimNumberButton(): void {
        this.selector.bottomGetClaimNumberButton.click();
    }

    public tapToggleButtoniPad(): void {
        if (deviceType === DeviceType.iPad) {
            this.selector.menuNavigation[0].click();
        } else return;
    }

    public tapWhoInvolvedTab(): void {
        this.selector.menuNavigation[1].click();
    }

    public tapWhereAndWhenDidItHappenTab(): void {
        this.selector.menuNavigation[2].click();
    }

    public tapWhatHappenedTab(): void {
        this.selector.menuNavigation[3].click();
    }

    public tapNextStepsTab(): void {
        this.selector.menuNavigation[4].click();
    }

    public tapAttachmentsTab(): void {
        this.selector.menuNavigation[5].click();
    }

    private getNavigationContent(): Array<string> {
        const menuContent: Array<string> = [];
        const menuNavigation = this.selector.menuNavigation;
        for (let i = 1; i < menuNavigation.length; i++) {
            menuContent.push(menuNavigation[i].getText());
        }
        return menuContent;
    }

    public getExpandNavigationContent(): void {
        if (deviceType === DeviceType.iPad && this.selector.menuNavigationContent[0].isDisplayed() == false) {
            this.tapToggleButtoniPad();
            super.waitForElementExist(this.selector.menuExpand);
            this.getNavigationContent();
        } else {
            this.getNavigationContent();
        }
    }

    public tapTopRightInspectionButton(): void {
        this.selector.topRightInspectionButton.click();
    }

    public tapTopRightGetClaimNumberButton(): void {
        this.selector.topRightGetClaimNumberButton.click();
    }
}

export const menuScreen = new MenuClaim();
