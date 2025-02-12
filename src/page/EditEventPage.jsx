import { useState } from "react";
import "../styles/newEventPage.css";
import NewEventForm from "../components/NewEventForm";
import NewEventPreview from "./NewEventPreview";
import { useLoaderData } from "react-router-dom";

const EditEventPage = () => {
	const eventData = useLoaderData()
	const [eventPreview, setEventPreview] = useState({
		name: eventData.name,
		dates: eventData.dates,
		author: eventData.author,
		description: eventData.description,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEventPreview({ ...eventPreview, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="container new-event-wrapper" >
				<NewEventForm
					edit={true}
					eventData={eventPreview}
					handleChange={handleChange}
					handleSubmit={handleSubmit}
				/>

				{/* Aperçu en direct */}
				<NewEventPreview event={eventPreview} />
			</div>
		</>
	);
};

export default EditEventPage;
