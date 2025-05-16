'use client';
import { useState } from 'react';
import Step1_Location from '@/components/Step1_Location';
import Step2_Duration from '@/components/Step2_Duration';
import Step3_Routes from '@/components/Step3_Routes';
import Step4_StayCategory from '@/components/Step4_StayCategory';
import Step5_Pricing from '@/components/Step5_Pricing';

type TourFormData = {
  location: number | null;
  duration: number | null;
  routes: number | null; // 
  stayCategory: number | null;
  title: string;
  actualPrice: string;
  discountedPrice: string;
  isActive: 'yes' | 'no';
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
 // Updated initial state in MultiStepForm component
 const [formData, setFormData] = useState<TourFormData>({
  location: null,
  duration: null,
  routes: null,
  stayCategory: null,
  title: '',
  actualPrice: '',
  discountedPrice: '',
  isActive: 'yes',
});

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const updateFormData = (data: Partial<TourFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    const payload = {
      packages_name: formData.title,
      packages_actualprice: parseInt(formData.actualPrice),
      packages_offerprice: parseInt(formData.discountedPrice),
      packages_locationsid: formData.location,
      packages_locationdurations: formData.duration,
      packages_destinationroutesid: formData.routes,
      packages_staycategoriesid: formData.stayCategory,
      packages_isactive: formData.isActive === 'yes' ? 1 : 0,
    };
  
    try {
      const response = await fetch('http://103.168.18.92/api/packages/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Package created successfully!');
        console.log('Response:', result);
      } else {
        console.error('Server error:', result.message || result);
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Network or server error.');
    }
  };

  const steps = [
    <Step1_Location key={"step1"} data={formData} update={updateFormData} next={handleNext} />,
    <Step2_Duration
    key={"step2"}
    data={formData}
    update={updateFormData}
    next={handleNext}
    back={handleBack}
    location={formData.location}  // Pass the location explicitly here
  />,
  <Step3_Routes
  key={"step3"}
  data={formData}
  update={updateFormData}
  next={handleNext}
  back={handleBack}
  duration={formData.duration} // <-- Pass the selected locationdurations_id
/>,
    <Step4_StayCategory key={"step4"}  data={formData} update={updateFormData} next={handleNext} back={handleBack} />,
    <Step5_Pricing key={"step5"}  data={formData} update={updateFormData} back={handleBack} submit={handleSubmit} />
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      {steps[step - 1]}
    </div>
  );
};

export default MultiStepForm;
