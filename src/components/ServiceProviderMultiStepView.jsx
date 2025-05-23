import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, ChevronLeft, ChevronRight, X } from 'lucide-react';

const ServiceProviderView = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('Service Provider ID:', id);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [fileNames, setFileNames] = useState({});

    useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/get-data/${id}`);
        console.log('Full employee data:',response.data); // Debug full data
        
        
        setFormData(response.data);

        const baseUrl = 'http://localhost:8000/storage/'; // Adjust to your actual storage path

        const files = {};
      if (response.data.profile_photo) files.profile_photo = baseUrl + response.data.profile_photo;
        if (response.data.iqama_photo) files.iqama_photo =baseUrl + response.data.iqama_photo;
        if (response.data.pass_port_file) files.pass_port_file =baseUrl + response.data.pass_port_file;
        if (response.data.visa_file) files.visa_file =baseUrl + response.data.visa_file;
        if (response.data.a_file) files.a_file = baseUrl +response.data.a_file;
        if (response.data.medical_insurance_file) files.medical_insurance_file = baseUrl +response.data.medical_insurance_file;

        setFileNames(files);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchEmployeeData();
    }
  }, [id]);


  // Options for select fields
  const religionOptions = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Christianity', label: 'Christianity' },
    { value: 'Hinduism', label: 'Hinduism' },
    { value: 'Buddhism', label: 'Buddhism' },
    { value: 'Other', label: 'Other' }
  ];

  const banNameOptions = [
    { value: 'STC Bank', label: 'STC Bank' },
    { value: 'barq', label: 'Barq' },
  ];

  const venderOptions = [
    { value: 'ABD', label: 'ABD' },
    { value: 'BCD', label: 'BCD' },
  ];

  const Options = [
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
          { name: 'name', label: 'Name', type: 'text', required: true },
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
           { name: 'mobile_number', label: 'Mobile Number', type: 'tel',},
        ],
        [
          { name: 'profile_photo', label: 'Profile Photo', type: 'file', fullWidth: true }
        ],
        [
          { name: 'notes', label: 'Notes', type: 'textarea' ,fullWidth: true}
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
           { name: 'select_one', label: 'Select One', type: 'select',options:Options },
          { name: 'iqama_photo', label: 'Iqama Photo', type: 'file',}
        ],
         [
          { name: 'passport_number', label: 'Passport Number', type: 'text',},
         { name: 'passport_expiry_date', label: 'Passport Expiry Date', type: 'date'},
        ],
         [ 
          { name: 'pass_port_file', label: 'PassPort File', type: 'file',},
          { name: 'visa_file', label: 'Visa Fie', type: 'file',}
        ],
          [ 
         { name: 'a_date', label: 'A Date', type: 'date'},
          { name: 'a_file', label: 'A File', type: 'file',}
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
        { name: 'skills', label: 'Skills',  type:'select', options: Options },
      ],
      [
        { name: 'misconduct_report', label: 'Misconduct Report', type: 'textarea', placeholder:'Misconduct Report' },
      ]
    ]
  }
];

  // Render form fields based on type
  const renderField = (field) => {
    if (loading) {
      return <div className="w-full h-10 bg-gray-100 rounded animate-pulse"></div>;
    }

    switch(field.type) {
      case 'select':
        const selectedOption = field.options?.find(opt => opt.value === formData[field.name]) || { label: '' };
        return (
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50"
            value={selectedOption.label}
            readOnly
          />
        );
      case 'textarea':
        return (
          <textarea
            className="w-full p-2 border border-gray-300 rounded bg-gray-50 min-h-[100px]"
            value={formData[field.name] || ''}
            readOnly
          />
        );  
      case 'hadi-top':
        return (
          <div className="w-full mb-4 pb-2 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">{field.text}</h2>
          </div>
        );
      case 'star-rating':
        return (
          <div className="flex text-xl">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`${i < (formData[field.name] || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
        );
      case 'radio':
        const radioValue = formData[field.name];
        const selectedRadio = field.options?.find(opt => opt.value === radioValue) || { label: '' };
        return (
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded bg-gray-50"
            value={selectedRadio.label}
            readOnly
          />
        );
    case 'file':
  const fileUrl = fileNames[field.name];
  const isImage = fileUrl && /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileUrl);

  return (
    <div className="w-full p-2 border border-gray-300 rounded bg-gray-50 flex items-center justify-center gap-2">
      {fileUrl ? (
        isImage ? (
          <img 
            src={fileUrl} 
            alt={field.label || 'File Preview'} 
            style={{ height: '50px', objectFit: 'contain', borderRadius: '4px' }}
          />
        ) : (
          <a 
            href={fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {fileUrl.split('/').pop()}
          </a>
        )
      ) : (
        <span className="text-gray-500">No file uploaded</span>
      )}
    </div>
  );

     default:
      let value = formData[field.name] || '';
      if (field.type === 'date' && value) {
        value = new Date(value).toISOString().split('T')[0];
      }
      return (
        <input
          type={field.type}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50"
          value={value}
          readOnly
        />
      );
    }
  };

  const nextStep = () => step < steps.length && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);
  const handleClose = () => navigate(-1);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Employee Details</h1>
          <button 
            onClick={handleClose}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex justify-between border-b border-gray-200">
          {steps.map((stepItem, index) => (
            <div 
              key={index} 
              className={`pb-2 px-4 cursor-pointer relative ${step === index + 1 ? 'text-blue-600 font-semibold border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setStep(index + 1)}
            >
              {stepItem.title}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        {steps[step - 1].fields.map((row, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`flex gap-4 mb-4 ${row.some(f => f.fullWidth) ? 'flex-col' : ''}`}
          >
            {row.map((field) => (
              <div 
                key={field.name || field.text} 
                className={`flex-1 ${field.fullWidth ? 'w-full' : ''}`}
              >
                {field.label && (
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
                )}
                {renderField(field)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div>
          {step > 1 && (
            <button 
              onClick={prevStep}
              className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>
          )}
        </div>
        <div>
          {step < steps.length ? (
            <button 
              onClick={nextStep}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          ) : (
            <button 
              onClick={handleClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderView;