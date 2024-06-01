import React, { useState } from 'react';
import axios from 'axios';
import './UniversalModalForm.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

const UniversalModalForm = ({ isOpen, onClose, fields, url, method, authToken,onSuccess }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (method === 'POST' || method === 'PUT') {
                await axios[method.toLowerCase()](url, formData, { headers: { Authorization: `Token ${authToken}` } });
                onSuccess;
            } else {
                console.error('Unsupported method:', method);
                return;
            }
            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                {fields.map(field => (
                    <div key={field.name}>
                        <label>{field.label}:</label>
                        {field.type === 'select' ? (
                            <select
                                name={field.name}
                                value={formData[field.name] || field.defaultValue}
                                onChange={handleChange}
                                required={field.required}
                            >
                                <option value="">{field.placeholder}</option>
                                {field.options.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] || field.defaultValue}
                                onChange={handleChange}
                                required={field.required}
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Сохранить</button>
            </form>
        </Modal>
    );
};

export default UniversalModalForm;