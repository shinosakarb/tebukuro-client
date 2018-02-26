// @flow
import React from 'react'

type Props = {
  id: string,
  value: string | number,
  onChange: Function,
  onBlur: Function,
  errorMessages: ?[],
}

export default (props: Props) => (
  <div>
    <label htmlFor={props.id}>
      { props.id }
      <input type="text" {...props} />
      <span style={{ color: 'red', fontSize: '13px', paddingLeft: '5px' }} >
        { props.errorMessages }
      </span>
    </label>
  </div>
)
