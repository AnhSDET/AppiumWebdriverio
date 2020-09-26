import { Screen } from '../screen';
import { BaseOverviewSelectors } from '../selectors/base-overview.selectors';

export class BaseOverviewScreenActions extends Screen {
    private baseOverviewSelector = new BaseOverviewSelectors();

    constructor() {
        super();
    }

    public waitForDisplay(): void {
        super.waitForElementDisplay(this.baseOverviewSelector.baseSettingButton);
        super.waitForElementDisplay(this.baseOverviewSelector.basePlusButton);
    }

    public tapPlusButton(): void {
        this.baseOverviewSelector.basePlusButton.click();
        super.waitUntilElementNotDisplay(this.baseOverviewSelector.basePlusButton);
    }
}
