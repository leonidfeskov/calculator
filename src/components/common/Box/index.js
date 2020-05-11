import React from 'react';
import { Paper } from '@material-ui/core';

import 'src/components/common/Box/Box.css';

export default function Box({ children }) {
    return <Paper className="box">{children}</Paper>;
}
