import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLS = (updatedTodos) => {
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

const toggleFinished = (e) => {
  setShowFinished(!showFinished)

}


  const handleAdd = () => {
  const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
  setTodos(newTodos);
  setTodo("");
  saveToLS(newTodos);
};


  const handleEdit = (e, id) => {
  let t = todos.filter((i) => i.id === id);
  setTodo(t[0].todo);
  let newTodos = todos.filter((item) => item.id !== id);
  setTodos(newTodos);
  saveToLS(newTodos);
};


  const handleDelete = (e, id) => {
  let newTodos = todos.filter((item) => item.id !== id);
  setTodos(newTodos);
  saveToLS(newTodos);
};


  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
  const id = e.target.name;
  const index = todos.findIndex((item) => item.id === id);

  if (index !== -1) {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  }
};


  return (
    <>
      <Navbar />
      <div className="md:container md:mx-auto mx-5 my-5 rounded-xl p-5 bg-violet-100 min-h-[40%] md:w-1/2">
      <h1 className="font-bold text-center text-xl">iTask - Manage yuor todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4  ">
          <h2 className="text-2xl font-bold text-center">Add a Todo</h2>
          <input
            value={todo}
            onChange={handleChange}
            className="bg-white w-full px-5 py-2 rounded-2xl "
            type="text"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<=3}
            className="bg-violet-800 hover:bg-violet-950 text-white rounded-md p-2 py-2  font-bold cursor-pointer text-sm disabled:bg-violet-800 w-[20%] mx-auto"
          >
            Save
          </button>
        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished <hr className="opacity-20 my-2" />
        <h2 className="text-xl font-bold">Your Task</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No Todos Added</div>}
          {todos.map((item) => {
            return ( (showFinished || !item.isCompleted) && <div
                key={item.id}
                className="todo flex  justify-between my-2 bg-white p-1.5 rounded-md md:w-auto"
              >
                <div className="flex gap-5">
                  <input
                    onChange={handleCheckBox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                    id=""
                  />
                  <div className={item.isCompleted ? "" : "line-through"}>
                    {item.todo}
                  </div>
                </div>
                <div className="button flex h-full">
                  <button
                    onClick={(e) => {
                      handleEdit(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 text-white rounded-md p-2 py-1 mx-1 font-bold cursor-pointer text-sm"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 text-white rounded-md p-2 py-1 mx-1 font-bold cursor-pointer text-sm"
                  >
                    <MdDelete/>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
