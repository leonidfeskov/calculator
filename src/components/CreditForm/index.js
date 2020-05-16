import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiButton from '@material-ui/core/Button';
import MuiGrid from '@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';
import Input from 'src/components/common/Input';
import Select from 'src/components/common/Select';
import Prepayments from 'src/components/CreditForm/Prepayments';
import { CALCULATING_TYPE, setCreditParam } from 'src/reducers/creditParams';
import { setCreditData } from 'src/reducers/creditData';
import calculateCredit from 'src/calc/credit';

export default function CreditForm() {
    const { creditParams } = useSelector((state) => state);
    const dispatch = useDispatch();

    const onChange = (name, value) => {
        dispatch(setCreditParam(name, value));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const creditData = calculateCredit(creditParams);
        dispatch(setCreditData(creditData));
    };

    return (
        <>
            <BoxTitle>Параметры кредита</BoxTitle>
            <Box>
                <form onSubmit={onSubmit} noValidate autoComplete="off">
                    <MuiGrid container spacing={3}>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Select
                                value={creditParams.calculatingType}
                                onChange={({ target }) => onChange('calculatingType', target.value)}
                                label="Способ расчета"
                            >
                                <MuiMenuItem value={CALCULATING_TYPE.BY_PAYMENT}>По сумме платежа</MuiMenuItem>
                                <MuiMenuItem value={CALCULATING_TYPE.BY_PERIOD}>По сроку кредита</MuiMenuItem>
                            </Select>
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={creditParams.creditSum}
                                onChange={({ target }) => onChange('creditSum', parseFloat(target.value))}
                                label="Сумма кредита"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <Input
                                value={creditParams.creditPercent}
                                onChange={({ target }) => onChange('creditPercent', parseFloat(target.value))}
                                label="Процентная ставка"
                            />
                        </MuiGrid>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            {creditParams.calculatingType === CALCULATING_TYPE.BY_PAYMENT && (
                                <Input
                                    value={creditParams.paymentPerMonth}
                                    onChange={({ target }) => onChange('paymentPerMonth', parseFloat(target.value))}
                                    label="Ежемесячный платеж"
                                />
                            )}
                            {creditParams.calculatingType === CALCULATING_TYPE.BY_PERIOD && (
                                <Input
                                    value={creditParams.creditPeriod}
                                    onChange={({ target }) => onChange('creditPeriod', parseFloat(target.value))}
                                    label="Срок кредита, мес."
                                />
                            )}
                        </MuiGrid>
                    </MuiGrid>
                    <Prepayments />
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
