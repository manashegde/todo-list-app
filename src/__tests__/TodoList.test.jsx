import { render, screen, fireEvent, logRoles } from "@testing-library/react";
import TodoList from "../pages/TodoList/TodoList";
describe("TodoList", () => {
  it("should render a TodoList component with a textbox and add button", () => {
    render(<TodoList />);
    const textbox = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    expect(textbox).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });
  it("test if todo textbox is focused on page mount", () => {
    render(<TodoList />);
    const todoInput = screen.getByRole("textbox");
    expect(todoInput).toHaveFocus();
  });
  it("should add a new todo to the todo list", () => {
    render(<TodoList />);
    const textbox = screen.getByRole("textbox");
    const addButton = screen.getByRole("button", { name: /add todo/i });

    fireEvent.change(textbox, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    const todoItem = screen.getByText("New Todo");
    expect(todoItem).toBeInTheDocument();
  });

  it("should change the input text value from empty to non-empty", () => {
    render(<TodoList />);
    const textbox = screen.getByRole("textbox");

    fireEvent.change(textbox, { target: { value: "New Todo" } });

    expect(textbox.value).toBe("New Todo");
  });
  it("should render a TodoList component with an empty todo list", () => {
    render(<TodoList />);
    const todoItems = screen.queryAllByRole("listitem");
    expect(todoItems.length).toBe(0);
  });
});
