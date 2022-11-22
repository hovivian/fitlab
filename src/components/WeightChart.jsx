import React, { useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import moment from 'moment'

import { useProfile } from '@/contexts/Profile'

function WeightChart() {
  const {
    index: { data: weight },
    apis: { getMyWeights }
  } = useProfile()

  useEffect(() => {
    getMyWeights()
  }, [])

  const data = weight.map((info) => ({ name: moment(info.createdAt).format('DD MMM'), weight: info.weight }))

  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart width={500} height={250} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default WeightChart
