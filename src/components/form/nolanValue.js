import React from 'react';
import { Checkbox } from 'semantic-ui-react'

const nolansValue = ({ jaaLiberal, name, label1, label2, label3, disClick, change }) => (
    <tr>
    <td>
    <Checkbox
      radio
      name={name}
      checked={jaaLiberal === true}
      label={label1}
      onChange={() => change(true)}
      />
      </td>
      <td>
      <Checkbox
        radio
        name={name}
        checked={jaaLiberal}
        label={label2}
        onChange={() => change(false)}
      />
      </td>
      <td>
      <Checkbox
        radio
        name={name}
        checked={jaaLiberal === ""}
        label={label3}
        onChange={() => disClick("jaaLiberal")}
      />
      </td>
    </tr>
)

export default nolansValue