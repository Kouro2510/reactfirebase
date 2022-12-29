import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import AddEditBlog from "./pages/Blog/AddEditBlog";
import {useEffect, useState} from "react";
import {auth} from "./config/firebase";
import ShowBlog from "./pages/Website/Blog/ShowBlog";
import { signOut } from "firebase/auth";
import {ToastContainer} from "react-toastify";
import Login from "./pages/Auth/Login/Login";
import Header from "~/components/Header";
import ScrollToTop from "~/components/ScrollToTop";
import "./App.css";
import "./style.scss";
import "./media-query.css";
function App() {
    const [active, setActive] = useState("home");
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser);
            } else {
                setUser(null);
            }
        });
    }, []);
    const handleLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
            setActive("login");
            navigate("/auth");
        });
    };
    return (
        <div className="App">
            <Header
                setActive={setActive}
                active={active}
                user={user}
                handleLogout={handleLogout}
            />
            <ScrollToTop />
            <ToastContainer position="top-center" />
            <Routes>
                <Route path="/">
                    <Route
                        path="/login"
                        element={<Login setActive={setActive} setUser={setUser} />}
                    />
                    <Route index setActive={setActive} active={active} user={user} element={<ShowBlog/>} />
                    <Route path="/create"  element={
                        user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
                    }/>
                    <Route
                        path="/update/:id"
                        element={
                            user?.uid ? (
                                <AddEditBlog user={user} setActive={setActive} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Route>
            </Routes>
        </div>

  );
}

export default App;
