import { useState, useRef } from "react"
import { useLoaderData, Link, useNavigate } from "react-router-dom"
import '../styles/SingleEventPage.css'


const SingleEventPage = ({ displayAttendee, deleteEvent, addAttendee }) => {
	const navigate = useNavigate()
	const event = useLoaderData()
	const currDateRef = useRef(null);
	const [currAttendees, setCurrAttendees] = useState([])
	const [editAvailable, setEditAvailable] = useState(false)
	const [currEditUser, setCurrEditUser] = useState({ name: '', available: false })

	const handleEditPresenceClick = (e) => {
		setEditAvailable(true)
		let attendeeObject = currAttendees.find(attendee => attendee.name === e.target.textContent)
		setCurrEditUser(attendeeObject)
	}

	const handleDeleteClick = async () => {
		let confirm = window.confirm(`do you want to delete the event "${event.name}"`)
		if (confirm) {
			deleteEvent(event.id)
			window.alert('event deleted !')
		}
		navigate('/')
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		let name = e.target[0].value
		let currDateEvent = event.dates.find(element => element.date === currDateRef.current.innerText.replace(' <', '')).date
		let participate = e.target[1].checked === true ? true : false
		let dates = [{ date: currDateEvent, available: participate }]


		if (!editAvailable) {
			addAttendee(event.id, name, dates)
			navigate(0)
		} else {
			console.log({ name: name, dates: [{ date: currDateEvent, available: participate }] })
			setEditAvailable(false)
		}
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

		setCurrAttendees(currDateEvent["attendees"])
	};


	return (
		<div className="single-card-wrapper">
			<div className='event-card'>
				<div className="text">
					<h2>{event.name}</h2>
					<div className="modifs">
						<Link to={`/edit/${event.id}`}>edit</Link>
						<a href="#!" onClick={() => handleDeleteClick()}>Delete</a>
					</div>
				</div>
				<div className="upper">
					<p>{event.author}: </p>
					<p className="description">{event.description}</p>
				</div>

				<div className='more'>
					<ul className="dates">
						{event.dates.map((eventdata) => (<li key={eventdata.date}><a href="#" onClick={(e) => handleDateClick(e)}>{eventdata.date}</a></li>))}
					</ul>
					<ul className="participants">
						{
							currAttendees.map(attendee => (
								<li key={attendee.name}>
									<div className="img-wrapper">
										<img src={displayAttendee()} alt="profile pic" />
									</div>
									<a onClick={(e) => handleEditPresenceClick(e)}>{attendee.name}</a>

									{
										attendee.available
											? <button className="present">present</button>
											: <button className="absent">absent</button>
									}
								</li>
							))
						}
					</ul>
					<form action="submit" className="participate-form" onSubmit={(e) => handleSubmit(e)}>
						<input type="text" placeholder='Jane Doe' defaultValue={currEditUser.name} />
						<div className="left">
							<input
								type="radio"
								name='participate'
								value='yes'
							/>
							<label htmlFor="doParticipate">Yes</label>
						</div>
						<div className="right">
							<input
								type="radio"
								name='participate'
								value='no'
							/>
							<label htmlFor="doNotParticipate">no</label>
						</div>
						<div className="bottom">
							<input type="submit" value="Save" />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SingleEventPage