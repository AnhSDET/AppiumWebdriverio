import { Screen } from '../../../../shared/screens/';
import { OverviewSelectorXCA } from '../selectors/overview.selector';

class OverviewScreenXCA extends Screen {
    private selector = new OverviewSelectorXCA();

    public waitForDisplay(): void {
        let overviewElements: Array<WebdriverIO.Element> = [];
        overviewElements.push(this.selector.overViewTitle, this.selector.settingsButton, this.selector.plusButton);
        super.waitForElementsDisplay(overviewElements);
    }

    public isOverviewScreenDisplay(): boolean {
        return this.selector.settingsButton.isDisplayed() && this.selector.overViewTitle.isDisplayed() && this.selector.plusButton.isDisplayed();
    }

    public getOverviewScreenTitle(): string {
        return this.selector.overViewTitle.getText();
    }

    public tapSettingButton(): void {
        this.selector.settingsButton.click();
    }

    public tapPlusButton(): void {
        this.selector.plusButton.click();
    }

    public getExpertiseReportsList(): Array<any> {
        let reportsList: Array<any> = [];

        const expertiseReportSelectors: Array<WebdriverIO.Element> = this.selector.expertiseReportsList;
        for (let index in expertiseReportSelectors) {
            reportsList.push(expertiseReportSelectors[index].getText()); //todo: not correct function
        }

        return reportsList;
    }

    public getNumberOfExpertiseReports(): number {
        return this.selector.expertiseReportsList.length;
    }

    public displayExpertiseReport(reportPosition: number) {
        const expertiseReportSelectors: Array<WebdriverIO.Element> = this.selector.expertiseReportsList;
        const reportToOpenSelector: WebdriverIO.Element = expertiseReportSelectors[reportPosition];
        reportToOpenSelector.click();
        super.waitUntilElementNotDisplay(reportToOpenSelector);
        return this;
    }

    public getAReportDetails(): Array<string> {
        let reportDetails: Array<string> = [];

        let details = this.selector.expertiseReportDetails;
        for (let index in details) {
            reportDetails.push(details[index].getText());
        }
        return reportDetails;
    }
}

const expectedOverviewScreenTitle: string = 'XpertCenter';
const expectedDefaultExpertiseReports: Array<any> = [];
const expectedDraftExpertiseReportNoQRCodeNoPhoto: Array<string> = ['', 'Draft', '', '', 'No Photo', ''];
export const overviewScreenXCA = new OverviewScreenXCA();
export { expectedDefaultExpertiseReports, expectedDraftExpertiseReportNoQRCodeNoPhoto, expectedOverviewScreenTitle };
