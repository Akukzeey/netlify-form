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

    const siteId = process.env.NEXT_PUBLIC_NETLIFY_SITE_ID;
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Flatten the formData object into a single-level structure
        const flattenedFormData = Object.keys(formData).reduce((acc, key) => {
            const nestedData = formData[key];
            Object.keys(nestedData).forEach(innerKey => {
                acc[`${key}.${innerKey}`] = nestedData[innerKey];
            });
            return acc;
        }, {});

        try {
            // Send a POST request to the Netlify form endpoint
            const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/submissions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(flattenedFormData).toString()
            });

            // Handle successful form submission
            if (response.ok) {
                console.log('Form successfully submitted');
                // Optionally redirect to a success page:
                // router.push('/success');
            } else {
                console.error('Form submission failed with status:', response.status);
                // Handle submission errors gracefully
                // (e.g., display an error message to the user)
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle network or other errors gracefully
            // (e.g., display an error message to the user)
        }
    };


    const handleNextStep = () => {
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
                {currentStep === 1 && (
                    <StudentInfo formData={formData.studentInfo} setFormData={setFormData} onNextStep={handleNextStep} />
                )}
                {currentStep === 2 && (
                    <ParentInfo parentFormData={formData.parentInfo} setFormData={setFormData} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} />
                )}
                {currentStep === 3 && (
                    <div>
                        Once you submit, you cannot change anything.
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                )}
            </form>
        </div>
    );
}



