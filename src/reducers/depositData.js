import calculateDeposit from 'src/calc/deposit';
import { initialDepositParams } from 'src/reducers/depositParams';

const SET_DEPOSIT_DATA = 'SET_DEPOSIT_DATA';

export function setDepositData(data) {
    return {
        type: SET_DEPOSIT_DATA,
        data,
    };
}

const initialState = calculateDeposit(initialDepositParams);

export default function paymentSchedule(state = initialState, action) {
    switch (action.type) {
        case SET_DEPOSIT_DATA:
            return action.data;
        default:
            return state;
    }
}
