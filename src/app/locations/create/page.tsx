"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LocationForms from "@/components/LocationForms";

const CreateLocationPage = () => {
  const router = useRouter();

  const handleSubmit = async ({
    locationName,
    isActive,
    image,
  }: {
    locationName: string;
    isActive: 1 | 0;
    image: File | null;
  }) => {
    if (!locationName || !image) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("locations_name", locationName);
    formData.append("locations_isactive", String(isActive));
    formData.append("locations_imgurl", image); // must match multer field name

    try {
      const response = await fetch("http://103.168.18.92/api/locations/create", {
        method: "POST",
        body: formData,
      });

      const text = await response.text(); // safer than direct .json()
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to create location");
      }

      console.log("Location created:", result);
      router.push("/locations");
    } catch (err: unknown) {
       console.error("Error submitting location:", err);
  const errorMessage = err instanceof Error ? err.message : "An error occurred";
  alert(errorMessage);
    }
  };

  return <LocationForms onSubmit={handleSubmit} />;
};

export default CreateLocationPage;
