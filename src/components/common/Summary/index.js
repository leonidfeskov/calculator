import React from 'react';
import classnames from 'classnames';
import MuiTypography from '@material-ui/core/Typography';
import MuiDivider from '@material-ui/core/Divider';

import 'src/components/common/Summary/Summary.css';
import Box from 'src/components/common/Box';

export default function Summary({ icon, iconType, title, value, units, footer }) {
    return (
        <Box>
            <div
                className={classnames('summary__icon', {
                    [`summary__icon_${iconType}`]: iconType,
                })}
            >
                {icon}
            </div>
            <div className="summary__content">
                <div className="summary__title">
                    <MuiTypography component="h3" variant="body1" color="textSecondary">
                        {title}
                    </MuiTypography>
                </div>
                <MuiTypography component="p" variant="h3">
                    {value}
                    <MuiTypography component="span" variant="h5">
                        {' '}
                        {units}
                    </MuiTypography>
                </MuiTypography>
            </div>
            <MuiDivider />
            <div className="summary__footer">
                <MuiTypography component="p" color="textSecondary" variant="body2">
                    {footer}
                </MuiTypography>
            </div>
        </Box>
    );
}
