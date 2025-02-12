import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import NewEventPage from "./page/NewEventPage";
import AllEventsPage from "./page/AllEventsPage";
import SingleEventPage from "./page/SingleEventPage";
import EditEventPage from "./page/EditEventPage"
import "./styles/normalize.css";
import "./styles/reset.css";

function App() {

	// delete event route
	const deleteEvent = async (id) => {
		await fetch(`/api/events/${id}`, {
			method: 'DELETE'
		})
	}

	// add attendee route
	const addAttendee = async (id, name, dates) => {
		await fetch(`/api/events/${id}/attend`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: name,
				dates: dates
			})
		})
	}

	// Génère une image aléatoire pour un participant
	const displayAttendee = () => {
		return `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/200/300`;
	};

	const eventLoader = async ({ params }) => {
		const res = await fetch(`/api/events/${params.id}`);
		const data = await res.json();
		return data;
	};

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/">
				<Route index element={
					<AllEventsPage
						displayAttendee={displayAttendee}
						deleteEvent={deleteEvent}
						addAttendee={addAttendee}
					/>}
				/>
				<Route path="/new-event" element={<NewEventPage />} />
				<Route
					path="/event/:id"
					loader={eventLoader}
					element={
						<SingleEventPage
							displayAttendee={displayAttendee}
							deleteEvent={deleteEvent}
							addAttendee={addAttendee}
						/>
					}
				/>
				<Route
					path="/edit/:id"
					loader={eventLoader}
					element={
						<EditEventPage />}
				/>
			</Route>
		)
	)

	return <RouterProvider router={router} />;
}
export { App as default };