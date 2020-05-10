import React from 'react';
import { useSelector } from 'react-redux';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

import Box from '../common/Box';
import BoxTitle from '../common/Box/Title';

export default function OverpaymentChart() {
    const { paymentSchedule } = useSelector((state) => state);

    return (
        <Box>
            <BoxTitle>Диаграмма переплаты</BoxTitle>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart
                        data={paymentSchedule.dataByMonths}
                    >
                        <XAxis dataKey="dateFormatted" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area
                            name="Переплата"
                            unit=" руб."
                            dataKey="overpaymentRounded"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Box>
    );
}
