import { uploadPDF, createPDF } from '@/lib/services/pdf.service';
import { useUser } from '@/contexts/UserContext';
import { Upload } from 'lucide-react';
import { PDFObject, PDFRecord } from '@/types';
import { useState } from 'react';

export default function UploadPDF({ onUploadComplete }: { onUploadComplete: () => void }) {
    const { userId } = useUser();
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        try {
            // Upload PDF and retrieve PDF object
            const pdfObject: PDFObject = await uploadPDF(file);
            // Create PDF record in database
            await createPDF({ userId, name: pdfObject.name, path: pdfObject.path, pageCount: pdfObject.pageCount, metadata: {} });
            onUploadComplete();
        } catch (error) {
            console.error('Error in UploadPDF:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            await handleUpload(file);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer w-full max-w-2xl mx-auto
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}
                ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-4 text-lg text-gray-600">
                {isUploading ? 'Uploading...' : 'Drag and drop your PDF here'}
            </p>
        </div>
    );
};
