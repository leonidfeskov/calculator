const SET_CREDIT_PARAMS = 'SET_CREDIT_PARAMS';

export const CALCULATING_TYPE = {
    BY_PERIOD: 'by_period',
    BY_PAYMENT: 'by_payment',
};

export function setCreditParams(params) {
    return {
        type: SET_CREDIT_PARAMS,
        params,
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
        case SET_CREDIT_PARAMS:
            return { ...action.params };
        default:
            return state;
    }
}
