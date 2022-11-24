import React from 'react'
import Modal from 'react-bootstrap/Modal'

import FormsWorkoutNew from '@/forms/profile/Workout/New'
import { useWorkout } from '@/contexts/Workout'

function ModalsWorkoutsEdit({ show, handleClose }) {
  const { apis: {
    createWorkout
  } } = useWorkout()

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormsWorkoutNew
          onSubmit={createWorkout}
        />
      </Modal.Body>
    </Modal>
  )
}

export default ModalsWorkoutsEdit
