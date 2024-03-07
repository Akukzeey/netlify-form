import { useState } from 'react';

const EmergencyContactInfo = ({onNextStep,onPreviousStep,emergencyFormData,setFormData,parentInfo}) => {

    const [formErrors, setFormErrors] = useState({
        emergencyFormData: {
            emergencyFullName: false,
            emergencyRelationship: false,
            emergencyAddress: false,
            emergencyCellPhone: false,
            emergencyAptUnit: false,
            emergencyCity: false,
            emergencyState: false,
            emergencyZipCode: false,
            emergencyEmailAddress: false,
        },
    });
    const [clickedNext, setClickedNext] = useState(false);
    const [emailSameAsParent, setEmailSameAsParent] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            emergencyInfo: {
                ...prevData.emergencyInfo,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            emergencyFormData: {
                ...prevErrors.emergencyFormData,
                [name]: false,
            },
        }));

        setEmailSameAsParent(false);
    };

    const validateForm = () => {
        const nonRequiredFields = ['emergencyAptUnit'];
        const errors = {};
        let isValid = true;

        if ((parentInfo.parent1EmailAddress === '' || parentInfo.parent2EmailAddress === '') && emergencyFormData.emergencyEmailAddress.trim() === '') {
            errors['emergencyEmailAddress'] = true;
            isValid = false;
        }

        for (const [key, value] of Object.entries(emergencyFormData)) {
            if (!nonRequiredFields.includes(key) && value.trim() === '') {
                errors[key] = true;
                isValid = false;
            } else {
                errors[key] = false;
            }
        }

        setFormErrors({ emergencyFormData: errors });
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (parentInfo.parent1EmailAddress === '' || parentInfo.parent2EmailAddress === '') {
            if (emergencyFormData.emergencyEmailAddress.trim() === '') {
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    emergencyFormData: {
                        ...prevErrors.emergencyFormData,
                        emergencyEmailAddress: true,
                    },
                }));
                return;
            }
        }

        if (emergencyFormData.emergencyEmailAddress === parentInfo.parent1EmailAddress || emergencyFormData.emergencyEmailAddress === parentInfo.parent2EmailAddress) {
            setEmailSameAsParent(true);
            setClickedNext(true);
            return;
        }

        const isFormValid = validateForm();
        if (isFormValid) {
            onNextStep();
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Emergency Contact Information</h1>
            <div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Emergency Contact Name <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyFullName ? 'is-invalid' : ''}`}
                            placeholder='Emergency Name'
                            type="text"
                            name="emergencyFullName"
                            value={emergencyFormData.emergencyFullName}
                            onChange={handleChange}/>
                        {formErrors.emergencyFormData.emergencyFullName && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Relationship <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyRelationship ? 'is-invalid' : ''}`}
                            placeholder='Relationship with student'
                            type="text" name="emergencyRelationship"
                            value={emergencyFormData.emergencyRelationship}
                            onChange={handleChange}/>
                        {formErrors.emergencyFormData.emergencyRelationship && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Email Address <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyEmailAddress ? 'is-invalid' : ''}`}
                            placeholder='Email Address'
                            type="email"
                            name="emergencyEmailAddress"
                            value={emergencyFormData.emergencyEmailAddress}
                            onChange={handleChange} />
                        {formErrors.emergencyFormData.emergencyEmailAddress && <div className="invalid-feedback">This field is required.</div>}
                        {emailSameAsParent && clickedNext && (<div style={{ color: 'red' }}>This email address cannot be the same as the parents email.</div>)}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Cell Phone <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyCellPhone ? 'is-invalid' : ''}`}
                            placeholder='Cell #'
                            type="tel"
                            name="emergencyCellPhone"
                            value={emergencyFormData.emergencyCellPhone}
                            onChange={handleChange} />
                        {formErrors.emergencyFormData.emergencyCellPhone && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Street Address <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyAddress ? 'is-invalid' : ''}`}
                            placeholder='Address'
                            type="text"
                            name="emergencyAddress"
                            value={emergencyFormData.emergencyAddress}
                            onChange={handleChange}/>
                        {formErrors.emergencyFormData.emergencyAddress && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        Apt/Unit
                        <input className="form-control" placeholder='Apt/Unit' type="text" name="emergencyAptUnit" value={emergencyFormData.emergencyAptUnit} onChange={handleChange} />
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            City <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyCity ? 'is-invalid' : ''}`}
                            placeholder='City'
                            type="text"
                            name="emergencyCity"
                            value={emergencyFormData.emergencyCity}
                            onChange={handleChange} />
                        {formErrors.emergencyFormData.emergencyCity && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            State <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyState ? 'is-invalid' : ''}`}
                            placeholder='State'
                            type="text"
                            name="emergencyState"
                            value={emergencyFormData.emergencyState}
                            onChange={handleChange} />
                        {formErrors.emergencyFormData.emergencyState && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        <div>
                            Zip Code <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.emergencyFormData.emergencyZipCode ? 'is-invalid' : ''}`}
                            placeholder='Zip Code'
                            type="text"
                            name="emergencyZipCode"
                            value={emergencyFormData.emergencyZipCode}
                            onChange={handleChange} />
                        {formErrors.emergencyFormData.emergencyZipCode && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
            </div>
            <div className='administration-form-btn-div'>
                <button type="button" className="btn btn-primary me-2" onClick={onPreviousStep}>Previous</button>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default EmergencyContactInfo;




