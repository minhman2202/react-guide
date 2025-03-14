import {useState} from "react";
import {Link, Outlet, useNavigate, useParams} from 'react-router-dom';
import {useMutation, useQuery} from "@tanstack/react-query";

import Header from '../Header.jsx';
import {deleteEvent, fetchEvent, queryClient} from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({signal, id: params.id}),
  });

  const {mutate, isPending: isPendingDeletion, isError: isErrorDeletion, error: deletionError} = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      navigate('/events');
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none', // do not trigger fetching data immediately, but wait for refetch next time
      });
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({id: params.id});
  }

  let content;
  if (isPending) {
    content = <div id="event-details-content" className="center">
      <p>Fetching event data...</p>
    </div>;
  }

  if (isError) {
    content = <div id="event-details-content" className="center">
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to load event.'}/>
    </div>;
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title}/>
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? This action cannot be undone.</p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting, please wait...</p>}
            {!isPendingDeletion &&
              <>
                <button onClick={handleStopDelete} className="button-text">Cancel</button>
                <button onClick={handleDelete} className="button">Delete</button>
              </>
            }
          </div>
          {isErrorDeletion &&
            <ErrorBlock title="An error occurred" message={deletionError.info?.message || 'Failed to delete event.'}/>}
        </Modal>
      )}
      <Outlet/>
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
