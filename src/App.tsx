import "./index.css";
import { useAppSelector } from "./redux/hook.tsx";
import useCheckAuth from "./context/checkAuth.tsx";
import { useEffect } from "react";
import Home from "./components/home/home.tsx";
import { Route, Routes, useNavigate } from "react-router";
import Signup from "./components/auth/signup.tsx";
import Login from "./components/auth/login.tsx";
import Main from "./components/main/main.tsx";
const App = () => {
  const navigate = useNavigate();
  const { checkAuth } = useCheckAuth();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    const loggedIn = checkAuth()

    const isLoggedIn = async () => {
      if(await loggedIn) {
        navigate('/home/notes')
      }else if (!loggedIn && location.pathname.includes('/home/notes')) {
        navigate('/')
      }
    }
    isLoggedIn()
  }, []);

  return (
    <div className="bg-[#1C1C1C] overflow-y-hidden font-roboto h-[100vh] text-[#C3C3C3]">
      <Routes>
        {!user.id && <Route path="/" element={<Home />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        {user.id && <Route path="/home/notes" element={<Main />} />}
      </Routes>
    </div>
  );
};

export default App;
