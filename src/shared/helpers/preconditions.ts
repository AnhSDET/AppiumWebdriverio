import { credentials, partnerNumber, commonClaimNumberForInspection } from './testdata';
import { loginScreen } from '../screens';
import { mtanScreen } from '../screens';
import { overviewScreenXCA } from '../../apps/ch.mobiliar.XCA/screens/objects/overview.screen.action';
import { Contexts } from './contexts';
import { newExpertiseScreen } from '../../apps/ch.mobiliar.XCA/screens/objects/new-expertise.screen.action';
import { ExpertiseDetailsScreen } from '../../apps/ch.mobiliar.XCA/screens/objects/expertise-details.screen.action';
import { startScreen } from '../../apps/ch.mobiliar.IAA/screens/objects/start.screen.actions';
import { searchPartnerScreenIAA } from '../../apps/ch.mobiliar.IAA/screens/objects/search-partner.screen.actions';
import { BaseMenuNavigationScreen } from '../screens/objects/base-menu-navigation.screen.action';
import { BaseHeaderToolbarScreen } from '../screens/objects/base.header-toolbar.screen.actions';
import { DeviceType } from './constants';
import { overviewScreenCIA } from '../../apps/ch.mobiliar.CIA/screens/objects/overview.screen.actions';
import { BaseDetailsScreen } from '../screens/objects/base-details.screen';
import { BaseDateTimeScreenActions } from '../screens/objects/base-date-time.screen.actions';
import { BaseSearchPartnerScreenActions } from '../screens/objects/base-search-partner.screen.actions';
import { searchClaimScreenCIA } from '../../apps/ch.mobiliar.CIA/screens/objects/search-claim.screen.actions';
import { BaseOverviewScreenActions } from '../screens/objects/base-overview.screen.actions';
import { PartnerContracts } from '../../apps/ch.mobiliar.IAA/screens/objects/partner-contracts.screen';

const baseMenuNavigationScreen = new BaseMenuNavigationScreen();
const expertiseDetails = new ExpertiseDetailsScreen();
const deviceType = browser.capabilities['deviceType'];
const baseHeaderToolbarScreen = new BaseHeaderToolbarScreen();
const baseDetailsScreen = new BaseDetailsScreen();
const baseDateTime = new BaseDateTimeScreenActions();
const baseOverviewScreenAction = new BaseOverviewScreenActions();
const baseSearchPartnerScreen = new BaseSearchPartnerScreenActions();

export class Preconditions {
    //**************CIA*****************
    public static authenticateWithValidCredentialsMtanCIA(): void {
        loginScreen.waitForDisplay();
        loginScreen.loginWithValidCredentials(credentials.valid.usernameCIA, credentials.valid.password);
        mtanScreen.enterValidMtanCodeAndWaitForNotExist();
        overviewScreenCIA.waitForDisplay();
    }

    public static displayCommonPartnerDataAfterSearchClaim(): void {
        this.displaySearchCriteriaScreen();
        searchClaimScreenCIA.searchByNumber(commonClaimNumberForInspection);
        searchClaimScreenCIA.tapFoundClaimBySearchClaimNumberOnSearchResult();
        baseDetailsScreen.waitForPartnerDetailsScreenDisplay();
    }

    public static displayPartnerDetailsAfterSearchedByNumber(): void {
        searchClaimScreenCIA.searchByNumber(commonClaimNumberForInspection);
        searchClaimScreenCIA.tapFoundClaimBySearchClaimNumberOnSearchResult();
        baseDetailsScreen.waitForPartnerDetailsScreenDisplay();
    }

    public static prepareClaimForSendingInspectionReport(): void {
        this.displaySearchCriteriaScreen();
        this.displayPartnerDetailsAfterSearchedByNumber();
        this.prepareAppointment();
    }

    public static preparePartnerData(): void {
        baseMenuNavigationScreen.tapMenu(0);
    }

