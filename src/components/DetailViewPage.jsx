import { useState } from 'react';

import CreateNote from './CreateNotes';
import { HiOutlineArchiveBoxArrowDown } from 'react-icons/hi2';
import { BsCalendarDate } from 'react-icons/bs';
import { PiNoteThin } from 'react-icons/pi';
import { AiFillFolder} from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { openAddForm } from '../store/localStore/openAddForm';
import starIcon from '../../public/start.png';
import deleteIcon from '../../public/delete.png';
import archieIcon from '../../public/archive.png';
import editIcon from '../../public/editIcon.png';


// eslint-disable-next-line react/prop-types
const DetailViewPage = ({ selected, setInputText, inputText, setTitle, title, createdDate, setfolders, editHandler, deleteNote, favItems, ArchivedItesm, allFolderLists, validateForm, folders }) => {

    const dispatch = useDispatch();

    const isOpen = useSelector((store) => store.open.value);

    const [star, setstar] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [fontbold, setfontbold] = useState("thin");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleThreeDotsClick = () => {
        setShowDropdown(!showDropdown);
    };


    const onEditClick = () => {
        editHandler(selected);
        dispatch(openAddForm(true))
    }

    const handleFontsizeChange = (e) => {
        setFontSize(e.target.value);
    }

    const handletextThicknessChange = (e) => {
        setfontbold(e.target.value);
    }

    const handleStarClicked = (selected) => {
        favItems(selected)
        setstar(!star);
    }
    return (
        <div className="bg-[#181818] h-[100vh] overflow-y-auto">

            {selected &&
                <>
                    <div>
                        <div className="my-3 ml-5 flex justify-between">
                            <h2 className="text-white text-3xl font-semibold my-6 mx-2">{selected.title}</h2>
                            <div className='flex space-x-5 pr-8'>
                                {/* <div className="group flex relative">
                                    <span className=" text-white px-2 m-8 cursor-pointer"><HiOutlineArchiveBoxArrowDown onClick={() => ArchivedItesm(selected?.id)} /></span>
                                    <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
                                -translate-x-1/2 translate-y-full opacity-0 m-8 p-2 mx-auto">Archive</span>
                                </div>
                                <AiOutlineDelete onClick={() => deleteNote(selected)} className='text-white mt-8 text-base cursor-pointer' />
                                <AiOutlineEdit onClick={onEditClick} className='text-white m-8 text-base cursor-pointer' />
                                <AiFillStar onClick={() => handleStarClicked(selected)} className={`text-white m-8 text-base cursor-pointer ${selected?.favorite || star ? 'text-yellow-500' : ''} }`} /> */}

                                <div className="m-6  cursor-pointer" onClick={handleThreeDotsClick}>
                                    <div className="bg-black border border-white text-white hover:bg-[#262626] font-semibold rounded-full p-2">
                                        <div className="w-2 h-2  flex items-center justify-center"> <span className='font-serif mb-2'>...</span></div>
                                    </div>
                                </div>

                                {showDropdown && (
                                    <div className="absolute right-14 top-14 mt-2 w-48 bg-[#262626] shadow rounded-md z-10">
                                        <ul className="py-1">
                                            <li
                                                onClick={() => {
                                                    onEditClick();
                                                    setShowDropdown(false);
                                                }}
                                                className="px-4 py-2 text-white cursor-pointer hover:bg-[#171717]"
                                            >
                                                <div className="flex items-center">
                                                    <img src={editIcon} alt="Deleted" className="w-4 h-4 mr-3" /> Edit
                                                </div>
                                            </li>
                                            <li
                                                onClick={() => {
                                                    handleStarClicked(selected)
                                                    setShowDropdown(false);
                                                }}
                                                className="px-4 py-2 text-white cursor-pointer hover:bg-[#171717]"
                                            >
                                                <div className="flex items-center">
                                                    <img src={starIcon} alt="Deleted" className="w-4 h-4 mr-3" /> Add to favorites
                                                </div>
                                            </li>

                                            <li
                                                onClick={() => {
                                                    ArchivedItesm(selected.id)
                                                    setShowDropdown(false);
                                                }}
                                                className="px-4 py-2 text-white cursor-pointer hover:bg-[#171717]"
                                            >
                                                <div className="flex items-center">
                                                    <img src={archieIcon} alt="Deleted" className="w-4 h-4 mr-3" /> Archive
                                                </div>
                                            </li>
                                            <hr className='w-40 m-auto' />

                                            <li
                                                onClick={() => {
                                                    deleteNote(selected)
                                                    setShowDropdown(false);
                                                }}
                                                className="px-4 py-2 text-white cursor-pointer hover:bg-[#171717]"
                                            >
                                                <div className="flex items-center">
                                                    <img src={deleteIcon} alt="Deleted" className="w-4 h-4 mr-3" /> Delete
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                )}

                            </div>

                        </div>

                        <div className='flex justify-start space-x-14 ml-6'>
                            <div className='flex justify-start space-x-4'>
                                <BsCalendarDate className='text-white mt-1 text-base' />
                                <p className='text-[#989898] font-normal'>Date</p>
                            </div>
                            <div>
                                <p className='text-white font-normal'>{selected.createdDate}</p>
                                <hr />
                            </div>
                        </div>
                        <hr className='my-3 ml-6 mr-6 bg-[rgba(255, 255, 255, 0.1)] border-1' />

                        <div className='flex justify-start space-x-14 ml-6 mt-5'>
                            <div className='flex justify-start space-x-4'>
                                <AiFillFolder className='text-white mt-1 text-base' />
                                <p className='text-[#989898] font-normal'>folder</p>
                            </div>
                            <div>
                                <p className='text-white font-normal'>{selected?.folderName}</p>
                                <hr />
                            </div>
                        </div>
                        <hr className='my-3 ml-6 mr-6 bg-[rgba(255, 255, 255, 0.1)] border-1' />

                        <div className='flex justify-start space-x-14 ml-6 mt-5'>
                            <div className='flex justify-start space-x-4'>
                                <p className='text-white font-normal'>Paragraph</p>
                            </div>
                            <div className='flex justify-start space-x-4'>
                                <select className="rounded bg-transparent w-20 border-none text-white" onChange={handleFontsizeChange}>
                                    <option value="15">15 Px</option>
                                    <option value="18">18 Px</option>
                                    <option value="20">20 Px</option>
                                    <option value="22">22 Px</option>
                                </select>

                                <select className="w-24 rounded bg-transparent w-16 border-none text-white" onChange={handletextThicknessChange}>
                                    <option value="Normal">Normal</option>
                                    <option value="semibold">Semibold</option>
                                    <option value="bold">Bold</option>
                                </select>


                            </div>
                        </div>
                        <hr className='my-3 ml-6 mr-6 bg-[rgba(255, 255, 255, 0.1)] border-1' />

                        <div className='mt-8 mx-6'>
                            <p className={`text-white
                         ${fontSize == "15" ? 'text-[15px]' : fontSize == 18 ? 'text-[18px]' : fontSize == 20 ? 'text-[20px]' : fontSize == 22 ? 'text-[22px]' : ''} 
                         ${fontbold == "Normal" ? 'font-normal' : fontbold == "semibold" ? 'font-semibold' : fontbold == "bold" ? 'font-bold' : ''} 
                         leading-8`}>{selected.content}</p>
                        </div>
                    </div>


                </>
            }

            {!isOpen && !selected &&
                <>
                    <div className='grid justify-center content-center mt-[42vh]'>
                        <div className='text-center w-[100%]'>
                            <PiNoteThin className='text-white text-6xl text-center w-[100%]' />
                            <h1 className='text-3xl text-white font-semibold'>Select a note to view</h1>
                            <p className='text-white mt-2'>Choose a note from the list on the left to view its contents, or <br /> create a new note to add to your collection.</p>
                        </div>
                    </div>
                </>
            }

            {isOpen &&
                <>
                    <CreateNote
                        title={title}
                        setTitle={setTitle}
                        inputText={inputText}
                        setInputText={setInputText}
                        setfolders={setfolders}
                        allFolderLists={allFolderLists}
                        action="edit"
                        validateForm={validateForm}
                        folders={folders}

                    />
                </>
            }

        </div >
    )
}

export default DetailViewPage