import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import MuiGrid from '@material-ui/core/Grid';
import MuiButton from '@material-ui/core/Button';
import MuiTypography from '@material-ui/core/Typography';
import MuiInputLabel from '@material-ui/core/InputLabel';

import Box from 'src/components/common/Box';
import NumberInput from 'src/components/common/Input/NumberInput2';
import { saveCredit, setActive } from 'src/reducers/credits';
import { setCreditData } from 'src/reducers/creditData';
import { priceFormat } from 'src/utils/common';
import { CALCULATING_TYPE } from 'src/reducers/creditParams';
import { MAX_MONTHS_COUNT } from 'src/calc/credit';
import MuiBox from '@material-ui/core/Box';

const parse = (value) => parseFloat(value.replace(/[^\d,.]+/g, ''));
const toPercents = (value) => value.toFixed(1);

export default function CreditForm({ name }) {
    const { creditByName, scheduleByName, active } = useSelector(({ credits }) => credits);
    const creditParams = creditByName[name];
    const creditSchedule = scheduleByName[name];
    const isActive = active === creditParams.name;
    const dispatch = useDispatch();

    const onChange = (field, value) => {
        let forceType = null;
        if (field === 'paymentPerMonth') {
            forceType = CALCULATING_TYPE.BY_PAYMENT;
        }
        if (field === 'creditPeriod') {
            forceType = CALCULATING_TYPE.BY_PERIOD;
        }
        if (creditParams.hasOwnProperty(field)) {
            dispatch(
                saveCredit({
                    ...creditParams,
                    name,
                    [field]: value,
                    calculatingType: forceType || creditParams.calculatingType,
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
                <MuiGrid container spacing={2} direction="column">
                    {/*
                    <MuiGrid item xs={12}>
                        <MuiInputLabel style={{ marginBottom: 5 }}>Условия банка</MuiInputLabel>
                        <MuiTypography component="span" variant="h4" style={{ fontSize: 24 }}>
                            {priceFormat(creditParams.creditSum)}&thinsp;
                        </MuiTypography>
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            {'₽ / '}
                        </MuiTypography>
                        <MuiTypography component="span" variant="h4" style={{ fontSize: 24 }}>
                            {creditParams.creditPercent.toFixed(1)}&thinsp;
                        </MuiTypography>
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            %
                        </MuiTypography>
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiInputLabel style={{ marginBottom: 5 }}>Платёж</MuiInputLabel>
                        <MuiTypography component="span" variant="h4" style={{ fontSize: 24 }}>
                            {priceFormat(creditParams.paymentPerMonth)}&thinsp;
                        </MuiTypography>
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            {'₽ × '}
                        </MuiTypography>
                        <MuiTypography component="span" variant="h4" style={{ fontSize: 24 }}>
                            {priceFormat(creditParams.creditPeriod)}&thinsp;
                        </MuiTypography>
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            мес.
                        </MuiTypography>
                    </MuiGrid>
*/}
                    <MuiGrid item xs={12}>
                        <MuiInputLabel style={{ marginBottom: 5 }}>Условия банка</MuiInputLabel>
                        <NumberInput
                            value={creditParams.creditSum}
                            parse={parse}
                            format={priceFormat}
                            style={{ fontSize: 24, textAlign: 'center' }}
                            onChange={(value) => onChange('creditSum', value)}
                            step={500000}
                            shiftStep={100000}
                            minValue={50000}
                            maxValue={100000000}
                        />
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            {' ₽ / '}
                        </MuiTypography>
                        <NumberInput
                            value={creditParams.creditPercent}
                            parse={parse}
                            format={toPercents}
                            style={{ fontSize: 24 }}
                            onChange={(value) => onChange('creditPercent', value)}
                            step={0.5}
                            shiftStep={0.1}
                            minValue={0}
                            maxValue={100}
                        />
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            {' %'}
                        </MuiTypography>
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiInputLabel style={{ marginBottom: 5 }}>Платёж</MuiInputLabel>
                        <NumberInput
                            value={creditParams.paymentPerMonth}
                            parse={parse}
                            format={priceFormat}
                            style={{ fontSize: 24 }}
                            onChange={(value) => onChange('paymentPerMonth', value)}
                            step={5000}
                            shiftStep={1000}
                            minValue={1000}
                            maxValue={100000000}
                        />
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            {' ₽ × '}
                        </MuiTypography>
                        <NumberInput
                            value={creditParams.creditPeriod}
                            parse={parse}
                            format={priceFormat}
                            style={{ fontSize: 24 }}
                            onChange={(value) => onChange('creditPeriod', value)}
                            step={12}
                            shiftStep={1}
                            minValue={1}
                            maxValue={MAX_MONTHS_COUNT}
                        />
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            {' мес.'}
                        </MuiTypography>
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiInputLabel style={{ marginBottom: 5 }}>Переплата</MuiInputLabel>
                        <MuiTypography component="span" variant="h4" style={{ fontSize: 24 }}>
                            {priceFormat(creditSchedule.summary.overpayment)}&thinsp;
                        </MuiTypography>
                        <MuiTypography component="span" variant="h5" style={{ fontSize: 20, color: '#909090' }}>
                            {' ₽'}
                        </MuiTypography>
                    </MuiGrid>
                    <MuiGrid item xs={12}>
                        <MuiBox mt={1}>
                            <MuiButton
                                size="large"
                                variant="contained"
                                color={isActive ? 'primary' : 'default'}
                                fullWidth
                                type="submit"
                            >
                                Рассчитать
                            </MuiButton>
                        </MuiBox>
                    </MuiGrid>
                </MuiGrid>
            </form>
        </Box>
    );
}

CreditForm.propTypes = {
    name: PropTypes.string.isRequired,
};
