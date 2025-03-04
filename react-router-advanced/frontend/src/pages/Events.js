import EventsList from "../components/EventsList";

const DUMMY_EVENTS = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event'
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description: 'We know: Networking is no fun if you are an introvert person.',
  }
];

export default function EventsPage() {
  return (
    <>
      <h1>All Events</h1>
      <EventsList events={DUMMY_EVENTS}/>
    </>
  );
}