import React from 'react'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  dayOfWeek: '',
  Exercise: [],
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
          dayOfWeek: Yup.string().required(),
          restDay: Yup.boolean().required(),
          Exercise: Yup.array().of(Yup.object({
            name: Yup.string().required().label('Exercise'),
            rep: Yup.number().required().label('rep'),
            set: Yup.number().required().label('set')
          }))
        })
      }
    >
      {
        ({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div>
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
            {
                values.dayOfWeek && (
                  <>
                    <FieldArray name="Exercise">
                      {
                ({ remove, push }) => (
                  <div className="mb-3">
                    {
                      values.Exercise.map((i) => (
                        <div key={i} className={`${values?.Exercise?.length > 1 && values?.Exercise?.length !== i + 1}`}>
                          <div className="exercise-row d-flex">
                            <div className="w-50 mt-2">
                              <Field className={`form-control ${errors?.Exercise?.[i]?.name && touched?.Exercise?.[i]?.name && 'is-invalid'}`} name={`Exercise[${i}].name`} placeholder="Exercise" />
                              <ErrorMessage className="invalid-feedback" name={`Exercise[${i}].name`} component="div" />
                            </div>

                            <div className="w-25 mt-2 new-workout-rep">
                              <Field className={`form-control ${errors?.Exercise?.[i]?.rep && touched?.Exercise?.[i]?.rep && 'is-invalid'}`} name={`Exercise[${i}].rep`} placeholder="Rep" />
                              <ErrorMessage className="invalid-feedback" name={`Exercise[${i}].rep`} component="div" />
                            </div>

                            <div className="w-25 mt-2">
                              <Field className={`form-control ${errors?.Exercise?.[i]?.set && touched?.Exercise?.[i]?.set && 'is-invalid'}`} name={`Exercise[${i}].set`} placeholder="Set" />
                              <ErrorMessage className="invalid-feedback" name={`Exercise[${i}].set`} component="div" />
                            </div>

                            <button id="delete-row-btn" className="mt-2" type="button" onClick={() => remove(i)}>delete</button>
                          </div>
                        </div>
                      ))
                    }

                    <div className="d-flex justify-content-between mt-3">
                      <label>
                        <Field type="checkbox" name="restDay" /> Rest day
                      </label>
                      <button id="new-row-btn" className="btn float-end" type="button" onClick={() => push({ name: '', rep: '', set: '' })}>Add Exercise</button>
                    </div>
                  </div>
                )
              }
                    </FieldArray>

                    <div className="mt-3 text-center">
                      <button id="new-workout-btn" className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit</button>
                    </div>
                  </>
                )
}
          </Form>
        )
      }
    </Formik>
  )
}

export default FormsWorkoutNew
