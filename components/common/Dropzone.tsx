import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { MdImage } from 'react-icons/md'

type Props = {
  onChange?: (files: any) => void
}

export const Dropzone = ({ onChange }: Props) => {
  const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles: any) => {
      const droppedFiles = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
      setFiles(droppedFiles)
      onChange && onChange(droppedFiles)
    },
  })

  const thumbs = files.map((file: any) => (
    <img
      className="object-cover w-full h-full"
      key={file.name}
      src={file.preview}
      // Revoke data uri after image is loaded
      onLoad={() => {
        URL.revokeObjectURL(file.preview)
      }}
    />
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file: any) => URL.revokeObjectURL(file.preview))
  }, [])

  return (
    <section className="max-w-xs h-[236px] rounded-lg cursor-pointer hover:bg-black hover:opacity-50">
      <div
        {...getRootProps({ className: '' })}
        className="border-dashed border-2 rounded-lg flex items-center justify-center h-full"
      >
        <input {...getInputProps()} className="outline-none" />
        {files.length > 0 ? thumbs : <MdImage className="m-20" fontSize={72} />}
      </div>
    </section>
  )
}
