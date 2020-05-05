import calculatePayments from '../utils/calculatePayments';
import { initialCreditParams } from './creditParams';

const SET_PAYMENT_SCHEDULE = 'SET_PAYMENT_SCHEDULE';

export function setPaymentSchedule(data) {
    return {
        type: SET_PAYMENT_SCHEDULE,
        data
    };
}

const initialState = calculatePayments(initialCreditParams);

export default function paymentSchedule(state = initialState, action) {
    switch (action.type) {
        case SET_PAYMENT_SCHEDULE:
            return action.data;
        default:
            return state;
    }
}
