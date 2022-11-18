import React from 'react'
import Modal from 'react-bootstrap/Modal'

import Loading from '@/components/Loading'
import FormsProfileChange from '@/forms/profile/Change'
import { useTodos } from '@/contexts/Todos'

function ModalsProfileEdit() {
  const {
    show: { data: todo, error, loading },
    apis: { updateTodo },
    modals: { editModal, closeEditModal }
  } = useTodos()

  if (!editModal) return null

  const renderHeader = () => {
    if (loading || error) return null
    return (
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo {todo.id}</Modal.Title>
      </Modal.Header>
    )
  }

  const renderBody = () => {
    if (error) return <Modal.Body><h2>Todo Not Found</h2></Modal.Body>
    if (loading) return <Modal.Body><Loading /></Modal.Body>

    return (
      <Modal.Body>
        <FormsProfileChange
          onSubmit={updateTodo}
          initialValues={todo}
        />
      </Modal.Body>
    )
  }

  return (
    <Modal show={editModal} onHide={closeEditModal}>
      {renderHeader()}
      {renderBody()}
    </Modal>
  )
}

export default ModalsProfileEdit
