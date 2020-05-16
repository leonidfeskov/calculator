const SET_DEPOSIT_PARAM = 'SET_DEPOSIT_PARAM';

export function setDepositParam(name, value) {
    return {
        type: SET_DEPOSIT_PARAM,
        name,
        value,
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
        case SET_DEPOSIT_PARAM:
            return {
                ...state,
                [action.name]: action.value,
            };
        default:
            return state;
    }
}
