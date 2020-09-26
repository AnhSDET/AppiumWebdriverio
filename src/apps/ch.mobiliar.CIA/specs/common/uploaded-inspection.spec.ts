import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';

describe('test the new CIA app for iPhone flow ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Preconditions.prepareAnUploadedInspectionReport();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should display the proper start screen after uploaded an inspection report', () => {});
    //it('should not be able to remove an uploaded inspection report', () => {});
});
