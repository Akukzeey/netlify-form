import React from 'react';

const Step2 = ({ formData, setFormData, prevStep, nextStep }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePrev = (e) => {
        e.preventDefault();
        prevStep();
    };

    const handleNext = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <form onSubmit={handleNext}>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <button onClick={handlePrev}>Previous</button>
            <button type="submit">Next</button>
        </form>
    );
};

export default Step2;
