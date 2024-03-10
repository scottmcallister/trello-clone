const API_URL = 'http://localhost:8080/api';

// boards
export const fetchAllBoards = async () => {
    const response = await fetch(`${API_URL}/boards`);
    const data = await response.json();
    return data;
}
export const fetchBoard = async (id) => {
    const response = await fetch(`${API_URL}/boards/${id}`);
    const data = await response.json();
    return data;
}
export const updateBoard = async (id, data) => {
    const response = await fetch(`${API_URL}/boards/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}
export const createBoard = async (data) => {
    const response = await fetch(`${API_URL}/boards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}
export const deleteBoard = async (id) => {
    const response = await fetch(`${API_URL}/boards/${id}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    return result;
}

// lanes
export const fetchAllLanes = async () => {
    const response = await fetch(`${API_URL}/lanes`);
    const data = await response.json();
    return data;
}
export const fetchLane = async (id) => {
    const response = await fetch(`${API_URL}/lanes/${id}`);
    const data = await response.json();
    return data;
}
export const createLane = async (data, boardId) => {
    const response = await fetch(`${API_URL}/lanes?boardId=${boardId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}
export const updateLane = async (id, data) => {
    const response = await fetch(`${API_URL}/lanes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}
export const deleteLane = async (id) => {
    const response = await fetch(`${API_URL}/lanes/${id}`, {
        method: 'DELETE'
    });
    const result = await response.json();
    return result;
}

// posts
export const fetchAllPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    return data;
}
export const fetchPost = async (id) => {
    const response = await fetch(`${API_URL}/posts/${id}`);
    const data = await response.json();
    return data;
}
export const createPost = async (data) => {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}
export const updatePost = async (id, data) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
}