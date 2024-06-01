import React from 'react';
import "../../styles/Other/ComboBox.css"

class ComboBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ selectedValue: event.target.value });
    }

    render() {
        const { values } = this.props;

        return (
            <div className="comboBoxContainer">
                <select className="comboBoxSelect" value={this.state.selectedValue} onChange={this.handleChange}>
                    <option value="">Выберите значение</option>
                    {values.map((value, index) => (
                        <option key={index} value={value}>{value}</option>
                    ))}
                </select>
            </div>
        );
    }
}

export default ComboBox;