import { useCallback, useState, useRef, useEffect } from "react";
import TodoItem from "../../components/TodoItem/TodoItem";
import plusIcon from "../../assets/icons/plus.svg";
import "./TodoList.style.css";

/**
 * Render a TodoList component.
 *
 * @return {JSX.Element} The rendered TodoList component.
 */
export default function TodoList() {
  const [todoInputValue, setTodoInputValue] = useState(""); // State to store the input value
  const [todoList, setTodoList] = useState([]); // State to store the todo list
  const ref = useRef(null); // Reference to the input field

  useEffect(() => {
    ref.current.focus(); // Focus the input field when the component mounts
  }, []);

  const onTodoInputChange = (event) => {
    setTodoInputValue(event.target.value);
  };

  /**
   * Adds a new todo to the todo list.
   */
  const onAddTodo = useCallback(() => {
    const newTodo = {
      id: Math.random(),
      title: todoInputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setTodoInputValue("");
  }, [todoList, todoInputValue]);

  /**
   * Toggles the completion status of a todo item.
   *
   * @param {number} todoId - The ID of the todo item to toggle.
   */
  const onToggle = (todoId) => {
    setTodoList(
      todoList.map(
        (todo) =>
          todo.id === todoId
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo //Toggle the completion status of the todo item
      )
    );
  };
  /**
   * Deletes a todo item from the todo list.
   *
   * @param {number} todoId - The ID of the todo item to be deleted.
   */
  const onDelete = (todoId) => {
    const updatedTodos = todoList.filter((todo) => todo.id !== todoId); //Filter the todo list to remove the deleted todo item
    setTodoList(updatedTodos);
  };

/**
 * Render the todo items.
 *
 * @return {Array} - An array of rendered TodoItem components.
 */
  const renderTodoItems = () => {
    return todoList.map(
      (
        todo //Map through the todo list and render TodoItem component for each todo item
      ) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          isCompleted={todo.isCompleted}
          onToggle={(todoId) => onToggle(todoId)}
          onDelete={onDelete}
        />
      )
    );
  };

  return (
    <div className="todo-list-wrapper">
      <div className="todo-list-container">
        <span className="todo-list-heading">Manage your Todo List</span>
        <div className="todo-list-textbox-wrapper">
          <input
            type="text"
            onChange={onTodoInputChange}
            value={todoInputValue}
            className="todo-list-textbox"
            placeholder="Enter your todo here..."
            ref={ref}
          />
          <button
            className="btn btn-primary"
            onClick={onAddTodo}
            disabled={!todoInputValue}
          >
            <img src={plusIcon} alt="add todo" />
          </button>
        </div>
        {renderTodoItems()}
      </div>
    </div>
  );
}
