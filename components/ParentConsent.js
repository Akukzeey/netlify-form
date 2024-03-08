import {useState} from "react";

export default function ParentConsent({consentFormData,setFormData,onNextStep,onPreviousStep}) {

    const [formErrors, setFormErrors] = useState({
        consentFormData: {
            parentName: false,
            studentName: false,
            parentSignature:false,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            parentConsent: {
                ...prevData.parentConsent,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            consentFormData: {
                ...prevErrors.consentFormData,
                [name]: false,
            },
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            'parentName',
            'studentName',
            'parentSignature'
        ];

        const errors = {};
        let isValid = true;

        for (const [key, value] of Object.entries(consentFormData)) {
            if (requiredFields.includes(key) && value.trim() === '') {
                errors[key] = true;
                isValid = false;
            } else {
                errors[key] = false;
            }
        }

        setFormErrors({ consentFormData: errors });
        return isValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            onNextStep();
        }
    };

    return(
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Parent/Guardian Consent</h1>
            <div className='consent-div'>
                <p className='consent-p-tag'>I</p>
                <input
                    type='text'
                    className={`form-control form-consent ${formErrors.consentFormData.parentName ? 'is-invalid' : ''}`}
                    name='parentName'
                    value={consentFormData.parentName}
                    onChange={handleChange}
                />
                <p  className='consent-p-tag'>Parent / Guardian of</p>
                <input
                    type='text'
                    name="studentName"
                    className={`form-control form-consent ${formErrors.consentFormData.studentName ? 'is-invalid' : ''}`}
                    value={consentFormData.studentName}
                    onChange={handleChange}
                />
                <p className='consent-p-tag'>will abide by the following conditions for admission:</p>
            </div>
            <div>
                <p className='consent-p-tag' >1. All the information I have provided in the Dawah Academy Registration Form is true and correct to the best of my knowledge.</p>
                <p className='consent-p-tag' >2. I agree to pay tuition and other fee per payment by 5th of every month.</p>
                <p className='consent-p-tag' >3. I will be responsible for any damage caused to Dawah Academy property by my child and will compensate or replace the damage with an equal value and quality.</p>
                <p className='consent-p-tag' >4. I agree to follow and respect the Dawah Academy rules and regulations and explain them to my child who attends the  Dawah Academy. I understand that I am responsible for disciplining my child in case of violation of any  Dawah Academy rules, in conduct and/or academics. I understand that if any problem occurs, I will completely and fully accept the decision of  Dawah Academy Administration.</p>
                <p className='consent-p-tag' >5. I give  Dawah Academy Administration the authority to take necessary decisions to ensure my child safety and well-being when in their care. I give my child permission to participate in all activities deemed appropriate by Dawah Academy</p>
                <p className='consent-p-tag' >6. I understand my child will be taken on field trips with my written consent.</p>
                <p className='consent-p-tag' >7. I understand that the school will take any necessary action during an emergency.</p>
                <p className='consent-p-tag' >8. I indemnify Dawah Academy from any legal liability whatsoever.</p>
            </div>
            <label className='administraion-form-label administration-form-flex'>
                <div>
                    Parent / Guardian Name <span className='administration-required'>*</span>
                </div>
                <input
                    className={`form-control form-consent-signature ${formErrors.consentFormData.parentSignature ? 'is-invalid' : ''}`}
                    placeholder=''
                    type="text"
                    name="parentSignature"
                    value={consentFormData.parentSignature}
                    onChange={handleChange}/>
            </label>
            <div className='administration-form-btn-div'>
                <button type="button" className="btn btn-primary me-2" onClick={onPreviousStep}>Previous</button>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    )
}