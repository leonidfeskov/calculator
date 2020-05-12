import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MuiGrid from '@material-ui/core/Grid';
import MuiBox from '@material-ui/core/Box';

import BoxTitle from 'src/components/common/Box/Title';
import CreditForm from 'src/components/CreditForm';
import { initialCreditParams, addCredit } from 'src/reducers/credits';
import { setPaymentSchedule } from 'src/reducers/paymentSchedule';
import MuiIconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

let creditNameCounter = 1;

export default function MultiCreditForm() {
    const { names, scheduleByName } = useSelector((state) => state.credits);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(setPaymentSchedule(scheduleByName.default));
    };

    const addOneMoreCredit = () => {
        dispatch(addCredit({ ...initialCreditParams, name: `credit${creditNameCounter}` }));
        creditNameCounter += 1;
    };

    return (
        <MuiBox mb={2}>
            <BoxTitle>Параметры кредита</BoxTitle>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
                <MuiGrid container xs={12} spacing={3}>
                    {names.map((name) => (
                        <MuiGrid key={name} item xs={12} md={3} lg={3}>
                            <CreditForm name={name} />
                        </MuiGrid>
                    ))}
                    <MuiGrid key={name} item xs={12} md={3} lg={3}>
                        <MuiIconButton aria-label={`Добавить кредит`} onClick={addOneMoreCredit}>
                            <AddCircleIcon fontSize="large" style={{ fontSize: 50 }} color="primary" />
                        </MuiIconButton>
                    </MuiGrid>
                </MuiGrid>
            </form>
        </MuiBox>
    );
}