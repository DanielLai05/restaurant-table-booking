import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/Login";
import AuthProvider from "./components/AuthProvider";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import NotFound from "./pages/NotFound";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import { Provider } from "react-redux";
import store from "./store";
import UpdateReservation from "./pages/UpdateReservation";

export default function App() {

  //show error messsage for all pages 
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<NavigationBar />}>
              <Route index element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/reservation/:id" element={<UpdateReservation />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}

