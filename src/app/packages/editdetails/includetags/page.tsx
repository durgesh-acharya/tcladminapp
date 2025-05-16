'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Include = {
  include_id: number
  include_includtagname: string
  include_packageid: number
}

const IncludePage = () => {
  const searchParams = useSearchParams()
  const packageId = searchParams.get('packageid')
  const [includes, setIncludes] = useState<Include[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newTagName, setNewTagName] = useState('')

  // Fetch includes on mount
  useEffect(() => {
    if (packageId) {
      fetch(`http://103.168.18.92/api/include/package/${packageId}`)
        .then(res => res.json())
        .then(data => setIncludes(data.data || []))
        .catch(err => console.error(err))
    }
  }, [packageId])

  const handleAddInclude = async () => {
    if (!newTagName.trim()) return alert("Tag name is required")

    const res = await fetch('http://103.168.18.92/api/include/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        include_includtagname: newTagName,
        include_packageid: Number(packageId),
      }),
    })

    const result = await res.json()
    if (result.status) {
      setIncludes(prev => [...prev, result.data[0]])
      setShowModal(false)
      setNewTagName('')
    } else {
      alert('Failed to add include')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Package ID: {packageId}</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Include Tags</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Include
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {includes.map(tag => (
          <div
            key={tag.include_id}
            className="p-4 border rounded-lg bg-white shadow text-center"
          >
            {tag.include_includtagname}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Include</h3>
            <input
              type="text"
              value={newTagName}
              onChange={e => setNewTagName(e.target.value)}
              placeholder="Enter tag name"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button
                onClick={handleAddInclude}
                className="px-4 py-2 bg-black text-white rounded hover:bg-black-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IncludePage
