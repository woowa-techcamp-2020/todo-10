import { List, Element, H, Todo, Button } from "../basic";
import ModalColumnTitleEdit from "../ModalColumnTitleEdit";
import NewTodoForm from "./NewTodoForm";
import "./Column.scss";

const handleColumnTitleDoubleClick = (event, columnTitle) => {
  event.preventDefault();
  new ModalColumnTitleEdit(columnTitle);
};

export default class Column extends Element {
  /**
   *
   * @param {string} title
   * @param {Todo[]} todos
   */
  constructor(title, todos = []) {
    super("div", { class: "column" });
    const header = new Element("div", { class: "column-header" });

    const headerLeft = new Element("div", { class: "flex" });
    this.$count = new Element("div", {
      text: "" + todos.length,
      class: "column-todo-count",
    });
    headerLeft.appendChild(this.$count);

    this.$title = new H(2, title, {
      ondblclick: (event) => {
        handleColumnTitleDoubleClick(event, title);
      },
    });
    headerLeft.appendChild(this.$title);

    const headerRight = new Element("div");
    this.$newBtn = new Button(
      "+",
      (evt) => {
        alert("+ button clicked");
      },
      { class: ["reset-button-style"] }
    );
    headerRight.appendChild(this.$newBtn);
    this.$dotBtn = new Button(
      "...",
      (evt) => {
        alert("... button clicked");
      },
      { class: ["reset-button-style"] }
    );
    headerRight.appendChild(this.$dotBtn);

    header.appendChild(headerLeft);
    header.appendChild(headerRight);
    this.appendChild(header);

    this.$newTodoForm = new NewTodoForm();
    this.appendChild(this.$newTodoForm);

    this.$todos = new List(true);
    const todosWrapper = new Element("div", { class: "column-todos-wrapper" });
    todosWrapper.appendChild(this.$todos);
    this.appendChild(todosWrapper);

    todos.forEach(([i, todo]) => {
      this.addTodo(i, todo);
    });
  }

  /**
   * @private
   */
  refreshCount() {
    this.$count.setText(this.$todos.getCount());
  }

  addTodo(key, todo) {
    this.$todos.push(key, todo);
    this.refreshCount();
  }

  removeTodo(key) {
    this.$todos.remove(key);
    this.refreshCount();
  }

  /**
   *
   * @param {string} title
   */
  setTitle(title) {
    this.$title.setText(title);
  }
}