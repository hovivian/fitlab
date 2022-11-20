import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = { weight: '' }

function FormsWeightNew(props) {
  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          weight: Yup.number().required()
        })
      }
    >
      {
        ({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Weight (kg)</label>
              <Field className={`form-control ${errors?.weight && touched?.weight && 'is-invalid'}`} name="weight" placeholder="" />
              <ErrorMessage className="invalid-feedback" name="weight" component="div" />
            </div>

            <button id="new-weight-btn" className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsWeightNew
