import { useState } from "react";

const FolderListing = ({ notes, setselected, selected, favoritesBtnClick, isFav, folderNotes }) => {

    const [isClicked, setIsClicked] = useState();
    
    const handleFolderClick = (event, note) => {
        setselected(note);
        setIsClicked(note?.id);
    }

    console.warn({notes});

    return (
        <div className="bg-[#1C1C1C] p-3 h-full">
            
            {isFav == "list" &&
                <>
                    <p className='text-white text-lg font-semibold my-6 mx-2'>{notes[0]?.favorite? 'Favorite' : 'All Notes'}</p>
                    {notes && notes.length > 0 && notes.map((note, index) => (
                        <>
                            <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#333333] w-full h-20 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : "bg-[#333333]"}`}>
                                <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                                <div className="flex mt-1 space-x-5">
                                    <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                    <h1 className="text-white text-sm break-words">{note?.content.substring(0, 40)}</h1>
                                </div>
                            </div>
                        </>
                    ))}
            </>}

            {isFav == "folderSelect" &&
                <>
                    <p className='text-white text-lg font-semibold my-6 mx-2'>{folderNotes && folderNotes.length > 0 && folderNotes[0].Category}</p>
                    {folderNotes && folderNotes.length > 0 ?
                        <>
                            {folderNotes.map((note, index) => (
                                <>
                                    <div key={index} onClick={(event) => handleFolderClick(event, note)} className={`mt-5 bg-[#333333] w-full h-20 p-3 rounded cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : "bg-[#333333]"}`}>
                                        <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                                        <div className="flex mt-1 space-x-5">
                                            <h1 className="text-white text-sm w-20">{note?.createdDate}</h1>
                                            <h1 className="text-white text-sm break-words">{note?.content.substring(0, 40)}</h1>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </>
                        : <>
                            <p className="text-center text-white text-2xl font-semibold">No Items In this Folder</p>
                        </>
                    }
                </>
            }
        </div>

    )
}

export default FolderListing