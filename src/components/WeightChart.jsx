import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

function WeightChart() {
  const data = [
    { name: '18 Nov', weight: 68 },
    { name: '19 Nov', weight: 67 },
    { name: '20 Nov', weight: 69 },
    { name: '21 Nov', weight: 68.5 },
    { name: '22 Nov', weight: 66 }
  ]

  return (
    <div>
      <LineChart width={500} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  )
}

export default WeightChart
