// @flow
import React from 'react'
import MaterialIcon from '@material/react-material-icon'
import type { EventProps } from '../../types/Event'

const Event = (props: {event: EventProps}) => (
  <div>
    <h1 className="mdc-typography--headline3 event-name" >{props.event.name}</h1>
    <ul className="mdc-list">
      <li className="mdc-list-item"> {props.event.description} </li>
    </ul>
    <hr />
    <h5 className="mdc-typography--headline5"><MaterialIcon icon="access_time" /> 日時</h5>
    <ul className="mdc-list">
      <li className="mdc-list-item">
        <MaterialIcon icon="outlined_flag" />
        開始: {props.event.eventStartsAt}
      </li>
      <li className="mdc-list-item">
        <MaterialIcon icon="flag" />
        終了: {props.event.eventEndsAt}
      </li>
    </ul>
    <hr />
    <h5 className="mdc-typography--headline5">
      <MaterialIcon icon="people" /> 参加者一覧 ({props.event.participants.length} / {props.event.quota} 名)
    </h5>
  </div>
)

export default Event
