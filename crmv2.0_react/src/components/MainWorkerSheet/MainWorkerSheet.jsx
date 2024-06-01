import React, {useEffect} from 'react';
/*import '../../styles/WorkerList.css'*/
import Header from "./Header";
import HotBar from "./HotBar";
import '../../styles/MainWorkerSheet/Main.css'
import InfoPanel from "./InfoPanel";
import MainPanel from "./MainPanel";
import {Routes,Route, useNavigate} from "react-router-dom";
import Logout from "../../pages/Logout";
import Schedule from "../../pages/Schedule";

const MainWorkerSheet = () => {
    const navigate = useNavigate()
    useEffect(() =>{
        if(localStorage.getItem("authToken")==null){
            navigate("/login")
        }
    },[navigate])


    return (
        <div>
            <Header/>
            <div className="Main">
                <HotBar/>
                <Routes>
                    <Route path="schedule" element={<Schedule/>}/>
                    <Route path="info" element={
                        <>
                            <InfoPanel/>
                            <MainPanel/>
                        </>
                    }/>
                </Routes>

            </div>
        </div>
    );
};

export default MainWorkerSheet;