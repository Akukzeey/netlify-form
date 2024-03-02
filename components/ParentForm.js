import  { useState } from 'react';

const Step2 = ({ onSubmit, prevStep }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
    });

    const [formErrors, setFormErrors] = useState({
        firstName: false,
        lastName: false,
        middleName:false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        for (const [key, value] of Object.entries(formData)) {
            if (value.trim() === '') {
                errors[key] = true;
            }
        }
        console.log('Errors:', errors); // Debugging
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        console.log('Form Valid:', isFormValid); // Debugging
        if (isFormValid) {
            onSubmit();
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const renderInput = (name, label, type = 'text', required = true) => (
        <label className='administraion-form-label administration-form-flex'>
            <div>
                {label} {required && <span className='administration-required'>*</span>}
            </div>
            <input
                className={`form-control ${formErrors[name] && 'is-invalid'}`}
                placeholder={label}
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required={required}
            />
            {formErrors[name] && <div className="invalid-feedback">This field is required.</div>}
        </label>
    );

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Student Information</h1>
            <div className='administration-input-div'>
                {renderInput('firstName', 'First Name')}
                {renderInput('middleName', 'Middle Name', 'text', false)}
                {renderInput('lastName', 'Last Name')}
            </div>
            <div className='administration-form-btn-div'>
                <button type="button" className="btn btn-success" onClick={handleSubmit}>Next</button>
            </div>
            <div className='administration-form-btn-div'>
                <button type="button" className="btn btn-success" onClick={prevStep}>Prev Step</button>
            </div>
        </div>
    );
};

export default Step2;
