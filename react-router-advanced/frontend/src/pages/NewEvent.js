import EventForm from "../components/EventForm";
import {redirect} from "react-router-dom";

export default function NewEventPage() {
  return <EventForm method="post" />;
}

export async function action({request, params}) {
  // this action function will be called by React Router and request & params are also provided by React Router
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };
  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // has validation errors returned from the backend
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw Response.json({message: 'Could not save event.'}, {status: 500});
  }

  return redirect('/events');
}