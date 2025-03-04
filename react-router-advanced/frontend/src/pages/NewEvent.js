import EventForm from "../components/EventForm";

export default function NewEventPage() {
  return (
    <>
      <h1>Add a New Event</h1>
      <EventForm method="post" />
    </>
  );
}