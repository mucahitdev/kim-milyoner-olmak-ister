import { useState, useEffect } from "react";
import { useDocumentTitle } from "../config/hooks";
import { auth } from "../config/firebase";
import {
  updateProfileAsync,
  userData,
  uploadLoading,
} from "../redux/userSlice";
import { useDispatch,useSelector } from "react-redux";

export const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const user = useSelector(userData);
  const loading = useSelector(uploadLoading);



  const dispatch = useDispatch();

  useDocumentTitle("Profilini Düzenle");
  useEffect(() => {
    setImageUrl(auth.currentUser.photoURL);
    setFullName(auth.currentUser.displayName);
  }, [user]);

  const updateProfile = async (e) => {
    if (e !== null) {
      const file = e.target.files[0];
      dispatch(updateProfileAsync({ fullName, file }));
    } else {
      dispatch(updateProfileAsync({ fullName }));
    }
  };

  return (
    <div>
      <h1>Profilini Düzenle</h1>

      <h3> İsmini düzenle </h3>

      <input
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <h3>Resmini Değiştir</h3>
      {imageUrl && (
        <img
          style={{ height: "60px", width: "60px", borderRadius: "50%" }}
          src={imageUrl}
          alt="profile"
        />
      )}

      <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e)} />
      <button disabled={loading} onClick={() => updateProfile(photoFile)}>Güncelle</button>
    </div>
  );
};
