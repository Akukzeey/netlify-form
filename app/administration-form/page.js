'use client'
import React, { useState } from 'react';
import Step1 from '../../components/StudentForm';
import Step2 from '../../components/ParentForm';
import Step3 from '../../components/EmergencyContactForm';

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const mergedFormData = {
            ...formData,
        };
        console.log(mergedFormData);
    };

    return (
        <div>
            {/*{step === 1 && (*/}
            {/*    <Step1*/}
            {/*        formData={formData}*/}
            {/*        setFormData={setFormData}*/}
            {/*        nextStep={nextStep}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{step === 2 && (*/}
            {/*    <Step2*/}
            {/*        formData={formData}*/}
            {/*        setFormData={setFormData}*/}
            {/*        prevStep={prevStep}*/}
            {/*        nextStep={nextStep}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{step === 3 && (*/}
            {/*    <Step3*/}
            {/*        formData={formData}*/}
            {/*        handleSubmit={handleSubmit}*/}
            {/*    />*/}
            {/*)}*/}
            <form name="administration-info" data-netlify="true" method='post' onSubmit={handleSubmit} data-netlify-honeypot='bot-field' action="/success" data-netlify-success="/success">
                <input type='hidden' name='form-name' value='administration-info'/>
                <div hidden>
                    <input name='bot-field'/>
                </div>
                <input type="text"/>

                {/*<h3>Confirm Details</h3>*/}
                {/*<p>Name: {formData.name}</p>*/}
                {/*<p>Email: {formData.email}</p>*/}
                {/*<button type="button" onClick={prevStep}>Previous</button>*/}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default MultiStepForm;