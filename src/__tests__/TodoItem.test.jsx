import TodoItem from "../components/TodoItem/TodoItem";
import { render, screen, fireEvent } from "@testing-library/react";
const todoItemProps = {
  id: 1,
  title: "Learn React",
  isCompleted: false,
  onToggle: jest.fn(),
  onDelete: jest.fn(),
};
const renderTodoItem = (customProps) => {
  return render(<TodoItem {...todoItemProps} {...customProps} />);
};
describe("TodoItem", () => {
  it("test todoItem compnent should render with correct props", () => {
    renderTodoItem();
    const title = screen.getByText("Learn React");
    const doneButton = screen.getByText("Done");
    expect(title && doneButton).toBeInTheDocument();
    expect(title).toHaveClass("todo-title");
  });

  it("test onToggle function is triggered when the Undo button is clicked", () => {
    renderTodoItem();
    const doneButton = screen.getByText("Done");
    fireEvent.click(doneButton);
    expect(todoItemProps.onToggle).toHaveBeenCalledWith(1);
  });
  it("test if onclicking the Undo button should call onToggle", () => {
    renderTodoItem({ isCompleted: true });
    const undoButton = screen.getByText("Undo");
    fireEvent.click(undoButton);
    expect(todoItemProps.onToggle).toHaveBeenCalledWith(1);
  });
  it("test if Delete button click is calling onDelete function", () => {
    renderTodoItem();
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(todoItemProps.onDelete).toHaveBeenCalledWith(1);
  });
});
