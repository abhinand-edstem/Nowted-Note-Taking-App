import { useEffect, useState } from 'react';

import CreateNote from './CreateNotes';
import { HiOutlineArchiveBoxArrowDown } from 'react-icons/hi2';
import { BsCalendarDate } from 'react-icons/bs';
import { AiFillFolder, AiFillStar, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";


// eslint-disable-next-line react/prop-types
const DetailViewPage = ({ isOpen, setIsOpen, selected, setInputText, inputText, setTitle, title, createdDate, setfolders, editHandler, deleteNote, favItems, ArchivedItesm, allFolderLists, validateForm, folders }) => {

    console.warn({ selected });

    const [star, setstar] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [fontbold, setfontbold] = useState("thin");


    const onEditClick = () => {
        editHandler(selected);
        setIsOpen(!isOpen);
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
        <div className="p-2 bg-[#181818] h-full h-[100vh] overflow-y-auto">

            {selected ?
                <div>
                    <div className="my-3 ml-5 flex justify-between">
                        <h2 className="text-white text-3xl font-semibold my-6 mx-2">{selected.title}</h2>
                        <div className='flex space-x-5 pr-8'>
                            <div className="group flex relative">
                                <span className=" text-white px-2 m-8 cursor-pointer"><HiOutlineArchiveBoxArrowDown onClick={() => ArchivedItesm(selected?.id)} /></span>
                                <span className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
                                -translate-x-1/2 translate-y-full opacity-0 m-8 p-2 mx-auto">Archive</span>
                            </div>
                            <AiOutlineDelete onClick={() => deleteNote(selected)} className='text-white mt-8 text-base cursor-pointer' />
                            <AiOutlineEdit onClick={onEditClick} className='text-white m-8 text-base cursor-pointer' />
                            <AiFillStar onClick={() => handleStarClicked(selected)} className={`text-white m-8 text-base cursor-pointer ${selected?.favorite || star ? 'text-yellow-500' : ''} }`} />

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
                </div> : <>
                    <CreateNote
                        title={title}
                        setTitle={setTitle}
                        inputText={inputText}
                        setInputText={setInputText}
                        setfolders={setfolders}
                        allFolderLists={allFolderLists}
                        onEditClick={onEditClick}
                        action="add"
                        validateForm={validateForm}
                        folders={folders}
                    />
                </>
            }
            {isOpen ? <>
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
            </> : <>
            </>}
        </div >
    )
}

export default DetailViewPage