import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Category from "../components/Category";
import DetailViewPage from "../components/DetailViewPage";
import FolderListing from "../components/FolderListing";
import { getFolder } from "../store/allFolder/FolderAction";
import {
    addNotes,
    archiveItemAction,
    favButtonClickAction,
    favDelete,
    getNotes,
    moveToTrash,
    searchAction,
    updateNotes
} from "../store/allNotes/NotesActions";


const HomePage = () => {
    const dispatch = useDispatch();

    //states
    const [inputText, setInputText] = useState("")
    const [title, setTitle] = useState("")
    const [createdDate, setcreatedDate] = useState();
    const [selected, setselected] = useState();
    const [id, setid] = useState();
    const [folders, setfolders] = useState([])
    const [notes, setNotes] = useState([]);
    const [folderNotes, setFolderNotes] = useState({})
    const [editToggle, setEditToggle] = useState(null);
    const [isFav, setisFav] = useState("list");
    const [folderSelect, setfolderSelect] = useState("")
    const [newFolders, setnewFolders] = useState("")
    const [allFolderLists, setallFolderLists] = useState()
    const [initialRun, setinitialRun] = useState(true);
    const [search, setSearch] = useState("")


    //give some predefined folders
    const allfolders = [];

    //get value from store
    const allNotes = useSelector((store) => store.note.notes);
    const allFolder = useSelector((store) => store.folder.folder);

    useEffect(() => {
        dispatch(getNotes());
        dispatch(getFolder());
        setallFolderLists(allfolders);
    }, []);

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
        if (title.length > 0 && inputText.length > 0) {
            saveNotes();
        }
        else {
            alert('Invalid Form fill Title , Desc & Option select')
        }
    }

    useEffect(() => {
        setallFolderLists(allFolder)
    }, [allFolder])


    const addNewFolders = () => {
        let params = {
            name: newFolders
        }
        dispatch(getFolder(params))
        setTimeout(() => {
            dispatch(getFolder());
        }, 500)
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
                folderId: folders,
                id: id
            }
            dispatch(updateNotes(params))
        }
        else {
            let params = {
                title: title,
                content: inputText,
                createdDate: formattedDate,
                folder: {
                    id: folders
                }
            }
            dispatch(addNotes(params));
        }
    }

    const editHandler = (selected) => {
        setEditToggle(selected?.id);
        setInputText(selected?.content);
        setTitle(selected?.title);
        setcreatedDate(selected?.createdDate);
        setfolders(selected?.folderId);
        setid(selected?.id);
    }

    const deleteNote = (selected) => {
        let params = {
            id: selected.id
        }
        dispatch(moveToTrash(params)).then((res => {
            dispatch(getNotes());
        }))
    }

    const favItems = (selected) => {
        dispatch(favDelete(selected))
        setselected("");
    }

    const favBtnClick = () => {
        dispatch(favButtonClickAction())
        dispatch(getNotes());
        setisFav("fav")
    }

    const ArchivedItesm = (id) => {
        dispatch(archiveItemAction(id)).then((res => {
            dispatch(getNotes());
        }))
    }


    const handleSearch = () => {
        dispatch(searchAction(search))
        setTimeout(() => {
            setSearch("");
        }, 1000)
    }

    return (
        <div className="flex h-[100vh] overflow-y-auto">
            <div className="flex-initial w-3/12">
                <Category
                    setselected={setselected}
                    favBtnClick={favBtnClick}
                    folderSelect={folderSelect}
                    setfolderSelect={setfolderSelect}
                    setnewFolders={setnewFolders}
                    newFolders={newFolders}
                    addNewFolders={addNewFolders}
                    allFolderLists={allFolderLists}
                    setSearch={setSearch}
                    search={search}
                    handleSearch={handleSearch}

                />
            </div>
            <div className="flex-initial w-3/12 overflow-y-auto h-[100vh] bg-[#1C1C1C]">
                <FolderListing
                    selected={selected}
                    setselected={setselected}
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
                    selected={selected}
                    createdDate={createdDate}
                    setfolders={setfolders}
                    editHandler={editHandler}
                    editToggle={editToggle}
                    deleteNote={deleteNote}
                    favItems={favItems}
                    ArchivedItesm={ArchivedItesm}
                    allFolderLists={allFolderLists}
                    validateForm={validateForm}
                    folders={folders}
                />
            </div>
        </div>
    )
}

export default HomePage 