import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchUsers} from '../api/users';
import {User} from "../types/types";

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
    sortBy: string | null;
}

// Запрос списка пользователей
export const fetchUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetchUsers();
    return response;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
        sortBy: null
    } as UsersState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            const updatedUser = action.payload;
            const userIndex = state.users.findIndex(user => user.id === updatedUser.id);
            if (userIndex !== -1) {
                state.users[userIndex] = updatedUser;
                console.log('Updated User:', updatedUser);
            }
        },
        setSortBy: (state, action: PayloadAction<string | null>) => {
            state.sortBy = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.map((user: User) => ({...user, comment: ''}));
            })
            .addCase(fetchUsersAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Ошибка при загрузке пользователей';
            });
    },
});

export const {updateUser, setSortBy} = usersSlice.actions;
export default usersSlice.reducer;
