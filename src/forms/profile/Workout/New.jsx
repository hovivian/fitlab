import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  exercise: '',
  dayOfWeek: '',
  rep: '',
  set: '',
  restDay: false
}

function FormsWorkoutNew(props) {
  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          exercise: Yup.string().required(),
          dayOfWeek: Yup.string().required(),
          rep: Yup.number(),
          set: Yup.number(),
          restDay: Yup.boolean().required()
        })
      }
    >
      {
        ({ errors, touched, isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <Field name="dayOfWeek" as="select" className={`form-control ${errors?.dayOfWeek && touched?.dayOfWeek && 'is-invalid'}`}>
                <option value="" disabled defaultValue>Select day of week</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </Field>
              <ErrorMessage className="invalid-feedback" name="dayOfWeek" component="div" />
            </div>

            {initialValues.dayOfWeek.values && (
            <fieldset className="new-workout">
              <div className="mb-3">
                <label>Exercise</label>
                <Field className={`form-control ${errors?.exercise && touched?.exercise && 'is-invalid'}`} name="exercise" placeholder="" />
                <ErrorMessage className="invalid-feedback" name="exercise" component="div" />
              </div>

              <div className="mb-3">
                <label>Rep</label>
                <Field className={`form-control ${errors?.rep && touched?.rep && 'is-invalid'}`} name="rep" placeholder="" />
                <ErrorMessage className="invalid-feedback" name="rep" component="div" />
              </div>

              <div className="mb-3">
                <label>Set</label>
                <Field className={`form-control ${errors?.set && touched?.set && 'is-invalid'}`} name="set" placeholder="" />
                <ErrorMessage className="invalid-feedback" name="set" component="div" />
              </div>

              <label>
                <Field type="checkbox" name="restDay" />
                {`${values.toggle}`}
              </label>

              <button id="new-workout-btn" className="btn btn-primary float-end" type="submit" disabled={isSubmitting}>Submit</button>
            </fieldset>
            )}
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsWorkoutNew
