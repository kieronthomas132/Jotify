import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    id: string;
    name: string;
    username: string;
    profilePic: string;
    email: string
}

const initialState: UserState = {
    id: "",
    name: "",
    username: "",
    email: "",
    profilePic: "",
};


export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            return {
                ...state,
                ...action.payload,
            };
        },
        logoutUser: () => {
            return {
                ...initialState,
            };
        },
    },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;