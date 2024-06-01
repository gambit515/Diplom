import React from 'react';
import "../../styles/MainWorkerSheet/Panel.css"
import "../../styles/MainWorkerSheet/BlocksTable.css"

function CountToColor(count){
    if(count<0){
        return "Blue"
    }
    else if(count==0){
        return "White"
    }
    else if(count<2){
        return "Green"
    }
    else if(count <4){
        return "Yellow"
    }
    else if(count <6){
        return "Orange"
    }
    else if(count <8){
        return "Red"
    }
}

const monthDictionary = {
    "1": "Январь",
    "2": "Февраль",
    "3": "Март",
    "4": "Апрель",
    "5": "Май",
    "6": "Июнь",
    "7": "Июль",
    "8": "Август",
    "9": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декабрь"
};

function getNameOfMonth(month_year) {
    const [month, year] = month_year.split('-');
    return monthDictionary[month];
}

function getNumberOfDaysInMonth(month_year) {
    const [month, year] = month_year.split('-');
    const daysInMonth = new Date(year, month, 0).getDate();
    return daysInMonth;
}

const GreedPanel = (props) => {
    return (
        <div className="Panel">
            <label>{props.tittle}</label>
            <div className="PanelFilling">
                {props.posts.map(month =>
                    <div className="Record" key={month.month_year}>
                        <div className="BlocksTable_Heading">
                            <label>
                                {getNameOfMonth(month.month_year)}
                            </label>
                            {month.total !== "" ? (
                                <label>
                                    Итого: {month.total}
                                </label>
                            ) : null}
                        </div>
                        <div className="BlocksTable_Filling">
                            {Array.from({ length: getNumberOfDaysInMonth(month.month_year) }, (_, i) => i + 1).map(day => {
                                const post = month.days.find(post => post.dateOfTheDay.split('-')[0] == day);
                                return (
                                    <a href={post ? post.link : '#'} className={post ? CountToColor(post.count) : ''} key={day}>
                                        {day}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GreedPanel;

/*
const GreedPanel = (props) => {
    return (
        <div className="Panel">
            <label>{props.tittle}</label>
            <div className="PanelFilling">
                {props.posts.map(month =>
                    <div className="Record">
                        <div className="BlocksTable_Heading">
                            <label>
                                {month.name}
                            </label>
                            {month.total !== "" ? (
                                <label>
                                    Итого: {month.total}
                                </label>
                            ) : null}
                        </div>
                        <div className="BlocksTable_Filling">
                            {month.date.map(post =>
                                <a href={post.link} className={post.color}>{post.date}</a>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};
 */