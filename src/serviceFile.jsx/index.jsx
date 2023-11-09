import axios from "axios";

export const favDelete = (selected) => {
    if (selected.favorite) {
        axios.delete(`http://localhost:8080/v1/notes/${selected.id}/favorite`)
    } else {
        axios.put(`http://localhost:8080/v1/notes/${selected.id}/favorite`)
    }
}

export const addToArchive = async (id) => {
    try {
        const data = await axios.put(`http://localhost:8080/v1/notes/${id}/archive`)
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateNote = (params, id) => {
    axios.put(`http://localhost:8080/v1/notes/${id}`,
        params
    )
}

export const favButtonClick = async () => {
    try {
        const data = await axios.get("http://localhost:8080/v1/notes/favorites")
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const delectedNote = async (params) => {
    try {
        const data = await axios.put(`http://localhost:8080/v1/notes/${params.id}/trash`)
        return data;
    } catch (error) {
        console.log(error);
    }
}