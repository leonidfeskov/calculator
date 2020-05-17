import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import MuiBox from '@material-ui/core/Box';
import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';

import Box from 'src/components/common/Box';
import NumberInput from 'src/components/common/Input/NumberInput';
import LargeSelect from 'src/components/common/Select/LargeSelect';
import Wtf from 'src/components/common/Wtf';
import { saveCredit, setActive } from 'src/reducers/credits';
import { setCreditData } from 'src/reducers/creditData';
import { numConversion, priceFormat } from 'src/utils/common';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { CALCULATING_TYPE } from 'src/reducers/creditParams';
import { MAX_MONTHS_COUNT } from 'src/calc/credit';

export default function CreditForm({ name }) {
    const { creditByName, scheduleByName, active } = useSelector(({ credits }) => credits);
    const creditParams = creditByName[name];
    const creditSchedule = scheduleByName[name];
    const isActive = active === creditParams.name;
    const dispatch = useDispatch();

    const onChange = (field, value) => {
        if (creditParams.hasOwnProperty(field)) {
            dispatch(
                saveCredit({
                    ...creditParams,
                    name,
                    [field]: value,
                })
            );
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(setActive({ name: creditParams.name }));
        dispatch(setCreditData(scheduleByName[creditParams.name]));
    };

    return (
        <Box elevation={isActive ? 10 : 2}>
            <form onSubmit={onSubmit} noValidate autoComplete="off">
                <MuiGrid container spacing={3} direction="column">
                    <MuiGrid item xs={12}>
                        <LargeSelect
                            value={creditParams.calculatingType}
                            onChange={({ target }) => onChange('calculatingType', target.value)}
                            label="Способ расчёта"
                        >
                            <MuiMenuItem value={CALCULATING_TYPE.BY_PAYMENT}>По сумме платежа</MuiMenuItem>
                            <MuiMenuItem value={CALCULATING_TYPE.BY_PERIOD}>По сроку кредита</MuiMenuItem>
                        </LargeSelect>
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <NumberInput
                            value={String(creditParams.creditPercent)}
                            onChange={(value) => onChange('creditPercent', value)}
                            label="Процентная ставка"
                            units="%"
                            step={0.5}
                            shiftStep={0.1}
                            minValue={0}
                            maxValue={100}
                            valueProcessor={(value) => Math.round(value * 10) / 10}
                        />
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <NumberInput
                            value={String(creditParams.creditSum)}
                            onChange={(value) => onChange('creditSum', value)}
                            label="Сумма кредита"
                            units="₽"
                            step={500000}
                            shiftStep={100000}
                            minValue={50000}
                            maxValue={100000000}
                        />
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        {creditParams.calculatingType === CALCULATING_TYPE.BY_PAYMENT && (
                            <NumberInput
                                value={String(creditParams.paymentPerMonth)}
                                onChange={(value) => onChange('paymentPerMonth', value)}
                                label="Платёж в месяц"
                                units="₽"
                                step={5000}
                                shiftStep={1000}
                                minValue={1000}
                                maxValue={100000000}
                            />
                        )}
                        {creditParams.calculatingType === CALCULATING_TYPE.BY_PERIOD && (
                            <NumberInput
                                value={String(creditParams.creditPeriod)}
                                onChange={(value) => onChange('creditPeriod', value)}
                                label="Срок кредита, мес."
                                units="мес"
                                step={12}
                                shiftStep={1}
                                minValue={1}
                                maxValue={MAX_MONTHS_COUNT}
                            />
                        )}
                    </MuiGrid>
                    {creditParams.calculatingType === CALCULATING_TYPE.BY_PAYMENT && (
                        <MuiGrid item xs={12}>
                            <MuiTypography component="h3" variant="subtitle1" color="textSecondary">
                                Срок кредита
                            </MuiTypography>
                            {creditSchedule.error ? (
                                <MuiTypography component="span" variant="h4">
                                    <MuiTypography component="span" variant="h5">
                                        Ошибка <Wtf>{creditSchedule.error}</Wtf>
                                    </MuiTypography>
                                </MuiTypography>
                            ) : (
                                <>
                                    <MuiTypography component="span" variant="h4">
                                        {creditSchedule.summary.monthCount}&thinsp;
                                    </MuiTypography>
                                    <MuiTypography component="span" variant="h5">
                                        {numConversion(creditSchedule.summary.monthCount, [
                                            'месяц',
                                            'месяца',
                                            'месяцев',
                                        ])}
                                    </MuiTypography>
                                </>
                            )}
                        </MuiGrid>
                    )}
                    {creditParams.calculatingType === CALCULATING_TYPE.BY_PERIOD && (
                        <MuiGrid item xs={12}>
                            <MuiTypography component="h3" variant="subtitle1" color="textSecondary">
                                Минимальный платёж
                            </MuiTypography>
                            {creditSchedule.error ? (
                                <MuiTypography component="span" variant="h4">
                                    <MuiTypography component="span" variant="h5">
                                        Ошибка <Wtf>{creditSchedule.error}</Wtf>
                                    </MuiTypography>
                                </MuiTypography>
                            ) : (
                                <>
                                    <MuiTypography component="span" variant="h4">
                                        {priceFormat(creditSchedule.summary.payment)}&thinsp;
                                    </MuiTypography>
                                    <MuiTypography component="span" variant="h5">
                                        ₽
                                    </MuiTypography>
                                </>
                            )}
                        </MuiGrid>
                    )}
                    <MuiGrid item xs={12}>
                        <MuiBox mt={-2}>
                            <MuiTypography component="h3" variant="subtitle1" color="textSecondary">
                                Переплата
                            </MuiTypography>
                            {creditSchedule.error ? (
                                <MuiTypography component="span" variant="h4">
                                    <MuiTypography component="span" variant="h5">
                                        Ошибка <Wtf>{creditSchedule.error}</Wtf>
                                    </MuiTypography>
                                </MuiTypography>
                            ) : (
                                <>
                                    <MuiTypography component="span" variant="h4">
                                        {priceFormat(creditSchedule.summary.overpayment)}&thinsp;
                                    </MuiTypography>
                                    <MuiTypography component="span" variant="h5">
                                        ₽
                                    </MuiTypography>
                                </>
                            )}
                        </MuiBox>
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiButton
                            size="large"
                            variant="contained"
                            color={isActive ? 'primary' : 'default'}
                            fullWidth
                            type="submit"
                        >
                            Рассчитать
                        </MuiButton>
                    </MuiGrid>
                </MuiGrid>
            </form>
        </Box>
    );
}

CreditForm.propTypes = {
    name: PropTypes.string.isRequired,
};
