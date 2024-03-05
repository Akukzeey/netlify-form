import {useState} from "react";

const StudentForm = ({formData,setFormData,onNextStep}) => {
    const [formErrors, setFormErrors] = useState({
        formData: {
            firstName: false,
            middleName: false,
            lastName: false,
            emailAddress: false,
            age: false,
            dateOfBirth: false,
            homePhone: false,
            gender: false,
            address: false,
            aptUnit: true,
            city: false,
            state: false,
            zipCode: false,
            enrollmentType: false,
            currentlyEnrolled: false,
            gradeEntering: false
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            studentInfo: {
                ...prevData.studentInfo,
                [name]: type === 'checkbox' ? checked : value,
            }
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            formData: {
                ...prevErrors.formData,
                [name]: false,
            },
        }));
    };

    const validateForm = () => {
        const nonRequiredFields = ['aptUnit'];
        const errors = {};
        let isValid = true;
        for (const [key, value] of Object.entries(formData)) {
            if (!nonRequiredFields.includes(key) && value.trim() === '') {
                errors[key] = true;
                isValid = false;
            } else {
                errors[key] = false;
            }
        }
        setFormErrors({ formData: errors });
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
            <h1 style={{textAlign:'center',fontWeight:'bold',margin:'30px 0',fontSize:'2rem'}}>Student Information</h1>
            <div className='administration-input-div'>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        First Name <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.firstName ? 'is-invalid' : ''}`}
                        placeholder='First Name'
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required/>
                    {formErrors.formData.firstName && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-flex'>
                    <div className='mb-0'>
                        Middle Name <span className='administration-required'></span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.middleName ? 'is-invalid' : ''}`}
                        placeholder='Middle Name'
                        type="text" name="middleName"
                        value={formData.middleName}
                        onChange={handleChange}/>
                    {formErrors.formData.middleName && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        Last Name <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.lastName ? 'is-invalid' : ''}`}
                        placeholder='Last Name'
                        type="text" name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required />
                    {formErrors.formData.lastName && <div className="invalid-feedback">This field is required.</div>}
                </label>
            </div>
            <div className='administration-input-div'>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        Email Address <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.emailAddress ? 'is-invalid' : ''}`}
                        placeholder='Email Address'
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        required />
                    {formErrors.formData.emailAddress && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-working'>
                    <div>
                        Age <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.age ? 'is-invalid' : ''}`}
                        placeholder='Age'
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required/>
                    {formErrors.formData.age && <div className="invalid-feedback">This field is required.</div>}
                </label>
            </div>
            <div className='administration-input-div'>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        Date of Birth <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.dateOfBirth? 'is-invalid' : ''}`}
                        placeholder='Date of Birth'
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required/>
                    {formErrors.formData.age && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        Home Phone <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.homePhone? 'is-invalid' : ''}`}
                        placeholder='Home Phone'
                        type="tel" name="homePhone"
                        value={formData.homePhone}
                        onChange={handleChange} />
                    {formErrors.formData.homePhone && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <div className='d-flex align-items-center administration-form-margin-right administration-md-top'>
                    <div>
                        Gender <span className='administration-required'>*</span>
                    </div>
                    <div className="form-check">
                        <input
                            className={`form-check-input  ${formErrors.formData.gender? 'is-invalid' : ''}`}
                            type="radio"
                            name="gender"
                            id="maleRadio"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                            required/>
                        <label className="form-check-label" htmlFor="maleRadio">
                            Male
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className={`form-check-input  ${formErrors.formData.gender? 'is-invalid' : ''}`}
                            type="radio"
                            name="gender"
                            id="femaleRadio"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                            required/>
                        <label className="form-check-label" htmlFor="femaleRadio">
                            Female
                        </label>
                    </div>
                    {formErrors.formData.homePhone && <div className="invalid-feedback">This field is required.</div>}
                </div>
            </div>
            <div className='administration-input-div'>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        Address <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.address? 'is-invalid' : ''}`}
                        placeholder='Address'
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required/>
                    {formErrors.formData.address && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-margin-right'>
                    Apt/Unit
                    <input className="form-control"  placeholder='Apt/Unit'  type="text" name="aptUnit" value={formData.aptUnit} onChange={handleChange} />
                </label>
            </div>
            <div className='administration-input-div'>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        City <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.city? 'is-invalid' : ''}`}
                        placeholder='City'
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange} />
                    {formErrors.formData.city && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-flex'>
                    <div>
                        State <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.state? 'is-invalid' : ''}`}
                        placeholder='State'
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required/>
                    {formErrors.formData.state && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-margin-right'>
                    <div>
                        Zip Code <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.formData.zipCode? 'is-invalid' : ''}`}
                        placeholder='Zip Code'
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange} />
                    {formErrors.formData.zipCode && <div className="invalid-feedback">This field is required.</div>}
                </label>
            </div>
            <div className='administration-input-div'>
                <label  className={`d-flex me-3 administration-md-top ${formErrors.formData.enrollmentType? 'is-invalid' : ''}`} >
                    <div>
                        Enrollment Type <span className='administration-required'>*</span>
                    </div>
                    <select name="enrollmentType" value={formData.enrollmentType} onChange={handleChange} required>
                        <option value="">Select Enrollment Type</option>
                        <option value="Regular Education">Regular Education</option>
                    </select>
                    {formErrors.formData.enrollmentType && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <div className='d-flex align-items-baseline administration-md-top'>
                    <div>
                        Currently Enrolled at DarulArqam? <span className='administration-required'>*</span>
                    </div>
                    <div className="form-check">
                        <input
                            className={`form-check-input ${formErrors.formData.currentlyEnrolled? 'is-invalid' : ''}`}
                            type="radio"
                            name="currentlyEnrolled"
                            id="enrolledYes"
                            value="Yes"
                            checked={formData.currentlyEnrolled === 'Yes'}
                            onChange={handleChange}
                            required
                        />
                        <label className="form-check-label" htmlFor="enrolledYes">
                            Yes
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className={`form-check-input ${formErrors.formData.currentlyEnrolled? 'is-invalid' : ''}`}
                            type="radio"
                            name="currentlyEnrolled"
                            id="enrolledNo"
                            value="No"
                            checked={formData.currentlyEnrolled === 'No'}
                            onChange={handleChange}
                            required
                        />
                        <label className="form-check-label" htmlFor="enrolledNo">
                            No
                        </label>
                    </div>
                </div>
            </div>
            <ul className='administration-form-ul'>
                <li className='administration-form-li'>Please note that the child will be tested by Hifz teacher before enrolling in the program.</li>
                <li className='administration-form-li'>The parents will be responsible to make sure that the child is getting adequate secular education while the child memorizes the quran.</li>
            </ul>
            <label className='administraion-form-label administration-form-flex my-2'>
                <div className='d-flex'>
                    Grade Entering <span className='administration-required'>*</span>
                </div>
                <input
                    className={`form-control ${formErrors.formData.gradeEntering? 'is-invalid' : ''}`}
                    placeholder='Grade Entering'
                    type="text"
                    name="gradeEntering"
                    value={formData.gradeEntering}
                    onChange={handleChange}
                    required/>
                {formErrors.formData.gradeEntering && <div className="invalid-feedback">This field is required.</div>}
            </label>
            <div className='administration-form-btn-div'>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default StudentForm;


