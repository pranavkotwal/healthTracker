import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Chart = ({ data }) => {





    console.log(data)
    const flattenedData = data.reduce((acc, item) => {
            item.reports.forEach(report => {
                acc.push({
                    date: new Date(item.date).toISOString().split('T')[0],
                    value: report.value,
                    unit: report.unit,
                    refh:120,
                    refl:80
                });
            });
            return acc;
  }, []);
    console.log('flattenedData',flattenedData)

    const sortedFlattened = flattenedData.sort((a,b)=>new Date(a.date)- new Date(b.date))


  return (
    <LineChart width={800} height={400} data={sortedFlattened} >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="refh" stroke="#880000" fill="#FF000022"/>
      <Line type="monotone" dataKey="refl" stroke="#880000" fill="#FF000022"/>

      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default Chart;
