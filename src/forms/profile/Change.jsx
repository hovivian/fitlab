import React from 'react'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  username: '',
  email: '',
  height: 0,
  targetWeight: 0
}

function FormsProfileChange(props) {
  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          email: Yup.string().email().required(),
          username: Yup.string().required().min(1, 'Minimum 6 characters').max(15, 'Maximum 15 characters'),
          height: Yup.number().required(),
          targetWeight: Yup.number().required()
        })
      }
    >
      {
        ({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label>Username</label>
              <Field className={`form-control ${errors?.title && touched?.title && 'is-invalid'}`} name="username" placeholder="" />
              <ErrorMessage className="invalid-feedback" name="username" component="div" />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <Field className={`form-control ${errors?.email && touched?.email && 'is-invalid'}`} name="email" placeholder="" />
              <ErrorMessage className="invalid-feedback" name="email" component="div" />
            </div>

            <div className="mb-3">
              <label>Height</label>
              <Field className={`form-control ${errors?.height && touched?.height && 'is-invalid'}`} name="height" placeholder="Height (cm)" />
              <ErrorMessage className="invalid-feedback" name="height" component="div" />
            </div>

            <div className="mb-3">
              <label>Target Weight</label>
              <Field className={`form-control ${errors?.targetWeight && touched?.targetWeight && 'is-invalid'}`} name="target-weight" placeholder="Target Weight(kg)" />
              <ErrorMessage className="invalid-feedback" name="target-weight" component="div" />
            </div>
            <button className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsProfileChange
