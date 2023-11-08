import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrash, getTrash } from "../store/allTrash/TrashActions";

const TrashPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
       dispatch(getTrash()); 
    },[])

    const allTrash = useSelector((store) => store.trash.trash);
    const handleRestore = (id) =>{
        dispatch(getTrash(id))
        setTimeout(()=>{
            dispatch(getTrash()); 
        },100)
    }

    const handleDelete = (id) =>{
        debugger;
        dispatch(deleteTrash(id));
        setTimeout(()=>{
            dispatch(getTrash()); 
        },100)
    }

    return (
        <>
            <h2 className="my-4 text-center text-3xl">Trash Items</h2>
            <button className="bg-blue-500 p-2 rounded mx-5" onClick={() => navigate("/")}>Back to Home</button>
            <div className="flex flex-wrap">
                {allTrash && allTrash.length && allTrash.map((item) => (
                    <>
                        <div className='border border-black w-[30vw] h-auto m-5 rounded'>
                            <div className='flex justify-between px-4 my-4'>
                                <h1 className="font-bold text-xl">{item?.note?.title}</h1>
                                <div>
                                <button onClick={()=>handleRestore(item?.id)} className="bg-blue-500 p-2 rounded mx-2">Restore</button>
                                <button onClick={()=>handleDelete(item?.id)} className="bg-blue-500 p-2 rounded">Delete</button>
                                </div>
                            </div>

                            <div className="px-4 mb-4">
                                <p>{item?.note?.content}</p>
                            </div>

                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default TrashPage