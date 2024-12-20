import { uploadPDF, createPDF } from '@/lib/services/pdf.service';
import { useUser } from '@/contexts/UserContext';
import { Upload } from 'lucide-react';
import { PDFObject, PDFRecord } from '@/types';
import { useState } from 'react';

interface UploadProps {
    onUploadComplete?: () => void;
}

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
            const pdfRecord: PDFRecord = await createPDF({ userId, name: pdfObject.name, path: pdfObject.path, pageCount: pdfObject.pageCount, metadata: {} });
            onUploadComplete?.();
        } catch (error) {
            console.error('Error in UploadPDF:', error);
            setIsUploading(false);
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
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Upload />
            <p className="mt-2 text-sm text-gray-600">
                {isUploading ? 'Uploading...' : 'Drag and drop your PDF here'}
            </p>
        </div>
    );
};
