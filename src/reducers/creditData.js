import calculatePayments from 'src/calc/credit';
import { initialCreditParams } from 'src/reducers/credits';

const SET_CREDIT_DATA = 'SET_CREDIT_DATA';

export function setCreditData(data) {
    return {
        type: SET_CREDIT_DATA,
        data,
    };
}

const initialState = calculatePayments(initialCreditParams);

export default function creditData(state = initialState, action) {
    switch (action.type) {
        case SET_CREDIT_DATA:
            return action.data;
        default:
            return state;
    }
}
