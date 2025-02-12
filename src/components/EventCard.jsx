import { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const EventCard = ({ toggleMore, handleToggle, index, event, displayAttendee, deleteEvent, addAttendee }) => {
	const [currAttendees, setCurrAttendees] = useState([])
	const currDateRef = useRef(null);
	const navigate = useNavigate()
	const handleDeleteClick = async () => {
		let confirm = window.confirm(`do you want to delete the event "${event.name}"`)
		if (confirm) {
			deleteEvent(event.id)
			window.alert('event deleted !')
		}
		navigate(0)
	}


	const handleSubmit = (e) => {
		e.preventDefault()
		let name = e.target[0].value
		let currDateEvent = event.dates.find(element => element.date === currDateRef.current.innerText.replace(' <', '')).date
		let participate = e.target[1].checked === true ? true : false
		let dates = [{ date: currDateEvent, available: participate }]


		console.log('been there')
		addAttendee(event.id, name, dates)
		setCurrAttendees([...currAttendees, {name: name, dates: dates}])
	}


	// Gestion du clic sur une date
	const handleDateClick = (e, index) => {
		if (currDateRef.current) {
			currDateRef.current.innerText = currDateRef.current.innerText.replace(" <", "");
			currDateRef.current.style.textDecoration = "none";
		}

		currDateRef.current = e.target;
		currDateRef.current.innerText += " <";
		currDateRef.current.style.textDecoration = "underline";

		// find the specific event filtered by the date that was clicked
		const currDateEvent = event.dates.find(element => element.date === currDateRef.current.innerText.replace(' <', ''))
		setCurrAttendees(currDateEvent.attendees)
	};

	const more = (
		<div className='more'>
			<div className="participants">
				{currAttendees.length > 0
					? currAttendees.map(attendee => (
						<img className={attendee.available ? 'greyscale' : ''} src={displayAttendee()} alt="profile pic" />
					))
					: (
						<>
							<p>No one's available for this date</p>
						</>
					)
				}
			</div>
			<ul className="dates">
				{event.dates.map((eventdata) => (
					<li key={eventdata.date}>
						<a href="#!" onClick={(e) => handleDateClick(e, index)}>
							{eventdata.date}
						</a>
					</li>
				))}
			</ul>
			<form action="#" className="participate-form" onSubmit={(e) => handleSubmit(e)}>
				<input type="text" placeholder='Jane Doe' />
				<div className="left">
					<input type="radio" id='doParticipate' name='participate' />
					<label htmlFor="doParticipate">Yes</label>
				</div>
				<div className="right">
					<input type="radio" id='doNotParticipate' name='participate' />
					<label htmlFor="doNotParticipate">no</label>
				</div>
				<div className="bottom">
					<input type="submit" value="Save" />
				</div>
			</form>
		</div>
	)

	return (
		<li key={event.id} className='event-card'>
			<div className="text">
				<Link to={`/event/${event.id}`}><h2>{event.name}</h2></Link>
				<div className="modifs">
					<Link to={`/edit/${event.id}`}>Edit</Link>
					<a href="#!" onClick={() => handleDeleteClick()}>Delete</a>
				</div>

			</div>
			<div className="upper">
				<p>{event.author}: </p>
				<p className="description">{event.description}</p>
				<a href="#!" onClick={() => handleToggle(index)}>{toggleMore[index] === true ? 'less' : 'more'}</a>
			</div>
			{toggleMore[index] === true ? more : ''}
		</li>
	)
}

export default EventCard