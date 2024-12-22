'use client';

import { useState, useEffect, useCallback } from 'react';
import Upload from '../upload/UploadPDF';
import Viewer from '../viewer/Viewer';
import Sidebar from '../sidebar/Sidebar';
import { PDFRecord, PDFListItemType } from '@/types';
import { findPDFsByUserId, findPDFById } from '@/lib/services/pdf.service';
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
    const cachedFetchPdfs = useCallback(fetchPdfs, [userId]);

    useEffect(() => {
        cachedFetchPdfs();
    }, [userId, cachedFetchPdfs]);

    const handlePDFSelect = async (pdfId: string) => {
        try {
            // Fetch PDF data from backend using pdfId
            const pdfRecord: PDFRecord = await findPDFById(pdfId);
            console.log('pdfRecord: ', pdfRecord);

            setSelectedPDF(pdfRecord);
            setActiveMode('viewer');
        } catch (error) {
            console.error('Error loading PDF:', error);
        }
    };

    return (
        <div className="flex h-screen">
            <Sidebar 
                pdfs={pdfs}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                onPDFSelect={handlePDFSelect}
            />
            <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-[240px]' : 'ml-[60px]'}`}>
                {activeMode === 'upload' ? (
                    <div className="h-full flex items-center justify-center p-4">
                        <div className="max-w-lg w-full mx-auto">
                            <Upload 
                                onUploadComplete={() => {
                                    fetchPdfs();
                                    setActiveMode('viewer');
                                }} 
                                onPDFSelected={handlePDFSelect}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="h-full p-4">
                        {selectedPDF ? (
                            <Viewer selectedPDF={selectedPDF} setActiveMode={setActiveMode}/>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No PDF selected</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
