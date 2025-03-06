import {useRouteLoaderData} from "react-router-dom";

import EventForm from "../components/EventForm";

export default function EditEventPage() {
  const data = useRouteLoaderData('event-detail');
  return (
    <>
      <h1>Edit Event</h1>
      <EventForm method="patch" event={data.event} />
    </>
  );
}