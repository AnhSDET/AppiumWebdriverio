import { Screen } from '../../../../shared/screens';
import { SearchResultSelectors } from '../selectors/search-result.selectors';

class SearchResultScreen extends Screen {
    private selector = new SearchResultSelectors();

    private defineScreenElements(): Array<WebdriverIO.Element> {
        const searchResultScreenElements: Array<WebdriverIO.Element> = [];
        searchResultScreenElements.push(this.selector.searchCriteriaInfo, this.selector.searchResultItems[0], this.selector.searchResultItemTitle[0]);
        return searchResultScreenElements;
    }

    public waitForDisplay(): void {
        super.waitForElementsDisplay(this.defineScreenElements());
    }

    private waitForNotDisplay(): void {
        const searchResultElements: Array<WebdriverIO.Element> = [];
        searchResultElements.push(this.selector.searchCriteriaInfo, this.selector.editButton);
        super.waitUntilElementsNotDisplay(searchResultElements);
    }

    public selectFirstResult() {
        this.selector.searchResultItems[0].click();
        this.waitForNotDisplay();
    }

    public selectResultAtIndex(index: number) {
        this.selector.searchResultItems[index].click();
        this.waitForNotDisplay();
    }

    public tapEditButton(): void {
        this.selector.editButton.click();
        this.waitForNotDisplay();
    }
}

export const searchResultScreen = new SearchResultScreen();
