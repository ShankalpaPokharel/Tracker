import React, { useState, useId } from "react";
import { v4 as uuid } from "uuid";

function Todo() {
    const [todo, setTodo] = useState([
        { id: 0, task: "sample task", status: false },
    ]);
    const [name, setName] = useState({ task: "" });

    const id = uuid();

    const [editId, setEditId] = useState(null);

    const [editValue, setEditValue] = useState(todo[0].task);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTodo([...todo, { id: id, task: name.task, status: false }]);
        setName({ task: "" });
    };

    const checkBoxChange = (el) => {
        // let status = el.status

        setTodo((prevTodo) =>
            prevTodo.map((todoS) => {
                if (todoS.id == el.id) {
                    return { ...todoS, status: !todoS.status };
                }
                return todoS;
            })
        );
        // console.log(el)
    };

    const handleEditSubmit = (el) => {
        setTodo((prevTodo) =>
            prevTodo.map((taskS) => {
                if (taskS.id == el.id) {
                    return { ...taskS, task: editValue };
                }
                return taskS;
            })
        );
        setEditId(null)
    };
   
    ;
    const handleEdit = (el) => {
        setEditId(el.id);
        setEditValue(el.task)

    };
  
    const handleDelete = (el) =>{
        setTodo(todo.filter(todo => todo.id !== el.id))
    }

    return (
        <>
        <div className="mt-5">
            <form onSubmit={handleSubmit}>
                <input
                className="border border-slate-300 rounded "
                    type="text"
                    name="todo"
                    id=""
                    value={name.task}
                    onChange={(e) => setName({ task: e.target.value })}
                />
                {/* <input type="text" name="todo" id="" /> */}
                <button className="bg-blue-500">Add Task</button>
            </form>

            <table className="table-fixed">
            <thead>
                <tr>
                    <th>SN</th>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Edit/Delete</th>
                </tr>
                </thead>
                <tbody>
                {todo.map((el, index) => (
                    <tr key={el.id}>
                        <td>{index}</td>
                        {/* <td> {el.task}</td> */}
                        <td>
                            {el.id == editId ? (
                                <input
                                className=""
                                    type="text"
                                    value={editValue}
                                    onChange={(e)=>setEditValue(e.target.value)}
                                />
                            ) : (
                                el.task
                            )}
                        </td>
                        <td>
                            <input
                                type="checkbox"
                                checked={el.status}
                                onChange={() => checkBoxChange(el)}
                            />
                        </td>
                        <td>
                            {el.id == editId ? (
                                <button onClick={() => handleEditSubmit(el)}>
                                    Submit
                                </button>
                            ) : (
                                <button onClick={() => handleEdit(el)}>
                                    Edit
                                </button>
                            )}
                            {/* <button>Edit</button> */}
                            <button onClick={()=>handleDelete(el)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <p>Output</p>
            {todo.map((el) => (
                <div key={el.id}>
                    <p>
                        Id: {el.id} Task : {el.task} || Staus:{" "}
                        {JSON.stringify(el.status)}
                    </p>
                    <input type="checkbox" checked={el.status} />
                </div>
            ))}
            </div>
        </>
    );
}

export default Todo;