    public static prepareClaimDetails(): void {
        baseMenuNavigationScreen.tapMenu(1);
    }

    public static prepareAppointment(): void {
        baseMenuNavigationScreen.tapMenu(2);
        baseDateTime.selectDefaultDateTime();
        baseHeaderToolbarScreen.tapBackButtonIphone();
    }

    public static prepareInspectionObjects(): void {
        baseMenuNavigationScreen.tapMenu(3);
    }

    public static prepareNextSteps(): void {
        baseMenuNavigationScreen.tapMenu(4);
    }

    //todo: this is just a basic inpsection report

    public static prepareAnUploadedInspectionReport(): void {
        this.prepareClaimForSendingInspectionReport();
        baseHeaderToolbarScreen.tapSendButtonAndConfirm();
        overviewScreenCIA.waitForAnInspectionReportDisplay();
    }

    //todo: this is just a basic uploaded inspection report - need a more details inspection report to send

    //todo: screen can be any screen rather than just one screen

    //**************CIA And CRA *****************

    public static displaySearchCriteriaScreen(): void {
        this.createAnEmptyInspectionReportAndDisplayEmptyMenu();
        baseMenuNavigationScreen.tapMenu(0);
        baseDetailsScreen.waitForEmptyPartnerScreenDisplay().tapSearchButton();

        baseSearchPartnerScreen.waitForDisplay();
        baseSearchPartnerScreen.waitForPartnerNumberAndAttributes();
    }

    public static createAnEmptyInspectionReportAndDisplayEmptyMenu(): void {
        baseOverviewScreenAction.tapPlusButton();
        baseHeaderToolbarScreen.waitForDisplay();
        baseMenuNavigationScreen.waitForDisplay();
    }

    public static createAnIncompleteReportOnOverviewScreen(): void {
        this.createAnEmptyInspectionReportAndDisplayEmptyMenu();
        baseHeaderToolbarScreen.tapHomeScreenNavigationButton();
        overviewScreenCIA.waitForAnInspectionReportDisplay();
    }

    //**************IAA*****************
    public static authenticateWithValidCredentialsMtanIAA(): void {
        loginScreen.waitForDisplay();
        loginScreen.loginWithValidCredentials(credentials.valid.usernameIAA, credentials.valid.password);
        mtanScreen.enterValidMtanCodeAndWaitForNotExist();
        startScreen.waitForDisplay();
    }

    public static authenticateWithValidCredentialsIAA(): void {
        loginScreen.waitForDisplay();
        loginScreen.loginWithValidCredentials(credentials.valid.usernameIAA, credentials.valid.password);
    }

    public static displayQuickSearchPartnerScreen(): void {
        startScreen.tapSearchButton();
        searchPartnerScreenIAA.waitForDisplay();
    }

    public static quickSearchAndTapOnFoundPartnerAndWaitForNavigation(whatPartnerToDisplay: string): void {
        this.displayQuickSearchPartnerScreen();
        searchPartnerScreenIAA.inputQuickPartnerAndSearchAndTapFoundPartner(whatPartnerToDisplay);
        Preconditions.waitForScreensBeforeDisplayingPartnerDetails();
    }

    public static displayPartnerDetailsIAA(whatPartnerToDisplay: string): void {
        this.quickSearchAndTapOnFoundPartnerAndWaitForNavigation(whatPartnerToDisplay);
        baseMenuNavigationScreen.tapMenuByName('Basic Data');
    }

    public static displayPartnerRelationIAA(whatPartnerToDisplay: string): void {
        this.quickSearchAndTapOnFoundPartnerAndWaitForNavigation(whatPartnerToDisplay);
        baseMenuNavigationScreen.tapMenuByName('Partner Relations');
    }

    public static displayPartnerContractsIAA(whatPartnerToDisplay: string): void {
        this.quickSearchAndTapOnFoundPartnerAndWaitForNavigation(whatPartnerToDisplay);
        baseMenuNavigationScreen.tapMenuByName('Contracts');
    }

