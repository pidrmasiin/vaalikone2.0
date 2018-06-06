import React from 'react';
import { Form } from 'semantic-ui-react'

const TextArea = ({ placeholder, name, label }) => (
  <div>
    <b>{label}</b>
    <Form.TextArea
      type="text"
      className="form-control"
      placeholder={placeholder}
      rows="10"
      cols="20"
      name={name}
      form="htmlform"
    />
  </div>
)

export default TextArea
