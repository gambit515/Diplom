import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import MainWorkerSheet from "./components/MainWorkerSheet/MainWorkerSheet";
//import {BrowserRouter} from 'react-router-dom';
import AuthForm from "./components/AuthForm/AuthForm";
import Logout from "./pages/Logout";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>

            <header>
                <Link to="/main/info">Home</Link>
                <Link to="/main/schedule">Schedule</Link>
                <Link to={"/login"}>Login</Link>
                <Link to={"/logout"}>Logout</Link>
            </header>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/main/*" element={<MainWorkerSheet/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
        </BrowserRouter>
    );
};

export default App;
