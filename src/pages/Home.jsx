import { useDocumentTitle } from "../config/hooks";

export const Home = () => {
  useDocumentTitle("Ana Sayfa");

  return (
    <div className="pt-20">
      <h1>Home</h1>
    </div>
  );
};
