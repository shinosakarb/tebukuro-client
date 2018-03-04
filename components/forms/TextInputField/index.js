// @flow
import React from 'react'

type Props = {
  id: string,
  value: string | number,
  onChange: Function,
  onBlur: Function,
  errorMessages: ?[],
}

export default (props: Props) => {
  const { errorMessages, ...inputProps } = props
  return (
    <div>
      <label htmlFor={inputProps.id}>
        { inputProps.id }
        <input type="text" {...inputProps} />
        <span style={{ color: 'red', fontSize: '13px', paddingLeft: '5px' }} >
          { errorMessages }
        </span>
      </label>
    </div>
  )
}
