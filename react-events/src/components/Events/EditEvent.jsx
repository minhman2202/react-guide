import {Link, useNavigate, useParams} from 'react-router-dom';
import {useQuery, useMutation} from "@tanstack/react-query";

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import {fetchEvent, updateEvent, queryClient} from "../../util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();

  const {data, isPending, isError, error} = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({signal}) => fetchEvent({id: params.id, signal}),
  })

  const {mutate} = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({queryKey: ['events', params.id]}); // cancel any pending queries for this event
      const previousEvent = queryClient.getQueryData(['events', params.id]);

      queryClient.setQueryData(['events', params.id], newEvent); // optimistic update, update the cached data immediately

      return {previousEvent};
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.previousEvent); // revert the optimistic update
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['events', params.id]}); // sync data between backend and frontend
    }
  });

  function handleSubmit(formData) {
    mutate({id: params.id, event: formData});
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  if (isPending) {
    content = <div className="center"><LoadingIndicator/></div>;
  }

  if (isError) {
    content = (<>
      <ErrorBlock title="An error occurred" message={error.info?.message || 'Failed to load event.'}/>
      <div className="form-actions">
        <Link to="../" className="button-text">
          Okay
        </Link>
      </div>
    </>);
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
