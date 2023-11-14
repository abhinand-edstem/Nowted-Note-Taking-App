import { useState } from "react";
import { useSelector } from "react-redux";

const FolderListing = ({ setselected, selected, favoritesBtnClick, isFav, folderNotes, setIsOpen }) => {

    const [isClicked, setIsClicked] = useState();

    const allNotes = useSelector((store) => store.note.notes);
    const handleFolderClick = (event, note) => {
        setselected(note);
        setIsClicked(note?.id);
        setIsOpen(false);
    }
    
    const favItems = allNotes.filter((item) => item.favorite == true)

    return (
        <div className="bg-[#1C1C1C] p-3 h-full">

            {isFav == "list" &&
                <>
                    <p className='text-[#fdfdfd] text-lg font-semibold my-6 mx-2'>All Notes</p>
                    {allNotes && allNotes.length > 0 && allNotes.map((note, index) => (
                        <>
                            <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                                <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                                <div className="flex mt-1 space-x-5">
                                    <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                    <h1 className="text-white text-sm break-words">{note?.content}</h1>
                                </div>
                            </div>
                        </>
                    ))}
                </>}

            {isFav == "fav" &&
                <>
                    <p className='text-[#fdfdfd] text-lg font-semibold my-6 mx-2'>Favorites</p>
                    {favItems && favItems.length > 0 && favItems.map((note, index) => (
                        <>
                            <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                                <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                                <div className="flex mt-1 space-x-5">
                                    <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                    <h1 className="text-white text-sm break-words">{note?.content}</h1>
                                </div>
                            </div>
                        </>
                    ))}
                </>}

            {isFav == "folderSelect" &&
                <>
                    <p className='text-white text-lg font-semibold my-6 mx-2'>{folderNotes && folderNotes.length > 0 && folderNotes[0].folderName}</p>
                    {folderNotes && folderNotes.length == 0 ?
                        <>
                            <p className="text-center text-white text-2xl font-semibold">No Items In this Folder</p>
                        </>
                        : <>
                            {folderNotes.map((note, index) => (
                                <>
                                    <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#232323] w-full h-24 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-[#444444] text-white' : "bg-[#232323]"}`}>
                                        <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                                        <div className="flex mt-1 space-x-5">
                                            <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                            <h1 className="text-white text-sm break-words">{note?.content}</h1>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </>
                    }
                </>
            }
        </div>

    )
}

export default FolderListing