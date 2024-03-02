'use client'
import React, { useState } from 'react';
import Step1 from '../../components/StudentForm';
import Step2 from '../../components/ParentForm';

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
        <form name="administration Info" data-netlify="true" method='post' data-netlify-honeypot='bot-field' action="/success" data-netlify-success="/success">
            <input type='hidden' name='form-name' value='administration Info'/>
            <div hidden>
                <input name='bot-field'/>
            </div>
            {currentStep === 1 && (
                <Step1
                    onSubmit={handleNext}
                />
            )}
            {currentStep === 2 && (
                <Step2
                    prevStep={handlePrevious}
                    onSubmit={handleNext}
                />
            )}
            {currentStep === 3 && (
                <div>
                    <div className="mb-lg-4 mb-md-3 mb-2">
                        <label htmlFor="your-name" className="form-label">Your Name</label>
                        <input type="text" className="form-control" id="your-name" name='your-name' required/>
                    </div>
                    <button type="button" onClick={handlePrevious}>Previous</button>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                </div>
            )}
        </form>
    );
};

export default MultiStepForm;
