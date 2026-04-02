import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [files, setFiles] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true)
        const response = await fetch("http://localhost:3000/api/files")
        if (!response.ok) throw new Error("Failed to fetch files")
        const data = await response.json()
        setFiles(data.files ?? [])
      } catch (error) {
        setError("error: " + (error as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchFiles()
  }, [])


  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file)

    try {
      setLoading(true)
      const response = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData
      })

      if (!response.ok) throw new Error("Failed to fetch files")
      const data = await response.json()
      setFiles((prev) => [...prev, data.file.originalname])


    } catch (error) {
      setError("error: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (selectedFile) handleUpload(selectedFile)
  }

  return (
    <main>
      <h1>Home Drive</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => {setSelectedFile(e.target.files?.[0] ?? null)}} />
        <button>Upload</button>
      </form>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </main>
  )
}

export default App
