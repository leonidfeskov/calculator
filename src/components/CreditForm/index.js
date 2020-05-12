import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import MuiGrid from '@material-ui/core/Grid';

import Box from 'src/components/common/Box';
import Input from 'src/components/common/Input';
import { saveCredit } from 'src/reducers/credits';

export default function CreditForm({ name }) {
    const { creditByName } = useSelector(({ credits }) => credits);
    const creditParams = creditByName[name];
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

    return (
        <Box>
            <MuiGrid container spacing={3} direction="column">
                <MuiGrid item xs={12}>
                    <Input
                        value={creditParams.creditSum}
                        onChange={({ target: { value } }) => onChange('creditSum', parseFloat(value))}
                        label="Сумма кредита"
                    />
                </MuiGrid>
                <MuiGrid item xs={12}>
                    <Input
                        value={creditParams.creditPercent}
                        onChange={({ target: { value } }) => onChange('creditPercent', parseFloat(value))}
                        label="Процентная ставка"
                    />
                </MuiGrid>
                <MuiGrid item xs={12}>
                    <Input
                        value={creditParams.paymentPerMonth}
                        onChange={({ target: { value } }) => onChange('paymentPerMonth', parseFloat(value))}
                        label="Платёж в месяц"
                    />
                </MuiGrid>
            </MuiGrid>
        </Box>
    );
}

CreditForm.propTypes = {
    name: PropTypes.string.isRequired,
};
