import React, {useEffect, useState} from 'react';
import "../../styles/FiltersPanel/FiltersPanel.css";
import ComboBox from "../Other/ComboBox";
import UniversalModalForm from "../SchedulePanel/Modal/UniversalModalForm";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const FiltersPanel = ({updateTable}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filialOptions, setFilialOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [procedureOptions, setProcedureOptions] = useState([]);
    const authToken = localStorage.getItem("authToken");


    useEffect(() => {
        const fetchFilialOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/filial', { headers: { Authorization: `Token ${authToken}` } });
                setFilialOptions(response.data.map(filial => ({ value: filial.id, label: filial.name })));
            } catch (error) {
                console.error('Error fetching filials:', error);
            }
        };

        const fetchUserOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user', { headers: { Authorization: `Token ${authToken}` } });
                setUserOptions(response.data.map(user => ({ value: user.id, label: user.username })));
            } catch (error) {
                console.error('Error fetching filials:', error);
            }
        };

        const fetchProcedureOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/procedure', { headers: { Authorization: `Token ${authToken}` } });
                setProcedureOptions(response.data.map(procedure => ({ value: procedure.id, label: procedure.name })));
            } catch (error) {
                console.error('Error fetching filials:', error);
            }
        };

        fetchFilialOptions();
        fetchUserOptions();
        fetchProcedureOptions();

    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const fields = [
        { name: 'date', label: 'Дата', type: 'date', required: true, defaultValue: '2024-05-30' },
        { name: 'timeStart', label: 'Время начала', type: 'time', required: true, defaultValue: '09:00' },
        { name: 'timeFinish', label: 'Время окончания', type: 'time', required: true, defaultValue: '10:00' },
        {
            name: 'filial',
            label: 'Филиал',
            type: 'select',
            required: true,
            defaultValue: '',
            options: filialOptions,
            placeholder: 'Выберите филиал'
        },
        {
            name: 'master',
            label: 'Исполнитель',
            type: 'select',
            required: true,
            defaultValue: '',
            options: userOptions,
            placeholder: 'Выберите исполнителя'
        },
        {
            name: 'guest',
            label: 'Контрагент',
            type: 'select',
            required: true,
            defaultValue: '',
            options: userOptions,
            placeholder: 'Выберите контрагента'
        },
        {
            name: 'procedure',
            label: 'Услуга',
            type: 'select',
            required: true,
            defaultValue: '',
            options: procedureOptions,
            placeholder: 'Выберите услугу'
        }

    ];
    /*
    const fields = [
        { name: 'date', label: 'Date', type: 'date', required: true, defaultValue: '2024-05-30' },
        { name: 'timeStart', label: 'Start Time', type: 'time', required: true, defaultValue: '09:00' },
        { name: 'timeFinish', label: 'Finish Time', type: 'time', required: true, defaultValue: '10:00' },
        {
            name: 'filial',
            label: 'Filial',
            type: 'select',
            required: true,
            defaultValue: '',
            options: [
                { value: '1', label: 'Filial 1' },
                { value: '2', label: 'Filial 2' },
                { value: '3', label: 'Filial 3' }
            ],
            placeholder: 'Select Filial'
        }
    ];
     */
    const handleFormSuccess = () => {
        updateTable();
    };

    return (
        <div className={"filters"}>
            <label className={"mainLabel"}>Фильтры</label>
            <div className={"filtersBody"}>
                <button onClick={openModal}>Добавить запись</button>
                <UniversalModalForm
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    fields={fields}
                    url="http://localhost:8000/api/schedule/create"
                    method="POST"
                    authToken={authToken}
                    onSuccess={handleFormSuccess}
                />
                <div className={"column1"}>
                    <div className={"line"}>
                        <div className={"OptionBoxContainer"}>
                            <label>Филиал</label>
                            <ComboBox values={["КСРК04-Салон “Мария”", "КСРК03-Салон “Маргарита”"]}/>
                        </div>
                    </div>
                    <div className={"line"}>
                        <div className={"OptionBoxContainer"}>
                            <label>Период</label>
                            <div className={"DateBoxContainer"}>
                                <input type="date" />
                                до
                                <input type="date" />
                            </div>
                        </div>
                        <div className={"OptionBoxContainer"}>
                            <label>Время</label>
                            <div className={"DateBoxContainer"}>
                                <input type="time" />
                                до
                                <input type="time" />
                            </div>
                        </div>
                    </div>
                    <div className={"line"}>
                        <div className={"OptionBoxContainer"}>
                            <label>Сетка</label>
                            <ComboBox values={["1 час", "30 минут"]}/>
                        </div>
                    </div>
                    <div className={"line"}></div>
                </div>
                <div className={"column2"}>
                    <img
                        src="https://i.ytimg.com/vi/xLY9O-rTbLc/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFggZShTMA8=&rs=AOn4CLCkEjhsYEcXL9eXd2G5e3b1PkfNvg"/>
                </div>
            </div>
            <div className={"buttonsRow"}>
                <button className={"buttonSearch"}>Искать</button>
                <button className={"buttonSbros"}>Сбросить</button>
                <button className={"buttonxls"}>Экспорт в xls</button>
            </div>
        </div>
    );
};

export default FiltersPanel;