import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FaSearch, FaPen } from 'react-icons/fa';
import { CgNotes } from 'react-icons/cg';
import { AiFillDelete, AiFillFolder, AiFillFolderOpen, AiOutlineFolderAdd, AiOutlineStar } from 'react-icons/ai';
import { BiTrashAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
const Category = ({ setIsOpen, isOpen, notes, setselected, favBtnClick, setfolderSelect, setnewFolders, newFolders, addNewFolders, allFolderLists, allfolders }) => {
    const navigate = useNavigate();

    // console.log({allFolderLists});


    const [isClicked, setIsClicked] = useState();
    const [inputbox, setinputbox] = useState(false);
    const [folderOpen, setfolderOpen] = useState(false);

    // eslint-disable-next-line react/prop-types
    const recentNotes = notes.slice(-3);

    const handleFolderClick = (item) =>{
        setfolderSelect(item?.name)
        setfolderOpen(!folderOpen)
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

    return (
        <div className="p-3 bg-[#181818] h-[100vh] overflow-y-auto">
            <div className="flex justify-between px-1 my-6">
                <div className='relative'><h2 className="font-Kaushan Script text-white text-3xl">nowted</h2>
                    <p className='text-white absolute left-[110px] font-["Kaushan"] top-0'><FaPen /></p>
                </div>
                <div><FaSearch className='text-white text-2xl m-2' /></div>
            </div>

            <div className='flex justify-center'>
                <button onClick={() => setIsOpen(!isOpen)} className='bg-[#9ca3af] w-[90%] h-12 text-xl font-semibold text-white'><span> + </span> Add Notes</button>
            </div>

            <div className='my-6 mx-2' >
                <p className='text-[#8c8c8c] text-lg font-semibold'>Recents</p>
                <div>
                    {recentNotes.map((note) => (
                        <>
                            <div key={note?.id} onClick={(event) => handleclick(event, note)} className={`flex justify-start p-2 space-x-4 text-[#8c8c8c] cursor-pointer ${note?.id == isClicked ? 'bg-blue-500 text-white' : ""}`} >
                                <CgNotes className='text-white text-2xl' />
                                <p>{note?.title.substring(0, 20)}</p>
                            </div>
                        </>
                    ))}
                </div>
            </div>

            <div className='my-6 mx-2'>
                <div className='flex justify-between'>
                    <p className='text-[#8c8c8c] text-lg font-semibold'>Folder</p>
                    <AiOutlineFolderAdd onClick={createNewFolder} className='text-white cursor-pointer w-6 h-6' />
                </div>
                {inputbox && <>
                    <div className='flex'>
                        <AiFillFolderOpen  className='text-white w-6 h-6 mt-3'/>
                        <input
                            value={newFolders}
                            maxLength={20}
                            placeholder="Title for the Folder"
                            onChange={(e) => setnewFolders(e.target.value)}
                            className='p-3 rounded-md m-2 w-2/3 h-10 bg-black text-white placeholder-white'
                        />
                        <button onClick={handleclickFolderOpen} className='bg-blue-500 p-2 rounded w-16 h-10 mt-2 ml-3'>Add</button>
                    </div>

                </>}
                {allFolderLists && allFolderLists.length > 0 && allFolderLists.map((item, index) => (
                    <>
                        <div className='flex justify-start space-x-4 text-[#8c8c8c] my-4 cursor-pointer' key={index} onClick={() => handleFolderClick(item)} >
                            {folderOpen ? <>
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
                <p className='text-[#8c8c8c] text-lg font-semibold'>More</p>
                <div>
                    <div className='flex justify-start space-x-4 text-[#8c8c8c] border-red-300 my-4 cursor-pointer' onClick={favBtnClick}>
                        <AiOutlineStar className='mt-1' />
                        <p>Favorites</p>
                    </div>
                    <div className='flex justify-start space-x-4 text-[#8c8c8c] cursor-pointer my-4' onClick={() => navigate("/trash")}>
                        <BiTrashAlt className='mt-1' />
                        <p>Trash</p>
                    </div>
                    <div className='flex justify-start space-x-4 text-[#8c8c8c] cursor-pointer my-4' onClick={() => navigate("/archive")}>
                        <AiFillDelete className='mt-1' />
                        <p>Archived Notes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category