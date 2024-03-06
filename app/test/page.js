'use client'
import { useState } from 'react';

const ParentInfo = () => {
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ 'phone-number': phoneNumber }).toString(),
            });
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Parent Information</h1>
            <form name="test" data-netlify="true" method='post' onSubmit={handleSubmit} data-netlify-honeypot='bot-field' action="">
                <div className='mb-lg-4 mb-md-3 mb-2'>
                    <label htmlFor="phone-number" className="form-label">Test</label>
                    <input type="tel" className="form-control" id="phone-number" name="phone-number" value={phoneNumber} onChange={handleChange} required />
                </div>
                <div className='d-flex justify-content-center'>
                    <input type="submit" className='btn sign-up-btn' value='Sign Up' />
                </div>
            </form>
        </div>
    );
};

export default ParentInfo;

