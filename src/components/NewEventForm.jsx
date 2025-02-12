import { useState } from "react";

const NewEventForm = ({ edit = false, eventData, handleChange, handleSubmit, addDateField, handleDateChange }) => {
	
	return (
		<>
			<div className="form-wrapper">
				<form onSubmit={handleSubmit} className="new-event-form container">
					<h2>{edit ? "Editer l'événement" : 'Créer un nouvel événement'}</h2>
					<div className="field">
						<input
							className='new-event-input-name'
							type="text"
							name="name"
							placeholder="Nom de l'événement"
							value={eventData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="field dates-field">
						{eventData.dates?.map((date, index) => (
							<input
								className='new-event-input-date'
								type="date"
								name="dates"
								value={date[index]}
								onChange={(e) => handleDateChange(e, index)}
								required />
						))}
						<button type="button" onClick={() => addDateField()}>+ Date</button>
					</div>
					<div className="field">
						<input
							type="text"
							name="author"
							placeholder="Auteur"
							value={eventData.author}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="field">
						<textarea
							className='new-event-input-description'
							name="description"
							placeholder="Description"
							value={eventData.description}
							onChange={handleChange}
							required
						/>
					</div>
				</form >
				<button
					className='new-event-input-submit button'
					type="submit"
					onClick={handleSubmit}
				>
					{edit
						? "Modifier l'événement" : "Créer l'événement"}
				</button>
			</div>
		</>
	);
};

export default NewEventForm
