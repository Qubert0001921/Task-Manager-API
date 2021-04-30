const apiUrl = "http://127.0.0.1:8080/api/tasks";
const reqHeaders = { 'Content-Type': 'application/json' };

// Get tasks
async function getTasks() {
    const res = await fetch(apiUrl, { headers: reqHeaders });
    const resJson = await res.json();

    return resJson;
}

// Get one task by id
async function getTask(id) {
    const res = await fetch(`${apiUrl}/${id}`, { headers: reqHeaders });
    const resJson = await res.json();

    return resJson;
}

// Create task
async function createTask(data) {
    const res = await fetch(apiUrl, {
        method: 'POST', 
        headers: reqHeaders,
        body: JSON.stringify(data)
    });

    const resJson = await res.json();

    return resJson;
}

// Edit task
async function editTask(id, data) {
    const res = await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: reqHeaders,
        body: JSON.stringify(data)
    });

    const resJson = await res.json();

    return resJson;
}

// Delete one task by id
async function deleteTask(id) {
    const res = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: reqHeaders,
    });

    if (res.status != 204) {
        const resJson = await res.json();
        return resJson;
    }
}