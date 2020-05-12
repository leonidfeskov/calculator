import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import LockedInput from 'src/components/common/Input/LockedInput';
import { saveCredit, lockField } from 'src/reducers/credits';
import MuiButton from '@material-ui/core/Button';

export default function CreditForm({ name }) {
    const { creditByName, scheduleByName } = useSelector(({ credits }) => credits);
    const creditParams = creditByName[name];
    const creditSchedule = scheduleByName[name];
    const dispatch = useDispatch();

    const onChange = (field, value) => {
        if (creditParams.hasOwnProperty(field)) {
            dispatch(
                saveCredit({
                    ...creditParams,
                    name,
                    [field]: value,
                    locked: {
                        ...creditParams.locked,
                        [field]: true,
                    },
                })
            );
        }
    };

    const onChangeLocked = (field, value) => {
        if (creditParams.locked.hasOwnProperty(field)) {
            dispatch(lockField({ name, field, value }));
        }
    };

    return (
        <Box>
            <MuiGrid container spacing={3} direction="column">
                <MuiGrid item xs={12}>
                    <LockedInput
                        value={creditParams.creditPercent}
                        locked={creditParams.locked.creditPercent}
                        onChange={({ target: { value } }) => onChange('creditPercent', parseFloat(value))}
                        label="Процентная ставка"
                        units="%"
                        lockDisabled
                    />
                </MuiGrid>
                <MuiGrid item xs={12}>
                    <LockedInput
                        value={creditParams.creditSum}
                        locked={creditParams.locked.creditSum}
                        onChange={({ target: { value } }) => onChange('creditSum', parseFloat(value))}
                        onChangeLocked={(locked) => onChangeLocked('creditSum', locked)}
                        label="Сумма кредита"
                        units="₽"
                    />
                </MuiGrid>
                <MuiGrid item xs={12}>
                    <LockedInput
                        value={creditParams.paymentPerMonth}
                        locked={creditParams.locked.paymentPerMonth}
                        onChange={({ target: { value } }) => onChange('paymentPerMonth', parseFloat(value))}
                        onChangeLocked={(locked) => onChangeLocked('paymentPerMonth', locked)}
                        label="Платёж в месяц"
                        units="₽"
                    />
                </MuiGrid>
                <MuiGrid item xs={12}>
                    <LockedInput
                        // value={creditParams.months}
                        value={creditSchedule.summary.monthCount}
                        locked={creditParams.locked.months}
                        onChange={({ target: { value } }) => onChange('months', parseFloat(value))}
                        onChangeLocked={(locked) => onChangeLocked('months', locked)}
                        label="Срок кредита"
                        units="мес."
                    />
                </MuiGrid>
                <MuiGrid item xs={12}>
                    <LockedInput
                        // value={creditParams.overpayment}
                        value={Math.round(creditSchedule.summary.overpayment)}
                        locked={creditParams.locked.overpayment}
                        onChange={({ target: { value } }) => onChange('overpayment', parseFloat(value))}
                        onChangeLocked={(locked) => onChangeLocked('overpayment', locked)}
                        label="Переплата"
                        units="₽"
                        lockDisabled
                    />
                </MuiGrid>
                <MuiGrid item xs={12}>
                    <MuiButton size="large" variant="contained" color="primary" fullWidth type="submit">
                        Рассчитать
                    </MuiButton>
                </MuiGrid>
            </MuiGrid>
        </Box>
    );
}

CreditForm.propTypes = {
    name: PropTypes.string.isRequired,
};
