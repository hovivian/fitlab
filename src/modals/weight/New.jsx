import React from 'react'
import Modal from 'react-bootstrap/Modal'

import FormsWeightNew from '@/forms/profile/Weight/New'
import { useProfile } from '@/contexts/Profile'

function ModalsWeightsNew({ show, handleClose }) {
  const { apis: {
    createWeight
  } } = useProfile()

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter your current weight</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormsWeightNew
          onSubmit={createWeight}
        />
      </Modal.Body>
    </Modal>
  )
}

export default ModalsWeightsNew
