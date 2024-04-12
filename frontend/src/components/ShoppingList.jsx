import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";


function ShoppingList() {
    // const [item, setItem] = useState([{ id: 0, name: "item1", quantity: 2 }]);
    const [item, setItem] = useState([]);
    const [nameQuantity, setNameQuantity] = useState({
        name: "",
        quantity: "",
    });
    const [editId, setEditId] = useState(null);
    const [editItem, setEditItem] = useState(null);


    useEffect(() => {
        axios.get("http://localhost:4000/api/shoppingList/getList")
        .then((response)=>{
            setItem(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
      
    }, [])
    


    const handleSubmit = () => {
        if (nameQuantity?.name && nameQuantity?.quantity) {

            axios.post("http://localhost:4000/api/shoppingList/addList",nameQuantity)
            .then((response)=>{
                
                setItem((prevState) => [...prevState, response.data]);
                setNameQuantity({ name: "", quantity: "" });
            })
            .catch((error)=>{
                console.log(error)
            })




            // const id = Date.now();
            // const itm = { id, ...nameQuantity };

            // setItem((prevState) => [...prevState, itm]);
            // setNameQuantity({ name: "", quantity: "" });
        }
    };

    const saveEdit = (_id) => {
        const editData = {_id:_id,name:editItem.name,quantity:editItem.quantity}
        axios.put("http://localhost:4000/api/shoppingList/editList",editData)
            .then((response)=>{
                setItem(
                item.map((el) => {
                    if (el._id == _id) {
                        el.name = editItem.name;
                        el.quantity = editItem.quantity;
                        return el;
                    }
                    return el;
                })
            );
            setEditId(null);
            setEditItem(null);
            })
            .catch((error)=>{
                console.log(error)
            })





        // setItem(
        //     item.map((el) => {
        //         if (el._id == id) {
        //             el.name = editItem.name;
        //             el.quantity = editItem.quantity;
        //             return el;
        //         }
        //         return el;
        //     })
        // );
        // setEditId(null);
        // setEditItem(null);
    };

    const deleteItem = (_id) => {
        axios.delete(`http://localhost:4000/api/shoppingList/deleteList/${_id}`)
        .then((response)=>{
            
            setItem(item.filter(el => el._id != _id))
            
        })
        .catch((error)=>{
            console.log(error)
        })
        // setItem(item.filter(el => el._id != id))
    };

    return (
        
        <div className="w-full ml-5 flex flex-col">
            {/* items : {JSON.stringify(item)}
            <br />
            item value : {JSON.stringify(nameQuantity)}
            <br />
            editId : {JSON.stringify(editId)}
            <br />
            editItem: {JSON.stringify(editItem)}
            <br /> */}
            <div className="">

            <h2 className="text-3xl text-center">Shopping List</h2>
            </div>
            <br />
            
            {/* Input Section  */}
            <div className="mx-auto">
                <input
                className="border p-1 border-slate-500 rounded w-56 mr-2"
                    type="text"
                    placeholder="Item Name"
                    value={nameQuantity.name}
                    onChange={(e) =>
                        setNameQuantity((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                        }))
                    }
                />
                <input
                className="border p-1 border-slate-500 rounded w-56 mr-2"
                    type="number"
                    placeholder="Item Quantity"
                    value={nameQuantity.quantity}
                    onChange={(e) =>
                        setNameQuantity((prevState) => ({
                            ...prevState,
                            quantity: parseInt(e.target.value, 10),
                        }))
                    }
                />
                <button className="bg-blue-500 text-cyan-50 p-1  border-blue-500 w-20 rounded" onClick={handleSubmit}>Submit</button>
            </div>
            <br />
            {/* Showing item in table  */}
            <table className="table-auto w-4/5 text-left mx-auto">
                <thead className="border bg-gray-500 text-gray-200">

                
                <tr>
                    <th >S.N.</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>

               
                {item?.map((el, index) => (
                    <tr key={el._id} className="border " >
                        <td className="py-2 px-2">{index+1}</td>
                        <td className="">
                            {el._id == editId ? (
                                <input
                                className="border p-1 border-slate-500 rounded w-56 mr-2"
                                    type="text"
                                    value={editItem.name}
                                    onChange={(e) =>
                                        setEditItem((prevState) => ({
                                            ...prevState,
                                            name: e.target.value,
                                        }))
                                    }
                                />
                            ) : (
                                <p>{el.name}</p>
                            )}
                        </td>
                        <td>
                            {editId == el._id ? (
                                <input
                                className="border p-1 border-slate-500 rounded w-16  mr-2"
                                    type="number"
                                    value={editItem.quantity}
                                    onChange={(e)=>setEditItem(prevState=>({...prevState,quantity:Number(e.target.value)}))}
                                />
                            ) : (
                                el.quantity
                            )}
                        </td>

                        <td>
                            {editId == el._id ? (
                                <button className="bg-green-500 px-3 rounded text-white w-16 py-0.5" onClick={() => saveEdit(el._id)}>
                                    Save
                                </button>
                            ) : (
                                <button
                                className="bg-blue-500 px-3 rounded text-white w-16 py-0.5"
                                    onClick={() => {
                                        setEditId(el._id);
                                        setEditItem(el);
                                    }}
                                >
                                    Edit
                                </button>
                            )}{" "}
                            <button className="bg-red-500 px-3 rounded text-white w-16 py-0.5" onClick={(e)=>deleteItem(el._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                 </tbody>
            </table>
            
            </div>
        
    );
}

export default ShoppingList;