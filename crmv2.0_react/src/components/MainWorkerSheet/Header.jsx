import React from 'react';
import '../../styles/MainWorkerSheet/Header.css'

const Header = () => {
    return (
        <div>
            <div className="Header">
                <img className="G" src={require("../../images/MainWorkerSheet/G.png")} alt="G logo"/>
                <div className="TopImages">
                    <img src={require("../../images/MainWorkerSheet/menu.png")} alt="Menu IMG"/>
                    <img src={require("../../images/MainWorkerSheet/searchIMG.png")} alt="Search IMG"/>
                </div>
                <label>Поиск пользователей</label>
                <div className="Profile">
                    <img
                        src="https://sun9-21.userapi.com/impg/1BMszh6PzNOw7GtM_7yl0bSEJPL2UNwVoTbZlw/3AR5cn0ibkw.jpg?size=607x1080&quality=95&sign=65592e9802237213c6bb3bbf61220e4a&type=album"
                        alt="VK IMG"/>
                    <label>Амоскин Александр</label>
                </div>
            </div>
        </div>
    );
};

export default Header;