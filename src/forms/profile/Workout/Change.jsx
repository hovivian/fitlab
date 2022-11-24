import React from 'react'
import { Formik, Field, FieldArray, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const initialValues = {
  dayOfWeek: '',
  exercise: [],
  restDay: false
}

function FormsWorkoutChange(props) {
  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          dayOfWeek: Yup.string().required(),
          exercise: Yup.array().when('restDay', {
            is: true,
            then: (schema) => schema.max(0),
            otherwise: (schema) => schema.of(Yup.object({
              name: Yup.string().required().label('exercise'),
              rep: Yup.number().required().label('rep'),
              set: Yup.number().required().label('set')
            }))
          }),
          restDay: Yup.boolean()
        })
      }
    >
      {
        ({ values, errors, touched, isSubmitting }) => (
          <Form>
            <div>
              <Field name="dayOfWeek" as="select" className={`form-control ${errors?.dayOfWeek && touched?.dayOfWeek && 'is-invalid'}`}>
                <option value="" disabled defaultValue>Select day of week</option>
                <option value="MONDAY">Monday</option>
                <option value="TUESDAY">Tuesday</option>
                <option value="WEDNESDAY">Wednesday</option>
                <option value="THURSDAY">Thursday</option>
                <option value="FRIDAY">Friday</option>
                <option value="SATURDAY">Saturday</option>
                <option value="SUNDAY">Sunday</option>
              </Field>
              <ErrorMessage className="invalid-feedback" name="dayOfWeek" component="div" />
            </div>

            <FieldArray name="exercise">
              {
                ({ remove, push }) => (
                  <div className="mb-3">
                    {
                      values.exercise.map((item, i) => (
                        <div key={i} className={`${values?.exercise?.length > 1 && values?.exercise?.length !== i + 1}`}>
                          <div className="exercise-row d-flex">
                            <div className="w-50 mt-2">
                              <Field
                                className={`form-control ${errors?.exercise?.[i]?.name && touched?.exercise?.[i]?.name && 'is-invalid'}`}
                                name={`exercise[${i}].name`}
                                placeholder="exercise"
                              />
                              <ErrorMessage className="invalid-feedback" name={`exercise[${i}].name`} component="div" />
                            </div>

                            <div className="w-25 mt-2 new-workout-rep">
                              <Field
                                className={`form-control ${errors?.exercise?.[i]?.rep && touched?.exercise?.[i]?.rep && 'is-invalid'}`}
                                name={`exercise[${i}].rep`}
                                placeholder="Rep"
                              />
                              <ErrorMessage className="invalid-feedback" name={`exercise[${i}].rep`} component="div" />
                            </div>

                            <div className="w-25 mt-2">
                              <Field
                                className={`form-control ${errors?.exercise?.[i]?.set && touched?.exercise?.[i]?.set && 'is-invalid'}`}
                                name={`exercise[${i}].set`}
                                placeholder="Set"
                              />
                              <ErrorMessage className="invalid-feedback" name={`exercise[${i}].set`} component="div" />
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
                      <button id="new-row-btn" className="btn float-end" type="button" onClick={() => push({ name: '', rep: '', set: '' })}>Add exercise</button>
                    </div>
                  </div>
                )
              }
            </FieldArray>

            <button id="new-workout-btn" className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit</button>

          </Form>
        )
      }
    </Formik>
  )
}

export default FormsWorkoutChange
