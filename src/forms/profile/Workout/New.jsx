import React, { useState } from 'react'
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
  const [formValues, setFormValues] = useState([{ exercise: '', rep: '', set: '' }])

  const handleChange = (i, e) => {
    const newFormValues = [...formValues]
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues)
  }

  const handleAddRow = () => {
    setFormValues([...formValues, { exercise: '', rep: '', set: '' }])
  }

  const handleDeleteRow = (i) => {
    const newFormValues = [...formValues]
    newFormValues.splice(i, 1)
    setFormValues(newFormValues)
  }

  return (
    <Formik
      initialValues={props.initialValues || initialValues}
      onSubmit={props.onSubmit}
      enableReinitialize
      validationSchema={
        Yup.object({
          exercise: Yup.string(),
          dayOfWeek: Yup.string().required(),
          rep: Yup.number(),
          set: Yup.number(),
          restDay: Yup.boolean().required()
        })
      }
    >
      <Form>
      ({ values, errors, touched, isSubmitting }) => (
          <Form>
          {/* select day then append the rest of the form */}
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
            {/* once the day of week is selected, append the following fields */}
            {values.dayOfWeek && (
              {/* the following row will appear after selecting day of week, and more rows will append after clicking the add row button */}
            {formValues.map((element, index, errors, touched, isSubmitting ) => (
          <div className="exercise mb-3 d-flex" key={index}>
            <div className="w-50">
              <Field className={`form-control ${errors?.exercise && touched?.exercise && 'is-invalid'}`} name="exercise" placeholder="Exercise" value={element.name || ''} onChange={(e) => handleChange(index, e)} />
              <ErrorMessage className="invalid-feedback" name="exercise" component="div" />
            </div>

            <div className="w-25 new-workout-rep">
              <Field className={`form-control ${errors?.rep && touched?.rep && 'is-invalid'}`} name="rep" placeholder="Rep" value={element.email || ''} onChange={(e) => handleChange(index, e)} />
              <ErrorMessage className="invalid-feedback" name="rep" component="div" />
            </div>

            <div className="w-25">
              <Field className={`form-control ${errors?.set && touched?.set && 'is-invalid'}`} name="set" placeholder="Set" value={element.email || ''} onChange={(e) => handleChange(index, e)} />
              <ErrorMessage className="invalid-feedback" name="set" component="div" />
            </div>
            <button id="delete-row-btn" className="btn btn-primary float-end" type="button" onClick={handleDeleteRow}>Delete</button>
          </div>
        ))}

          {/* controller of the form: add row btn, rest day checkbox and submit btn */}
        <div className="exercise-controller d-flex flex-column">
          <div>
            <label>
              <Field type="checkbox" name="restDay" /> Rest day
            </label>

            <button id="new-row-btn" className="btn btn-primary float-end" type="button" onClick={() => handleAddRow()}>Add row</button>
          </div>
          <div className="mt-1 text-center">
            <button id="new-workout-btn" className="btn btn-primary" type="submit" disabled={isSubmitting}>Submit</button>
          </div>
        </div>
            )
          }
      </Form>
    </Formik>
  )
}

export default FormsWorkoutNew
