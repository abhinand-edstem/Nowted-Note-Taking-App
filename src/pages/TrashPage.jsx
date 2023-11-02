import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrash } from "../store/allTrash/TrashAction";
import { useNavigate } from "react-router-dom";

const TrashPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((store) => store.trash.trash);

    useEffect(() => {
        dispatch(getTrash());
    }, [])

    return (
        <>
            <h2 className="my-4 text-center text-3xl">Trash Items</h2>
            <button className="bg-blue-500 p-2 rounded mx-5" onClick={() => navigate("/")}>Back to Home</button>
            <div className="flex flex-wrap">
                {data && data.length && data.map((item) => (
                    <>
                        <div className='border border-black w-[30vw] h-auto m-5 rounded'>
                            <div className='flex justify-between px-4 my-4'>
                                <h1 className="font-bold text-xl">{item?.title}</h1>
                                <p>{item?.Category}</p>
                            </div>

                            <div className="px-4 mb-4">
                                <p>{item?.text}</p>
                            </div>

                        </div>
                    </>
                ))}
            </div>

        </>

    )
}

export default TrashPage