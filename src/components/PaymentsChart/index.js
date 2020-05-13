import React from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Box from 'src/components/common/Box';
import BoxTitle from 'src/components/common/Box/Title';

export default function PaymentsChart() {
    const { paymentSchedule } = useSelector((state) => state);

    const chartData = paymentSchedule.dataByMonths.filter((item, index) => index !== 0);

    return (
        <>
            <BoxTitle>Распределение ежемесячного платежа</BoxTitle>
            <Box>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <BarChart barCategoryGap="2%" data={chartData}>
                            <XAxis dataKey="dateFormatted" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                name="На погашение процентов"
                                unit=" руб."
                                dataKey="paymentByPercentsRounded"
                                stackId="a"
                                fill="#8884d8"
                            />
                            <Bar
                                name="На уменьшение суммы кредита"
                                unit=" руб."
                                dataKey="paymentByCreditRounded"
                                stackId="a"
                                fill="#82ca9d"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Box>
        </>
    );
}
