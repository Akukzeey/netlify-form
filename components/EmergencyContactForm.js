import React from 'react';

const Step3 = ({ formData, prevStep, handleSubmit }) => {
    return (
        <form name="administration-info" data-netlify="true" method='post' onSubmit={handleSubmit} data-netlify-honeypot='bot-field' action="/success" data-netlify-success="/success">
            <input type='hidden' name='form-name' value='administration-info'/>
            <div hidden>
                <input name='bot-field'/>
            </div>
            <h3>Confirm Details</h3>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <button type="button" onClick={prevStep}>Previous</button>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Step3;



