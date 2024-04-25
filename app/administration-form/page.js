'use client'
import { useState, useEffect } from 'react';

export default function RegisterComponent() {
    const [submissions, setSubmissions] = useState([]);
    const [emailExists, setEmailExists] = useState(false);
    const [email, setEmail] = useState('');

    const siteId = process.env.NEXT_PUBLIC_NETLIFY_SITE_ID;
    const accessToken = process.env.NEXT_PUBLIC_NETLIFY_ACCESS_TOKEN;

    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/submissions`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSubmissions(data);
                } else {
                    console.error('Failed to fetch form submissions:', response.status);
                }
            } catch (error) {
                console.error('Error fetching form submissions:', error);
            }
        }
        fetchSubmissions();
    }, [siteId, accessToken]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailExists = submissions.some(submission => submission.data['user-email'] === email);
        setEmailExists(emailExists);

        if (!emailExists) {
            e.target.submit();

            localStorage.setItem('formSubmitted', 'true');
        } else {
            // Email already exists, do not submit the form
            console.log('Email already exists');
        }
    }

    return (
        <div id='Register'>
            <div className='sign-up-container'>
                <div className='d-flex align-items-center flex-column mb-lg-4 mb-md-3'>
                    <h1 className='sign-up-header'>Create an Account</h1>
                </div>
                <form name="administration" data-netlify="true" method='post' onSubmit={handleSubmit} data-netlify-honeypot='bot-field' action="/success" data-netlify-success="/success">
                    <input type='hidden' name='form-name' value='administration'/>
                    <div hidden>
                        <input name='bot-field'/>
                    </div>
                    <div className="mb-lg-4 mb-md-3 mb-2">
                        <label htmlFor="your-name" className="form-label">Your Name</label>
                        <input type="text" className="form-control" id="your-name" name='your-name' required/>
                    </div>
                    <div className="mb-lg-4 mb-md-3 mb-2">
                        <label htmlFor="email" className="form-label">Your Email</label>
                        <input type="email" className="form-control" id="email" name='user-email' value={email} onChange={handleEmailChange} required/>
                        {emailExists && <p style={{ color: 'red' }}>This email already exists. Please use a different email.</p>}
                    </div>
                    <div className='mb-lg-4 mb-md-3 mb-2'>
                        <label htmlFor="phone-number" className="form-label">Number</label>
                        <input type="tel" className="form-control" id="phone-number" name="phone-number" required/>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <input type="submit" className='btn sign-up-btn' value='Sign Up'/>
                    </div>
                </form>
            </div>
        </div>
    );
}



