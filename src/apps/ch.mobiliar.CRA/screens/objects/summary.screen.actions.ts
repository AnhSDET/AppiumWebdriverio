import { Screen } from '../../../../shared/screens';
import { SummarySelectors } from '../selectors/summary.selectors';

class SummaryScreen extends Screen {
    private selector = new SummarySelectors();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const summaryScreenElements: Array<WebdriverIO.Element> = [];
        summaryScreenElements.push(
            this.selector.pageTitle
            //todo
        );
        return summaryScreenElements;
    }

    public waitForDisplay() {
        super.waitForElementsDisplay(this.defineScreenElements());
    }

    public tapGetClaimNumberButton(): void {
        this.selector.getClaimNumberButton.click();
    }

    public tapBeginInspectionButton(): void {
        this.selector.beginInspectionButton.click();
    }

    public tapRegisterAnotherClaimButton(): void {
        this.selector.registerAnotherClaimButton.click();
    }
}

export const summaryScreen = new SummaryScreen();
