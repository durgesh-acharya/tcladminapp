"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import LocationForms from "@/components/LocationForms";

const EditLocationPage = () => {
  const router = useRouter();

//   const [locationId, setLocationId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<{
    locationName: string;
    isActive: 1 | 0;
    imageUrl: string;
  } | null>(null);


  const params = useParams();
  const locationId = params.id; 

  useEffect(() => {
    const fetchLocation = async () => {
      if (!locationId) return;

      try {
        const response = await fetch(`http://103.168.18.92/api/locations/${locationId}`);
        const result = await response.json();
        console.log("Fetched location data:", result); // ✅ Debug log

        if (result.status && result.data.length > 0) {
          const location = result.data[0];
          setInitialData({
            locationName: location.locations_name,
            isActive: location.locations_isactive,
            imageUrl: location.locations_url,
          });
        } else {
          alert("Location not found.");
        }
      } catch (err) {
        console.error("Error fetching location:", err);
        alert("Failed to load location data.");
      }
    };

    fetchLocation();
  }, [locationId]);

  const handleSubmit = async ({
    locationName,
    isActive,
    image,
  }: {
    locationName: string;
    isActive: 1 | 0;
    image: File | null;
  }) => {
    if (!locationId) return;

    const formData = new FormData();
    formData.append("locations_name", locationName);
    formData.append("locations_isactive", String(isActive));
    if (image) {
      formData.append("locations_imgurl", image);
    }

    try {
      const response = await fetch(`http://103.168.18.92/api/locations/update/${locationId}`, {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let result;

      try {
        result = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(result.message || "Failed to update location");
      }

      console.log("Location updated:", result);
      router.push("/locations");
    } catch (err: unknown) {
      console.error("Error updating location:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      alert(errorMessage);
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return <LocationForms onSubmit={handleSubmit} initialData={initialData} />;
};

export default EditLocationPage;
