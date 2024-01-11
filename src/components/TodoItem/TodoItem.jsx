import "./TodoItem.style.css";

/**
 * Renders a TodoItem component.
 *
 * @param {object} props - The properties object containing id, title, isCompleted, onToggle, and onDelete.
 * @return {JSX.Element} - The rendered TodoItem component.
 */
export default function TodoItem(props) {
  const { id, title, isCompleted, onToggle, onDelete } = props;

  return (
    <div className="todo-item-wrapper">
      <h2 className={`todo-title ${isCompleted ? "completed-todo" : ""}`}>
        {title}
      </h2>
      {/* If the todo is completed, add the completed-todo class to the h2 element. */}
      <button className="btn btn-primary" onClick={() => onToggle(id)}>
        {isCompleted ? "Undo" : "Done"}
        {/* Show "Undo" if the todo is completed, otherwise show "Done". */}
      </button>
      <button className="btn btn-danger" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
