import Event from '../containers/Event'

export default (props) => (
  <div>
    <h3>This is the event page!</h3>
    <Event eventId={ props.url.query.id } />
  </div>
)
