import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup } from "firebase/auth";
import { auth, providerGoogle } from "../config/firebase";
import toast from "react-hot-toast";

export const loginAsync = createAsyncThunk("user/login", async () => {
  try {
    await signInWithPopup(auth, providerGoogle);
    window.location.reload();
    toast.success("Giriş başarılı!");
    return auth;
  } catch (error) {
    console.log(error);
    toast.error("Giriş başarısız!");
  }
});

export const signOut = createAsyncThunk("user/signOut", async () => {
  try {
    await auth.signOut();
    window.location.reload();
    toast.success("Çıkış başarılı!");
  } catch (error) {
    console.log(error);
    toast.error("Çıkış başarısız!");
  }
});

const initialState = {
  userData: null,
  isLoggedIn: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [loginAsync.pending]: (state, action) => {
      state.loading = true;
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    [loginAsync.rejected]: (state, action) => {
      state.loading = false;
      state.userData = null;
      state.isLoggedIn = false;
    },
    [signOut.pending]: (state, action) => {
      state.loading = true;
    },
    [signOut.fulfilled]: (state, action) => {
      state.loading = false;
      state.userData = null;
      state.isLoggedIn = false;
    },
    [signOut.rejected]: (state, action) => {
      state.loading = false;
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

export const userData = (state) => state.user.userData;

export const { login } = userSlice.actions;
export default userSlice.reducer;
