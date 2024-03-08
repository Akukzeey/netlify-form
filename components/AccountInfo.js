import {useState} from "react";

export default function AccountInfo({accountFormData,onNextStep,onPreviousStep,setFormData}) {

    const [formErrors, setFormErrors] = useState({
        accountFormData: {
            accountHoldersFirstName: false,
            accountHoldersMiddleName: false,
            accountHoldersLastName: false,
            accountHoldersAddress: false,
            accountHoldersAptUnit: false,
            accountHoldersCity: false,
            accountHoldersState: false,
            accountHoldersZip: false,
            typeOfAccount:false,
            bankName: false,
            bankRouting:false,
            bankAccount:false,
            termsAndConditions:false,
            parentSignature:false,
        },
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            accountInfo: {
                ...prevData.accountInfo,
                [name]: type === 'checkbox' ? checked : value,
            },
        }));

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            accountFormData: {
                ...prevErrors.accountFormData,
                [name]: false,
            },
        }));
    };

    const validateForm = () => {
        const nonRequiredFields = [
            'accountHoldersMiddleName',
            'accountHoldersAptUnit'
        ];

        const errors = {};
        let isValid = true;
        for (const [key, value] of Object.entries(accountFormData)) {
            if (!nonRequiredFields.includes(key) && (typeof value === 'string') && value.trim() === '') {
                errors[key] = true;
                isValid = false;
            } else {
                errors[key] = false;
            }
        }

        setFormErrors({ accountFormData: errors });
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            onNextStep();
        }
    };

    return(
        <div>
            <div>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Tuition Fee Structure</h1>
                <ul>
                    <li className='account-li'>Tuition fee is $75 per month per child. It will be electronically debited on the 5th of each month.</li>
                    <li className='account-li'>One time books fee of $30 per child will be charged in the first month.</li>
                    <li className='account-li'>Please contact admission office if you would like to apply for tuition assistance(zakat).</li>
                </ul>
            </div>
            <hr style={{ borderTop: '3px solid black',margin:'40px 0' }} />
            <div>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '30px 0', fontSize: '2rem' }}>Tuition ACH Authorization Form</h1>
                <h2 className='info-header'>Account Holder&apos;s Information</h2>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            First Name <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.accountHoldersFirstName ? 'is-invalid' : ''}`}
                            placeholder='First Name'
                            type="text"
                            name="accountHoldersFirstName"
                            value={accountFormData.accountHoldersFirstName}
                            onChange={handleChange}
                            required/>
                        {formErrors.accountFormData.accountHoldersFirstName && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div className='mb-0'>
                            Middle Name <span className='administration-required'></span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.accountHoldersMiddleName ? 'is-invalid' : ''}`}
                            placeholder='Middle Name'
                            type="text" name="accountHoldersMiddleName"
                            value={accountFormData.accountHoldersMiddleName}
                            onChange={handleChange}/>
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Last Name <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.accountHoldersLastName ? 'is-invalid' : ''}`}
                            placeholder='Last Name'
                            type="text"
                            name="accountHoldersLastName"
                            value={accountFormData.accountHoldersLastName}
                            onChange={handleChange}
                            required />
                        {formErrors.accountFormData.accountHoldersLastName && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Address <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.accountHoldersAddress ? 'is-invalid' : ''}`}
                            placeholder='Address'
                            type="text"
                            name="accountHoldersAddress"
                            value={accountFormData.accountHoldersAddress}
                            onChange={handleChange}
                            required/>
                        {formErrors.accountFormData.accountHoldersAddress && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        Apt/Unit
                        <input className="form-control"  placeholder='Apt/Unit'  type="text" name="accountHoldersAptUnit" value={accountFormData.accountHoldersAptUnit} onChange={handleChange} />
                    </label>
                </div>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            City <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.accountHoldersCity ? 'is-invalid' : ''}`}
                            placeholder='City'
                            type="text"
                            name="accountHoldersCity"
                            value={accountFormData.accountHoldersCity}
                            onChange={handleChange} />
                        {formErrors.accountFormData.accountHoldersCity && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            State <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.accountHoldersState ? 'is-invalid' : ''}`}
                            placeholder='State'
                            type="text"
                            name="accountHoldersState"
                            value={accountFormData.accountHoldersState}
                            onChange={handleChange}
                            required/>
                        {formErrors.accountFormData.accountHoldersState && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-margin-right'>
                        <div>
                            Zip Code <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.accountHoldersZip ? 'is-invalid' : ''}`}
                            placeholder='Zip Code'
                            type="text"
                            name="accountHoldersZip"
                            value={accountFormData.accountHoldersZip}
                            onChange={handleChange} />
                        {formErrors.accountFormData.accountHoldersZip && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
                <h2 className='info-header mt-5'>Electronic Check Withdrawal Information</h2>
                <label  className={` me-3 administration-md-top ${formErrors.accountFormData.typeOfAccount ? 'is-invalid' : ''}`} style={{width:'100%'}} >
                    <div>
                        Type of Account <span className='administration-required'>*</span>
                    </div>
                    <select className='account-select' name="typeOfAccount" value={accountFormData.typeOfAccount} onChange={handleChange} required>
                        <option value="Checking">Checking</option>
                        <option value="Saving">Saving</option>
                        <option value="Credit Card">Credit Card</option>
                    </select>
                    {formErrors.accountFormData.typeOfAccount && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <label className='administraion-form-label administration-form-margin-right'>
                    <div>
                        Bank Name <span className='administration-required'>*</span>
                    </div>
                    <input
                        className={`form-control ${formErrors.accountFormData.bankName ? 'is-invalid' : ''}`}
                        type="text"
                        name="bankName"
                        value={accountFormData.bankName}
                        onChange={handleChange} />
                    {formErrors.accountFormData.bankName && <div className="invalid-feedback">This field is required.</div>}
                </label>
                <div className='administration-input-div'>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Bank Routing # <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.bankRouting ? 'is-invalid' : ''}`}
                            type="text"
                            name="bankRouting"
                            value={accountFormData.bankRouting}
                            onChange={handleChange} />
                        {formErrors.accountFormData.bankRouting && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                    <label className='administraion-form-label administration-form-flex'>
                        <div>
                            Bank Account # <span className='administration-required'>*</span>
                        </div>
                        <input
                            className={`form-control ${formErrors.accountFormData.bankAccount ? 'is-invalid' : ''}`}
                            placeholder='State'
                            type="text"
                            name="bankAccount"
                            value={accountFormData.bankAccount}
                            onChange={handleChange}
                            required/>
                        {formErrors.accountFormData.bankAccount && <div className="invalid-feedback">This field is required.</div>}
                    </label>
                </div>
            </div>
            <hr style={{ borderTop: '3px solid black',margin:'40px 0' }} />
            <div>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0', fontSize: '2rem' }}>Tuition Fee Structure</h1>
                <p  className='account-p-tag'>
                    I hereby authorize Dawah Academy to initiate debit entries to the checking/savings account indicated above at the Financial Institution named, in the amount of the payment due and to make the deduction payable to Dawah Academy. A record of each ACH transaction will be included in my regular bank statement and will serve as my receipt. I acknowledge that the origination of ACH transactions to my account must comply with the provisions of U. S. law. Any returned ACH payments will be charged a $25 service fee, which will be billed to you on your students’ monthly incidental billing.
                    This payment plan is to remain in effect until the payment plan ends or is cancelled by the participant in writing within at least five business days before the next scheduled withdrawal date. The participant may terminate the agreement at any time by submitting written notice to the Dawah Academy Center of Excellence Business Office. Termination from the agreement on the family’s part will not release the family of any financial obligation to the school. Questions or concerns regarding any of these terms and conditions should be directed to the Office at 612-758-0501.
                </p>
                <div className='administration-input-div'>
                    <div className="d-flex align-items-center">
                        <input
                            className={`account-checkbox ${formErrors.accountFormData.termsAndConditions ? 'is-invalid' : ''}`}
                            type="checkbox"
                            name="termsAndConditions"
                            checked={accountFormData.termsAndConditions}
                            onChange={handleChange}
                        />
                        <label className="ms-2">Agree to Terms & Conditions</label>
                        {formErrors.accountFormData.termsAndConditions && <div className="invalid-feedback">You must agree to the Terms & Conditions.</div>}
                    </div>
                </div>
            </div>
            <label className='administraion-form-label administration-form-flex mt-3'>
                <div>
                    Parent / Guardian Name <span className='administration-required'>*</span>
                </div>
                <input
                    className={`form-control form-consent-signature ${formErrors.accountFormData.parentSignature ? 'is-invalid' : ''}`}
                    placeholder=''
                    type="text"
                    name="parentSignature"
                    value={accountFormData.parentSignature}
                    onChange={handleChange}/>
            </label>
            {formErrors.accountFormData.parentSignature && <div className='invalid-feedback'>This field is required</div> }
            <div className='administration-form-btn-div mt-4'>
                <button type="button" className="btn btn-primary me-2" onClick={onPreviousStep}>Previous</button>
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    )
}