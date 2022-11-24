import React, { useEffect } from 'react'

import { useProfile } from '@/contexts/Profile'
import { useAuth } from '@/contexts/Auth'

function WeightCountDown() {
  const { show: { data: currentUser } } = useAuth()

  const {
    index: { data: weight },
    apis: { getMyWeights }
  } = useProfile()

  useEffect(() => {
    getMyWeights()
  }, [])

  const currentWeight = weight.map((data, i, arr) => {
    if (arr.length - 1 === i) {
      return (data.weight)
    }
  })

  const bmi = Math.floor(currentWeight[currentWeight.length - 1] / ((currentUser.height / 100) ** 2))

  if (!bmi) {
    return (
      <>
        <p>add your weight and target weight</p>
        <p>to display weight count down</p>
      </>
    )
  } return (
    <>
      <h2>{currentWeight[currentWeight.length - 1] - currentUser.targetWeight } kg</h2>
      <p>till your target weight</p>
    </>
  )
}

export default WeightCountDown
