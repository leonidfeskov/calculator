import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MuiGrid from '@material-ui/core/Grid';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiButton from '@material-ui/core/Button';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiDeleteIcon from '@material-ui/icons/Delete';

import Input from 'src/components/common/Input';
import Select from 'src/components/common/Select';
import CalendarPicker from 'src/components/common/CalendarPicker';
import { PREPAYMENT_REPEAT, addEmptyPrepayment, removePrepayment, setPrepaymentParam } from 'src/reducers/creditParams';
import { formatDateISO } from 'src/utils/date';

export default function Prepayments() {
    const { creditParams } = useSelector((state) => state);
    const [isOpen, setIsOpen] = useState(creditParams.prepayments.length > 0);
    const dispatch = useDispatch();

    const togglePrepayments = () => {
        if (!isOpen && creditParams.prepayments.length === 0) {
            dispatch(addEmptyPrepayment());
        }
        setIsOpen(!isOpen);
    };

    const onChange = (id, name, value) => {
        dispatch(setPrepaymentParam(id, name, value));
    };

    const onDateChange = (id, value) => {
        dispatch(setPrepaymentParam(id, 'date', formatDateISO(value)));
    };

    const addPrepaymentHandler = () => {
        dispatch(addEmptyPrepayment());
    };

    const removePrepaymentHandler = (id) => {
        dispatch(removePrepayment(id));
    };

    return (
        <>
            <MuiGrid container spacing={3}>
                <MuiGrid item xs={12} md={12} lg={12}>
                    <MuiButton color="primary" onClick={togglePrepayments}>
                        Досрочные платежи
                    </MuiButton>
                    {creditParams.prepayments.length > 0 && !isOpen && (
                        <div>есть {creditParams.prepayments.length} досрочных платежа</div>
                    )}
                </MuiGrid>
            </MuiGrid>
            {isOpen && (
                <>
                    {creditParams.prepayments.map(({ id, date, payment, repeat }) => (
                        <MuiGrid key={id} container spacing={3}>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <CalendarPicker
                                    value={date}
                                    onChange={(value) => onDateChange(id, value)}
                                    label="Дата"
                                />
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Input
                                    value={payment}
                                    onChange={({ target }) => onChange(id, 'payment', parseFloat(target.value))}
                                    label="Платеж, руб."
                                />
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <Select
                                    value={repeat}
                                    onChange={({ target }) => onChange(id, 'repeat', target.value)}
                                    label="Периодичность"
                                >
                                    {Object.values(PREPAYMENT_REPEAT).map((repeat) => (
                                        <MuiMenuItem key={repeat.id} value={repeat.id}>
                                            {repeat.name}
                                        </MuiMenuItem>
                                    ))}
                                </Select>
                            </MuiGrid>
                            <MuiGrid item xs={12} md={3} lg={3}>
                                <MuiIconButton onClick={() => removePrepaymentHandler(id)}>
                                    <MuiDeleteIcon fontSize="small" />
                                </MuiIconButton>
                            </MuiGrid>
                        </MuiGrid>
                    ))}
                    <MuiGrid container spacing={3}>
                        <MuiGrid item xs={12} md={3} lg={3}>
                            <MuiButton variant="contained" color="secondary" fullWidth onClick={addPrepaymentHandler}>
                                Добавить платеж
                            </MuiButton>
                        </MuiGrid>
                    </MuiGrid>
                </>
            )}
        </>
    );
}
