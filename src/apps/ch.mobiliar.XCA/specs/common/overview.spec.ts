import { Contexts } from '../../../../shared/helpers';
import { Preconditions } from '../../../../shared/helpers/preconditions';
import { newExpertiseScreen } from '../../screens/objects/new-expertise.screen.action';
import { expectedDefaultExpertiseReports, overviewScreenXCA } from '../../screens/objects/overview.screen.action';

describe('Screen: Overview', () => {
    beforeEach(() => {
        browser.switchContext(Contexts.WebView);
        Preconditions.authenticateWithValidCredentialsMtanXCA();
    });
    afterEach(() => {
        browser.reloadSession();
    });

    xit('HAN-162: should be able to abort the expertise creation and navigate back to overview screen', () => {
        newExpertiseScreen.tapCloseNewExpertiseScreenButton();
        newExpertiseScreen.tapOptAbortCreationOfExpertise();
        expect(overviewScreenXCA.getExpertiseReportsList()).toEqual(expectedDefaultExpertiseReports);
        expect(overviewScreenXCA.getNumberOfExpertiseReports()).toBe(0);
        expect(overviewScreenXCA.isOverviewScreenDisplay()).toBe(true);
    });
});
