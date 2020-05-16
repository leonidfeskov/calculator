const SET_CREDIT_PARAM = 'SET_CREDIT_PARAM';

export const CALCULATING_TYPE = {
    BY_PERIOD: 'by_period',
    BY_PAYMENT: 'by_payment',
};

export function setCreditParam(name, value) {
    return {
        type: SET_CREDIT_PARAM,
        name,
        value,
    };
}

export const initialCreditParams = {
    calculatingType: CALCULATING_TYPE.BY_PAYMENT,
    creditSum: 200000,
    creditPercent: 10,
    paymentPerMonth: 10000,
    creditPeriod: 60,
    prepayments: [
        {
            date: '2020-06-15',
            payment: 5000,
            repeat: 'everyMonth',
        },
    ],
};

export default function creditParams(state = initialCreditParams, action) {
    switch (action.type) {
        case SET_CREDIT_PARAM:
            return {
                ...state,
                [action.name]: action.value,
            };
        default:
            return state;
    }
}
