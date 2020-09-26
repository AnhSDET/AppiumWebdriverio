const credentials = {
    invalid: {
        username: 'test@gmail.com',
        password: '12345678'
    },
    valid: {
        usernameCRA: 'TEST\\U903662',
        usernameCRA_Protekta: '',
        usernameCIA: 'TEST\\U903257',
        usernameIAA: 'TEST\\U903662',
        usernameXCA: 'TEST\\U903634',
        password: 'Compaq@1'
    }
};
const partnerNumber = {
    personal: {
        male1: '10079196',
        male2: '11752272',
        male3: '10071264',
        female: 'P-2400-2945',
        peterMuller: 'P-1241-1850'
    },
    companyList: {
        company1: '13771183',
        company2: 'P-1537-7598',
        company3: '10181768'
    },
    group: {
        group1: 'P24003829'
    }
};

const commonClaimNumberForInspection = '840011012882';

export { credentials, partnerNumber, commonClaimNumberForInspection };
