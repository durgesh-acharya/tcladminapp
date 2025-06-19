'use client';
import { useState } from 'react';
import Step1_Location from '@/components/Step1_Location';
import Step2_Duration from '@/components/Step2_Duration';
import Step3_Routes from '@/components/Step3_Routes';
import Step4_StayCategory from '@/components/Step4_StayCategory';
import Step5_Pricing from '@/components/Step5_Pricing';
import { useRouter } from "next/navigation";

type TourFormData = {
  location: number | null;
  duration: number | null;
  routes: number | null; // 
  stayCategory: number | null;
  title: string;
  actualPrice: string;
  discountedPrice: string;
  isActive: 'yes' | 'no';
  imageFile: File | null;
};

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
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
  imageFile: null,
});

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const updateFormData = (data: Partial<TourFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    if (!formData.imageFile) {
      alert("Please upload an image.");
      return;
    }
  
    const form = new FormData();
    form.append('packages_name', formData.title);
    form.append('packages_actualprice', formData.actualPrice);
    form.append('packages_offerprice', formData.discountedPrice);
    form.append('packages_locationsid', String(formData.location));
    form.append('packages_locationdurations', String(formData.duration));
    form.append('packages_destinationroutesid', String(formData.routes));
    form.append('packages_staycategoriesid', String(formData.stayCategory));
    form.append('packages_isactive', formData.isActive === 'yes' ? '1' : '0');
    form.append('image', formData.imageFile); 
  
    try {
      const response = await fetch('http://103.168.18.92/api/packages/create', {
        method: 'POST',
        body: form, // Don't set Content-Type manually!
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert('Package created successfully!');
        router.push("/packages");
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
