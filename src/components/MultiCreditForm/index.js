import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MuiGrid from '@material-ui/core/Grid';
import MuiBox from '@material-ui/core/Box';
import MuiIconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import BoxTitle from 'src/components/common/Box/Title';
import CreditForm from 'src/components/MultiCreditForm/components/CreditForm';
import { addCredit } from 'src/reducers/credits';

let creditNameCounter = 1;

export default function MultiCreditForm() {
    const { names, creditByName } = useSelector((state) => state.credits);
    const dispatch = useDispatch();

    const addOneMoreCredit = () => {
        dispatch(addCredit({ ...creditByName[names[names.length - 1]], name: `credit${creditNameCounter}` }));
        creditNameCounter += 1;
    };

    return (
        <MuiBox mb={2}>
            <BoxTitle>Параметры кредита</BoxTitle>
            <MuiGrid item xs={12}>
                <MuiGrid container spacing={3}>
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
            </MuiGrid>
        </MuiBox>
    );
}
