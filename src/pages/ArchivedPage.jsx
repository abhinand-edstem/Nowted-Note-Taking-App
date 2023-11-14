import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArchived, restoreArchive } from "../store/allArchive/ArchiveActions";

const ArchivedPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArchived());
    }, [])

    const allArchived = useSelector((store) => store.archive.archived);
    
    const handleRestore = (id) => {
        dispatch(restoreArchive(id));
        setTimeout(()=>{
            dispatch(getArchived()); 
        },100)
    }

    return (
        <>
            <h2 className="my-4 text-center text-3xl">Archived Notes</h2>
            <button className="bg-blue-500 p-2 rounded mx-5" onClick={() => navigate("/")}>Back to Home</button>
            <div className="flex flex-wrap">
                {allArchived && allArchived.length > 0 && allArchived.map((item) => (
                    <>
                        <div className='border border-black w-[30vw] h-auto m-5 rounded'>
                            <div className='flex justify-between px-4 my-4'>
                                <h1 className="font-bold text-xl">{item?.title}</h1>
                                <button onClick={() => handleRestore(item?.id)} className="bg-blue-500 p-2 rounded mx-2">Restore</button>
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