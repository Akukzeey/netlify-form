import React from 'react';

const Step3 = ({ emergencyData,setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the specific field in studentData
        setFormData(prevData => ({
            ...prevData,
            emergencyData: {
                ...prevData.emergencyData,
                [name]: {
                    ...prevData.emergencyData[name],
                    value: value
                }
            }
        }));
    };

    console.log(emergencyData)

    return (
        <div>
            STEP 3
            <input value={emergencyData.placeOfWork.value} type="text" name='placeOfWork' onChange={handleChange}/>
            <input value={emergencyData.city.value} type="text" name='city' onChange={handleChange}/>
        </div>
    );

};

export default Step3;