    public static displayPartnerOffersIAA(whatPartnerToDisplay: string): void {
        this.quickSearchAndTapOnFoundPartnerAndWaitForNavigation(whatPartnerToDisplay);
        baseMenuNavigationScreen.tapMenuByName('Offers');
    }

    public static displayPartnerClaimsIAA(whatPartnerToDisplay: string): void {
        this.quickSearchAndTapOnFoundPartnerAndWaitForNavigation(whatPartnerToDisplay);
        baseMenuNavigationScreen.tapMenuByName('Claims');
    }

    public static displayPartnerDocsIAA(whatPartnerToDisplay: string): void {
        this.quickSearchAndTapOnFoundPartnerAndWaitForNavigation(whatPartnerToDisplay);
        baseMenuNavigationScreen.tapMenuByName('Documents');
    }

    public static navigateToAndDisplayPartnerScreen(whichScreen: number): void {
        if (deviceType == DeviceType.iPhone) {
            baseMenuNavigationScreen.tapMenu(whichScreen);
        } else baseMenuNavigationScreen.tapMenu(whichScreen);
    }

    private static waitForScreensBeforeDisplayingPartnerDetails(): void {
        /*startScreen.waitForDisplay();
        startScreen.waitForNotDisplay();*/ //todo: wait for bug #317 to be improved or confirmed
        baseHeaderToolbarScreen.waitForDisplay();
        baseHeaderToolbarScreen.waitForActionMenuDisplay();
        baseMenuNavigationScreen.waitForDisplay();
        baseMenuNavigationScreen.waitForLoadingBasicPartnerData();
    }

    //**************CRA*****************
    public static authenticateWithValidCredentialsMtanCRA(): void {
        loginScreen.waitForDisplay();
        loginScreen.loginWithValidCredentials(credentials.valid.usernameCRA, credentials.valid.password);
        mtanScreen.enterValidMtanCodeAndWaitForNotExist();
    }

    public static authenticateWithValidCredentialsCRA(): void {
        loginScreen.waitForDisplay();
        loginScreen.loginWithValidCredentials(credentials.valid.usernameCRA, credentials.valid.password);
    }

    //**************XCA*****************
    public static authenticateWithValidCredentialsXCA(): void {
        loginScreen.waitForDisplay();
        loginScreen.loginWithValidCredentials(credentials.valid.usernameXCA, credentials.valid.password);
    }

    public static authenticateWithValidCredentialsMtanXCA(): void {
        loginScreen.waitForDisplay();
        loginScreen.loginWithValidCredentials(credentials.valid.usernameXCA, credentials.valid.password);
        mtanScreen.enterValidMtanCodeAndWaitForNotExist();
    }

    public static displayExpertiseDetailsScreenWithoutQRCode(): void {
        overviewScreenXCA.tapPlusButton();
        Contexts.acceptPermission();
        newExpertiseScreen.waitForDisplay();
        newExpertiseScreen.tapCloseNewExpertiseScreenButton();
        newExpertiseScreen.tapOptScanQRcodeLater();
        expertiseDetails.waitForDisplay();
    }

    private checkAlertAndProcess(): void {
        if (browser.isAlertOpen()) {
            Contexts.acceptPermission();
        } else {
            return;
        }
    }

    public static displayExpertiseDetailsScreen(): void {
        overviewScreenXCA.waitForDisplay();
        overviewScreenXCA.tapPlusButton();
        Contexts.acceptPermission();
        expertiseDetails.waitForDisplay();
    }

    public static displayNewExpertiseScannerScreen(): void {
        overviewScreenXCA.tapPlusButton();
        Contexts.acceptPermission();
        newExpertiseScreen.waitForDisplay();
    }

    public static createExpertiseReportWhenNoReportOnOverviewScreen(): void {}
}
