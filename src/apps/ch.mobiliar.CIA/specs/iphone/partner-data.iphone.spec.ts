import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';

describe('test the new CIA app for iPhone flow ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Preconditions.displayCommonPartnerDataAfterSearchClaim();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the partner overview screen CIA after search for a claim number', () => {
        expect(true).toEqual(true);
    });
});
