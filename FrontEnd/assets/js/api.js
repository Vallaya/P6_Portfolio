// frontend / apis
const LOGIN_URL = 'http://127.0.0.1:5678/api/users/login';
const USER_URL = 'http://127.0.0.1:5678/api/users/me';

export async function getWorksAPI() {
    // ...
}

export async function postWorkAPI() {
    // ...
}

export async function loginAPI(credentials) {
    const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    const responseJson = await response.json();

    if(responseJson.error) {
        throw new Error('Authentication error');
    }
    return responseJson;
}

export async function userAPI() {
    try {
        const { tokenType, accessToken } = JSON.parse(localStorage.getItem('tokens'));
        const response = await fetch(USER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenType} ${accessToken}`
            },
        });
        //TODO: handle response
        console.log('===> response', response);
    } catch(e) {
        //TODO: catch errors
        console.log('===> e', e);
        throw new Error('userAPI error');
    }
}