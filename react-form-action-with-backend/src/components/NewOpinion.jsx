import {useActionState, use} from 'react';
import {OpinionsContext} from "../store/opinions-context.jsx";
import Submit from "./Submit";

export function NewOpinion() {
  const {addOpinion} = use(OpinionsContext);

  async function shareOpinionAction(prevFormState, formData) {
    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];
    if (title.trim().length < 5) {
      errors.push('Please provide a title with at least 5 characters.');
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push(
        'Please provide an opinion with 10 to 300 characters.'
      );
    }

    if (!userName.trim()) {
      errors.push('Please provide your name.');
    }

    if (errors.length > 0) {
      return {
        errors, enteredValues: {
          title,
          body,
          userName
        }
      };
    }

    // Submit opinion to backend
    console.log('Submitting opinion...');
    await addOpinion({
      title,
      body,
      userName,
      votes: 0
    });
    return {errors: null};
  }

  const [formState, formAction] = useActionState(shareOpinionAction, {errors: null});

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}

        <Submit/>
      </form>
    </div>
  );
}
