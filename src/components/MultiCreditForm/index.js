import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';
import MuiBox from '@material-ui/core/Box';

import BoxTitle from 'src/components/common/Box/Title';
import CreditForm from 'src/components/CreditForm';
import calculatePayments from 'src/utils/calculatePayments';
import { setPaymentSchedule } from 'src/reducers/paymentSchedule';

export default function MultipleCreditForm() {
    const { names, creditByName } = useSelector((state) => state.credits);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        const { creditSum, creditPercent, paymentPerMonth } = creditByName.default;
        const paymentSchedule = calculatePayments({ creditSum, creditPercent, paymentPerMonth });
        dispatch(setPaymentSchedule(paymentSchedule));
    };

    return (
        <MuiBox mb={2}>
            <BoxTitle>Параметры кредита</BoxTitle>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
                <MuiGrid spacing={3} direction="column">
                    <MuiGrid container spacing={3}>
                        {names.map((name) => (
                            <MuiGrid key={name} item xs={12} md={3} lg={3}>
                                <CreditForm name={name} />
                            </MuiGrid>
                        ))}
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiButton variant="contained" color="primary" fullWidth type="submit">
                            Рассчитать
                        </MuiButton>
                    </MuiGrid>
                </MuiGrid>
            </form>
        </MuiBox>
    );
}
