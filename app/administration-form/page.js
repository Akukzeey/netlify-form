'use client'
import { useState } from 'react';
import StudentInfo from "@/components/StudentForm";
import ParentInfo from "@/components/ParentForm";

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
    });

    const [currentStep, setCurrentStep] = useState(1);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;

        const combinedFormData = {
            ...formData.studentInfo,
            ...formData.parentInfo
        };

        const flattenedFormData = {};
        Object.keys(combinedFormData).forEach(key => {
            if (Array.isArray(combinedFormData[key])) {
                flattenedFormData[key] = combinedFormData[key][0];
            } else {
                flattenedFormData[key] = combinedFormData[key];
            }
        });

        Object.keys(flattenedFormData).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = flattenedFormData[key];
            form.appendChild(input);
        });

        form.submit();
    };

    const handleNextStep  = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <div id='Administration-form' className='container'>
            <div className='administation-note-container'>
                <p className='administration-form-p-tag'>The following form must be completed before your application will be considered. Please complete each item carefully.</p>
            </div>
            <div className="step-indicator">
                Step {currentStep} of 4
            </div>
            <form name="administration-form" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={handleFormSubmit} action="/success" data-netlify-success="/success">
                <input type="hidden" name="form-name" value="administration-form" />
                <input type="hidden" name="bot-field" />
                <div className={currentStep !== 1 ? 'hidden' : ''}>
                    <StudentInfo formData={formData.studentInfo} setFormData={setFormData} onNextStep={handleNextStep} />
                </div>
                <div className={currentStep !== 2 ? 'hidden' : ''}>
                    <ParentInfo parentFormData={formData.parentInfo} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />
                </div>
                {currentStep === 3 && (
                    <div>
                        Once you submit, you cannot change anything.
                        <div className='d-flex justify-content-center'>
                            <input type="submit" className='btn sign-up-btn' value='Sign Up'/>
                        </div>
                    </div>
                )}
                <button onClick={()=>test()}>test</button>
            </form>
        </div>
    );
}




