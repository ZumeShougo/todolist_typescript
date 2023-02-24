import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import './App.css';

interface Todo {
  id: number;
  title: string;
  status: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [todoId, setTodoId] = useState<number>(todos.length + 1);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [newTitle, setNewTitle] = useState<string>('');
  const [filter, setFilter] = useState<string>('notStarted');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const handleAddFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTodoTitle(e.target.value);
  };

  const resetFormInput = (): void => {
    setTodoTitle('');
  };

  const handleAddTodo = (): void => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted'}]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  const handleDeleteTodo = (targetTodo: Todo): void => {
    setTodos(todos.filter((todo: Todo) => targetTodo !== todo));
  };

  const handleEditOpenForm = (todo: Todo): void => {
    setIsEditable(true);
    setEditId(todo.id);
    setNewTitle(todo.title);
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewTitle(e.target.value);
  };

  const handleEditCloseForm = (): void => {
    setIsEditable(false);
    setEditId(0);
  };

  const handleEditTodo = (): void => {
    const newArray = todos.map((todo: Todo) =>
      todo.id === editId ? { ...todo, title: newTitle } : todo
    );
    setTodos(newArray);
    setNewTitle('');
    setEditId(0);
    handleEditCloseForm();
  };

  const handleStatusChange = (targetTodo: Todo, e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newArray = todos.map((todo: Todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo
    );
    setTodos(newArray);
  };

  useEffect(() => {
    const filteringTodos = (): void => {
      switch (filter) {
        case 'notStarted':
          setFilteredTodos(todos.filter((todo: Todo) => todo.status === 'notStarted'));
          break;
        case 'inProgress':
          setFilteredTodos(todos.filter((todo: Todo) => todo.status === 'inProgress'));
          break;
        case 'done':
          setFilteredTodos(todos.filter((todo: Todo) => todo.status === 'done'));
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos]);


  return (
    <>
  {isEditable ? (
    <div className="flex justify-between items-center mb-4">
      <input
        className="border-gray-300 border-2 rounded-md py-1 px-2 w-80"
        type="text"
        value={newTitle}
        onChange={handleEditFormChange}
      />
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
          onClick={handleEditTodo}
        >
          編集を保存
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
          onClick={handleEditCloseForm}
        >
          キャンセル
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-between items-center mb-4">
      <input
        placeholder="タスクを入力してください"
        className="border-gray-300 border-2 rounded-md py-1 px-2 w-80"
        type="text"
        value={todoTitle}
        onChange={handleAddFormChange}
      />
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
          onClick={handleAddTodo}
        >
          作成
        </button>
        <select
          className="border-gray-300 border-2 rounded-md py-1 px-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">すべて</option>
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
      </div>
    </div>
  )}
  <ul>
    {filteredTodos.map((todo) => (
      <li key={todo.id} className="flex justify-between items-center mb-4">
        <span>{todo.title}</span>
        <select
          className="border-gray-300 border-2 rounded-md py-1 px-2"
          value={todo.status}
          onChange={(e) => handleStatusChange(todo, e)}
        >
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
            onClick={() => handleEditOpenForm(todo)}
          >
            編集
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            onClick={() => handleDeleteTodo(todo)}
          >
            削除
          </button>
        </div>
      </li>
    ))}
  </ul>
</>

  )
}
export default App;

