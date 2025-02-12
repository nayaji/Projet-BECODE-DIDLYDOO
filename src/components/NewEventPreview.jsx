const NewEventPreview = ({ eventData }) => {
	return (
		<div className="single-card-wrapper">
			<div className='event-card'>
				<div className="text">
					<h2>{eventData.name || "N/A"}</h2>
				</div>
				<div className="upper">
					<p className="description">{eventData.description || "N/A"}</p>
				</div>

				<div className='more'>
					<ul className="dates">
						{eventData.dates || "N/A"}
					</ul>
					<ul className="participants">
					</ul>
					<form action="#" className="participate-form">
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
							<input type="button" value="Save" />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
  };
  
  export default NewEventPreview;  


//   <p><strong>Auteur :</strong> {eventData.author || "N/A"}</p>