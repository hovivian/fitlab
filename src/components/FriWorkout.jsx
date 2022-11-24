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

  const data = workout.filter((obj) => obj.dayOfWeek.includes('FRIDAY'))
  const restDayData = data.map((item) => item.restDay)[0]

  if (restDayData === true) {
    return <p>Rest Day</p>
  }
  return data.map((item) => (
    <div className="">
      { item.exercise.map((e) => (
        <div className="d-flex">
          <p className="w-50">{e.name}</p>
          <p className="w-25 text-end">{e.rep} reps</p>
          <p className="w-25 text-end">{e.set} sets</p>
        </div>
      )
      ) }
    </div>
  ))
}

export default FriWorkout
