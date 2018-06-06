
import React from 'react';
import { Form } from 'semantic-ui-react'

const FormInput = ({ placeholder, name, label }) => (
  <div className="form-group">
    <b>{label}</b>
    <Form.Input type="text" className="form-control" placeholder={placeholder} name={name} />
  </div>
)

export default FormInput
