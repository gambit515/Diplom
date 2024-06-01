import React, {useEffect, useState} from 'react';
import '../../styles/MainWorkerSheet/InfoPanel.css'



const InfoPanel = () => {
    let [userInfo,setUserInfo] = useState();
    const authToken = localStorage.getItem("authToken");

    //Получение данных с API
    const fetchData = async (url, method = 'GET', headers = {}) => {
        console.log(url)
        console.log(headers)
        try {
            const response = await fetch(url, {
                method: method,
                headers: headers
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Для передачи ошибки наружу для обработки в вызывающем коде
        }
    };
    async function getDataFromUser(){
        try {
            const headers = { 'Authorization': `Token ${authToken}` };
            const data = await fetchData('http://127.0.0.1:8000/api/info/me', 'GET', headers);
            setUserInfo(data);
        }
        catch (error) {
            console.error('Error fetching schedule count:', error);
        }
    }


    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        // Если текущий месяц меньше месяца рождения
        // или они совпадают, но текущий день меньше дня рождения
        // то еще не исполнился полный год
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    useEffect(()=>{
        getDataFromUser()
    },[])
    if(userInfo)
        return (
            <div className="InfoPanel">
                <div className="AvatarWithFIO">
                    {/*<img
                        src="https://sun9-21.userapi.com/impg/1BMszh6PzNOw7GtM_7yl0bSEJPL2UNwVoTbZlw/3AR5cn0ibkw.jpg?size=607x1080&quality=95&sign=65592e9802237213c6bb3bbf61220e4a&type=album"/>
                    */}
                    {/*<img src={userInfo.photo}/>*/}
                    <img src={"http://127.0.0.1:8000/"+userInfo.photo}/>
                    <div className="FIO">
                        <label>{userInfo.surname}</label>
                        <label>{userInfo.name}</label>
                        <label>{userInfo.patronymic}</label>
                    </div>
                </div>
                <div className="MainInfoContainer">
                    <h1>Основная информация</h1>
                    <div className="MainInfoContainerFilling">
                        <h2>Статус:</h2>
                        <label>{userInfo.status}</label>
                        <h2>Возраст:</h2>
                        <label>{calculateAge(userInfo.date_birth)+" лет" + userInfo.date_birth}</label>
                        <h2>Роль:</h2>
                        <label>Мастер-маникюр</label>
                        <h2>Филиал:</h2>
                        <label>КРСК01-Взлетка</label>
                    </div>
                </div>
                <div className="MainInfoContainer">
                    <h1>Контакты</h1>
                    <div className="MainInfoContainerFilling">
                        <h2>Моб. телефон:</h2>
                        <label>89832970536</label>
                        <h2>Email:</h2>
                        <label>amoskin3515@gmail.com</label>
                        <h2>VK:</h2>
                        <label>https://vk.com/gambit515</label>
                    </div>
                </div>
            </div>
        );
};

export default InfoPanel;