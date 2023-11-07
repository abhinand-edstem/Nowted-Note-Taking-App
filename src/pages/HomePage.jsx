import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Category from "../components/Category";
import DetailViewPage from "../components/DetailViewPage";
import FolderListing from "../components/FolderListing";
import { getNotes, noteDelete } from "../store/allNotes/NotesActions";
import { getFolder } from "../store/allFolder/FolderAction";
import axios from "axios";


const HomePage = () => {
    const dispatch = useDispatch();

    //states
    const [isOpen, setIsOpen] = useState(false)
    const [inputText, setInputText] = useState("")
    const [title, setTitle] = useState("")
    const [createdDate, setcreatedDate] = useState();
    const [selected, setselected] = useState();
    const [id, setid] = useState();

    const [folders, setfolders] = useState([])

    const [notes, setNotes] = useState([]);
    const [folderNotes, setFolderNotes] = useState({})
    const [editToggle, setEditToggle] = useState(null);
    const [edit, setedit] = useState(false)

    const [favorites, setfavorites] = useState(null);
    const [isFav, setisFav] = useState("list");

    const [folderSelect, setfolderSelect] = useState("")
    const [newFolders, setnewFolders] = useState("")
    const [allFolderLists, setallFolderLists] = useState()
    const [initialRun, setinitialRun] = useState(true);

    console.warn({ folderNotes });

    //give some predefined folders
    const allfolders = [];

    //get value from store
    const allNotes = useSelector((store) => store.note.notes);
    const allFolder = useSelector((store) => store.folder.folder);

    console.log({allFolder});


    useEffect(() => {
        dispatch(getFolder());
    }, [])

    const fetchData = async () => {
        if (allNotes.length > 0) {
            try {
                const result = await allNotes;
                setNotes(result);
                setinitialRun(false);
            } catch (error) {
                console.error("An error occurred:", error);
            }
        }
    };
    //logic for avoid re render
    if (initialRun) {
        fetchData();
    }

    function validateForm() {
        if (title.length > 0 && inputText.length > 0 && folders.length > 0) {
            saveNotes();
        }
        else {
            alert('Invalid Form fill both Title , Desc & Option select')
        }
    }

    useEffect(() => {
        dispatch(getNotes());
        setallFolderLists(allfolders);
        axios.get("http://localhost:8080/v1/folders").then((res => {
            setallFolderLists(res?.data);
        }))
    }, []);


    const addNewFolders = () => {
        debugger;
        let params = {
            name: newFolders
        }
        axios.post("http://localhost:8080/v1/folders", params)
    }

    useEffect(() => {
        if (folderSelect) {
            const folderSelectData = notes.filter((data) => {
                return data.folderName == folderSelect
            })
            setFolderNotes(folderSelectData);
            setisFav("folderSelect");
        }
    }, [folderSelect])


    const saveNotes = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        if (editToggle) {
            let params = {
                title: title,
                content: inputText,
                createdDate: formattedDate,
                folder: {
                    id: folders,
                    // name: "folder3"
                }
            }
            axios.put(`http://localhost:8080/v1/notes/${id}`,
                params
            )
        }
        else {
            let params = {
                title: title,
                content: inputText,
                createdDate: formattedDate,
                folder: {
                    id: folders,
                    // name: "folder3"
                }
            }
            dispatch(getNotes(params));
        }
    }

    const editHandler = (selected) => {
        setEditToggle(selected?.id);
        setInputText(selected?.content);
        setTitle(selected?.title);
        setcreatedDate(selected?.createdDate);
        setfolders(selected?.Category);
        setedit(true)
        setid(selected?.id);
    }

    const deleteNote = (selected) => {

        let params = {
            id: selected.id
        }
        dispatch(noteDelete(params))
        setTimeout(() => {
            setselected();
        }, 200);
    }

    const favItems = (selected) => {
        axios.put(`http://localhost:8080/v1/notes/${selected}/favorite`)
    }

    const favBtnClick = () => {
        axios.get("http://localhost:8080/v1/notes/favorites").then((res => {
            setfavorites(res?.data)
            setisFav("fav")
        }))
    }

    const ArchivedItesm = (id) => {
        axios.put(`http://localhost:8080/v1/notes/${id}/archive`)
    }

    return (
        <div className="flex h-[100vh] overflow-y-auto">
            <div className="flex-initial w-3/12">
                <Category
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    notes={notes}
                    setselected={setselected}
                    favBtnClick={favBtnClick}
                    folderSelect={folderSelect}
                    setfolderSelect={setfolderSelect}
                    setnewFolders={setnewFolders}
                    newFolders={newFolders}
                    addNewFolders={addNewFolders}
                    allFolderLists={allFolderLists}

                />
            </div>
            <div className="flex-initial w-3/12 overflow-y-scroll h-[100vh] bg-[#1C1C1C]">
                <FolderListing
                    notes={notes}
                    setNotes={setNotes}
                    selected={selected}
                    setselected={setselected}
                    favorites={favorites}
                    isFav={isFav}
                    folderNotes={folderNotes}
                />
            </div>
            <div className="flex-initial w-6/12">
                <DetailViewPage
                    inputText={inputText}
                    setInputText={setInputText}
                    title={title}
                    setTitle={setTitle}
                    notes={notes}
                    setNotes={setNotes}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    selected={selected}
                    createdDate={createdDate}
                    setcreatedDate={setcreatedDate}
                    folders={folders}
                    setfolders={setfolders}
                    editHandler={editHandler}
                    editToggle={editToggle}
                    deleteNote={deleteNote}
                    favItems={favItems}
                    ArchivedItesm={ArchivedItesm}
                    allFolderLists={allFolderLists}
                    validateForm={validateForm}
                />
            </div>
        </div>
    )
}

export default HomePage 