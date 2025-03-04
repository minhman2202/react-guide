import EventForm from "../components/EventForm";

export default function EditEventPage() {
  return (
    <>
      <h1>Edit Event</h1>
      <EventForm method="patch" />
    </>
  );
}