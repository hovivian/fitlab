import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = { dayOfWeek: '' }

function FormsWorkoutNew(props) {
  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          dayOfWeek: Yup.string().required()
        })
      }
    >
      {
        ({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Select day of week</label>
              <Field className={`form-control ${errors?.weight && touched?.weight && 'is-invalid'}`} name="weight" placeholder="" />
              <ErrorMessage className="invalid-feedback" name="weight" component="div" />
            </div>

            <button id="new-workout-btn" className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsWorkoutNew
