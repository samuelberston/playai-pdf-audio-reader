'use client';

import { useState, useEffect } from 'react';
import { pdfService } from '@/lib/services/pdf.service';
import SidebarHeader from './header/SiderbarHeader';
import PDFListItem from './pdf-list/PDFListItem';
import { useUser } from '@/contexts/UserContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PDF {
    pageCount: number;
    uploadedAt: Date;
    pdfId: string;
    name: string;
};

interface SidebarProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
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
    }, [userId]);

    return (
        <div className={`fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 
            ${isOpen ? 'w-64' : 'w-16'}`}>
            <button 
                onClick={onToggle}
                className="absolute -right-3 top-20 bg-white border rounded-full p-1 shadow-md hover:bg-gray-50"
            >
                {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
            
            <div className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                <SidebarHeader />
            </div>

            {isLoading ? (
                <div className={`${!isOpen && 'hidden'}`}>Loading...</div>
            ) : (
                <div className={`${!isOpen && 'hidden'} overflow-y-auto`}>
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