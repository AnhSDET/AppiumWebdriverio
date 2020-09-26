import { OverviewSelectorsCIA } from '../selectors/overview.selectors';
import { BaseOverviewScreenActions } from '../../../../shared/screens/objects/base-overview.screen.actions';
import Gestures from '../../../../shared/helpers/gestures';
import { alertDialog } from '../../../../shared/screens';

class OverviewScreenActionsCIA extends BaseOverviewScreenActions {
    private overviewSelectorsCIA = new OverviewSelectorsCIA();

    public waitForAnInspectionReportDisplay(): void {
        super.waitForDisplay();
        super.waitForElementDisplay(this.overviewSelectorsCIA.incompleteInspectionReport);
    }

    public tapPlusButton(): void {
        super.tapPlusButton();
    }

    public getEmptyReportInformation(): Array<any> {
        let emptyInformationElements: Array<any> = [];
        emptyInformationElements.push(this.overviewSelectorsCIA.emptyTitle.getText());
        let emptyReportInformationList = this.overviewSelectorsCIA.emptyReportInformation;
        for (let dataOfSecondCol in emptyReportInformationList) {
            emptyInformationElements.push(emptyReportInformationList[dataOfSecondCol].getText());
        }

        return emptyInformationElements;
    }

    public getIncompleteInspectionReport() {}

    public removeAnIncompleteInspectionReportViaTrashBinIcon(): void {
        Gestures.dragAndDropWebviewElement(this.overviewSelectorsCIA.incompleteInspectionReport, -100, 0, true);
        this.tapTrashBinIcon();
        this.selectConfirmToDeleteAndWaitForInspectionReportNotDisplay();
    }

    public removeAnIncompleteInspectionReportViaAlert(): void {
        Gestures.dragAndDropWebviewElement(this.overviewSelectorsCIA.incompleteInspectionReport, -200, 0, true);
        this.selectConfirmToDeleteAndWaitForInspectionReportNotDisplay();
    }

    public tapTrashBinIcon(): void {
        this.overviewSelectorsCIA.deleteInspectionIcon.click();
    }

    private selectConfirmToDeleteAndWaitForInspectionReportNotDisplay(): void {
        alertDialog.tapAlertDialogButtonSecond();
        super.waitUntilElementNotDisplay(this.overviewSelectorsCIA.incompleteInspectionReport);
    }
}

export const overviewScreenCIA = new OverviewScreenActionsCIA();
const expectedEmptyReportInformation: Array<string> = [
    'You have not created report yet.',
    'A report contains following information:',
    'Data from the policy holder concerned',
    'Claims industry, sum, AB issue, etc.',
    'Place and time of the appointment as well as contact persons',
    'Space for taking inspection objects including photos',
    'Defining a further procedure'
];

export { expectedEmptyReportInformation };
