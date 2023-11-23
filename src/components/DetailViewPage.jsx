import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import { openAddForm } from '../store/localStore/openAddForm';

import CreateNote from './CreateNotes';
import deleteIcon from '../../public/delete.png';
import archieIcon from '../../public/archive.png';
import editIcon from '../../public/editIcon.png';
import noteIcon from '../../public/noteicon.png';

import { BsCalendarDate } from 'react-icons/bs';
import { AiFillFolder } from "react-icons/ai";
import { FaStar } from "react-icons/fa";



// eslint-disable-next-line react/prop-types
const DetailViewPage = ({ setfolders, editHandler, deleteNote, favItems, ArchivedItesm, allFolderLists, validateForm, folders }) => {

    const dispatch = useDispatch();
    const editRef = useRef();

    const isOpen = useSelector((store) => store.open.value);
    const selected = useSelector((store) => store.select.value);

    console.warn({ selected });

    const [star, setstar] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [fontSize, setFontSize] = useState(16);
    const [fontbold, setfontbold] = useState("thin");
    const [paragraph, setPargraph] = useState('h1');
    const [italic, setItalic] = useState(false);
    const [underline, setUnderLine] = useState(false);


    const handleFontsizeChange = (e) => {
        setFontSize(e.target.value);
    }

    const handletextThicknessChange = (e) => {
        setfontbold(e.target.value);
    }

    const handleParagraphChange = (e) => {
        setPargraph(e.target.value)
    }

    const handleThreeDotsClick = () => {
        setShowDropdown(!showDropdown);
    };

    const onEditClick = () => {
        editHandler(selected);
        dispatch(openAddForm(true))
    }

    const handleStarClicked = (selected) => {
        favItems(selected)
        setstar(!star);
    }
    return (
        <div className="bg-[#181818] h-[100vh] overflow-y-auto">

            {selected && !isOpen &&
                <>
                    <div>
                        <div className="my-3 ml-5 flex justify-between">
                            <h2 className="text-white text-3xl font-semibold my-6 mx-2">{selected.title}</h2>
                            <div className='flex space-x-5 pr-8'>
                                <div className="m-6  cursor-pointer" onClick={handleThreeDotsClick}>
                                    <div className="bg-black border border-white text-white hover:bg-[#262626] font-semibold rounded-full p-2">
                                        <div className="w-2 h-2  flex items-center justify-center"> <span className='font-serif mb-2'>...</span></div>
                                    </div>
                                </div>

                                {showDropdown && (
                                    <div className="absolute right-14 top-14 mt-2 w-52 bg-[#262626] shadow rounded-md">
                                        <ul className="py-1">
                                            <li
                                                onClick={() => {
                                                    onEditClick();
                                                    setShowDropdown(false);
                                                }}
                                                className="px-4 py-2 text-white cursor-pointer hover:bg-[#171717]"
                                            >
                                                <div className="flex items-center">
                                                    <img src={editIcon} alt="Edit-Icon" className="w-4 h-4 mr-3" /> Edit
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
                                                    <FaStar className={`mr-2 ${selected?.favorite == true ? 'text-yellow-500' : ''}`} />
                                                    {selected?.favorite == true ? 'Remove to favorites' : 'Add to favorites'}
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
                                                    <img src={archieIcon} alt="Archive-icon" className="w-4 h-4 mr-3" /> Archive
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
                                                    <img src={deleteIcon} alt="Delete-icon" className="w-4 h-4 mr-3" /> Delete
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='flex justify-start space-x-14 ml-6'>
                            <div className='flex justify-start space-x-4'>
                                <BsCalendarDate className='text-[#989898]  mt-1 text-base' />
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
                                <AiFillFolder className='text-[#989898] mt-1 text-base' />
                                <p className='text-[#989898] font-normal'>Folder</p>
                            </div>
                            <div>
                                <p className='text-white font-normal'>{selected?.folderName}</p>
                                <hr />
                            </div>
                        </div>
                        <hr className='my-3 ml-6 mr-6 bg-[rgba(255, 255, 255, 0.1)] border-1' />

                        <div className='flex justify-start space-x-14 ml-6 mt-5'>
                            <div className='flex justify-start space-x-4'>
                                {/* <p className='text-white font-normal'>Paragraph</p> */}
                                <select className="rounded bg-[#181818] w-20 border-none text-white" onChange={handleParagraphChange}>
                                    <option value="h1">H1</option>
                                    <option value="h2">H2</option>
                                    <option value="h3">H3 </option>
                                    <option value="h4">H4</option>
                                    <option value="h5">H5</option>
                                    <option value="h6">H6</option>
                                </select>
                            </div>
                            <div className='flex justify-start space-x-4'>
                                <select className="rounded bg-[#181818] w-20 border-none text-white" onChange={handleFontsizeChange}>
                                    <option value="15">15 Px</option>
                                    <option value="18">18 Px</option>
                                    <option value="20">20 Px</option>
                                    <option value="22">22 Px</option>
                                </select>

                                <select className="w-24 rounded bg-[#181818] w-16 border-none text-white" onChange={handletextThicknessChange}>
                                    <option value="Normal">Normal</option>
                                    <option value="semibold">Semibold</option>
                                    <option value="bold">Bold</option>
                                </select>

                                <h1 className='italic text-white font-semibold text-base uppercase cursor-pointer' onClick={() => setItalic(!italic)}>I</h1>
                                <h1 className='text-white font-semibold text-base uppercase cursor-pointer underline underline-offset-4' onClick={() => setUnderLine(!underline)}>U</h1>
                            </div>
                        </div>
                        <hr className='my-3 ml-6 mr-6 bg-[rgba(255, 255, 255, 0.1)] border-1' />



                        {/* tiny mce package start */}

                        {/* <div className='px-6 mt-5'>
                            <Editor
                                apiKey='3kzykpgyq1g7zd2s3d2rjf4e1inhhtvdx32372esti2kitu8'
                                initialValue={selected.content}
                                onInit={(evt, editor) => editRef.current = editor}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div> */}

                        {/* tiny mce package end */}



                        <div className='mt-8 mx-6'>
                            <p className={`text-white
                         ${fontSize == "15" ? 'text-[15px]' : fontSize == 18 ? 'text-[18px]' : fontSize == 20 ? 'text-[20px]' : fontSize == 22 ? 'text-[22px]' : ''} 
                         ${fontbold == "Normal" ? 'font-normal' : fontbold == "semibold" ? 'font-semibold' : fontbold == "bold" ? 'font-bold' : ''}
                         ${paragraph == "h1" ? 'text-sm' : paragraph == "h2" ? 'text-base' : paragraph == "h3" ? 'text-lg' : paragraph == "h4" ? 'text-xl' : paragraph == "h5" ? 'text-2xl' : paragraph == "h6" ? 'text-3xl' : ''}
                         ${italic ? 'italic' : ''}
                         ${underline ? 'underline underline-offset-4' : ''}
                         leading-8`}>
                                {selected.content}
                            </p>
                        </div>
                    </div>
                </>
            }

            {!isOpen && !selected &&
                <>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div className='text-center w-[100%]'>
                            <img src={noteIcon} className='mx-auto w-16' alt="NotepadIcon-image" />
                            <h1 className='text-3xl text-white font-semibold'>Select a note to view</h1>
                            <p className='text-[#747474] mt-2'>Choose a note from the list on the left to view its contents, or <br /> create a new note to add to your collection.</p>
                        </div>
                    </div>
                </>
            }

            {isOpen &&
                <>
                    <CreateNote
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