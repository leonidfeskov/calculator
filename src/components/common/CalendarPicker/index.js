import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import 'src/components/common/CalendarPicker/CalendarPicker.css';

export default function CalendarPicker({ value, onChange, label }) {
    return (
        <div className="calendar-picker-wrapper">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd.MM.yyyy"
                margin="normal"
                label={label}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
