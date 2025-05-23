import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileUpload from './FileUpload';
import StarRating from './StarRating'; 

const ServiceProviderForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); 
  
  // State for file previews
  const [filePreviews, setFilePreviews] = useState({
    profile_photo: '',
    iqama_photo: '',
    pass_port_file: '',
    visa_file: '',
    a_file: '',
    medical_insurance_file: ''
  });

  // State to trigger resets
  const [resetTriggers, setResetTriggers] = useState({
    profile_photo: 0,
    iqama_photo: 0,
    pass_port_file: 0,
    visa_file: 0,
    a_file: 0,
    medical_insurance_file: 0
  });

  const [formData, setFormData] = useState({
    // Account Details
    name: '',
    empId:'',
    nationality: '',
    date_of_birth: '',
    disconnection_date: '',
    religion: '',
    joining_date: '',
    mobile_number: '',
    profile_photo: '',
    notes:'',
    
    // Benefits
    bank_name: '',
    iban: '',
    basic_salary: '',
    
    // Legal Details
    logs_id: '',
    iqama_expiry_date: '',
    select_one:'',
    iqama_photo:'',
    passport_number:'',
    passport_expiry_date:'',
    pass_port_file:'',
    visa_file:'',
    a_date:'',
    a_file:'',
    medical_insurance_file:'',
    medical_insurance_expiry_date:'',

    // Vendor Details
    vendor_name: '',
    vendor_rate: '',
    
    // Client Details
    client_name: '',
    location:'',
    client_status: '',
    accommodation:'',
    start_date: '',
    stop_date:'',
    
    // Employee Review
    english_language_rating: 0,
    hindi_language_rating: 0,
    arabic_language_rating:0,
    presentable_language_rating: 0,
    skills: '',
    misconduct_report:'',
    beard:'',
  });

   const religionOptions = [
    { value: '', label: 'Select Religion' },
    { value: 'Islam', label: 'Islam' },
    { value: 'Christianity', label: 'Christianity' },
    { value: 'Hinduism', label: 'Hinduism' },
    { value: 'Buddhism', label: 'Buddhism' },
    { value: 'Other', label: 'Other' }
  ];

  const banNameOptions = [
    { value: '', label: 'Select Bank Name' },
    { value: 'STC Bank', label: 'STC Bank' },
    { value: 'barq', label: 'Barq' },
  ];
  
  const venderOptions = [
    { value: '', label: 'Select Vender' },
    { value: 'ABD', label: 'ABD' },
    { value: 'BCD', label: 'BCD' },
  ];
  
  const Options = [
    { value: '', label: ' ' },
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
  ];



  const steps = [
    {
      title: 'Account Details',
      fields: [
        [
          {
            type: 'hadi-top',
            text: 'Account Details',
            fullWidth: true 
          },
        ],
        [
          { name: 'name', label: 'Name*', type: 'text', required: true },
          { name: 'emp_id', label: 'EmpId', type: 'text' },
        ],
        [
          { name: 'date_of_birth', label: 'Date of Birth', type: 'date', placeholder: '1997 Q1 Q1' },
          { name: 'joining_date', label: 'Joining date', type: 'date' },
        ],
        [
          { name: 'nationality', label: 'Nationality', type: 'text' },  
          { name: 'religion', label: 'Religion', type: 'select', options: religionOptions },
        ],
        [ 
          { name: 'disconnection_date', label: 'Disconnection Date', type: 'date', placeholder: 'YYYYMMDD' },
          { name: 'mobile_number', label: 'Mobile Number', type: 'tel'},
        ],
        [
          { name: 'profile_photo', label: 'Profile Photo', type: 'file', fullWidth: true }
        ],
        [
          { name: 'notes', label: 'Notes', type: 'textarea', fullWidth: true}
        ]
      ]
    },
    {
      title: 'Benefits',
      fields: [
        [
          {
            type: 'hadi-top',
            text: 'Benefits',
            fullWidth: true 
          },
        ],
        [
          { name: 'bank_name', label: 'Bank Name', type: 'select', options: banNameOptions },
          { name: 'iban', label: 'IBAN', type: 'text' }
        ],
        [
          { name: 'basic_salary', label: 'Basic Salary', type: 'number', fullWidth: true }
        ]
      ]
    },
    {
      title: 'Legal Details',
      fields: [
        [
          {
            type: 'hadi-top',
            text: 'Legal Details',
            fullWidth: true 
          },
        ],
        [
          { name: 'logs_id', label: 'logs ID', type: 'text' },
          { name: 'iqama_expiry_date', label: 'Iqama Expiry Date', type: 'date'},
        ],
        [ 
          { name: 'select_one', label: 'Select One', type: 'select', options: Options },
          { name: 'iqama_photo', label: 'Iqama Photo', type: 'file'}
        ],
        [
          { name: 'passport_number', label: 'Passport Number', type: 'text'},
          { name: 'passport_expiry_date', label: 'Passport Expiry Date', type: 'date'},
        ],
        [ 
          { name: 'pass_port_file', label: 'PassPort File', type: 'file'},
          { name: 'visa_file', label: 'Visa Fie', type: 'file'}
        ],
        [ 
          { name: 'a_date', label: 'A Date', type: 'date'},
          { name: 'a_file', label: 'A File', type: 'file'}
        ],
        [
          { name: 'medical_insurance_expiry_date', label: 'Medical Insurance Expiry Date', type: 'date'},
        ],
        [
          { name: 'medical_insurance_file', label: 'medical insurance', type: 'file', fullWidth: true }
        ]
      ]
    },
    {
      title: 'Vendor Details',
      fields: [
        [
          {
            type: 'hadi-top',
            text: 'Vendor Details',
            fullWidth: true 
          },
        ],
        [
          { name: 'vendor_name', label: 'Vendor Name', type:'select', options: venderOptions },
          { name: 'vendor_rate', label: 'Vendor Rate', type: 'number' }
        ]
      ]
    },
    {
      title: 'Client Details',
      fields: [
        [
          {
            type: 'hadi-top',
            text: 'Client Details',
            fullWidth: true 
          },
        ],
        [
          { name: 'client_name', label: 'Client Name', type: 'text' },
          { name: 'location', label: 'location', type:'select', options: Options }
        ],
        [
          { name: 'client_status', label: 'Status', type:'select', options: Options },
          { name: 'accommodation', label: 'Accommodation', type:'select', options: Options }
        ],
        [
          { name: 'start_date', label: 'Start Date', type: 'date' },
          { name: 'stop_date', label: 'Stop Date', type: 'date' }
        ]
      ]
    },
    {
      title: 'Employee Review',
      fields: [
        [
          {
            type: 'hadi-top',
            text: 'Employee Review',
            fullWidth: true 
          },
        ],
        [
          { 
            name: 'english_language_rating', 
            label: 'English Language', 
            type: 'star-rating',
          },
          { 
            name: 'arabic_language_rating', 
            label: 'Arabic Language', 
            type: 'star-rating',
          }
        ],
        [
          { 
            name: 'hindi_language_rating', 
            label: 'Hindi Language', 
            type: 'star-rating',
          },
          { 
            name: 'presentable_language_rating', 
            label: 'Presentable Language', 
            type: 'star-rating',
          }
        ],
        [
          { 
            name: 'beard', 
            label: 'Beard?', 
            type: 'radio',
            options: [
              { value: true, label: 'Yes' },
              { value: false, label: 'No' }
            ],
          },
          { name: 'skills', label: 'Skills', type:'select', options: Options },
        ],
        [
          { name: 'misconduct_report', label: 'Misconduct Report', type: 'textarea', placeholder:'Misconduct Report' },
        ]
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleFileUpload = (file, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => ({
          ...prev,
          [fieldName]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    } else if (!file) {
      setFilePreviews(prev => ({
        ...prev,
        [fieldName]: ''
      }));
      setResetTriggers(prev => ({
        ...prev,
        [fieldName]: prev[fieldName] + 1
      }));
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    
    try {
      await axios.post('http://localhost:8000/api/service-providers', data);
      navigate('/');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const renderField = (field) => {
    switch(field.type) {
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder || ''}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          />
        );  
      case 'hadi-top':
        return (
          <div className="w-full mb-4 pb-2 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700">{field.text}</h2>
          </div>
        );
      case 'star-rating':
        return (
          <div className="star-rating-field">
            <StarRating 
              rating={formData[field.name] || 0}
              setRating={(value) => setFormData({...formData, [field.name]: value})}
            />
          </div>
        );
      case 'radio':
        return (
          <div className="radio-group">
            <div className="flex space-x-4">
              {field.options.map(option => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={() => setFormData({...formData, [field.name]: option.value})}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        );  
      case 'file':
        return (
          <FileUpload 
            name={field.name}
            onFileChange={handleFileUpload}
            accept={field.accept}
            initialPreview={filePreviews[field.name]}
            resetTrigger={resetTriggers[field.name]}
          />
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            placeholder={field.placeholder || ''}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          />
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Service Provider Registration</h1>
        <div className="flex justify-between items-center">
          {steps.map((stepItem, index) => (
            <div 
              key={index} 
              className={`pb-2 px-4 cursor-pointer ${step === index + 1 ? 'border-b-2 border-blue-500 font-medium text-blue-600' : 'text-gray-500'}`}
              onClick={() => setStep(index + 1)}
            >
              {stepItem.title}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          {steps[step - 1].fields.map((row, rowIndex) => (
            <div 
              key={rowIndex} 
              className={`mb-4 ${row.some(f => f.fullWidth) ? 'w-full' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}
            >
              {row.map((field) => (
                <div 
                  key={field.name || field.text} 
                  className={`space-y-1 ${field.fullWidth ? 'col-span-2' : ''}`}
                >
                  {field.label && (
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                  )}
                  {renderField(field)}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep} 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Previous
            </button>
          )}
          
          {step < steps.length ? (
            <button 
              type="button" 
              onClick={nextStep} 
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button 
              type="submit" 
              className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ServiceProviderForm;