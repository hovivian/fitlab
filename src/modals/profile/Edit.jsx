import React from 'react'
import Modal from 'react-bootstrap/Modal'

import Loading from '@/components/Loading'
import FormsProfileChange from '@/forms/profile/Change'
import { useProfile } from '@/contexts/Profile'

function ModalsProfileEdit() {
  const {
    show: { data: user, error, loading },
    apis: { updateProfile },
    modals: { editProfileModal, closeEditProfileModal }
  } = useProfile()

  if (!editProfileModal) return null

  const renderHeader = () => {
    if (loading || error) return null
    return (
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
    )
  }

  const renderBody = () => {
    // if (error) return <Modal.Body><h2>User Not Found</h2></Modal.Body>
    if (loading) return <Modal.Body><Loading /></Modal.Body>

    return (
      <Modal.Body>
        <FormsProfileChange
          onSubmit={updateProfile}
          initialValues={user}
        />
      </Modal.Body>
    )
  }

  return (
    <Modal show={editProfileModal} onHide={closeEditProfileModal}>
      {renderHeader()}
      {renderBody()}
    </Modal>
  )
}

export default ModalsProfileEdit
