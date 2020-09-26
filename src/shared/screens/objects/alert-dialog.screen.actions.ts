import { Screen } from '../screen';
import { AlertDialogSelector } from '../selectors/alert-dialog.selector';

class AlertDialog extends Screen {
    private selector = new AlertDialogSelector();

    public waitForAlertDialog(): void {
        super.waitForElementDisplay(this.selector.alertDialog);
    }

    public isAlertDialogDisplayed(): boolean {
        return this.selector.alertDialog.isDisplayed();
    }

    public getAlertDialog(): Array<string> {
        this.waitForAlertDialog();
        let alertDialogButtons = this.selector.alertDialogButtons;
        let alertDialog: Array<string> = [];
        alertDialog.push(this.selector.alertTitle.getText(), this.selector.alertContentMessage.getText());
        for (let index in alertDialogButtons) {
            alertDialog.push(alertDialogButtons[index].getText());
        }
        return alertDialog;
    }

    public tapAlertDialogButtonFirst(): void {
        this.waitForAlertDialog();
        super.waitForElementDisplay(this.selector.alertDialogButtons[0]);
        this.selector.alertDialogButtons[0].click();
        super.waitUntilElementNotExist(this.selector.alertDialog);
    }

    public tapAlertDialogButtonSecond(): void {
        this.waitForAlertDialog();
        super.waitForElementDisplay(this.selector.alertDialogButtons[1]);
        this.selector.alertDialogButtons[1].click();
        super.waitUntilElementNotExist(this.selector.alertDialog);
    }

    public tapAlertDialogButtonAndWaitForAlertNotDisplay(buttonName: string): void {
        switch (buttonName) {
            case expectedLoginErrorAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedCameraAlertError[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedCameraAlertError[3]:
                this.tapAlertDialogButtonSecond();
                break;
            case expectedRemoveImageAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedRemoveImageAlertDialog[3]:
                this.tapAlertDialogButtonSecond();
                break;
            case expectedDeleteClaimAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedDeleteClaimAlertDialog[3]:
                this.tapAlertDialogButtonSecond();
                break;
            case expectedRemovePartnerAlertDialog[2]:
                this.tapAlertDialogButtonFirst();
                break;
            case expectedRemovePartnerAlertDialog[3]:
                this.tapAlertDialogButtonSecond();
                break;
            default:
                break;
        }
    }
}

const expectedLoginErrorAlertDialog: Array<string> = ['Error', 'Invalid username or password. Please check your credentials.', 'OK'];

const expectedCameraAlertError: Array<string> = [
    'Camera access needed!',
    'We would like to use the Camera to scan QR codes. Please enable this permission in App settings.',
    "Don't allow",
    'OK'
];
const expectedAlertMtanDialog: Array<string> = ['Error', 'Invalid confirmation code. Please try again.', 'OK'];
const expectedRemoveImageAlertDialog: Array<string> = ['Remove data', 'Do you really want to remove the data?', 'Cancel', 'Remove'];
//claim app

const expectedDeleteClaimAlertDialog: Array<string> = ['Delete this claim', 'Are you sure you want to delete this claim?', 'Cancel', 'Delete'];
const expectedRemovePartnerAlertDialog: Array<string> = [
    'Remove this partner?',
    'Do you want to remove this partner from the current Claim?',
    'Cancel',
    'Remove'
];

const expectedFatalErrorAlertDialog: Array<string> = ['Error', 'Something went wrong. Please try again later.', 'OK'];

export {
    expectedLoginErrorAlertDialog,
    expectedCameraAlertError,
    expectedAlertMtanDialog,
    expectedRemoveImageAlertDialog,
    expectedDeleteClaimAlertDialog,
    expectedRemovePartnerAlertDialog,
    expectedFatalErrorAlertDialog
};

export const alertDialog = new AlertDialog();
