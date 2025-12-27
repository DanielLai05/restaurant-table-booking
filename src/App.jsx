import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/Login";
import AuthProvider from "./components/AuthProvider";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<NavigationBar />}>
            <Route index element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

