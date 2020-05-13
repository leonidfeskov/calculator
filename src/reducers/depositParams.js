const SET_DEPOSIT_PARAMS = 'SET_DEPOSIT_PARAMS';

export function setDepositParams(params) {
    return {
        type: SET_DEPOSIT_PARAMS,
        params,
    };
}

export const initialDepositParams = {
    initialSum: 0,
    percentage: 5,
    payment: 50000,
    period: 12,
};

export default function depositParams(state = initialDepositParams, action) {
    switch (action.type) {
        case SET_DEPOSIT_PARAMS:
            return { ...action.params };
        default:
            return state;
    }
}
