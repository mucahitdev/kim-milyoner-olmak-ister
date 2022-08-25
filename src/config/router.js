import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthLayout, Layout } from "../layout";
import { Home, Login, Settings } from "../pages";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
