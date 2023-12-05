import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormComponent from '../components/Form';

const LandingPage = ({ handleSelectLanguage }) => {

  const [selectedLanguage, setSelectedLanguage] =  useState(null);
    const handleChange = (event) => {
        setSelectedLanguage(event.target.value);
    };
  return (
    <div>
      <div className='flex justify-around bg-blue-500 p-3 '>
        <h1>Select Your Language</h1>
        <select onChange={handleChange}>
          <option value="">Select a Language</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>
        {/* {selectedLanguage && <FormToPDF/>} */}
        {selectedLanguage && <FormComponent selectedLanguage={selectedLanguage}/>}
    </div>
  );
};

export default LandingPage;
