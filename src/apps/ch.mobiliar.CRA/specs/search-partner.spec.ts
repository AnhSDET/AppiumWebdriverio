import { searchPartnerScreen } from '../screens/objects/search-partner.screen.actions';
import { whoInvolvedScreen } from '../screens/objects/who-involved.screen.actions';
import { Preconditions } from '../../../shared/helpers/preconditions';
import { Contexts } from '../../../shared/helpers';
import { overviewScreenCRA } from '../screens/objects/overview.screen.actions';
import { menuScreen } from '../screens/objects/menu.action';

describe('Search Partner Screen', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCRA();

        overviewScreenCRA.waitForDisplay();

        overviewScreenCRA.tapCreateNewClaimCaseButton();

        whoInvolvedScreen.waitForDisplay();

        menuScreen.tapWhoInvolvedTab();

        whoInvolvedScreen.waitForDisplay();

        whoInvolvedScreen.tapSearchPartnerButton();

        searchPartnerScreen.waitForDisplay();
    });

    afterEach(() => {
        browser.reloadSession();
    });

    it('should be able to search by partner attributes and display proper result', () => {});

    it('should not prompt error if validate partner number with valid pattern', () => {});
});
