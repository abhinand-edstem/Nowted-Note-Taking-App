import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const TrashPage = () => {
    const navigate = useNavigate();

    const [data, setdata] = useState();

    useEffect(()=>{
        axios.get("http://localhost:8080/v1/trash").then((res=>{
            setdata(res?.data)
        }))
    },[])

    const handleRestore = (id) =>{
        axios.put(`http://localhost:8080/v1/trash/${id}/restore`)
    }

    return (
        <>
            <h2 className="my-4 text-center text-3xl">Trash Items</h2>
            <button className="bg-blue-500 p-2 rounded mx-5" onClick={() => navigate("/")}>Back to Home</button>
            <div className="flex flex-wrap">
                {data && data.length && data.map((item) => (
                    <>
                        <div className='border border-black w-[30vw] h-auto m-5 rounded'>
                            <div className='flex justify-between px-4 my-4'>
                                <h1 className="font-bold text-xl">{item?.note?.title}</h1>
                                {/* <p>{item?.folderName}</p> */}
                                <button onClick={()=>handleRestore(item?.id)} className="bg-blue-500 p-2 rounded">Restore</button>
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