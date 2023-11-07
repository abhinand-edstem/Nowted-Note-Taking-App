import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ArchivedPage = () => {
    const navigate = useNavigate();

    const [data, setdata] = useState();
    console.log({data});

    useEffect(()=>{
        axios.get("http://localhost:8080/v1/notes/archived").then((res=>{
            setdata(res?.data)
        }))
    },[])

    return (
        <>
            <h2 className="my-4 text-center text-3xl">Archived Notes</h2>
            <button className="bg-blue-500 p-2 rounded mx-5" onClick={() => navigate("/")}>Back to Home</button>
            <div className="flex flex-wrap">
                {data && data.length && data.map((item) => (
                    <>
                        <div className='border border-black w-[30vw] h-auto m-5 rounded'>
                            <div className='flex justify-between px-4 my-4'>
                                <h1 className="font-bold text-xl">{item?.title}</h1>
                                <p>{item?.folder?.name}</p>
                            </div>

                            <div className="px-4 mb-4">
                                <p>{item?.content}</p>
                            </div>

                        </div>
                    </>
                ))}
            </div>

        </>

    )
}

export default ArchivedPage