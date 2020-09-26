import { Screen } from '../../../../shared/screens';
import { PartnerDetailsSelectorsIAA } from '../selectors/partner-details.selectors';
import Gestures from '../../../../shared/helpers/gestures';
import { Contexts } from '../../../../shared/helpers';

export class PartnerDetailsScreenIAA extends Screen {
    private partnerDetailsSelector = new PartnerDetailsSelectorsIAA();

    public getContactInfo(): Array<string> {
        let contactInfoSelectors: Array<WebdriverIO.Element> = this.partnerDetailsSelector.mobiItemTextLabelAndContent;
        let contactInfoValues: Array<string> = [];
        for (let index in contactInfoSelectors) {
            Gestures.scrollIntoView(contactInfoSelectors[index]);
            contactInfoValues.push(contactInfoSelectors[index].getText().trim());
        }
        return contactInfoValues;
    }

    public getTextOfMobiAccount(): Array<string> {
        let mobiAccountSelectors: Array<WebdriverIO.Element> = this.partnerDetailsSelector.getMobiItemCardTitleAndContent(1);
        let mobiAccountValues: Array<string> = [];
        for (let index in mobiAccountSelectors) {
            Gestures.scrollIntoView(mobiAccountSelectors[index]);
            mobiAccountValues.push(mobiAccountSelectors[index].getText().trim());
        }
        return mobiAccountValues;
    }

    public getTextBankAccount(): Array<string> {
        let bankAccountSelectors: Array<WebdriverIO.Element> = this.partnerDetailsSelector.getMobiItemCardTitleAndContent(2);
        let bankAccountValues: Array<string> = [];
        for (let index in bankAccountSelectors) {
            Gestures.scrollIntoView(bankAccountSelectors[index]);
            bankAccountValues.push(bankAccountSelectors[index].getText().trim());
        }
        return bankAccountValues;
    }

    public getTextResponsibleAgent(): Array<string> {
        let MBASelectors: Array<WebdriverIO.Element> = this.partnerDetailsSelector.getMobiItemCardTitleAndContent(3);
        let MBAvalues: Array<string> = [];
        for (let index in MBASelectors) {
            Gestures.scrollIntoView(MBASelectors[index]);
            MBAvalues.push(MBASelectors[index].getText().trim());
        }
        return MBAvalues;
    }

    public displayResponsibleAgentCommunication() {
        const ellipsisIcons: Array<WebdriverIO.Element> = this.partnerDetailsSelector.ellipsisIcons;
        ellipsisIcons[1].click();
    }

    public getMBAcommunicationDisplayingStates(): Array<boolean> {
        Contexts.switchToNative();
        let states: Array<boolean> = [];
        states.push(this.isMBALabelDisplayed(), this.isMBACallNumberDisplayed(), this.isMBAEmailDisplayed(), this.isCallNativeDisplayed());
        Contexts.switchToWebview();
        return states;
    }

    public isMBALabelDisplayed(): boolean {
        return this.partnerDetailsSelector.mbaCommunicationLabel.isDisplayed();
    }

    public isMBACallNumberDisplayed(): boolean {
        return this.partnerDetailsSelector.mbaCommunicationPhone.isDisplayed();
    }

    public isMBAEmailDisplayed(): boolean {
        return this.partnerDetailsSelector.mbaCommunicationEmail.isDisplayed();
    }

    public isCallNativeDisplayed(): boolean {
        const mbaPhone: WebdriverIO.Element = this.partnerDetailsSelector.mbaCommunicationPhone;
        mbaPhone.click();
        return mbaPhone.isDisplayed();
    }

    public getCustomerPortalAndBankAndMBA(): Array<string> {
        let mobiCards: Array<string> = [];
        //mobiCards.push(this.getTextOfMobiAccount(), this.getTextBankAccount(), this.getTextResponsibleAgent());
        return mobiCards;
    }
}

const expectedMBA: Array<string> = ['Marco Pancaldi', 'U114454\nAesch (105)'];
const expectedBankAccount: Array<string> = ['UBS Switzerland AG', 'Aeschenplatz 6, 4002 Basel\nCH510023323379796540P'];
const expectedMobiAccount: Array<string> = ['MyMobiliar', 'C-1000376'];
const expectedNoMobiAccount: Array<string> = ['MyMobiliar', 'has no login'];
const expectedContactInfo: Array<string> = [
    'Telephone number',
    'Mobile number',
    'Business number',
    'E-mail',
    'Address',
    'Profession',
    'Partner Roles',
    '+41611961736',
    '+41756931098',
    '+41615493889',
    'Ebener@test3.xx',
    'Spitzwaldhof, 4123 Allschwil',
    'Archäologischer Grabungstechniker/Archäologische Grabungstechnikerin',
    'Schadenpartner, Beziehungspartner'
];
export { expectedContactInfo, expectedMobiAccount, expectedNoMobiAccount, expectedMBA, expectedBankAccount };
