import { createSlice } from '@reduxjs/toolkit';
import { FormModel, User } from '../App';

interface UserState {
  users: User[],
  selectedUser: User | any,
  initialFormValues: FormModel | any
}

const initialState: UserState = {
  users: [],
  selectedUser: {},
  initialFormValues: {},
};
const userSlice = createSlice({
    name: 'UserState',
    initialState: initialState,
    reducers: {
        setUsers: (state, action) => {
            return {...state, users: action.payload};
        },
        setSelectedUser: (state, action) => {
            return {...state, selectedUser: action.payload};
        },
        updateUser: (state, action): any => {
            let formData = action.payload;
            let _updatedUser = { ...state.selectedUser, name: formData.name, username: formData.username, email: formData.email };

            const updatedUsers = state.users.map((user: any) => {
                if (user.id === _updatedUser.id) {
                    return _updatedUser; // Eğer kullanıcı ID'si eşleşiyorsa, güncellenmiş kullanıcıyı döndür
                }
            return user; // Diğer durumlarda, orijinal kullanıcıyı döndür
            });
            return { ...state, users: updatedUsers };
        },
        setInitialFormValues: (state, action) => {
            return {...state, initialFormValues: action.payload};
        }
    },
});

export default userSlice;
export const { setSelectedUser, setInitialFormValues, setUsers, updateUser } = userSlice.actions;
