import { useDocumentTitle } from "../config/hooks";
import { auth } from "../config/firebase";

export const Home = () => {
  useDocumentTitle("Ana Sayfa");

  return (
    <div className="text-center">
      <h1 className="font-bold text-2xl">Ana Sayfa</h1>
      <div>
        <p>
          <b >MİLYONER</b> oyununa hoşgeldin <span className='text-green-500'>{auth.currentUser.displayName}!</span>
        </p>
        <p>Ayarlar kısmından Fotoğrafını,İsmini ve Oyunun ses yüksekliğini değiştirebilirsin.</p>
        <p>Şuanlık soru havuzu <b>çok kısıtlı</b>.</p>
        <p> Sonraki güncellemelerde kullanıcılar <b>soru ekleyebilecek</b> ve bu soruları kullanıcılar onaylarsa soru havuzuna <b>eklenecektir.</b></p>
      </div>
    </div>
  );
};
