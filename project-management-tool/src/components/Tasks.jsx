import NewTask from "./NewTask.jsx";

export default function Tasks({tasks, onAdd, onDelete}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd}/>
      {tasks.length === 0 && (
        <p className="text-stone-800 my-4">
          This project does not have any tasks yet.
        </p>)}

      {tasks.length > 0 && (
        <ul className="p-4 mt-8 rounded-md bg-stone-100">
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between p-2 border-b-2 border-stone-300">
              <div>
                <p className="text-stone-700">{task.text}</p>
              </div>
              <button onClick={() => onDelete(task.id)} className="text-stone-600 hover:text-stone-800">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </section>);
}