import '../styles/SingleEventPage.css'

const NewEventPreview = ({ event }) => {
  return (
	<div className="single-card-wrapper">
		<div className='event-card'>
			<div className="text">
				<h2>{event.name ? event.name: 'Event Name'}</h2>

			</div>
			<div className="upper">
				<p>{event.author ? event.author : 'Author'}: </p>
				<p className="description">{event.description ? event.description : 'Description goes here...'}</p>
			</div>
			
			<div className='more'>
				<ul className="dates">
					{event.dates.map(date => (<li><a href='#!'>{date.value}</a></li>))}
				</ul>
				<ul className="participants">
					<li>
						<div className="img-wrapper">
							<img src={`https://picsum.photos/id/1/200/300`} alt="profile pic" />
						</div>
						<p>Amy Linn</p>
						<button>delete</button>
					</li>
					<li>
						<div className="img-wrapper">
							<img src={`https://picsum.photos/id/10/200/300`} alt="profile pic" />
						</div>
						<p>Theo Lion</p>
						<button>delete</button>
					</li>
					<li>
						<div className="img-wrapper">
							<img src={`https://picsum.photos/id/100/200/300`} alt="profile pic" />
						</div>
						<p>Adeline Moreaux</p>
						<button>delete</button>
					</li>
					<li>
						<div className="img-wrapper">
							<img src={`https://picsum.photos/id/111/200/300`} alt="profile pic" />
						</div>
						<p>Jean Deheux</p>
						<button>delete</button>
					</li>
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