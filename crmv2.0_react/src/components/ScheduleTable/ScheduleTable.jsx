import React, {useEffect, useState} from 'react';
import '../../styles/ScheduleTable/ScheduleTable.css';
import axios from "axios";
import moment from 'moment';

const ScheduleTable = () => {

    const [recordOptions, setRecordOptions] = useState([]);
    const authToken = localStorage.getItem("authToken");


    useEffect(() => {
        const fetchRecordOptions = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/schedule', {
                    headers: { Authorization: `Token ${authToken}` }
                });

                const recordOptions = response.data.map(record => {
                    const guestProfile = record.guest.profile;
                    const procedure = record.procedure;
                    return {
                        date: record.date,
                        startTime: record.timeStart,
                        finishTime: record.timeFinish,
                        name: (procedure ? procedure.shortname : '') +" "+ (guestProfile ? guestProfile.shortname : ''),
                    };
                });

                setRecordOptions(recordOptions);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecordOptions();


    }, []);


    const manicureProcedures = [
        { date: '17.04', startTime: '9:00', finishTime: '9:29', name: 'КМ Амоскина О.Ю.' },
        { date: '28.04', startTime: '10:00', finishTime: '11:59', name: 'КМ Амоскина О.Ю.' },
        { date: '19.04', startTime: '9:00', finishTime: '9:59', name: 'КМ Амоскина О.Ю.' },
        { date: '20.04', startTime: '9:00', finishTime: '9:59', name: 'КМ Амоскина О.Ю.' },
        { date: '20.04', startTime: '10:00', finishTime: '11:59', name: 'КМ Кнопкина О.Ю.' },
        // Добавлена новая запись
    ];

    // Создаем массив всех процедур
    //const allProcedures = manicureProcedures.flatMap(procedure => {
    const allProcedures = recordOptions.flatMap(procedure => {
        return {
            ...procedure,
            dateTime: new Date(`${procedure.date} ${procedure.startTime}`) // Создаем новое свойство dateTime, содержащее дату и время начала процедуры
        };
    });

    // Сортируем процедуры по времени начала
    const sortedProcedures = allProcedures.sort((a, b) => a.dateTime - b.dateTime);

    // Создаем объект, где ключами будут даты, а значениями массивы процедур для каждой даты
    const proceduresByDate = sortedProcedures.reduce((acc, procedure) => {
        if (!acc[procedure.date]) {
            acc[procedure.date] = [];
        }
        acc[procedure.date].push(procedure);
        return acc;
    }, {});

    // Создаем массив дат
    const dates = Object.keys(proceduresByDate);

    // Создаем массив с временными интервалами от 09:00 до 18:00
    const hours = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);

    return (
        <div className="schedule-table-container">
            <table className="schedule-table">
                <thead>
                <tr>
                    <th>Дата</th>
                    {/* Заголовки времени */}
                    {hours.map((hour, index) => (
                        <th key={index}>{hour}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {/* Заполнение таблицы данными */}


                {dates.map((date, dateIndex) => (
                    <tr key={dateIndex}>
                        <td>{date}</td>
                        {hours.map((hour, hourIndex) => {
                            console.log(hour)
                            const procedures = proceduresByDate[date];
                            const hourMoment = moment(hour, 'HH:mm:ss');
                            const procedureInHour = procedures && procedures.some(procedure => {
                                const startTimeMoment = moment(procedure.startTime, 'HH:mm:ss');
                                const finishTimeMoment = moment(procedure.finishTime, 'HH:mm:ss');
                                return hourMoment.isBetween(startTimeMoment, finishTimeMoment, null, '[]');
                            });
                            return (
                                <td key={hourIndex} className={procedureInHour ? 'busy' : ''}>
                                    {procedureInHour && procedures.map(procedure => {
                                        const startTimeMoment = moment(procedure.startTime, 'HH:mm:ss');
                                        const finishTimeMoment = moment(procedure.finishTime, 'HH:mm:ss');
                                        if (hourMoment.isBetween(startTimeMoment, finishTimeMoment, null, '[]')) {
                                            return <div key={procedure.name}>{procedure.name}</div>;
                                        }
                                        return null;
                                    })}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ScheduleTable;
