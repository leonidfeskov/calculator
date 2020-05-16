import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import Input from 'src/components/common/Input';
import { setDepositParam } from 'src/reducers/depositParams';
import { setDepositData } from 'src/reducers/depositData';
import calculateDeposit from 'src/calc/deposit';

export default function CreditForm() {
    const { depositParams } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onChange = (name, value) => {
        dispatch(setDepositParam(name, value));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const depositData = calculateDeposit(depositParams);
        dispatch(setDepositData(depositData));
    };

    return (
        <>
            <BoxTitle>Параметры вклада</BoxTitle>
            <Box>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                    <MuiGrid container spacing={3}>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={depositParams.initialSum}
                                onChange={({ target }) => onChange('initialSum', parseFloat(target.value))}
                                label="Первоначальный вклад"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={depositParams.percentage}
                                onChange={({ target }) => onChange('percentage', parseFloat(target.value))}
                                label="Процентная ставка"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={depositParams.payment}
                                onChange={({ target }) => onChange('payment', parseFloat(target.value))}
                                label="Ежемесячное пополнение"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={depositParams.period}
                                onChange={({ target }) => onChange('period', parseFloat(target.value))}
                                label="Срок вклада, мес."
                            />
                        </MuiGrid>
                    </MuiGrid>
                    <MuiGrid container justify="flex-end" spacing={3}>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <MuiButton variant="contained" color="primary" fullWidth type="submit" onClick={onSubmit}>
                                Рассчитать
                            </MuiButton>
                        </MuiGrid>
                    </MuiGrid>
                </form>
            </Box>
        </>
    );
}
