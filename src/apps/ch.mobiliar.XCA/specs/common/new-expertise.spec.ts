import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { expectedDefaultExpertiseReports, overviewScreenXCA } from '../../screens/objects/overview.screen.action';
import { expectedActionSheet, newExpertiseScreen, expectedActionSheetStates } from '../../screens/objects/new-expertise.screen.action';
import { alertDialog, expectedCameraAlertError } from '../../../../shared/screens';
import {
    expectedDefaultExpertiseDetails,
    expectedExpertiseListComboBoxNotDisplay,
    ExpertiseDetailsScreen
} from '../../screens/objects/expertise-details.screen.action';
import { Coordinate } from '../../../../shared/helpers/coordinate';

const expertiseDetails = new ExpertiseDetailsScreen();
const coodinate = new Coordinate();

describe('Screen: New Expertise - Accept Permission', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        Preconditions.authenticateWithValidCredentialsMtanXCA();
        Preconditions.displayNewExpertiseScannerScreen();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('HAN:729: should display all the attributes such as header, close button, action sheet options', () => {
        expect(newExpertiseScreen.isNewExpertiseScreenDisplayed()).toBe(true);
        expect(newExpertiseScreen.getNewExpertiseTitle()).toEqual('New Expertise');
        newExpertiseScreen.tapCloseNewExpertiseScreenButton();

        const ActualStates: Array<boolean> = newExpertiseScreen.isActionSheetOptionsDisplayed();
        expect(ActualStates).toEqual(expectedActionSheetStates);

        const actualActionSheetValues: Array<string> = newExpertiseScreen.getActionSheetOptions();

        expect(actualActionSheetValues).toEqual(expectedActionSheet);
    });

    xit('HAN-163: should be able to cancel the abortion of camera qr-code', () => {
        newExpertiseScreen.tapCloseNewExpertiseScreenButton();

        const actionSheetScanQRCodeLaterElement: WebdriverIO.Element = newExpertiseScreen.getActionSheet();
        coodinate.tapOptCancel(actionSheetScanQRCodeLaterElement);

        expect(newExpertiseScreen.isActionSheetOptionsDisplayed()).toEqual([false, false]);
        expect(newExpertiseScreen.isNewExpertiseScreenDisplayed()).toBe(true);
    });
    it('HAN-161: should be able to scan qr code later and navigate to expertise details screen with default content', () => {
        newExpertiseScreen.tapCloseNewExpertiseScreenButton();
        newExpertiseScreen.tapOptScanQRcodeLater();
        const actualDefaultExpertiseDetails: Array<string> = expertiseDetails.getDispatchDetails();

        expect(actualDefaultExpertiseDetails).toEqual(expectedDefaultExpertiseDetails);

        const expertiseTypesInComboBoxState: Array<boolean> = expertiseDetails.isExpertiseTypesInComboBoxDisplayed();

        expect(expertiseTypesInComboBoxState).toEqual(expectedExpertiseListComboBoxNotDisplay);

        let popoverState: boolean = expertiseDetails.isPopoverDisplayed();

        expect(popoverState).toBe(false);

        const expertiseItemsGridState = expertiseDetails.isExpertiseItemsGridDisplayed();

        expect(expertiseItemsGridState).toBe(false);
        expect(expertiseDetails.isUploadButtonDisplayed()).toBe(false);
    });
});
xdescribe('Screen: New Expertise - Dismiss Permission', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        Preconditions.authenticateWithValidCredentialsMtanXCA();
        overviewScreenXCA.tapPlusButton();
        Contexts.dismissPermission();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('HAN-728: should display the ERROR when user dismiss camera permission', () => {
        alertDialog.waitForAlertDialog();
        expect(alertDialog.getAlertDialog()).toEqual(expectedCameraAlertError);
    });
});
