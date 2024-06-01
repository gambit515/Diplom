import React from 'react';
import '../../styles/MainWorkerSheet/Hotbar.css'

const HotBar = () => {
    return (
        <div>
            <div className="HotBar">
                <div className="HomeButton">
                    <img src={require("../../images/MainWorkerSheet/home.png")} alt="Home IMG"/>
                </div>
                <img src={require("../../images/MainWorkerSheet/calendar.png")} alt="calendar IMG"/>
                <div className="TasksButton">
                    <img src={require("../../images/MainWorkerSheet/tasks.png")} alt="tasks IMG"/>
                </div>
                <img src={require("../../images/MainWorkerSheet/curency.png")} alt="currency IMG"/>
            </div>
        </div>
    );
};

export default HotBar;