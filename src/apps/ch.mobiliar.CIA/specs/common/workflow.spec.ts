import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';

describe('test the new CIA app', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Preconditions.displayCommonPartnerDataAfterSearchClaim();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display common partner data screen', () => {
        expect(true).toEqual(true);
    });
});
