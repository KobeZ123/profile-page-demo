export const changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        input: name,
    };
};

export const changeUsername = (username) => {
    return {
        type: 'CHANGE_USERNAME',
        input: username,
    };
};

export const changeBio = (bio) => {
    return {
        type: 'CHANGE_BIO',
        input: bio,
    };
};