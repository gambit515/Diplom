import React, {useEffect, useState} from 'react';
import '../../styles/MainWorkerSheet/MainPanel.css'
import NewsPanel from "./NewsPanel";
import GreedPanel from "./GreedPanel";

const MainPanel = () => {

    let [scheduleCountData, setScheduleCountData] = useState();

    /*const groupDataByMonth = (data) => {
        //Групировка данных по месяцам
        const groupedData = {};

        data.forEach((item) => {
            //Разбитие даты на день месяц год
            const dateParts = item.Date.split('-');
            const montNumber = dateParts[1] // формат: 'mm-yyyy'
            if (!groupedData[montNumber]) {
                groupedData[montNumber] = [];
            }

            const newItem = {
                id: item.Id,
                link: item.Link,
                count: item.Count,
                dateOfTheDay: dateParts[0]
            };

            groupedData[montNumber].push(newItem);
        });

        // Возвращаем группированные данные
        return groupedData;
    };*/
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


    async function getDataFromSchedule(){
        try {
            const headers = { 'Authorization': `Token ${authToken}` };
            const data = await fetchData('http://127.0.0.1:8000/api/schedule/count', 'GET', headers);
            setScheduleCountData(data);
        } catch (error) {
            console.error('Error fetching schedule count:', error);
        }
    }

    //Выполняется единожды при запуске компонента
    useEffect(() => {
        getDataFromSchedule();
    }, []);


    //Выполняется каждые 30 секунд
    /*
    useEffect(() => {
        const intervalId = setInterval(() => {
            //console.log(scheduleCountData)
            fetchData();
        }, 30000);

        return () => clearInterval(intervalId);
    }, [scheduleCountData]);
    */
    const [news, setPosts] = useState([
        {
            id: 1,
            tittle: "<b>Акция</b> \"Лучшее для ваших рук и ногтей!\" (01.09.2023 - 01.10.2023)",
            text: "<p>Специальное предложение: <b>\"Бриллиантовый маникюр\"</b> за полцены! Ощутите роскошь и\n" +
                "блеск с блестящим маникюром, выполненным нашими опытными мастерами.</p>\n" +
                "<p>Приглашаем наших клиентов на <b>сеанс ультразвукового ухода за кожей рук в подарок после\n" +
                "любого маникюрного обслуживания!</b> Дарите вашим рукам нежность и заботу, чтобы они\n" +
                "всегда оставались ухоженными.</p>",
            link: "#"
        },
        {
            id: 2,
            tittle: "<b>Новость</b> (01.08.2023)",
            text: "<p>Мы постоянно стремимся предложить нашим клиентам уникальный и разнообразный опыт ухода за" +
                "ногтями и кожей рук. Поэтому рады сообщить о расширении нашего спектра услуг. В" +
                "ближайшее время, мы планируем внедрить новые методики маникюра, которые помогут" +
                "удовлетворить запросы самых взыскательных клиентов.</p>",
            link: "#"
        },
        {
            id: 3,
            tittle: "<b>Новость2</b> (01.08.2023)",
            text: "<p>Мы постоянно стремимся предложить нашим клиентам уникальный и разнообразный опыт ухода за" +
                "ногтями и кожей рук. Поэтому рады сообщить о расширении нашего спектра услуг. В" +
                "ближайшее время, мы планируем внедрить новые методики маникюра, которые помогут" +
                "удовлетворить запросы самых взыскательных клиентов.</p>",
            link: "#"
        }
    ])
    const [septemberPay, setSeptemberPay] = useState([
        { id: 1, link: "#", count: 0, dateOfTheDay: "1" },
        { id: 2, link: "#", count: 0, dateOfTheDay: "2" },
        { id: 3, link: "#", count: -1, dateOfTheDay: "3" },
        { id: 4, link: "#", count: -1, dateOfTheDay: "4" },
        { id: 5, link: "#", count: 0, dateOfTheDay: "5" },
        { id: 6, link: "#", count: 0, dateOfTheDay: "6" },
        { id: 7, link: "#", count: -1, dateOfTheDay: "7" },
        { id: 8, link: "#", count: -1, dateOfTheDay: "8" },
        { id: 9, link: "#", count: 0, dateOfTheDay: "9" },
        { id: 10, link: "#", count: 0, dateOfTheDay: "10" },
        { id: 11, link: "#", count: -1, dateOfTheDay: "11" },
        { id: 12, link: "#", count: -1, dateOfTheDay: "12" },
        { id: 13, link: "#", count: 0, dateOfTheDay: "13" },
        { id: 14, link: "#", count: 0, dateOfTheDay: "14" },
        { id: 15, link: "#", count: -1, dateOfTheDay: "15" },
        { id: 16, link: "#", count: -1, dateOfTheDay: "16" },
        { id: 17, link: "#", count: 0, dateOfTheDay: "17" },
        { id: 18, link: "#", count: 0, dateOfTheDay: "18" },
        { id: 19, link: "#", count: -1, dateOfTheDay: "19" },
        { id: 20, link: "#", count: -1, dateOfTheDay: "20" },
        { id: 21, link: "#", count: 0, dateOfTheDay: "21" },
        { id: 22, link: "#", count: 0, dateOfTheDay: "22" },
        { id: 23, link: "#", count: -1, dateOfTheDay: "23" },
        { id: 24, link: "#", count: -1, dateOfTheDay: "24" },
        { id: 25, link: "#", count: 0, dateOfTheDay: "25" },
        { id: 26, link: "#", count: 0, dateOfTheDay: "26" },
        { id: 27, link: "#", count: -1, dateOfTheDay: "27" },
        { id: 28, link: "#", count: -1, dateOfTheDay: "28" },
        { id: 29, link: "#", count: 0, dateOfTheDay: "29" },
        { id: 30, link: "#", count: 0, dateOfTheDay: "30" },
    ]);

    const [octoberPay, setOctoberPay] = useState([
        { id: 1, link: "#", count: -1, dateOfTheDay: "1" },
        { id: 2, link: "#", count: -1, dateOfTheDay: "2" },
        { id: 3, link: "#", count: 0, dateOfTheDay: "3" },
        { id: 4, link: "#", count: 0, dateOfTheDay: "4" },
        { id: 5, link: "#", count: -1, dateOfTheDay: "5" },
        { id: 6, link: "#", count: -1, dateOfTheDay: "6" },
        { id: 7, link: "#", count: 0, dateOfTheDay: "7" },
        { id: 8, link: "#", count: 0, dateOfTheDay: "8" },
        { id: 9, link: "#", count: -1, dateOfTheDay: "9" },
        { id: 10, link: "#", count: -1, dateOfTheDay: "10" },
        { id: 11, link: "#", count: 0, dateOfTheDay: "11" },
        { id: 12, link: "#", count: 0, dateOfTheDay: "12" },
        { id: 13, link: "#", count: -1, dateOfTheDay: "13" },
        { id: 14, link: "#", count: -1, dateOfTheDay: "14" },
        { id: 15, link: "#", count: 0, dateOfTheDay: "15" },
        { id: 16, link: "#", count: 0, dateOfTheDay: "16" },
        { id: 17, link: "#", count: -1, dateOfTheDay: "17" },
        { id: 18, link: "#", count: -1, dateOfTheDay: "18" },
        { id: 19, link: "#", count: 0, dateOfTheDay: "19" },
        { id: 20, link: "#", count: 0, dateOfTheDay: "20" },
        { id: 21, link: "#", count: -1, dateOfTheDay: "21" },
        { id: 22, link: "#", count: -1, dateOfTheDay: "22" },
        { id: 23, link: "#", count: 0, dateOfTheDay: "23" },
        { id: 24, link: "#", count: 0, dateOfTheDay: "24" },
        { id: 25, link: "#", count: -1, dateOfTheDay: "25" },
        { id: 26, link: "#", count: -1, dateOfTheDay: "26" },
        { id: 27, link: "#", count: 0, dateOfTheDay: "27" },
        { id: 28, link: "#", count: 0, dateOfTheDay: "28" },
        { id: 29, link: "#", count: -1, dateOfTheDay: "29" },
        { id: 30, link: "#", count: -1, dateOfTheDay: "30" },
        { id: 31, link: "#", count: 0, dateOfTheDay: "31" },
    ]);

    const [novemberPay, setNovemberPay] = useState([
        { id: 1, link: "#", count: 0, dateOfTheDay: "1" },
        { id: 2, link: "#", count: -1, dateOfTheDay: "2" },
        { id: 3, link: "#", count: -1, dateOfTheDay: "3" },
        { id: 4, link: "#", count: 0, dateOfTheDay: "4" },
        { id: 5, link: "#", count: 0, dateOfTheDay: "5" },
        { id: 6, link: "#", count: -1, dateOfTheDay: "6" },
        { id: 7, link: "#", count: -1, dateOfTheDay: "7" },
        { id: 8, link: "#", count: 0, dateOfTheDay: "8" },
        { id: 9, link: "#", count: 0, dateOfTheDay: "9" },
        { id: 10, link: "#", count: -1, dateOfTheDay: "10" },
        { id: 11, link: "#", count: -1, dateOfTheDay: "11" },
        { id: 12, link: "#", count: 0, dateOfTheDay: "12" },
        { id: 13, link: "#", count: 0, dateOfTheDay: "13" },
        { id: 14, link: "#", count: -1, dateOfTheDay: "14" },
        { id: 15, link: "#", count: -1, dateOfTheDay: "15" },
        { id: 16, link: "#", count: 0, dateOfTheDay: "16" },
        { id: 17, link: "#", count: 0, dateOfTheDay: "17" },
        { id: 18, link: "#", count: -1, dateOfTheDay: "18" },
        { id: 19, link: "#", count: -1, dateOfTheDay: "19" },
        { id: 20, link: "#", count: 0, dateOfTheDay: "20" },
        { id: 21, link: "#", count: 0, dateOfTheDay: "21" },
        { id: 22, link: "#", count: -1, dateOfTheDay: "22" },
        { id: 23, link: "#", count: -1, dateOfTheDay: "23" },
        { id: 24, link: "#", count: 0, dateOfTheDay: "24" },
        { id: 25, link: "#", count: 0, dateOfTheDay: "25" },
        { id: 26, link: "#", count: -1, dateOfTheDay: "26" },
        { id: 27, link: "#", count: -1, dateOfTheDay: "27" },
        { id: 28, link: "#", count: 0, dateOfTheDay: "28" },
        { id: 29, link: "#", count: 0, dateOfTheDay: "29" },
        { id: 30, link: "#", count: -1, dateOfTheDay: "30" },
        { id: 31, link: "#", count: -1, dateOfTheDay: "31" },
    ]);

    const [septemberSch, setSeptemberSch] = useState([
        { id: 1, link: "#", count: 0, dateOfTheDay: "1" },
        { id: 2, link: "#", count: 0, dateOfTheDay: "2" },
        { id: 3, link: "#", count: -1, dateOfTheDay: "3" },
        { id: 4, link: "#", count: -1, dateOfTheDay: "4" },
        { id: 5, link: "#", count: 7, dateOfTheDay: "5" },
        { id: 6, link: "#", count: 7, dateOfTheDay: "6" },
        { id: 7, link: "#", count: -1, dateOfTheDay: "7" },
        { id: 8, link: "#", count: -1, dateOfTheDay: "8" },
        { id: 9, link: "#", count: 7, dateOfTheDay: "9" },
        { id: 10, link: "#", count: 7, dateOfTheDay: "10" },
        { id: 11, link: "#", count: -1, dateOfTheDay: "11" },
        { id: 12, link: "#", count: -1, dateOfTheDay: "12" },
        { id: 13, link: "#", count: 7, dateOfTheDay: "13" },
        { id: 14, link: "#", count: 7, dateOfTheDay: "14" },
        { id: 15, link: "#", count: -1, dateOfTheDay: "15" },
        { id: 16, link: "#", count: -1, dateOfTheDay: "16" },
        { id: 17, link: "#", count: 5, dateOfTheDay: "17" },
        { id: 18, link: "#", count: 7, dateOfTheDay: "18" },
        { id: 19, link: "#", count: -1, dateOfTheDay: "19" },
        { id: 20, link: "#", count: -1, dateOfTheDay: "20" },
        { id: 21, link: "#", count: 7, dateOfTheDay: "21" },
        { id: 22, link: "#", count: 5, dateOfTheDay: "22" },
        { id: 23, link: "#", count: -1, dateOfTheDay: "23" },
        { id: 24, link: "#", count: -1, dateOfTheDay: "24" },
        { id: 25, link: "#", count: 3, dateOfTheDay: "25" },
        { id: 26, link: "#", count: 5, dateOfTheDay: "26" },
        { id: 27, link: "#", count: -1, dateOfTheDay: "27" },
        { id: 28, link: "#", count: -1, dateOfTheDay: "28" },
        { id: 29, link: "#", count: 3, dateOfTheDay: "29" },
        { id: 30, link: "#", count: 5, dateOfTheDay: "30" },
    ]);

    const [octoberSch, setOctoberSch] = useState([
        { id: 1, link: "#", count: -1, dateOfTheDay: "1" },
        { id: 2, link: "#", count: -1, dateOfTheDay: "2" },
        { id: 3, link: "#", count: 5, dateOfTheDay: "3" },
        { id: 4, link: "#", count: 5, dateOfTheDay: "4" },
        { id: 5, link: "#", count: -1, dateOfTheDay: "5" },
        { id: 6, link: "#", count: -1, dateOfTheDay: "6" },
        { id: 7, link: "#", count: 5, dateOfTheDay: "7" },
        { id: 8, link: "#", count: 3, dateOfTheDay: "8" },
        { id: 9, link: "#", count: -1, dateOfTheDay: "9" },
        { id: 10, link: "#", count: -1, dateOfTheDay: "10" },
        { id: 11, link: "#", count: 3, dateOfTheDay: "11" },
        { id: 12, link: "#", count: 5, dateOfTheDay: "12" },
        { id: 13, link: "#", count: -1, dateOfTheDay: "13" },
        { id: 14, link: "#", count: -1, dateOfTheDay: "14" },
        { id: 15, link: "#", count: 3, dateOfTheDay: "15" },
        { id: 16, link: "#", count: 5, dateOfTheDay: "16" },
        { id: 17, link: "#", count: -1, dateOfTheDay: "17" },
        { id: 18, link: "#", count: -1, dateOfTheDay: "18" },
        { id: 19, link: "#", count: 3, dateOfTheDay: "19" },
        { id: 20, link: "#", count: 3, dateOfTheDay: "20" },
        { id: 21, link: "#", count: -1, dateOfTheDay: "21" },
        { id: 22, link: "#", count: -1, dateOfTheDay: "22" },
        { id: 23, link: "#", count: 1, dateOfTheDay: "23" },
        { id: 24, link: "#", count: 3, dateOfTheDay: "24" },
        { id: 25, link: "#", count: -1, dateOfTheDay: "25" },
        { id: 26, link: "#", count: -1, dateOfTheDay: "26" },
        { id: 27, link: "#", count: 3, dateOfTheDay: "27" },
        { id: 28, link: "#", count: 1, dateOfTheDay: "28" },
        { id: 29, link: "#", count: -1, dateOfTheDay: "29" },
        { id: 30, link: "#", count: -1, dateOfTheDay: "30" },
        { id: 31, link: "#", count: 3, dateOfTheDay: "31" },
    ]);

    const [novemberSch, setNovemberSch] = useState([
        { id: 1, link: "#", count: 1, dateOfTheDay: "1" },
        { id: 2, link: "#", count: -1, dateOfTheDay: "2" },
        { id: 3, link: "#", count: -1, dateOfTheDay: "3" },
        { id: 4, link: "#", count: 3, dateOfTheDay: "4" },
        { id: 5, link: "#", count: 1, dateOfTheDay: "5" },
        { id: 6, link: "#", count: -1, dateOfTheDay: "6" },
        { id: 7, link: "#", count: -1, dateOfTheDay: "7" },
        { id: 8, link: "#", count: 3, dateOfTheDay: "8" },
        { id: 9, link: "#", count: 1, dateOfTheDay: "9" },
        { id: 10, link: "#", count: -1, dateOfTheDay: "10" },
        { id: 11, link: "#", count: -1, dateOfTheDay: "11" },
        { id: 12, link: "#", count: 3, dateOfTheDay: "12" },
        { id: 13, link: "#", count: 1, dateOfTheDay: "13" },
        { id: 14, link: "#", count: -1, dateOfTheDay: "14" },
        { id: 15, link: "#", count: -1, dateOfTheDay: "15" },
        { id: 16, link: "#", count: 3, dateOfTheDay: "16" },
        { id: 17, link: "#", count: 1, dateOfTheDay: "17" },
        { id: 18, link: "#", count: -1, dateOfTheDay: "18" },
        { id: 19, link: "#", count: -1, dateOfTheDay: "19" },
        { id: 20, link: "#", count: 3, dateOfTheDay: "20" },
        { id: 21, link: "#", count: 1, dateOfTheDay: "21" },
        { id: 22, link: "#", count: -1, dateOfTheDay: "22" },
        { id: 23, link: "#", count: -1, dateOfTheDay: "23" },
        { id: 24, link: "#", count: 1, dateOfTheDay: "24" },
        { id: 25, link: "#", count: 1, dateOfTheDay: "25" },
        { id: 26, link: "#", count: -1, dateOfTheDay: "26" },
        { id: 27, link: "#", count: -1, dateOfTheDay: "27" },
        { id: 28, link: "#", count: 1, dateOfTheDay: "28" },
        { id: 29, link: "#", count: 1, dateOfTheDay: "29" },
        { id: 30, link: "#", count: -1, dateOfTheDay: "30" },
        { id: 31, link: "#", count: -1, dateOfTheDay: "31" },
    ]);

    const [payment, setPayment] = useState([
        {key: 1, month_year: "9-2023", total: "65000", days: septemberPay},
        {key: 2, month_year: "10-2023", total: "75000", days: octoberPay},
        {key: 3, month_year: "11-2023", total: "85000", days: novemberPay},
    ])
    const [schedule, setSchedule] = useState([
        {key: 1, month_year: "9-2023", total: "", days: septemberSch},
        {key: 2, month_year: "10-2023", total: "", days: octoberSch},
        {key: 3, month_year: "11-2023", total: "", days: novemberSch},
    ])
    if(scheduleCountData !=null){
        return (
            <div className="MainPanel">
                <NewsPanel posts={news} tittle={"Новости"}/>
                <GreedPanel posts={payment} tittle={"Оплата"}/>
                <GreedPanel posts={scheduleCountData} tittle={"Расписание"}/>
            </div>
        );
    }else{
        return (
            <div className="MainPanel">
                <NewsPanel posts={news} tittle={"Новости"}/>
                <GreedPanel posts={payment} tittle={"Оплата"}/>
            </div>
        );
    }

};
//<GreedPanel posts={scheduleCountData} tittle={"Расписание"}/>
export default MainPanel;