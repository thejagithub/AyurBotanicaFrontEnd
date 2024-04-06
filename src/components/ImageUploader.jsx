import React from 'react'
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { FaTrashRestoreAlt } from "react-icons/fa";

const ImageUploader = ({ accept, files, setFiles, className }) => {
    const onDrop = (acceptedFiles) => {
        setFiles(acceptedFiles);
    };

    const clearFile = () => {
        setFiles(null);
    };

    const dropzoneProps = useDropzone({
        onDrop,
        accept
    });

    const defaultStyles = "mt-1 flex justify-center items-center px-6 py-3 border border-gray-300 border-dashed rounded-md cursor-pointer w-full md:w-1/2"

    return (

        <div {...dropzoneProps.getRootProps()} className={className || defaultStyles}>
            <input {...dropzoneProps.getInputProps()} />
            <div className="flex flex-col items-center">
                <FiUpload className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-center text-gray-600">Drag & Drop <br/>or<br/> Click to Upload</span>
            </div>
        </div>

    );
}

export default ImageUploader