import React from 'react'
import Modal from 'react-bootstrap/Modal'

import FormsWorkoutNew from '@/forms/profile/Workout/New'
import { useProfile } from '@/contexts/Profile'

function ModalsWorkoutsNew({ show, handleClose }) {
  const { apis: {
    createWorkout
  } } = useProfile()

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

export default ModalsWorkoutsNew
