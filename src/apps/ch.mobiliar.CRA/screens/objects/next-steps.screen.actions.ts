import Input from '../../../../shared/helpers/input';
import { Screen } from '../../../../shared/screens';
import { NextStepsSelectors } from '../selectors/next-steps.selectors';

class NextStepsScreen extends Screen {
    private selector = new NextStepsSelectors();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const nextStepsScreenElements: Array<WebdriverIO.Element> = [];
        nextStepsScreenElements.push(
            this.selector.claimActionsScreenIdentity,
            this.selector.sendConfirmationToggle,
            this.selector.responsibleGA,
            this.selector.commentInput,
            this.selector.nextButton
        );
        return nextStepsScreenElements;
    }

    public waitForDisplay() {
        super.waitForElementsDisplay(this.defineScreenElements());
    }

    public isNextStepsScreenDisplayed(): boolean {
        return this.selector.claimActionsScreenIdentity.isDisplayed();
    }

    public enterComment(comment: string) {
        Input.setInputValue(this.selector.commentInput, comment);
    }

    public toggleSendConfirmation() {
        this.selector.sendConfirmationToggle.click();
    }

    public tapNextButton(): void {
        this.selector.nextButton.click();
    }

    public processData(comment: string) {
        this.toggleSendConfirmation();
        this.enterComment(comment);
    }
}

export const nextStepsScreen = new NextStepsScreen();
