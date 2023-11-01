import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import Category from "../components/Category";
import DetailViewPage from "../components/DetailViewPage";
import FolderListing from "../components/FolderListing";
import { getNotes } from "../store/allNotes/NotesActions";
import { getTrash } from "../store/allTrash/TrashAction";
import { getArchived } from "../store/allArchived/ArchivedActions";


const HomePage = () => {
    const dispatch = useDispatch();

    //states
    const [isOpen, setIsOpen] = useState(false)
    const [inputText, setInputText] = useState("")
    const [title, setTitle] = useState("")
    const [createdDate, setcreatedDate] = useState();
    const [selected, setselected] = useState();

    const [folders, setfolders] = useState("personal")

    const [notes, setNotes] = useState([]);
    const [folderNotes, setFolderNotes] = useState({})
    const [editToggle, setEditToggle] = useState(null);
    const [edit, setedit] = useState(false)
    const [add, setadd] = useState(false)
    const [fav, setfav] = useState(false)

    const [favorites, setfavorites] = useState(null);
    const [favoritesBtnClick, setfavoritesBtnClick] = useState()
    const [isFav, setisFav] = useState("list");

    const [folderSelect, setfolderSelect] = useState("")
    const [newFolders, setnewFolders] = useState("")
    const [allFolderLists, setallFolderLists] = useState()
    const [initialRun, setinitialRun] = useState(true)

    //give some predefined folders
    const allfolders = ['personal', 'work', 'travel', 'events', 'Finances'];

    //get value from store
    const allNotes = useSelector((store) => store.note.notes);

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

    if(initialRun){
        fetchData();
    }

    function validateForm() {
        if (title.length > 0 && inputText.length > 0) {
            saveNotes();
        }
        else {
            alert('Invalid Form fill both Title & Desc')
        }
    }

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getTrash());
        setallFolderLists(allfolders);
        const folders = JSON.parse(localStorage.getItem("folders"));
        if (folders) {
            setallFolderLists(folders);
        }
    }, []);


    const addNewFolders = () => {
        allFolderLists.push(newFolders);
        // setallFolderLists(allFolderLists);
        localStorage.setItem("folders", JSON.stringify(allFolderLists));
    }


    useEffect(() => {
        if (edit) {
            dispatch(getNotes(notes));
        }
        else if (add) {
            dispatch(getNotes(notes));
        } else if (fav) {
            dispatch(getNotes(notes));
        }
    }, [notes]);


    useEffect(() => {
        if (folderSelect) {
            const folderSelectData = notes.filter((data) => {
                return data.Category == folderSelect
            })
            setFolderNotes(folderSelectData);
            setisFav("folderSelect");
        }
    }, [folderSelect])


    useEffect(() => {
        if (favorites) {
            setNotes(notes.map((note) => (
                note.id == favorites ?
                    { ...note, text: note?.text, title: note?.title, Category: folders, favorites: true } : note
            )))
        }
    }, [favorites])


    const saveNotes = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ?
                    { ...note, text: inputText, title: title, Category: folders, favorites: false }
                    : note
            )))
        }
        else {
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    text: inputText,
                    title: title,
                    Category: folders,
                    createdDate: formattedDate,
                    favorites: false
                }
            ])
            setadd(true)
        }
        setInputText("");
        setTitle("");
        setIsOpen(false);
    }

    const editHandler = (selected) => {
        setEditToggle(selected?.id);
        setInputText(selected?.text);
        setTitle(selected?.title);
        setcreatedDate(selected?.createdDate);
        setfolders(selected?.Category);
        setedit(true)
    }

    const deleteNote = (selected) => {
        var existingData = localStorage.getItem('trashItems');
        var dataArray = existingData ? JSON.parse(existingData) : [];
        if (!Array.isArray(dataArray)) {
            dataArray = [dataArray];
        }
        var newData = selected;
        dataArray.push(newData);
        var updatedData = JSON.stringify(dataArray);
        // localStorage.setItem('trashItems', updatedData);
        dispatch(getTrash(updatedData));
        const newNotes = notes.filter(n => n.id !== selected?.id);
        dispatch(getNotes(newNotes));
        // localStorage.setItem("Notes", JSON.stringify(newNotes));
        setNotes(newNotes)
    }

    const favItems = (selected) => {
        setfavorites(selected);
        setfav(!fav);
    }

    const favBtnClick = (items) => {
        setfavoritesBtnClick(items);
        setisFav("fav")
    }


    const ArchivedItesm = (selected) => {
        var existingData = localStorage.getItem('archived');
        var dataArray = existingData ? JSON.parse(existingData) : [];
        if (!Array.isArray(dataArray)) {
            dataArray = [dataArray];
        }
        var newData = selected;
        dataArray.push(newData);
        var updatedData = JSON.stringify(dataArray);
        // localStorage.setItem('archived', updatedData);
        dispatch(getArchived(updatedData));

        const newNotes = notes.filter(n => n.id !== selected?.id);
        // localStorage.setItem("Notes", JSON.stringify(newNotes));
        dispatch(getNotes(newNotes));
        setNotes(newNotes)
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
                    setfolderSelect={setfolderSelect}
                    allfolders={allfolders}
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
                    favoritesBtnClick={favoritesBtnClick}
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