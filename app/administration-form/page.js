'use client'
import React, { useState } from 'react';
import Step1 from '../../components/StudentForm';
import Step2 from '../../components/ParentForm';
import Step3 from "@/components/EmergencyContactForm";

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Define initial form data
        firstName: '',
        lastName: '',
        email: '',
        // Add more fields as needed
    });

    const handleNext = (data) => {
        setFormData(prevData => ({
            ...prevData,
            ...data
        }));
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to Netlify
        fetch('https://netlifyform11.netlify.app/administration%20Info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
            .then(() => {
                console.log('Form data submitted to Netlify');
                // Handle success or navigation to another page
            })
            .catch(error => console.error('Error submitting form data:', error));
    };


    return (
        // <form name="administration Info" data-netlify="true" method='post' data-netlify-honeypot='bot-field' action="/success" data-netlify-success="/success">
        //     <input type='hidden' name='form-name' value='administration Info'/>
        //     <div hidden>
        //         <input name='bot-field'/>
        //     </div>
        //     {currentStep === 1 && (
        //         <Step1
        //             onSubmit={handleNext}
        //         />
        //     )}
        //     {currentStep === 2 && (
        //         <Step2
        //             prevStep={handlePrevious}
        //             onSubmit={handleNext}
        //         />
        //     )}
        // </form>
        <>
            <Step3/>
        </>
    );
};

export default MultiStepForm;
