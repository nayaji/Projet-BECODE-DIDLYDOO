import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = ({fetchEvent}) => {
	const { id } = useParams();
	const [event, setEvent] = useState(null);

	useEffect(() => {
		const getEvent = async () => {
			setEvent(await fetchEvent(id))
		}
		
		getEvent()
	}, [])

	if (!event) return <p>Chargement...</p>;

	return (
		<div>
			<h1>{event.name}</h1>
			<p>{event.description}</p>
			<p>Auteur: {event.author}</p>
		</div>
	);
};

export default EventDetails;