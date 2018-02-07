// @flow
import React from 'react'

type Props = {
  id: string,
  value: string | number,
  onChange: Function,
}

export default (props: Props) => (
  <div>
    <label htmlFor={props.id}>
      { props.id }
      <input type="text" {...props} />
    </label>
  </div>
)
