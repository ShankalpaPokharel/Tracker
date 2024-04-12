import React, { useState, useId, useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios"
// import { response } from "../../../backend/src/app";
// import { response } from "../../../backend/src/app";

function Todo() {
    // const [todo, setTodo] = useState([
    //     { id: 0, task: "sample task", status: false },
    // ]);
    const [todo, setTodo] = useState([]);
    const [name, setName] = useState({ task: "" });

    const id = uuid();

    const [editId, setEditId] = useState(null);

    const [editValue, setEditValue] = useState();

    useEffect(() => {
        axios.get("http://localhost:4000/api/todo/getTodo")
        .then((response)=>{
            setTodo(response.data)
            console.log(response.data)
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    }, [])
    

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:4000/api/todo/addTodo", {
                task: name.task,
            })
            .then((response) => {
                setTodo([...todo, response.data]);
                console.log("Success:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
            
        // setTodo([...todo, { id: id, task: name.task, status: false }]);
        setName({ task: "" });

       


    };

    const checkBoxChange = (el) => {
        // let status = el.status
        axios.put("http://localhost:4000/api/todo/editTodo",{
            id:el._id,
            task:editValue,
            status:!el.status
        })
        .then((response)=>{
            setTodo((prevTodo) =>
            prevTodo.map((todoS) => {
                if (todoS._id == el._id) {
                    return { ...todoS, status: !todoS.status };
                }
                return todoS;
            })
        );
        })
        .catch((error) => {
            console.error("Error:", error);
        });


        
        // console.log(el)
    };

    const handleEditSubmit = (el) => {

        axios.put("http://localhost:4000/api/todo/editTodo",{
            id:el._id,
            task:editValue,
            status:el.status
        })
        .then((response)=>{
            setTodo((prevTodo) =>
            prevTodo.map((taskS) => {
                if (taskS._id == el._id) {
                    return { ...taskS, task: editValue };
                }
                return taskS;
            })
        );
        setEditId(null);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        
    };

    const handleEdit = (el) => {
        setEditId(el._id);
        setEditValue(el.task);
    };

    const handleDelete = (el) => {
        console.log(el)
        axios
        .delete(`http://localhost:4000/api/todo/deleteTodo/${el._id}`)
        .then((response) => {
            setTodo(todo.filter((todo) => todo._id !== el._id));
        })
        .catch((error) => {
            console.error("Error:", error);
        });

        
    };

    return (
        <>
            <div className="mt-5 w-screen">
                <div className="flex mx-auto justify-center">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="border border-slate-300 rounded-l w-96 p-2"
                            type="text"
                            name="todo"
                            id=""
                            placeholder="Add Your task"
                            value={name.task}
                            onChange={(e) => setName({ task: e.target.value })}
                        />
                        {/* <input type="text" name="todo" id="" /> */}
                        <button className="bg-blue-500 border border-blue-300 p-2 rounded-r">
                            Add Task
                        </button>
                    </form>
                </div>

                <div className="mt-2 w-4/5  mx-auto">
                    <table className="mt-5 w-full text-left">
                        <thead className="border">
                            <tr className="bg-gray-500 text-white">
                                <th>SN</th>
                                <th>Task</th>
                                <th>Status</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todo.map((el, index) => (
                                <tr key={el._id} className="border">
                                    <td>{index+1}</td>
                                    {/* <td> {el.task}</td> */}
                                    <td>
                                        {el._id == editId ? (
                                            <input
                                                className="border border-slate-500 rounded p-1 w-full"
                                                type="text"
                                                value={editValue}
                                                onChange={(e) =>
                                                    setEditValue(e.target.value)
                                                }
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
                                        {el._id == editId ? (
                                            <button
                                                className="bg-blue-500 border w-16 rounded p-1 mr-2"
                                                onClick={() =>
                                                    handleEditSubmit(el)
                                                }
                                            >
                                                Submit
                                            </button>
                                        ) : (
                                            <button
                                                className="bg-blue-500 border w-16 rounded p-1 mr-2"
                                                onClick={() => handleEdit(el)}
                                            >
                                                Edit
                                            </button>
                                        )}
                                        {/* <button>Edit</button> */}
                                        <button
                                            className="bg-red-500 border w-16 rounded p-1 mr-2"
                                            onClick={() => handleDelete(el)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* <p>Output</p>
            {todo.map((el) => (
                <div key={el.id}>
                    <p>
                        Id: {el.id} Task : {el.task} || Staus:{" "}
                        {JSON.stringify(el.status)}
                    </p>
                    <input type="checkbox" checked={el.status} />
                </div>
            ))} */}
            </div>
        </>
    );
}

export default Todo;
