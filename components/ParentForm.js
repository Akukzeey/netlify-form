import { useState } from 'react';

const ParentInfo = ({ onNextStep, onPreviousStep, parentFormData, setFormData }) => {

    const [formErrors, setFormErrors] = useState({
        parentFormData: {
            parent1FullName: false,
            parent1Relationship: false,
            parent1LevelOfEducation: false,
            parent1Info: false,
            parent1WorkingStatus: false,
            parent1WorkingHours: false,
            parent1Address: false,
            parent1CellPhone: false,
            parent1AptUnit: true,
            parent1City: false,
            parent1State: false,
            parent1ZipCode: false,
            parent1EmailAddress: false,

            parent2FullName: true,
            parent2Relationship: true,
            parent2LevelOfEducation: true,
            parent2Info: true,
            parent2WorkingStatus: true,
            parent2WorkingHours: true,
            parent2Address: true,
            parent2CellPhone: true,
            parent2AptUnit: true,
            parent2City: true,
            parent2State: true,
            parent2ZipCode: true,
            parent2EmailAddress: true,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            parentInfo: {
                ...prevData.parentInfo,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            parentFormData: {
                ...prevErrors.parentFormData,
                [name]: false,
            },
        }));
    };

    const validateForm = () => {
        const nonRequiredFields = [
            'parent1AptUnit',
            'parent2FullName',
            'parent2Relationship',
            'parent2LevelOfEducation',
            'parent2Info',
            'parent2WorkingStatus',
            'parent2WorkingHours',
            'parent2Address',
            'parent2CellPhone',
            'parent2AptUnit',
            'parent2City',
            'parent2State',
            'parent2ZipCode',
            'parent2EmailAddress',
        ];

        const errors = {};
        let isValid = true;
        for (const [key, value] of Object.entries(parentFormData)) {
            if (!nonRequiredFields.includes(key) && value.trim() === '') {
                errors[key] = true;
                isValid = false;
            } else {
                errors[key] = false;
            }
        }
        setFormErrors({ parentFormData: errors });
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            onNextStep();
        }
    };


    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Parent Information</h1>
            <div>
                <h2 className='info-header'>Parent/Guardian 1</h2>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Parent/Guardian Name <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1FullName ? 'is-invalid' : ''}`}
                            placeholder='Parent/Guardian Name'
                            type="text"
                            name="parent1FullName"
                            value={parentFormData.parent1FullName}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.parentFormData.parent1FullName && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Relationship <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1Relationship ? 'is-invalid' : ''}`}
                            placeholder='Relationship with student'
                            type="text"
                            name="parent1Relationship"
                            value={parentFormData.parent1Relationship}
                            onChange={handleChange}
                            required />
                        {formErrors.parentFormData.parent1Relationship && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Parent/Guardian Level of Education <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1LevelOfEducation? 'is-invalid' : ''}`}
                            placeholder='Education Level'
                            type="text"
                            name="parent1LevelOfEducation"
                            value={parentFormData.parent1LevelOfEducation}
                            onChange={handleChange}
                            required />
                        {formErrors.parentFormData.parent1LevelOfEducation && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            No of working hours per week <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1WorkingHours? 'is-invalid' : ''}`}
                            placeholder='Working Hours'
                            type="text"
                            name="parent1WorkingHours"
                            value={parentFormData.parent1WorkingHours}
                            onChange={handleChange}
                            required />
                        {formErrors.parentFormData.parent1WorkingHours && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-working'>
                        <div>
                            Working Status <span className='administration-required'>*</span>
                        </div>
                        <select className="form-control" name="parent1WorkingStatus" value={parentFormData.parent1WorkingStatus} onChange={handleChange} required>
                            <option value="working">Working</option>
                            <option value="Not Working">Not Working</option>
                        </select>
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Email Address <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1EmailAddress? 'is-invalid' : ''}`}
                            placeholder='Email Address'
                            type="email"
                            name="parent1EmailAddress"
                            value={parentFormData.parent1EmailAddress}
                            onChange={handleChange}
                            required />
                        {formErrors.parentFormData.parent1EmailAddress && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Cell Phone <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1CellPhone? 'is-invalid' : ''}`}
                            placeholder='Cell #'
                            type="tel"
                            name="parent1CellPhone"
                            value={parentFormData.parent1CellPhone}
                            onChange={handleChange} />
                        {formErrors.parentFormData.parent1CellPhone && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Street Address <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1Address? 'is-invalid' : ''}`}
                            placeholder='Address'
                            type="text"
                            name="parent1Address"
                            value={parentFormData.parent1Address}
                            onChange={handleChange}
                            required />
                        {formErrors.parentFormData.parent1Address && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        Apt/Unit
                        <input className='form-control' placeholder='Apt/Unit' type="text" name="parent1AptUnit" value={parentFormData.parent1AptUnit} onChange={handleChange} />
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            City <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1City? 'is-invalid' : ''}`}
                            placeholder='City'
                            type="text"
                            name="parent1City"
                            value={parentFormData.parent1City}
                            onChange={handleChange} />
                        {formErrors.parentFormData.parent1City && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            State <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1State? 'is-invalid' : ''}`}
                            placeholder='State'
                            type="text"
                            name="parent1State"
                            value={parentFormData.parent1State}
                            onChange={handleChange} required />
                        {formErrors.parentFormData.parent1State && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        <div>
                            Zip Code <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.parentFormData.parent1ZipCode ? 'is-invalid' : ''}`}
                            placeholder='Zip Code'
                            type="text"
                            name="parent1ZipCode"
                            value={parentFormData.parent1ZipCode}
                            onChange={handleChange} />
                        {formErrors.parentFormData.parent1ZipCode && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
            </div>
            <div style={{ marginTop: '50px' }}>
                <h2 className='info-header'>Parent/Guardian 2</h2>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Parent/Guardian Name
                        </div>
                        <input className="form-control" placeholder='Parent/Guardian Name' type="text" name="parent2FullName" value={parentFormData.parent2FullName} onChange={handleChange} />
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Relationship
                        </div>
                        <input className="form-control" placeholder='Relationship with student' type="text" name="parent2Relationship" value={parentFormData.parent2Relationship} onChange={handleChange} />
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Parent/Guardian Level of Education
                        </div>
                        <input className="form-control" placeholder='Education Level' type="text" name="parent2LevelOfEducation" value={parentFormData.parent2LevelOfEducation} onChange={handleChange} />
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            No of working hours per week
                        </div>
                        <input className="form-control" placeholder='Working Hours' type="text" name="parent2WorkingHours" value={parentFormData.parent2WorkingHours} onChange={handleChange} />
                    </label>
                    <label className='administraion-form-label administration-form-working'>
                        <div>
                            Working Status
                        </div>
                        <select className="form-control" name="parent2WorkingStatus" value={parentFormData.parent2WorkingStatus} onChange={handleChange}>
                            <option value="">Working</option>
                            <option value="Not Working">Not Working</option>
                        </select>
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Email Address
                        </div>
                        <input className="form-control" placeholder='Email Address' type="email" name="parent2EmailAddress" value={parentFormData.parent2EmailAddress} onChange={handleChange} />
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Cell Phone
                        </div>
                        <input className="form-control" placeholder='Cell #' type="tel" name="parent2CellPhone" value={parentFormData.parent2CellPhone} onChange={handleChange} />
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Street Address
                        </div>
                        <input className="form-control" placeholder='Address' type="text" name="parent2Address" value={parentFormData.parent2Address} onChange={handleChange} />
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        Apt/Unit
                        <input className="form-control" placeholder='Apt/Unit' type="text" name="parent2AptUnit" value={parentFormData.parent2AptUnit} onChange={handleChange} />
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            City
                        </div>
                        <input className="form-control" placeholder='City' type="text" name="parent2City" value={parentFormData.parent2City} onChange={handleChange} />
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            State
                        </div>
                        <input className="form-control" placeholder='State' type="text" name="parent2State" value={parentFormData.parent2State} onChange={handleChange} />
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        <div>
                            Zip Code
                        </div>
                        <input className="form-control" placeholder='Zip Code' type="text" name="parent2ZipCode" value={parentFormData.parent2ZipCode} onChange={handleChange} />
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

export default ParentInfo;



