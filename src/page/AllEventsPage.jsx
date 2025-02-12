import EventsList from "../components/EventList"
import '../styles/allEventsPage.css'

const AllEventsPage = ({ addAttendee, displayAttendee, deleteEvent}) => {

	return (
		<>
			<div className="all-event-list-wrapper">
				<EventsList
					displayAttendee={displayAttendee}
					deleteEvent={deleteEvent}
					addAttendee={addAttendee}
				/>
				<div className="calendar-placeholder"></div>
			</div>
		</>
	)
}

export default AllEventsPage