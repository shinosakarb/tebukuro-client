import PropTypes from 'prop-types'

const Event = props => (
  <div>
    <p>name: {props.event.name}</p>
    <p>description: {props.event.description}</p>
  </div>
)

Event.propTypes = { event: PropTypes.instanceOf(Object).isRequired }

export default Event
