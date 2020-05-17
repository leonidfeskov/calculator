import { formatDateISO } from 'src/utils/date';

const SET_CREDIT_PARAM = 'SET_CREDIT_PARAM';
const ADD_EMPTY_PREPAYMENT = 'ADD_EMPTY_PREPAYMENT';
const REMOVE_PREPAYMENT = 'REMOVE_PREPAYMENT';
const SET_PREPAYMENT_PARAM = 'SET_PREPAYMENT_PARAM';

export const CALCULATING_TYPE = {
    BY_PERIOD: 'by_period',
    BY_PAYMENT: 'by_payment',
};

export const PREPAYMENT_REPEAT = {
    MONTHLY: {
        id: 'monthly',
        name: 'Раз в месяц',
    },
    NONE: {
        id: 'none',
        name: 'один раз',
    },
};

const createNewPrepayment = () => ({
    id: Date.now(),
    date: formatDateISO(new Date()),
    payment: 1000,
    repeat: PREPAYMENT_REPEAT.NONE.id,
});

export function setCreditParam(name, value) {
    return {
        type: SET_CREDIT_PARAM,
        name,
        value,
    };
}

export function addEmptyPrepayment() {
    return {
        type: ADD_EMPTY_PREPAYMENT,
    };
}

export function removePrepayment(id) {
    return {
        type: REMOVE_PREPAYMENT,
        id,
    };
}

export function setPrepaymentParam(id, name, value) {
    return {
        type: SET_PREPAYMENT_PARAM,
        id,
        name,
        value,
    };
}

export const initialCreditParams = {
    calculatingType: CALCULATING_TYPE.BY_PAYMENT,
    creditSum: 2000000,
    creditPercent: 9.5,
    paymentPerMonth: 35000,
    creditPeriod: 60,
    prepayments: [
        // {
        //     id: '1',
        //     date: '2020-06-15',
        //     payment: 5000,
        //     repeat: PREPAYMENT_REPEAT.MONTHLY.id,
        // },
        // {
        //     id: '2',
        //     date: '2020-07-10',
        //     payment: 3000,
        //     repeat: PREPAYMENT_REPEAT.NONE.id,
        // },
    ],
};

export default function creditParams(state = initialCreditParams, action) {
    switch (action.type) {
        case SET_CREDIT_PARAM:
            return {
                ...state,
                [action.name]: action.value,
            };
        case ADD_EMPTY_PREPAYMENT:
            return {
                ...state,
                prepayments: [...state.prepayments, createNewPrepayment()],
            };
        case REMOVE_PREPAYMENT:
            return {
                ...state,
                prepayments: state.prepayments.filter((prepayment) => prepayment.id !== action.id),
            };
        case SET_PREPAYMENT_PARAM:
            return {
                ...state,
                prepayments: state.prepayments.map((prepayment) => {
                    if (prepayment.id === action.id) {
                        return {
                            ...prepayment,
                            [action.name]: action.value,
                        };
                    }
                    return prepayment;
                }),
            };
        default:
            return state;
    }
}
