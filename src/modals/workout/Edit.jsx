import React from 'react'
import Modal from 'react-bootstrap/Modal'

import FormsWorkoutEdit from '@/forms/profile/Workout/New'
import { useWorkout } from '@/contexts/Workout'

function ModalsWorkoutsEdit({ show, handleClose }) {
  const {
    show: { data: workout },
    apis: { updateWorkout }
  } = useWorkout()

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit workout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormsWorkoutEdit
          onSubmit={updateWorkout}
          initialValues={workout}
        />
      </Modal.Body>
    </Modal>
  )
}

export default ModalsWorkoutsEdit
