import React from 'react';
import { useSelector } from 'react-redux';
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';

export default function OverpaymentChart() {
    const { paymentSchedule } = useSelector((state) => state);

    const chartData = paymentSchedule.dataByMonths.filter((item, index) => index !== 0);

    return (
        <>
            <BoxTitle>График переплаты</BoxTitle>
            <Box>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={chartData}>
                            <XAxis dataKey="dateFormatted" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Area name="Переплата" unit=" руб." dataKey="overpaymentRounded" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Box>
        </>
    );
}
