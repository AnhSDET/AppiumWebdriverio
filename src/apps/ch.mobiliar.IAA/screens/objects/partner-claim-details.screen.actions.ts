import { PartnerClaimDetailsSelectors } from '../selectors/partner-claim-details.selectors';
import { Screen } from '../../../../shared/screens';
import Gestures from '../../../../shared/helpers/gestures';

class PartnerClaimDetailsScreenActions extends Screen {
    private claimDetailsSelectors = new PartnerClaimDetailsSelectors();

    public getClaimDetails(): Array<string>[] {
        const claimDetailsSelectors: Array<WebdriverIO.Element>[] = this.claimDetailsSelectors.getClaimDetails();

        let claimDetails: Array<string>[] = [];

        const size: number = claimDetailsSelectors.length;

        for (let i = 0; i < size; i++) {
            const innerArrayLength = claimDetailsSelectors[i].length;
            for (let j = 0; j < innerArrayLength; j++) {
                Gestures.scrollIntoView(claimDetailsSelectors[i][j]);

                const innerLabel: string = claimDetailsSelectors[i][j].getText();
                Gestures.scrollIntoView(claimDetailsSelectors[i][j++]);

                const innerContent: string = claimDetailsSelectors[i][j++].getText();

                claimDetails.push([innerLabel, innerContent]);
            }
        }

        return claimDetails;
    }

    public getPaymentInformation(): Array<string>[] {
        let paymentInformation: Array<string>[] = [];

        let compensation: Array<string> = this.getCompensation();
        paymentInformation.push(compensation);

        let netCosts: Array<string> = this.getNetCosts();
        paymentInformation.push(netCosts);

        return paymentInformation;
    }

    public getCompensation(): Array<string> {
        let compensationSelectors: Array<WebdriverIO.Element> = this.claimDetailsSelectors.compensation;
        let compensation: Array<string> = [];
        for (let index in compensationSelectors) {
            Gestures.scrollIntoView(compensationSelectors[index]);
            compensation.push(compensationSelectors[index].getText());
        }
        return compensation;
    }

    public getNetCosts(): Array<string> {
        let netCostSelectors: Array<WebdriverIO.Element> = this.claimDetailsSelectors.netCost;
        let netCosts: Array<string> = [];
        for (let index in netCostSelectors) {
            Gestures.scrollIntoView(netCostSelectors[index]);
            netCosts.push(netCostSelectors[index].getText());
        }
        return netCosts;
    }

    public getResponsibleEmployeeForPartialClaim(): Array<string> {
        let employeeSelector: Array<WebdriverIO.Element> = this.claimDetailsSelectors.employeeCardTitleAndContent;
        let employeeNameAndDetails: Array<string> = [];
        for (let index in employeeSelector) {
            Gestures.scrollIntoView(employeeSelector[index]);
            employeeNameAndDetails.push(employeeSelector[index].getText());
        }
        return employeeNameAndDetails;
    }

    public getPaymentErrorInformation(): string {
        Gestures.scrollIntoView(this.claimDetailsSelectors.paymentErrorMessage);
        return this.claimDetailsSelectors.paymentErrorMessage.getText();
    }

    public isPaymentErrorIconDisplayed(): boolean {
        return this.claimDetailsSelectors.paymentErrorIcon.isDisplayed();
    }
}

const expectedPaymentErrorInfo: string = 'The payment information cannot be displayed at the moment.';

export { expectedPaymentErrorInfo };

export const partnerClaimDetailsScreen = new PartnerClaimDetailsScreenActions();
