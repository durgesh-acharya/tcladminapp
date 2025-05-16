'use client'

import { useEffect, useState,useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import StayCard from '@/components/StayCard'
import Modal from '@/components/StayFormModal'
import Image from 'next/image'

type StayForm = {
  day: string
  title: string
  stysat: string
  checkin: string
  checkout: string
  nights: string
  breakfast: boolean
  lunch: boolean
  dinner: boolean
  image1: string
  image2: string
  image1File: File | null
  image2File: File | null
}

type Stay = {
  stays_id: number
  stays_day: string
  stays_stysat: string
  stays_checkin: string
  stays_checkout: string
  stays_numofnight: string
  stays_title: string
  stays_isbreakfastinclude: number
  stays_islunchinclude: number
  stays_isdinnerinclude: number
  stays_image1: string
  stays_image2: string
  stays_packageid: number
}

export default function StayPage() {
  const searchParams = useSearchParams()
  const packageId = searchParams.get('packageid')
  const [stays, setStays] = useState<Stay[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [stayFormData, setStayFormData] = useState<StayForm>({
    day: '',
    title: '',
    stysat: '',
    checkin: '',
    checkout: '',
    nights: '',
    breakfast: false,
    lunch: false,
    dinner: false,
    image1: '',
    image2: '',
    image1File: null,
    image2File: null,
  })

  const fetchStays = useCallback(async () => {
    if (!packageId) return
    try {
      const res = await fetch(`http://103.168.18.92/api/stays/package/${packageId}`)
      const data = await res.json()
      setStays(data?.data || [])
    } catch (error) {
      console.error('Error fetching stays:', error)
    }
  }, [packageId])
  
  useEffect(() => {
    fetchStays()
  }, [fetchStays])

  useEffect(() => {
    fetchStays()
  }, [fetchStays,packageId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const {
      day,
      title,
      stysat,
      checkin,
      checkout,
      nights,
      image1File,
      image2File,
    } = stayFormData

    if (!packageId || !day || !title || !stysat || !checkin || !checkout || !nights || !image1File || !image2File) {
      alert('Please fill all required fields including both images')
      return
    }

    const formData = new FormData()
    formData.append('stays_day', day)
    formData.append('stays_title', title)
    formData.append('stays_stysat', stysat)
    formData.append('stays_checkin', checkin)
    formData.append('stays_checkout', checkout)
    formData.append('stays_numofnight', nights)
    formData.append('stays_isbreakfastinclude', stayFormData.breakfast ? '1' : '0')
    formData.append('stays_islunchinclude', stayFormData.lunch ? '1' : '0')
    formData.append('stays_isdinnerinclude', stayFormData.dinner ? '1' : '0')
    formData.append('stays_packageid', packageId)
    formData.append('stays_image1', image1File)
    formData.append('stays_image2', image2File)

    try {
      const res = await fetch('http://103.168.18.92/api/stays/create', {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()

      if (result.status) {
        await fetchStays()
        setIsModalOpen(false)
        resetForm()
      } else {
        alert(result.message || 'Failed to create stay.')
      }
    } catch (error) {
      console.error('Error submitting stay:', error)
      alert('An error occurred while submitting. Please try again.')
    }
  }

  const resetForm = () => {
    setStayFormData({
      day: '',
      title: '',
      stysat: '',
      checkin: '',
      checkout: '',
      nights: '',
      breakfast: false,
      lunch: false,
      dinner: false,
      image1: '',
      image2: '',
      image1File: null,
      image2File: null,
    })
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stay Details for Package {packageId}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Stay
        </button>
      </div>

      <StayCard data={stays} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="max-h-[90vh] overflow-y-auto p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Day" value={stayFormData.day} onChange={e => setStayFormData({ ...stayFormData, day: e.target.value })} className="w-full border px-3 py-2" required />
            <input placeholder="Title" value={stayFormData.title} onChange={e => setStayFormData({ ...stayFormData, title: e.target.value })} className="w-full border px-3 py-2" required />
            <input placeholder="Stay At" value={stayFormData.stysat} onChange={e => setStayFormData({ ...stayFormData, stysat: e.target.value })} className="w-full border px-3 py-2" required />
            <input placeholder="Check-in Time" value={stayFormData.checkin} onChange={e => setStayFormData({ ...stayFormData, checkin: e.target.value })} className="w-full border px-3 py-2" required />
            <input placeholder="Check-out Time" value={stayFormData.checkout} onChange={e => setStayFormData({ ...stayFormData, checkout: e.target.value })} className="w-full border px-3 py-2" required />
            <input placeholder="Nights" value={stayFormData.nights} onChange={e => setStayFormData({ ...stayFormData, nights: e.target.value })} className="w-full border px-3 py-2" required />

            <div className="flex flex-wrap gap-4">
              <label><input type="checkbox" checked={stayFormData.breakfast} onChange={e => setStayFormData({ ...stayFormData, breakfast: e.target.checked })} /> Breakfast</label>
              <label><input type="checkbox" checked={stayFormData.lunch} onChange={e => setStayFormData({ ...stayFormData, lunch: e.target.checked })} /> Lunch</label>
              <label><input type="checkbox" checked={stayFormData.dinner} onChange={e => setStayFormData({ ...stayFormData, dinner: e.target.checked })} /> Dinner</label>
            </div>

            <div>
              <label>Image 1</label>
              <input type="file" accept="image/*" onChange={e => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => setStayFormData(prev => ({ ...prev, image1: reader.result as string, image1File: file }))
                  reader.readAsDataURL(file)
                }
              }} />
              {stayFormData.image1 && (
               <Image
               src={stayFormData.image1}
               alt="Preview 1"
               width={48}
               height={32}
               unoptimized
             />
              )}
            </div>

            <div>
              <label>Image 2</label>
              <input type="file" accept="image/*" onChange={e => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onloadend = () => setStayFormData(prev => ({ ...prev, image2: reader.result as string, image2File: file }))
                  reader.readAsDataURL(file)
                }
              }} />
              {stayFormData.image2 && (
                <Image
                src={stayFormData.image2}
                alt="Preview 1"
                width={48}
                height={32}
                unoptimized
              />
              )}
            </div>

            <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full">Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
