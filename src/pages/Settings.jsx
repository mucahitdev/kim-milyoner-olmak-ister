import { useState, useEffect } from "react";
import { useDocumentTitle } from "../config/hooks";
import { auth } from "../config/firebase";
import {
  updateProfileAsync,
  userData,
  uploadLoading,
} from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";

export const Settings = () => {
  const [fullName, setFullName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [soundVolume, setSoundVolume] = useState(localStorage.getItem("soundVolume")|| '5');

  const user = useSelector(userData);
  const loading = useSelector(uploadLoading);
  const dispatch = useDispatch();

  useDocumentTitle("Ayarlar");

  useEffect(() => {
    setImageUrl(auth.currentUser.photoURL);
    setFullName(auth.currentUser.displayName);
  }, [user]);

  const updateProfile = async (e) => {
    if (fullName.trim() === "") {
      toast.error("İsim boş olamaz");
      return;
    }

    if (e !== null) {
      const file = e.target.files[0];
      dispatch(updateProfileAsync({ fullName, file }));
    } else {
      dispatch(updateProfileAsync({ fullName }));
    }
  };

  function selectFile() {
    document.getElementById("photoFile").click();
  }

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1 className="font-extrabold text-3xl pb-20">Ayarlar</h1>
      <div className="w-1/2 mb-3">
        <label
          htmlFor="minmax-range"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Oyun sesi
        </label>
        <input
          id="minmax-range"
          type="range"
          min="0"
          max="10"
          value={soundVolume}
          onChange={(e) => {
            setSoundVolume(e.target.value);
            localStorage.setItem("soundVolume", e.target.value);
          } }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <div className="bg-gray-800 text-white font-medium rounded-xl p-3">
        <div className="flex flex-col items-center space-y-3">
          <h3 className="font-medium text-2xl"> İsmini düzenle </h3>
          <label htmlFor="fullName">Ad-Soyad</label>
          <input
            type="text"
            value={fullName}
            id="fullName"
            onChange={(e) => setFullName(e.target.value)}
            className="bg-gray-800 text-white font-medium rounded-xl p-3 outline-none border-2 border-gray-600"
          />
          <h3>Resmini Değiştir</h3>
          {imageUrl && (
            <img
              style={{ height: "60px", width: "60px", borderRadius: "50%" }}
              src={imageUrl}
              alt="profile"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhotoFile(e)}
            className="hidden"
            id="photoFile"
          />
          <button
            onClick={() => selectFile()}
            className="bg-gray-600 px-3 py-2 rounded-xl hover:bg-gray-500"
          >
            Fotoğraf yükle
          </button>

          <button
            disabled={loading}
            onClick={() => updateProfile(photoFile)}
            className="bg-lime-500 text-black px-3 py-2 rounded-xl hover:shadow-md hover:shadow-lime-300 animate-bounce"
          >
            {loading ? (
              <ReactLoading
                type="spin"
                color="black"
                height={"24px"}
                width={"24px"}
              />
            ) : (
              "Kaydet"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
