import { combineReducers } from 'redux';

export const nameReducer = (state = 'Timothy Green', action) => {
    switch (action.type) {
        case 'CHANGE_NAME': {
            return action.input;
        }
        default: 
            return state;
        
    }
}

export const usernameReducer = (state = 'timothygreen', action) => {
    switch (action.type) {
        case 'CHANGE_USERNAME': {
            return action.input;
        }
        default: 
            return state;
    }
}

export const bioReducer = (state = 'this is just a photo dump for my instagram account i guess ahaha', action) => {
    switch (action.type) {
        case 'CHANGE_BIO': {
            return action.input;
        }
        default: 
            return state;
    }
}

const ProfileReducers = {
    name: nameReducer,
    username: usernameReducer,
    bio: bioReducer,
};

export default ProfileReducers;

