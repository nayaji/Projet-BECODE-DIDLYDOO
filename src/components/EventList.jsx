import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { Link } from "react-router-dom";


const EventsList = ({ displayAttendee, deleteEvent, addAttendee }) => {
	const [events, setEvents] = useState([]);
	const [toggleMore, setToggleMore] = useState(new Array(events.length).fill(false))

	useEffect(() => {
		fetchEvents()
	}, [])

	// Récupération des détails d'un événement
	const fetchEvents = async (id) => {
		try {
			const res = await fetch(`/api/events`);
			const data = await res.json();
			setEvents(data);
		} catch (error) {
			console.error("Erreur lors du chargement de l'événement :", error);
		}
	};

	const handleToggle = (i) => {
		let toggleCopy = [...toggleMore];
		toggleCopy.fill(false)
		toggleCopy[i] = !toggleCopy[i];

		setToggleMore([...toggleCopy]);
	}

	return (
		<section className="container all-event-list">
			<div className="text-content">
				<h1>Liste des événements</h1>
				<Link to={'/new-event'}>Add an Event</Link>
			</div>
			<ul>
				{events.map((event, index) =>
					<EventCard
						handleToggle={handleToggle}
						toggleMore={toggleMore}
						index={index}
						event={event}
						displayAttendee={displayAttendee}
						deleteEvent={deleteEvent}
						addAttendee={addAttendee}
					/>)}
			</ul>
		</section>
	);
};


export default EventsList