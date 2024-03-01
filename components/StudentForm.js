// Page1.js
import React from 'react';

const Step1 = ({ formData, setFormData, nextStep }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleNext}>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Next</button>
        </form>
    );
};

export default Step1;


