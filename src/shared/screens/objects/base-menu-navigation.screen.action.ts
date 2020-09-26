import { Screen } from '../screen';
import { BaseMenuNavigationSelectors } from '../selectors/base-menu-navigation.selectors';
import { DeviceType } from '../../helpers';
import { BaseHeaderToolbarScreen } from './base.header-toolbar.screen.actions';
import Gestures from '../../../shared/helpers/gestures';
import { BaseDetailsScreen } from './base-details.screen';

const deviceType = browser.capabilities['deviceType'];
const baseHeaderToolbarScreen = new BaseHeaderToolbarScreen();
const DEFAULT_TIMEOUT: number = 35000;
const baseDetailsScreen = new BaseDetailsScreen();

export class BaseMenuNavigationScreen extends Screen {
    private baseMenuNavigationSelectors = new BaseMenuNavigationSelectors();

    public waitForElementsDisplay(elements: WebdriverIO.Element[]) {
        if (deviceType == DeviceType.iPhone) {
            for (let index in elements) {
                if (!elements[index].isDisplayed()) {
                    Gestures.swipeContentUp();
                    browser.waitUntil(
                        () => {
                            return elements[index].isDisplayed();
                        },
                        DEFAULT_TIMEOUT,
                        `ERROR: element ${elements[index]} does not display in view after ${DEFAULT_TIMEOUT / 1000}s`,
                        2000
                    );
                }
            }
        } else {
            super.waitForElementsDisplay(this.baseMenuNavigationSelectors.menuNavigation);
        }
    }

    public waitForDisplay(): void {
        this.waitForElementsDisplay(this.baseMenuNavigationSelectors.menuNavigation);
    }

    public waitForMenuDisplay(whichMenu: number): void {
        let whichMenuSelector: Array<WebdriverIO.Element> = this.baseMenuNavigationSelectors.menuNavigation;
        if (deviceType == DeviceType.iPhone && !whichMenuSelector[whichMenu].isDisplayed()) {
            Gestures.swipeContentUp();
            super.waitForElementDisplay(whichMenuSelector[whichMenu]);
        }
    }

    public expandMenuiPad(): void {
        this.baseMenuNavigationSelectors.menuNavigation[0].click();
    }

    public waitForLoadingBasicPartnerData(): void {
        if (deviceType == DeviceType.iPhone) {
            super.waitForElementDisplay(this.baseMenuNavigationSelectors.dataDetailsParent[0]);
            super.waitForElementHasValue(this.baseMenuNavigationSelectors.dataDetailsParent[0]);
        } else {
            this.expandMenuiPad();
            super.waitForElementDisplay(this.baseMenuNavigationSelectors.dataDetailsParent[0]);
            super.waitForElementHasValue(this.baseMenuNavigationSelectors.dataDetailsParent[0]);
        }
    }

    public getMenuTitle(): Array<string> {
        let menuTitleSelectors: Array<WebdriverIO.Element> = this.baseMenuNavigationSelectors.menuTitleH2;
        let menuTitle: Array<string> = [];
        for (let index in menuTitleSelectors) {
            Gestures.scrollIntoView(menuTitleSelectors[index]);
            menuTitle.push(menuTitleSelectors[index].getText());
        }
        return menuTitle;
    }

    private getIndexOfSelectingMenu(whichMenu: string): number {
        let currentMenuTitles: Array<String> = this.getMenuTitle();
        let index: number = 0;
        for (index; index < currentMenuTitles.length; index++) {
            if (currentMenuTitles[index] == whichMenu) {
                break;
            }
        }
        return index;
    }

    public getMenuTitleAndDetails(whichMenu: number): Array<string> {
        let titleSelector: WebdriverIO.Element = this.baseMenuNavigationSelectors.menuTitleH2[whichMenu];
        let detailsSelector: WebdriverIO.Element = this.baseMenuNavigationSelectors.dataDetailsParent[whichMenu];
        let titleAndDetails: Array<string> = [];
        Gestures.scrollIntoView(titleSelector);
        titleAndDetails.push(titleSelector.getText());
        Gestures.scrollIntoView(detailsSelector);
        titleAndDetails.push(detailsSelector.getText());

        return titleAndDetails;
    }

    public tapMenuByName(whatMenuName: string): void {
        const menuIndex: number = this.getIndexOfSelectingMenu(whatMenuName);
        if (deviceType == DeviceType.iPhone) {
            if (baseHeaderToolbarScreen.isBackButtonDisplaying() == false) {
                this.waitForMenuDisplay(menuIndex);
                this.baseMenuNavigationSelectors.menuNavigation[menuIndex].click();
            } else {
                baseHeaderToolbarScreen.tapBackButtonIphone();
                this.waitForDisplay();
                this.baseMenuNavigationSelectors.menuNavigation[menuIndex].click();
            }
        } else {
            this.waitForDisplay();
            if (menuIndex != 0) {
                this.baseMenuNavigationSelectors.menuNavigation[menuIndex + 1].click();
            }
        }
        baseDetailsScreen.waitForLoadingCompleted();
    }

    public tapMenu(whichMenu: number): void {
        if (deviceType == DeviceType.iPhone) {
            if (baseHeaderToolbarScreen.isBackButtonDisplaying() == false) {
                this.waitForMenuDisplay(whichMenu);
                this.baseMenuNavigationSelectors.menuNavigation[whichMenu].click();
            } else {
                baseHeaderToolbarScreen.tapBackButtonIphone();
                this.waitForDisplay();
                this.baseMenuNavigationSelectors.menuNavigation[whichMenu].click();
            }
        } else {
            this.waitForDisplay();
            if (whichMenu != 0) {
                this.baseMenuNavigationSelectors.menuNavigation[whichMenu + 1].click();
            }
        }
    }
}
