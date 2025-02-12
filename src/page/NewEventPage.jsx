import { useState } from "react";
import "../styles/newEventPage.css";
import NewEventForm from "../components/NewEventForm";
import NewEventPreview from "./NewEventPreview";
import { useNavigate } from "react-router-dom";

const NewEventPage = () => {
	const navigate = useNavigate()

	const [eventData, setEventData] = useState({
		name: "",
		dates: [{ id: Date.now(), value: "" }],
		author: "",
		description: "",
	});

	const addDateField = () => {
		setEventData({
			name: eventData.name,
			dates: [...eventData.dates, { id: Date.now(), value: "" }],
			author: eventData.author,
			description: eventData.description,
		})
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name != 'dates'){
			setEventData({ ...eventData, [name]: value });
		}
	};

	const handleDateChange = (e, index) => {
		let eventDataCopy = {...eventData}
		eventDataCopy.dates[index].value = e.target.value

		setEventData(eventDataCopy)
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Données envoyées :", eventData); // Vérification

		try {
			const response = await fetch("/api/events/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: eventData.name,
					author: eventData.author,
					description: eventData.description,
					dates: eventData.dates.split(",").map((date) => date.trim()), // Convertir en tableau
				}),
			});

			if (!response.ok) throw new Error("Erreur lors de la création de l'événement.");

			alert("Événement créé !");
			setEventData({ name: "", dates: "", author: "", description: "" }); // Reset le formulaire
			navigate('/')
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="container new-event-wrapper" >
				<NewEventForm
					eventData={eventData}
					handleChange={handleChange}
					handleDateChange={handleDateChange}
					handleSubmit={handleSubmit}
					addDateField={addDateField}
				/>

				{/* Aperçu en direct */}
				< div className="new-event-preview" >
					<NewEventPreview event={eventData} />
				</div >
			</div>
		</>
	);
};

export default NewEventPage;