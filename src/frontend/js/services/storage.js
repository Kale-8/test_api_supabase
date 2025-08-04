import axios from "axios";

const BASE_URL = 'http://localhost:3000/';

// READ (GET)
export async function getEntries(path) {
    try {
        const response = await axios.get(BASE_URL + path);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error.message);
    }
}

export async function getEntry(id, path) {
    try {
        const response = await axios.get(`${BASE_URL}${path}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event:', error.message);
    }
}

// CREATE (POST)
export async function addEntry(event, path) {
    try {
        const response = await axios.post(BASE_URL + path, event);
    } catch (error) {
        console.error('Error adding event:', error.message);
    }
}

// UPDATE (PUT)
export async function updateEntry(id, updatedEvent, path) {
    try {
        const response = await axios.put(`${BASE_URL}${path}/${id}`, updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error.message);
    }
}

// DELETE
export async function deleteEntry(id, path) {
    try {
        await axios.delete(`${BASE_URL}${path}/${id}`);
    } catch (error) {
        console.error('Error deleting event:', error.message);
    }
}