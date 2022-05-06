const API_URL_PROJECTS = 'https://api.strateegia.digital/projects/v1/';
const API_URL_USERS = 'https://api.strateegia.digital/users/v1/';

export async function auth(username: string, password: string) {
    const base64Login = btoa(`${username}:${password}`);

    const response = await fetch(`${API_URL_USERS}auth/signin`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${base64Login}`
        }
    });

    const data = await response.json();

    return data.access_token;
}

// export const getAllProjects = (token: string) => {
//     const { data }: any = await fetch(`${API_URL_PROJECTS}project?size=5000`, {
//         method: 'get',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//         }
//     })
//     return data;
// }

export async function getAllProjects(token: string) {

    const response = await fetch(`${API_URL_PROJECTS}project?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getProjectById(token: string, project_id: string) {

    const response = await fetch(`${API_URL_PROJECTS}project/${project_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getAllDivergencePointsByMapId(token: String, map_id: string) {

    const response = await fetch(`${API_URL_PROJECTS}map/${map_id}/divergence-point?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getMapById(token: String, map_id: string) {

    const response = await fetch(`${API_URL_PROJECTS}map/${map_id}`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getDivergencePointById(token: String, content_id: string) {

    const response = await fetch(`${API_URL_PROJECTS}divergence-point/${content_id}?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getParentComments(token: String, content_id: string, question_id: string) {

    const response = await fetch(`${API_URL_PROJECTS}divergence-point/${content_id}/question/${question_id}/comment?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getCommentsGroupedByQuestionReport(token: String, content_id: string) {

    const response = await fetch(`${API_URL_PROJECTS}divergence-point/${content_id}/comment/report?size=5000`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getCommentEngagementByContent(token: String, projectId: String) {

    const response = await fetch(`${API_URL_PROJECTS}project/${projectId}/divergence-point-engagement`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

export async function getUser(token: string) {

    const response = await fetch(`${API_URL_USERS}user/me`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();

    return data;
}

// async function addKitToUser(token:string, kit: any) {
//     const JSONkit = JSON.stringify(kit);

//     const response = await fetch(`${API_URL}`, {
//         method: 'post',
//         headers:{
//             'Content-Type': 'application/json', 
//             'Authorization': `Bearer ${token}`
//         },
//         body: `${JSONkit}`
//     });

//     return await response.json();
// }