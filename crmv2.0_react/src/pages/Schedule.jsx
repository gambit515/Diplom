import React, {useState} from 'react';
import FiltersPanel from "../components/FiltersPanel/FiltersPanel";
import ScheduleTable from "../components/ScheduleTable/ScheduleTable";
import "../styles/Schedule/Schedule.css";

const Schedule = () => {

    const [scheduleTableKey, setScheduleTableKey] = useState(Date.now()); // состояние для ключа MainPanel

    const updateMainPanel = () => {
        setScheduleTableKey(Date.now()); // обновить ключ для MainPanel
    };


    return (
        <div className={"Column"}>
            <FiltersPanel/>
            <ScheduleTable key={scheduleTableKey}/>
        </div>

    );
};

export default Schedule;