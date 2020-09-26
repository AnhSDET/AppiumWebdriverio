import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { overviewScreenCIA } from '../../screens/objects/overview.screen.actions';
import { expectedEmptyReportInformation } from '../../screens/objects/overview.screen.actions';

describe('test the new CIA app for iPhone flow ', () => {
    beforeEach(() => {
        Contexts.switchToWebview();
        Preconditions.authenticateWithValidCredentialsMtanCIA();
        Preconditions.createAnIncompleteReportOnOverviewScreen();
    });
    afterEach(() => {
        browser.reloadSession();
    });
    it('should be able to remove a yet uploaded inspection report by long press and trash bin icon', () => {
        overviewScreenCIA.removeAnIncompleteInspectionReportViaTrashBinIcon();
        console.log(overviewScreenCIA.getEmptyReportInformation());
        expect(overviewScreenCIA.getEmptyReportInformation()).toEqual(expectedEmptyReportInformation);
    });
    it('should be able to remove a yet uploaded inspection report by long press until the aler displaying', () => {
        overviewScreenCIA.removeAnIncompleteInspectionReportViaAlert();
        console.log(overviewScreenCIA.getEmptyReportInformation());
        expect();
    });
});
