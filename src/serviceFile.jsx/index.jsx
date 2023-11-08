import axios from "axios";

export const favDelete = (selected) => {
    if (selected.favorite) {
        axios.delete(`http://localhost:8080/v1/notes/${selected.id}/favorite`)
    } else {
        axios.put(`http://localhost:8080/v1/notes/${selected.id}/favorite`)
    }
}

export const addToArchive = (id) => {
    axios.put(`http://localhost:8080/v1/notes/${id}/archive`)
}

export const updateNote = (params,id) => {
    axios.put(`http://localhost:8080/v1/notes/${id}`,
        params
    )
}
