import React, { useEffect } from 'react'

import { useWorkout } from '@/contexts/Workout'

function FriWorkout() {
  const {
    index: { data: workout },
    apis: { getWorkout }
  } = useWorkout()

  useEffect(() => {
    getWorkout()
  }, [])

  if (workout && workout.filter((obj) => obj.dayOfWeek.includes('FRIDAY')).map((item) => item.exercise.length < 0)) {
    return <p>Rest Day</p>
  }
  return workout.filter((obj) => obj.dayOfWeek.includes('FRIDAY')).map((item) => (
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

export default FriWorkout
