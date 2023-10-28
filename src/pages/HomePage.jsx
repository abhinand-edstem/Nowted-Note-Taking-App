import { useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';

import Category from "../components/Category";
import DetailViewPage from "../components/DetailViewPage";
import FolderListing from "../components/FolderListing";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false)
    const [inputText, setInputText] = useState("")
    const [title, setTitle] = useState("")
    const [createdDate, setcreatedDate] = useState();
    const [selected, setselected] = useState();
    const [folders, setfolders] = useState("personal")
    const [notes, setNotes] = useState([]);
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

    const allfolders = ['personal', 'work', 'travel', 'events', 'Finances'];

    useEffect(()=>{
        setallFolderLists(allfolders);
    },[])


    const addNewFolders = () =>{
        allfolders.push(newFolders);
        console.log({allfolders});
        setallFolderLists(allfolders);
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("Notes"));
        if (data) {
            setNotes(data);
        }
    }, []);

    useEffect(() => {
        if (edit) {
            localStorage.setItem("Notes", JSON.stringify(notes));
        }
        else if (add) {
            localStorage.setItem("Notes", JSON.stringify(notes));
        } else if (fav) {
            localStorage.setItem("Notes", JSON.stringify(notes));
        }
    }, [notes]);


    useEffect(() => {
        if (folderSelect) {
            const folderSelectData = notes.filter((data) => {
                return data.Category == folderSelect
            })
            setNotes(folderSelectData);
        }
    }, [folderSelect])


    useEffect(() => {
        if (favorites) {
            setNotes(notes.map((note) => (
                note.id == favorites ?
                    { ...note, ...note, text: note?.text, title: note?.title, Category: folders, favorites: true } : note
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
            localStorage.setItem("Notes", JSON.stringify(notes));
        }
        setInputText("");
        setTitle("");
        setIsOpen(false);
    }

    const editHandler = (selected) => {

        console.warn({selected});
        setEditToggle(selected?.id);
        setInputText(selected?.text);
        setTitle(selected?.title);
        setcreatedDate(selected?.createdDate);
        setfolders(selected?.Category);
        setedit(true)
    }

    const deleteNote = (selected) => {
        localStorage.setItem("trashItems", JSON.stringify(selected));
        const newNotes = notes.filter(n => n.id !== selected?.id);
        localStorage.setItem("Notes", JSON.stringify(newNotes));
        setNotes(newNotes)
    }

    const favItems = (selected) => {
        console.log({ selected });
        setfavorites(selected);
        setfav(!fav);
    }

    const favBtnClick = (items) => {
        setfavoritesBtnClick(items);
        setisFav("fav")
    }


    const ArchivedItesm = (select) => {
        localStorage.setItem("archived", JSON.stringify(select));
        const newNotes = notes.filter(n => n.id !== selected?.id);
        localStorage.setItem("Notes", JSON.stringify(newNotes));
        setNotes(newNotes)
    }

    const TrashItems = () => {
        const trashDatas = JSON.parse(localStorage.getItem("trashItems"));
        console.log("malavikaaaaa", trashDatas);
        if (trashDatas) {
            navigate("/trash", {
                state: {
                    trashDatas
                }
            }
            )
        }

    }

    const ArchivedClick = () => {
        const archivedData = JSON.parse(localStorage.getItem("archived"));
        console.log("malavikaaaaa", archivedData);
        if (archivedData) {
            navigate("/archive", {
                state: {
                    archivedData
                }
            }
            )
        }
    }

    return (
        <div className="flex">
            <div className="flex-initial w-3/12">
                <Category
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    notes={notes}
                    setselected={setselected}
                    favBtnClick={favBtnClick}
                    setfolderSelect={setfolderSelect}
                    TrashItems={TrashItems}
                    ArchivedClick={ArchivedClick}
                    allfolders={allfolders}
                    setnewFolders={setnewFolders}
                    newFolders={newFolders}
                    addNewFolders={addNewFolders}
                    allFolderLists={allFolderLists}
                />
            </div>
            <div className="flex-initial w-3/12">
                <FolderListing
                    notes={notes}
                    setNotes={setNotes}
                    selected={selected}
                    setselected={setselected}
                    favoritesBtnClick={favoritesBtnClick}
                    favorites={favorites}
                    isFav={isFav}
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
                    saveNotes={saveNotes}
                    folders={folders}
                    setfolders={setfolders}
                    editHandler={editHandler}
                    editToggle={editToggle}
                    deleteNote={deleteNote}
                    favItems={favItems}
                    ArchivedItesm={ArchivedItesm}
                    allFolderLists={allFolderLists}
                />
            </div>
        </div>
    )
}

export default HomePage 