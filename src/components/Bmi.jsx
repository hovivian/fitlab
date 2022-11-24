import React, { useEffect } from 'react'

import { useProfile } from '@/contexts/Profile'
import { useAuth } from '@/contexts/Auth'

function Bmi() {
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
        <p>add your weight and height</p>
        <p>to get your bmi</p>
      </>
    )
  } return (
    <>
      <h2>{bmi}</h2>
      <p>your current BMI</p>
    </>
  )
}

export default Bmi
