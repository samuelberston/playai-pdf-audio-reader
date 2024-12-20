'use client';

import { useState, useEffect } from 'react';
import { pdfService } from '@/lib/services/pdf.service';
import PDFListItem from '../pdf/PDFListItem';

interface PDF {
    pageCount: number;
    uploadedAt: Date;
    pdfId: string;
    name: string;
};

export default function Sidebar() {
    const [pdfs, setPdfs] = useState<PDF[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPdfs() {
            try {
                const userPdfs = await pdfService.findByUserId(userId); // NEED TO GET USER ID
                setPdfs(userPdfs);
            } catch (error) {
                console.error('Error in Sidebar:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPdfs();
    }, []);

    return (
        <div>
            <h1>Sidebar</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                {pdfs.map((pdf) => (
                    <PDFListItem
                        key={pdf.pdfId}
                        name={pdf.name}
                        pdfId={pdf.pdfId}
                        uploadedAt={pdf.uploadedAt}
                        pageCount={pdf.pageCount}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
