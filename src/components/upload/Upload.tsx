import { uploadPDF, createPDF } from '@/lib/services/pdf.service';
import { useUser } from '@/contexts/UserContext';
import { Upload } from 'lucide-react';
import { PDF } from '@/types';
import { useState } from 'react';

export default function Upload() {
    const { userId } = useUser();
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (file: File) => {
        setIsUploading(true);
        // Upload PDF and retrieve PDF object
        const pdf: PDF = await uploadPDF(file);
        // Create PDF record in database
        await createPDF({ userId, name: pdf.name, path: pdf.path, pageCount: pdf.pageCount, metadata: {} });
        setIsUploading(false);
    };
};