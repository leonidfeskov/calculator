import { addItemIfNotExists, removeItem, removeProperty } from 'src/utils/common';
import calculatePayments from 'src/calc/credit';

const SAVE_CREDIT = 'SAVE_CREDIT';
const LOCK_FIELD = 'LOCK_FIELD';
const ADD_CREDIT = 'ADD_CREDIT';
const REMOVE_CREDIT = 'REMOVE_CREDIT';
const SET_ACTIVE = 'SET_ACTIVE';

export function addCredit(payload) {
    return {
        type: SAVE_CREDIT,
        payload,
    };
}

export function saveCredit(payload) {
    return {
        type: SAVE_CREDIT,
        payload,
    };
}

export function lockField({ name, field, value }) {
    return {
        type: LOCK_FIELD,
        payload: { name, field, value },
    };
}

export function setActive({ name }) {
    return {
        type: SET_ACTIVE,
        payload: { name },
    };
}

export const initialCreditParams = {
    creditSum: 5000000,
    creditPercent: 9.5,
    paymentPerMonth: 50000,
    months: null,
    overpayment: null,
    locked: {
        creditSum: true,
        creditPercent: true,
        paymentPerMonth: true,
        months: false,
        overpayment: false,
    },
};

const DEFAULT_NAME = 'default';

export const initialCredits = {
    names: [DEFAULT_NAME],
    active: DEFAULT_NAME,
    creditByName: {
        default: { ...initialCreditParams, name: DEFAULT_NAME },
    },
    scheduleByName: {
        default: calculatePayments(initialCreditParams),
    },
};

export default function credits(state = initialCredits, { type, payload }) {
    switch (type) {
        case ADD_CREDIT:
        case SAVE_CREDIT: {
            const creditParams = { ...payload };
            return {
                ...state,
                names: addItemIfNotExists(state.names, payload.name),
                creditByName: { ...state.creditByName, [payload.name]: creditParams },
                scheduleByName: {
                    ...state.scheduleByName,
                    [payload.name]: calculatePayments(creditParams),
                },
            };
        }
        case REMOVE_CREDIT:
            return {
                ...state,
                names: removeItem(state.names, payload.name),
                creditByName: removeProperty(state.creditByName, payload.name),
                scheduleByName: removeProperty(state.scheduleByName, payload.name),
                active: state.active === payload.name ? null : state.active,
            };
        case LOCK_FIELD:
            return {
                ...state,
                creditByName: {
                    ...state.creditByName,
                    [payload.name]: {
                        ...state.creditByName[payload.name],
                        locked: { ...state.creditByName[payload.name].locked, [payload.field]: payload.value },
                    },
                },
            };
        case SET_ACTIVE:
            return {
                ...state,
                active: payload.name,
            };
        default:
            return state;
    }
}
