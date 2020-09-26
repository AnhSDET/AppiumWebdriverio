import { Screen } from '../../../../shared/screens';
import { PartnerRelationsSelectors } from '../selectors/partner-relations.selectors';
import Gestures from '../../../../shared/helpers/gestures';

export class PartnerRelationsScreen extends Screen {
    private partnerRelationSelector = new PartnerRelationsSelectors();

    public getNumberOfPartnersInRelation(): number {
        return this.partnerRelationSelector.partners.length;
    }

    public getPartnerRelationStates(): Array<string> {
        let stateSelectors: Array<WebdriverIO.Element> = this.partnerRelationSelector.relationStates;
        let stateValues: Array<string> = [];
        for (let index in stateSelectors) {
            Gestures.scrollIntoView(stateSelectors[index]);
            stateValues.push(stateSelectors[index].getText());
        }
        return stateValues;
    }

    public getPartnerRelationsInfo(): Array<string> {
        let partnerRelationSelectors: Array<WebdriverIO.Element> = this.partnerRelationSelector.partnerTitlesAndContents;
        let partnerRelationValues: Array<string> = [];
        for (let index in partnerRelationSelectors) {
            Gestures.scrollIntoView(partnerRelationSelectors[index]);
            partnerRelationValues.push(partnerRelationSelectors[index].getText().trim());
        }
        return partnerRelationValues;
    }

    public getNumberOfPartnersInStates(whatState: string): number {
        if (whatState == expectedStates[0]) {
            return this.partnerRelationSelector.activePartners.length;
        } else {
            return this.partnerRelationSelector.terminatedPartners.length;
        }
    }
}

const expectedStates: Array<string> = ['Active', 'Terminated'];
const expectedNumberOfPartnersInRelation: number = 6;
const expectedPartnerRelationsInfo: Array<string> = [
    'Fonseca Paul Müller',
    'Has contracts',
    'Mueller Kunz-Wagner Paul',
    'P-1009-2738\n02.12.1960 (59)',
    'P-1301-8718\n15.07.1986 (34)',
    'P-1332-4789\n18.03.1974 (46)',
    'P-1693-8914',
    'P-2047-8718\n15.05.1963 (57)',
    'P-2083-8050',
    'Paul Gloor',
    'Paul Gloor',
    'Paul Kenel',
    'Paul Wicki',
    'Role',
    'Role',
    'Role',
    'Role',
    'Role',
    'Role',
    'hat Kunde',
    'hat Makler von',
    'hat Zahlstelle',
    'ist Experte',
    'ist Kunde',
    'ist Zahlstelle zu'
];

export { expectedStates, expectedNumberOfPartnersInRelation, expectedPartnerRelationsInfo };
