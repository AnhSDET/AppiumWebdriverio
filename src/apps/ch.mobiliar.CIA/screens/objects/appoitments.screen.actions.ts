import { AppointmentsSelectors } from '../selectors/appointments.selectors';
import { Screen } from '../../../../shared/screens';

export class AppoitmentsScreenActions extends Screen {
    private appointmentScreenSelector = new AppointmentsSelectors();

    public waitForDisplay(): void {}

    public getEnabledDisabledStates(): Array<boolean> {
        let appointmentInputtedStates: Array<boolean> = [];
        appointmentInputtedStates.push(this.getInputtedDateState());
        appointmentInputtedStates.push(this.getInputtedTimeState());
        appointmentInputtedStates.push(this.getInspectionLocationState());
        appointmentInputtedStates.push(this.getContactPersonNameState());
        appointmentInputtedStates.push(this.getContactPersonPhoneState());

        return appointmentInputtedStates;
    }

    public getInputtedDateState(): boolean {
        return this.appointmentScreenSelector.inputtedDate.isEnabled();
    }

    public getInputtedTimeState(): boolean {
        return this.appointmentScreenSelector.inputtedTime.isEnabled();
    }

    public getInspectionLocationState(): boolean {
        return this.appointmentScreenSelector.inspectionLocation.isEnabled();
    }

    public getContactPersonNameState(): boolean {
        return this.appointmentScreenSelector.contacts[0].isEnabled();
    }

    public getContactPersonPhoneState(): boolean {
        return this.appointmentScreenSelector.contacts[1].isEnabled();
    }

    public getContactPerson(): string {
        return this.appointmentScreenSelector.contacts[0].getText();
    }

    public getInputtedDate(): string {
        return this.appointmentScreenSelector.inputtedDate.getText();
    }

    public getInputtedTime(): string {
        return this.appointmentScreenSelector.inputtedTime.getText();
    }

    public getInputtedInspectionLocation(): string {
        return this.appointmentScreenSelector.inspectionLocation.getText();
    }

    public getAddingButtonsDisplayingStates(): Array<boolean> {
        let plusButtons: Array<boolean> = [];
        let plusButtonSelectors: Array<WebdriverIO.Element> = this.appointmentScreenSelector.plusButtonsInsuranceAndPerson;
        for (let index in plusButtonSelectors) {
            plusButtons.push(plusButtonSelectors[index].isDisplayed());
        }
        return plusButtons;
    }
}
