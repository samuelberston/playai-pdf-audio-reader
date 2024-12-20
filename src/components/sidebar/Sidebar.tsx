'use client';

import { useState, useEffect } from 'react';
import { pdfService } from '@/lib/services/pdf.service';
import SidebarHeader from './header/SiderbarHeader';
import PDFListItem from './pdf-list/PDFListItem';
import { useUser } from '@/contexts/UserContext';

interface PDF {
    pageCount: number;
    uploadedAt: Date;
    pdfId: string;
    name: string;
};

export default function Sidebar() {
    const [pdfs, setPdfs] = useState<PDF[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useUser();

    useEffect(() => {
        async function fetchPdfs() {
            try {
                const userPdfs = await pdfService.findByUserId(userId); // Dummy userId for now
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
            <SidebarHeader />
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