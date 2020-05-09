const SET_CREDIT_PARAMS = 'SET_CREDIT_PARAMS';

export function setCreditParams(params) {
    return {
        type: SET_CREDIT_PARAMS,
        params,
    };
}

export const initialCreditParams = {
    creditSum: 1500000,
    creditPercent: 8.8,
    paymentPerMonth: 15036,
};

export default function creditParams(state = initialCreditParams, action) {
    switch (action.type) {
        case SET_CREDIT_PARAMS:
            return { ...action.params };
        default:
            return state;
    }
}
