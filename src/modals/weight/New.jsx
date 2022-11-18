import React from 'react'
import Modal from 'react-bootstrap/Modal'

import FormsWeightNew from '@/forms/profile/weight/New'
import { useWeights } from '@/contexts/Profile'

function ModalsWeightsNew() {
  const {
    apis: { createWeight },
    modals: { newModal, closeNewModal }
  } = useWeights()

  if (!newModal) return null

  return (
    <Modal show={newModal} onHide={closeNewModal}>
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
