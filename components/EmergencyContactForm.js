import React from 'react';

const Step3 = ({ formData, prevStep, handleSubmit }) => {
    return (
        <form name="administration-info" data-netlify="true" method='post' onSubmit={handleSubmit} data-netlify-honeypot='bot-field' action="/success" data-netlify-success="/success">
            <input type='hidden' name='form-name' value='administration-info'/>
            <div hidden>
                <input name='bot-field'/>
            </div>
            <input type="text"/>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Step3;



