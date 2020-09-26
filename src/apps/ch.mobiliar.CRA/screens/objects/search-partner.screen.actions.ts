import { Screen } from '../../../../shared/screens';
import { SearchPartnerSeletors } from '../selectors/search-partner.seletors';
import Input from '../../../../shared/helpers/input';

class SearchPartnerScreen extends Screen {
    private selector = new SearchPartnerSeletors();

    public waitForDisplay() {}

    private hideKeyboard(): void {
        if (browser.isKeyboardShown()) {
            browser.hideKeyboard();
        }
    }
}

export const searchPartnerScreen = new SearchPartnerScreen();
