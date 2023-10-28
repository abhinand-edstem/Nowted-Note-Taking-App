import { useState } from "react";

const FolderListing = ({ notes, setselected, favoritesBtnClick, isFav, favorites }) => {

    console.warn("aa",isFav);
    console.warn("ab",favorites);
    const [isClicked, setIsClicked] = useState();

    const handleElementClick = (event, note) => {
        setselected(note);
        setIsClicked(note?.id);
    }

    return (
        <div className="bg-[#1C1C1C] p-3 h-full">
            <p className='text-white text-xl font-semibold my-6 mx-2'>Personal</p>
            {isFav == "fav" &&
                <>
                    {favoritesBtnClick && favoritesBtnClick.length > 0 && favoritesBtnClick.map((note, index) => (
                        <div key={index} onClick={(event) => handleElementClick(event, note)} className={`mt-5 bg-[#333333] w-full h-20 p-3 rounded-sm cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : "bg-[#333333]"}`}>
                            <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                            <div className="flex mt-1 space-x-5">
                                <h1 className="text-white text-sm w-20">{note?.createdDate.substring(0, 30)}</h1>
                                <h1 className="text-white text-sm break-words">{note?.text?.substring(0, 30)}</h1>
                            </div>
                        </div>
                    ))}
                </>}

            {isFav == "list" &&
                <>
                    {notes && notes.length > 0 && notes.map((note, index) => (
                        <div key={index} onClick={(event) => handleElementClick(event, note)} className={`mt-5 bg-[#333333] w-full h-20 p-3 rounded-sm cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : "bg-[#333333]"}`}>
                            <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                            <div className="flex mt-1 space-x-5">
                                <h1 className="text-white text-sm w-20">{note?.createdDate.substring(0, 30)}</h1>
                                <h1 className="text-white text-sm break-words">{note?.text?.substring(0, 30)}</h1>
                            </div>
                        </div>
                    ))}
                </>}

                {isFav == "trash" &&
                <>
                    {favorites && favorites.length > 0 && favorites.map((note, index) => (
                        <div key={index} onClick={(event) => handleElementClick(event, note)} className={`mt-5 bg-[#333333] w-full h-20 p-3 rounded-sm cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : "bg-[#333333]"}`}>
                            <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                            <div className="flex mt-1 space-x-5">
                                <h1 className="text-white text-sm w-20">{note?.createdDate.substring(0, 30)}</h1>
                                <h1 className="text-white text-sm break-words">{note?.text?.substring(0, 30)}</h1>
                            </div>
                        </div>
                    ))}
                </>}

                {isFav == "archived" &&
                <>
                    {favorites && favorites.length > 0 && favorites.map((note, index) => (
                        <div key={index} onClick={(event) => handleElementClick(event, note)} className={`mt-5 bg-[#333333] w-full h-20 p-3 rounded-sm cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : "bg-[#333333]"}`}>
                            <h1 className="text-white text-base font-semibold">{note?.title}</h1>
                            <div className="flex mt-1 space-x-5">
                                <h1 className="text-white text-sm w-20">{note?.createdDate.substring(0, 30)}</h1>
                                <h1 className="text-white text-sm break-words">{note?.text?.substring(0, 30)}</h1>
                            </div>
                        </div>
                    ))}
                </>}


        </div>

    )
}

export default FolderListing