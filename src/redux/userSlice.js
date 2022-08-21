import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { auth, providerGoogle, storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

export const loginAsync = createAsyncThunk("user/login", async () => {
  try {
    await signInWithPopup(auth, providerGoogle);
    window.location.reload();
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
  } catch (error) {
    console.log(error);
    toast.error("Çıkış başarısız!");
  }
});

export const updateProfileAsync = createAsyncThunk(
  "user/updateProfile",
  async ({ ...data }) => {
    const { fullName, file } = data;
    let result = [];
    try {
      if (file) {
        const imageRef = ref(storage, `${auth.currentUser.uid}/profile.jpg`);
        await uploadBytes(imageRef, file);
        const photoURL = await getDownloadURL(imageRef);
        await updateProfile(auth.currentUser, {
          displayName: fullName,
          photoURL,
        });
        result = {
          fullName,
          photoURL,
        };
      } else {
        await updateProfile(auth.currentUser, {
          displayName: fullName,
        });
        result = {
          fullName,
          photoURL: auth.currentUser.photoURL,
        };
      }
      toast.success("Profil güncellendi!");
    } catch (error) {
      console.log(error);
      toast.error("Profil güncellenemedi!");
    }
    return result;
  }
);

const initialState = {
  userData: null,
  uploadLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [updateProfileAsync.pending]: (state) => {
      state.uploadLoading = true;
    },
    [updateProfileAsync.fulfilled]: (state, action) => {
      const { fullName, photoURL } = action.payload;
      state.userData = {
        fullName,
        photoURL,
      }
      state.uploadLoading = false;
    },
    [updateProfileAsync.rejected]: (state) => {
      state.uploadLoading = false;
    }
  },
});

export const userData = (state) => state.user.userData;
export const uploadLoading = (state) => state.user.uploadLoading;

export const { login } = userSlice.actions;
export default userSlice.reducer;
