import { addItemIfNotExists, removeItem, removeProperty } from 'src/utils/common';

const SAVE_CREDIT = 'SAVE_CREDIT';
const ADD_CREDIT = 'ADD_CREDIT';
const REMOVE_CREDIT = 'REMOVE_CREDIT';

export function saveCredit(payload) {
    return {
        type: SAVE_CREDIT,
        payload,
    };
}

export const initialCreditParams = {
    creditSum: 5000000,
    creditPercent: 9.5,
    paymentPerMonth: 50000,
};

export const initialCredits = {
    names: ['default'],
    creditByName: {
        default: initialCreditParams,
    },
};

export default function credits(state = initialCredits, { type, payload }) {
    switch (type) {
        case ADD_CREDIT:
        case SAVE_CREDIT:
            return {
                ...state,
                names: addItemIfNotExists(state.names, payload.name),
                creditByName: { ...state.creditByName, [payload.name]: { ...payload } },
            };
        case REMOVE_CREDIT:
            return {
                ...state,
                names: removeItem(state.names, payload.name),
                creditByName: removeProperty(state.creditByName, payload.name),
            };
        default:
            return state;
    }
}
