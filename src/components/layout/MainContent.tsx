'use client';

import { useState, useEffect } from 'react';
import Upload from '../upload/UploadPDF';
import Viewer from '../viewer/Viewer';
import Sidebar from '../sidebar/Sidebar';
import { PDFRecord, PDFListItemType } from '@/types';
import { findPDFsByUserId } from '@/lib/services/pdf.service';
import { useUser } from '@/contexts/UserContext';

export default function MainContent() {
    const [activeMode, setActiveMode] = useState<'upload' | 'viewer'>('upload');
    const [pdfs, setPdfs] = useState<PDFListItemType[]>([]);
    const [selectedPDF, setSelectedPDF] = useState<PDFRecord | undefined>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { userId } = useUser();

    const fetchPdfs = async () => {
        try {
            const userPdfs = await findPDFsByUserId(userId);
            setPdfs(userPdfs);
        } catch (error) {
            console.error('Error fetching PDFs:', error);
        }
    };

    useEffect(() => {
        fetchPdfs();
    }, [userId]);

    return (
        <div className="flex min-h-screen">
            <Sidebar 
                pdfs={pdfs}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[240px]' : 'ml-[60px]'}`}>
                <div className="h-full flex items-center justify-center">
                    {activeMode === 'upload' ? (
                        <div className="max-w-lg w-full">
                            <Upload 
                                onUploadComplete={() => {
                                    fetchPdfs();
                                    setActiveMode('viewer');
                                }} 
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full">
                            <Viewer selectedPDF={selectedPDF} />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
