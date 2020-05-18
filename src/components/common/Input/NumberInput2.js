import React from 'react';
import PropTypes from 'prop-types';

import MuiInput from '@material-ui/core/Input';

const NumberInput = ({ onChange, units, step, shiftStep, value, minValue, maxValue, format, parse, ...props }) => {
    const formattedValue = format(value);

    const onInputChange = ({ target: { value } }) => {
        const parsedValue = parse(value);
        if (!isNaN(parsedValue)) {
            onChange(parsedValue);
        }
    };

    const onKeyDown = (event) => {
        const { keyCode, shiftKey } = event;
        const parsedValue = parse(event.target.value);
        if (!isNaN(parsedValue)) {
            if (keyCode === 38) {
                event.preventDefault();
                onChange(Math.min(parsedValue + (shiftKey ? shiftStep : step), maxValue));
            } else if (keyCode === 40) {
                event.preventDefault();
                onChange(Math.max(parsedValue - (shiftKey ? shiftStep : step), minValue));
            }
        }
    };

    return (
        <MuiInput
            value={formattedValue}
            inputProps={{ size: formattedValue.length }}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            {...props}
        />
    );
};

NumberInput.defaultProps = {
    minValue: 0,
    maxValue: Infinity,
};

NumberInput.propTypes = {
    value: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func,
};

export default NumberInput;
