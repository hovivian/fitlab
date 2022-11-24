import React, { useEffect } from 'react'

import { useWorkout } from '@/contexts/Workout'

function SatWorkout() {
  const {
    index: { data: workout },
    apis: { getWorkout }
  } = useWorkout()

  useEffect(() => {
    getWorkout()
  }, [])

  const data = workout.filter((obj) => obj.dayOfWeek.includes('SATURDAY'))
  const restDayData = data.map((item) => item.restDay)[0]

  if (restDayData === true) {
    return <p>Rest Day</p>
  }
  return data.map((item) => (
    <div className="exercise d-flex justify-content-between">
      { item.exercise.map((e) => (
        <>
          <p className="w-50">{e.name}</p>
          <p className="w-25 text-end">{e.rep} reps</p>
          <p className="w-25 text-end">{e.set} sets</p>
        </>
      )
      ) }
    </div>
  ))
}

export default SatWorkout
