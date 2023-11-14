import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaSearch, FaPen } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';
import { AiFillDelete, AiFillFolder, AiFillFolderOpen, AiOutlineFolderAdd, AiOutlineStar } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const Category = ({ setIsOpen, isOpen, setselected, favBtnClick, setfolderSelect, setnewFolders, newFolders, addNewFolders, allFolderLists, allfolders }) => {
    const navigate = useNavigate();

    const allNotes = useSelector((store) => store.note.notes);


    const [isClicked, setIsClicked] = useState();
    const [inputbox, setinputbox] = useState(false);
    const [folderOpen, setfolderOpen] = useState(false);

    // eslint-disable-next-line react/prop-types
    const recentNotes = allNotes && allNotes.length > 0 && allNotes.slice(-3);

    const handleFolderClick = (item) =>{
        setfolderSelect(item?.name)
        setfolderOpen(item?.id)
    }

    const handleclick = (event, note) => {
        setselected(note)
        setIsClicked(note?.id);
    }

    const createNewFolder = () => {
        setinputbox(!inputbox);
    }

    const handleclickFolderOpen = () => {
        addNewFolders();
        setinputbox(!inputbox);
    }

    const addNewNotes = () =>{
        setIsOpen(!isOpen)
        setselected("")
    }

    return (
        <div className="p-3 bg-[#181818] h-[100vh] overflow-y-auto">
            <div className="flex justify-between px-1 my-6">
                <div className='relative'><h2 className="nowted-title">nowted</h2>
                    <p className='text-[#747474] absolute left-[90px] font-["Kaushan"] top-0'><FaPen /></p>
                </div>
                <div><FaSearch className='text-[#747474] text-2xl m-2' /></div>
            </div>

            <div className='flex justify-center'>
                <button onClick={addNewNotes} className='bg-[#242424] w-[90%] h-14 text-xl font-normal text-white'><span> + </span> Add Notes</button>
            </div>

            <div className='my-6 mx-2' >
                <p className='text-[#9d9d9d] text-lg font-semibold'>Recents</p>
                <div>
                    {recentNotes && recentNotes.length > 0 && recentNotes.map((note) => (
                        <>
                            <div key={note?.id} onClick={(event) => handleclick(event, note)} className={`flex justify-start p-2 space-x-4 text-[#9d9d9d] cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : ""}`} >
                                <CgNotes className={`text-[#747474] text-2xl`} />
                                <p className='text-white'>{note?.title}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>

            <div className='my-6 mx-2'>
                <div className='flex justify-between'>
                    <p className='text-[#9d9d9d] text-lg font-semibold'>Folder</p>
                    <AiOutlineFolderAdd onClick={createNewFolder} className='text-[#747474] cursor-pointer w-6 h-6' />
                </div>
                {inputbox && <>
                    <div className='flex'>
                        <AiFillFolderOpen  className='text-[#747474] w-6 h-6 mt-3'/>
                        <input
                            value={newFolders}
                            maxLength={20}
                            placeholder="Title for the Folder"
                            onChange={(e) => setnewFolders(e.target.value)}
                            className='p-3 rounded-md m-2 w-2/3 h-10 bg-black text-[#747474] placeholder-white'
                        />
                        <button onClick={handleclickFolderOpen} className='bg-blue-500 p-2 rounded w-16 h-10 mt-2 ml-3'>Add</button>
                    </div>

                </>}
                {allFolderLists && allFolderLists.length > 0 && allFolderLists.map((item, index) => (
                    <>
                        <div className='flex justify-start space-x-4 text-[#9d9d9d] my-4 cursor-pointer' key={index} onClick={() => handleFolderClick(item)} >
                            {folderOpen == item?.id ? <>
                                <AiFillFolderOpen className='mt-1' />
                            </> : 
                            <>
                             <AiFillFolder className='mt-1' />
                            </>}
                           
                            <p>{item?.name}</p>
                        </div>
                    </>
                ))}
            </div>

            <div className='my-6 mx-2'>
                <p className='text-[#9d9d9d] text-lg font-semibold'>More</p>
                <div>
                    <div className='flex justify-start space-x-4 text-[#9d9d9d] border-red-300 my-4 cursor-pointer' onClick={favBtnClick}>
                        <AiOutlineStar className='mt-1' />
                        <p>Favorites</p>
                    </div>
                    <div className='flex justify-start space-x-4 text-[#9d9d9d] cursor-pointer my-4' onClick={() => navigate("/trash")}>
                        <BiTrashAlt className='mt-1' />
                        <p>Trash</p>
                    </div>
                    <div className='flex justify-start space-x-4 text-[#9d9d9d] cursor-pointer my-4' onClick={() => navigate("/archive")}>
                        <AiFillDelete className='mt-1' />
                        <p>Archived Notes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category