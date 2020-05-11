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
    creditSum: 1000000,
    creditPercent: 9.5,
    paymentPerMonth: 50000,
    creditPeriod: 60,
};

export default function creditParams(state = initialCreditParams, action) {
    switch (action.type) {
        case SET_CREDIT_PARAMS:
            return { ...action.params };
        default:
            return state;
    }
}
