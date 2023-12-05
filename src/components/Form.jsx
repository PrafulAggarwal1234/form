import React,{useState} from "react";
import { PDFDownloadLink, Document, Page, Text, View,Font,StyleSheet,Image } from '@react-pdf/renderer';

import logoImage from './../images/logo.png'; 

import notoSansDevanagariFont from './../fonts/NotoSansDevanagari_Condensed-Regular.ttf'; // Replace with your font path

// Register the font
Font.register({
  family: 'Noto Sans Devanagari',
  src: notoSansDevanagariFont,
});

// Styles with updated font family
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Noto Sans Devanagari',
    padding: 10,
  },
  // Add other styles if needed
});
// Reference font


const FormComponent = ({selectedLanguage}) =>{
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData]=useState({
        name: '',
        email: '',
        address: '',
        mobile: '',
        age: '',
        education: ''
    })
    const languageLabels = {
        english: {
            nameLabel: 'Name:',
            emailLabel: 'Email:',
            addressLabel: 'Address:',
            mobileLabel: 'Mobile Number:',
            ageLabel: 'Age:',
            educationLabel: 'Education:',
            submitButton: 'Submit Form',
          },
          hindi: {
            nameLabel: 'नाम:',
            emailLabel: 'ईमेल:',
            addressLabel: 'पता:',
            mobileLabel: 'मोबाइल नंबर:',
            ageLabel: 'उम्र:',
            educationLabel: 'शिक्षा:',
            submitButton: 'फॉर्म जमा करें',
          },
    }; 
    const handleInputChange = (e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value});
    }
    const generatePDF = (labels) => {
        console.log('lane: ',labels)
        // Create PDF document using @react-pdf/renderer
        const MyDocument = () => (
          <Document>
            <Page>
              <View style={{ padding: 20 }}>
              <Image src='data:image/jpeg;base64,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' style={{ width: 100, height: 80 }} />
              <Text style={styles.title}>{labels.nameLabel} {formData.name}</Text>
            <Text style={styles.title}>{labels.emailLabel} {formData.email}</Text>
            <Text style={styles.title}>{labels.addressLabel} {formData.address}</Text>
            <Text style={styles.title}>{labels.mobileLabel} {formData.mobile}</Text>
            <Text style={styles.title}>{labels.ageLabel} {formData.age}</Text>
            <Text style={styles.title}>{labels.educationLabel} {formData.education}</Text>
            <Text style={{padding:20}}>Thankyou For Registration!</Text>
                {/* Add other form fields */}
              </View>
            </Page>
          </Document>
        );
        return <MyDocument />;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Display success message
        setSuccessMessage('Form submitted successfully!');
      };
    
      const { nameLabel, emailLabel, addressLabel, mobileLabel, ageLabel, educationLabel, submitButton } = languageLabels[selectedLanguage];
    return(
        <div className="container mx-auto p-4 h-screen">
            <img src={logoImage} alt="Logo" className="w-24 h-24 mb-4" />
            <form className="flex flex-col items-center justify-center" onSubmit={handleFormSubmit}> 
            <label className="mb-4">
          <span className="block mb-1 font-medium">{nameLabel}</span>
          <input
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="mb-4">
          <span className="block mb-1 font-medium">{emailLabel}</span>
          <input
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="mb-4">
          <span className="block mb-1 font-medium">{addressLabel}</span>
          <input
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="mb-4">
          <span className="block mb-1 font-medium">{mobileLabel}</span>
          <input
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="mb-4">
          <span className="block mb-1 font-medium">{ageLabel}</span>
          <input
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            type="text"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className="mb-4">
          <span className="block mb-1 font-medium">{educationLabel}</span>
          <input
            className="border rounded-md px-3 py-2 w-64 focus:outline-none focus:border-blue-500"
            type="text"
            name="education"
            value={formData.education}
            onChange={handleInputChange}
            required
            />
        </label>
                <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{submitButton}</button>
            </form>
            {/* Display success message */}
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}
      {/* Download link for the generated PDF */}
      {successMessage && (
        <PDFDownloadLink
          document={generatePDF(languageLabels['english'])}
          fileName={`form.pdf`} // Define your custom filename here
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {({ loading }) =>
            loading ? 'Generating PDF...' : 'Download PDF'
          }
        </PDFDownloadLink>
      )}
      {successMessage && selectedLanguage!=='english' && (
        <PDFDownloadLink
          document={generatePDF(languageLabels[selectedLanguage])}
          fileName={`form.pdf`} // Define your custom filename here
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {({ loading }) =>
            loading ? 'Generating PDF...' : `Download ${selectedLanguage} PDF`
          }
        </PDFDownloadLink>
      )}
        </div>
    )
}

export default FormComponent;