import { addItemIfNotExists, removeItem, removeProperty } from 'src/utils/common';
import calculatePayments from 'src/calc/credit';
import { initialCreditParams } from 'src/reducers/creditParams';

const SAVE_CREDIT = 'SAVE_CREDIT';
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

export function setActive({ name }) {
    return {
        type: SET_ACTIVE,
        payload: { name },
    };
}

const initialPayments = calculatePayments(initialCreditParams);
const DEFAULT_NAME = 'default';

export const initialCredits = {
    names: [DEFAULT_NAME],
    active: DEFAULT_NAME,
    creditByName: {
        default: {
            ...initialCreditParams,
            name: DEFAULT_NAME,
            creditPeriod: initialPayments.summary.monthCount,
        },
    },
    scheduleByName: {
        default: initialPayments,
    },
};

export default function credits(state = initialCredits, { type, payload }) {
    switch (type) {
        case ADD_CREDIT:
        case SAVE_CREDIT: {
            const payments = calculatePayments(payload);
            const creditParams = {
                ...payload,
                creditPeriod: payments.summary.monthCount,
                paymentPerMonth: payments.summary.payment,
            };
            return {
                ...state,
                names: addItemIfNotExists(state.names, payload.name),
                creditByName: { ...state.creditByName, [payload.name]: creditParams },
                scheduleByName: {
                    ...state.scheduleByName,
                    [payload.name]: payments,
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
        case SET_ACTIVE:
            return {
                ...state,
                active: payload.name,
            };
        default:
            return state;
    }
}
