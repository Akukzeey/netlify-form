'use client'
import { useState } from 'react';
import StudentInfo from "@/components/StudentForm";
import ParentInfo from "@/components/ParentForm";
import EmergencyInfo from "@/components/EmergencyContactForm";
import ParentConsent from "@/components/ParentConsent";
import AccountInfo from "@/components/AccountInfo";

export default function AdministrationForm() {
    const [formData, setFormData] = useState({
        studentInfo: {
            firstName: '',
            middleName: '',
            lastName: '',
            emailAddress: '',
            age: '',
            dateOfBirth: '',
            homePhone: '',
            gender: '',
            address: '',
            aptUnit: '',
            city: '',
            state: '',
            zipCode: '',
            enrollmentType: '',
            currentlyEnrolled: '',
            gradeEntering: ''
        },
        parentInfo: {
            parent1FullName: '',
            parent1Relationship: '',
            parent1LevelOfEducation: '',
            parent1WorkingStatus: 'working',
            parent1WorkingHours: '',
            parent1Address: '',
            parent1CellPhone: '',
            parent1AptUnit: '',
            parent1City: '',
            parent1State: '',
            parent1ZipCode: '',
            parent1EmailAddress: '',

            parent2FullName: '',
            parent2Relationship: '',
            parent2LevelOfEducation: '',
            parent2WorkingStatus: 'working',
            parent2WorkingHours: '',
            parent2Address: '',
            parent2CellPhone: '',
            parent2AptUnit: '',
            parent2City: '',
            parent2State: '',
            parent2ZipCode: '',
            parent2EmailAddress: '',
        },
        emergencyInfo: {
            emergencyFullName: '',
            emergencyRelationship: '',
            emergencyAddress: '',
            emergencyCellPhone: '',
            emergencyAptUnit: '',
            emergencyCity: '',
            emergencyState: '',
            emergencyZipCode: '',
            emergencyEmailAddress: '',
        },
        parentConsent: {
            parentName: '',
            studentName: '',
            parentSignature:'',
        },
        accountInfo: {
            accountHoldersFirstName: '',
            accountHoldersMiddleName: '',
            accountHoldersLastName: '',
            accountHoldersAddress: '',
            accountHoldersAptUnit: '',
            accountHoldersCity: '',
            accountHoldersState: '',
            accountHoldersZip: '',
            typeOfAccount:'',
            bankName: '',
            bankRouting:'',
            bankAccount:'',
            termsAndConditions:'',
            parentSignature:'',
        },
        disciplinePolicy: {
            disciplineTermsAndConditions: '',
            disciplineParentSignature:'',
        }
    });

    const [currentStep, setCurrentStep] = useState(1);

    const handleNextStep  = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const [formErrors, setFormErrors] = useState({
        disciplinePolicy: {
            disciplineTermsAndConditions: '',
            disciplineParentSignature:'',
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            disciplinePolicy: {
                ...prevData.disciplinePolicy,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            disciplinePolicy: {
                ...prevErrors.disciplinePolicy,
                [name]: false,
            },
        }));
    };

    const validateForm = () => {
        const requiredFields = [
            'disciplineTermsAndConditions',
            'disciplineParentSignature'
        ];

        const errors = {};
        let isValid = true;

        for (const [key, value] of Object.entries(formData.disciplinePolicy)) {
            if (requiredFields.includes(key) && typeof value === 'string' && value.trim() === '') {
                errors[key] = true;
                isValid = false;
            } else {
                errors[key] = false;
            }
        }

        setFormErrors({ disciplinePolicy: errors });
        return isValid;
    };



    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const combinedFormData = {
            ...formData.studentInfo,
            ...formData.parentInfo,
            ...formData.emergencyInfo,
            ...formData.parentConsent,
            ...formData.accountInfo,
        };

        const flattenedFormData = {};
        Object.keys(combinedFormData).forEach(key => {
            if (Array.isArray(combinedFormData[key])) {
                flattenedFormData[key] = combinedFormData[key][0];
            } else {
                flattenedFormData[key] = combinedFormData[key];
            }
        });

        const textArea = document.createElement('textarea');
        textArea.style.display = 'none';
        textArea.name = 'formData';
        textArea.value = JSON.stringify(flattenedFormData, null, 2);
        form.appendChild(textArea);

        const isFormValid = validateForm();
        if (isFormValid) {
            form.submit();
        }
    };

    return (
        <div id='Administration-form' className='container'>
            <div className='administation-note-container'>
                <p className='administration-form-p-tag'>The following form must be completed before your application will be considered. Please complete each item carefully.</p>
            </div>
            <div className="step-indicator">
                Step {currentStep} of 4
            </div>
            <form name="administration-form" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleFormSubmit}>
                <input type="hidden" name="form-name" value="administration-form" />
                <input type="hidden" name="bot-field" />
                <div className={currentStep !== 1 ? 'hidden' : ''}>
                    <StudentInfo formData={formData.studentInfo} setFormData={setFormData} onNextStep={handleNextStep} />
                </div>
                <div className={currentStep !== 2 ? 'hidden' : ''}>
                    <ParentInfo parentFormData={formData.parentInfo} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />
                </div>
                <div className={currentStep !== 3 ? 'hidden' : ''}>
                    <EmergencyInfo emergencyFormData={formData.emergencyInfo} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} parentInfo={formData.parentInfo}/>
                </div>
                <div className={currentStep !== 4 ? 'hidden' : ''}>
                    <ParentConsent consentFormData={formData.parentConsent} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep}/>
                </div>
                <div className={currentStep !== 5 ? 'hidden' : ''}>
                    <AccountInfo accountFormData={formData.accountInfo} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep}/>
                </div>
                {currentStep === 6 && (
                    <div>
                        <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Discipline Policy</h1>
                        <div>
                            <h2 className='info-header discipline-event'>Events</h2>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Behaviour</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Bring all the books needed for the class.</p>
                                    <p className='discipline-p-tag' >2. Remain silent in the classroom and no booing, name-calling, hissing, mocking and whistling at any time.</p>
                                    <p className='discipline-p-tag' >3. Should not curse each other or discuss inappropriate topics.</p>
                                    <p className='discipline-p-tag' >4. Should not draw graffiti on the benches or books.</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Punctuality</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Bring all the books needed for the class.</p>
                                    <p className='discipline-p-tag' >2. Remain silent in the classroom and no booing, name-calling, hissing, mocking and whistling at any time.</p>
                                    <p className='discipline-p-tag' >3. Should not curse each other or discuss inappropriate topics.</p>
                                    <p className='discipline-p-tag' >4. Should not draw graffiti on the benches or books.</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Disrespect to teachers</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Should not Interrupt the teacher by being silly or rude.</p>
                                    <p className='discipline-p-tag' >2. Should not talk during the class unless permitted.</p>
                                    <p className='discipline-p-tag' >3. Should not disturb the class in any manner.</p>
                                    <p className='discipline-p-tag' >4. Should follow all the instructions in a timely fashion.</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Toilet Use</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Students should use water to clean themselves.</p>
                                    <p className='discipline-p-tag' >2. Students should use water to clean themselves.</p>
                                    <p className='discipline-p-tag' >3. Please review the attached documents with detailed rules of using the washrooms and toilets.</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Cell Phone/ Electronic</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Electronic devices (phones/ipads/tabs/gaming consoles/music player) are strictly prohibited in the school.</p>
                                    <p className='discipline-p-tag' >2. If mistakenly brought, the student should immediately hand it over to any staff member in the office.</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Hair/ Clothes</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Hair should be kept clean and tidy at all times.</p>
                                    <p className='discipline-p-tag' >2. Hair should not be too long and should be off the face at all times.</p>
                                    <p className='discipline-p-tag' >3. The styles of the hair not allowed are (including but not limited to ) fades, high fades, mohawks, partial head shaved style and patterns, hair tied up and braided (for boys ).</p>
                                    <p className='discipline-p-tag' >4. Girls may not wear any makeup including but not limited to lipstick, nail polish, fake nails, highlights, high heels, jewelry including bracelets, anklets, lockets, eye shades, fake lashes, etc.</p>
                                    <p className='discipline-p-tag' >5. The full school uniform must be worn at all times.</p>
                                    <p className='discipline-p-tag' >6. Please see detailed dress code for boys and girls in registration packet. (In exceptional circumstances parents should talk with the administration)</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>The loss to school Property</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Students will be held liable for any damage including but not limited to</p>
                                    <p className='discipline-p-tag' >2. Anything in the game room, any game boards or tables.</p>
                                    <p className='discipline-p-tag' >3. Any car in the parking lot/ any other property.</p>
                                    <p className='discipline-p-tag' >4. Any personal use items belonging to other students (Pen, bottles, etc).</p>
                                    <p className='discipline-p-tag' >5. Windows (Pulled off curtain, ruined it, etc).</p>
                                    <p className='discipline-p-tag' >6. Walls/ furniture (writing, scratching, drawing graffiti, gluing stickers and splashing Ink, etc).</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Getting physical</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Students must not touch each other at any time and maintain a safe distance and give others their personal space.</p>
                                    <p className='discipline-p-tag' >2. It is strictly prohibited to touch anyone even in play including tapping, play fight, etc.</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Sexual touching</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. If the allegation of sexual touching regarding a student is proven to be true and legitimate then the student will be expelled from the school on the first proven allegation.</p>
                                </div>
                            </div>
                            <div className='discipline-div'>
                                <h2 className='info-header'>Tardiness</h2>
                                <div>
                                    <p className='discipline-p-tag' >1. Any student coming to school late than 8 15 am will be documented to be tardy for that school day</p>
                                    <p className='discipline-p-tag' >2. 3 tardies will be counted as one absent</p>
                                    <p className='discipline-p-tag' >3. There will be a fine of $50 for 5 tardies in a month</p>
                                </div>
                            </div>
                            <div className='administration-input-div'>
                                <div className="d-flex align-items-center">
                                    <input
                                        className={`account-checkbox ${formErrors.disciplinePolicy.disciplineTermsAndConditions ? 'is-invalid' : ''}`}
                                        type="checkbox"
                                        name="disciplineTermsAndConditions"
                                        checked={formData.disciplinePolicy.disciplineTermsAndConditions}
                                        onChange={handleChange}
                                    />
                                    <label className="ms-2">Agree to Terms & Conditions</label>
                                    {formErrors.disciplinePolicy.disciplineTermsAndConditions&& <div className="invalid-feedback">You must agree to the Terms & Conditions.</div>}
                                </div>
                            </div>
                        </div>
                        <label className='administraion-form-label mt-3 administration-form-flex'>
                            <div>
                                Parent / Guardian Name <span className='administration-required'>*</span>
                            </div>
                            <input
                                className={`form-control form-consent-signature ${formErrors.disciplinePolicy.disciplineParentSignature ? 'is-invalid' : ''}`}
                                placeholder=''
                                type="text"
                                name="disciplineParentSignature"
                                value={formData.disciplinePolicy.disciplineParentSignature}
                                onChange={handleChange}/>
                            {formErrors.disciplinePolicy.disciplineParentSignature && <div className='invalid-feedback'>This field is required</div> }
                        </label>
                        <input type="submit" className="btn btn-success my-3" value='Sign Up'/>
                    </div>
                )}
            </form>
        </div>
    );
}



