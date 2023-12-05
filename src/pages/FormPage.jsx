import React from 'react'
import FormComponent from '../components/Form'

const FormPage = ({language}) => {
  return (
    <FormComponent selectedLanguage={language}/>
  )
}

export default FormPage