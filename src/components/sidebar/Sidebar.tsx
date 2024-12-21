'use client';

import { useState, useEffect } from 'react';
import { findPDFsByUserId } from '@/lib/services/pdf.service';
import SidebarHeader from './header/SiderbarHeader';
import PDFListItem from './pdf-list/PDFListItem';
import { useUser } from '@/contexts/UserContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PDFListItemType } from '@/types';


interface SidebarProps {
    isOpen?: boolean;
    onToggle?: () => void;
}

export default function Sidebar({ isOpen = true, onToggle }: SidebarProps) {
    const [pdfs, setPdfs] = useState<PDFListItemType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useUser();

    useEffect(() => {
        async function fetchPdfs() {
            try {
                const userPdfs = await findPDFsByUserId(userId); // Dummy userId for now
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
        <div style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100%',
            borderRight: '1px solid #e5e7eb',
            transition: 'all 300ms',
            backgroundColor: 'var(--background)',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            width: isOpen ? '16rem' : '4rem'
        }}>
            <button 
                onClick={onToggle}
                style={{
                    position: 'absolute',
                    right: '-0.75rem',
                    top: '5rem',
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '9999px',
                    padding: '0.375rem',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                    transition: 'background-color 150ms'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
                {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
            
            <div style={{
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 200ms'
            }}>
                <SidebarHeader />
            </div>

            {isLoading ? (
                <div style={{
                    display: !isOpen ? 'none' : 'block',
                    padding: '1rem',
                    color: '#4b5563'
                }}>
                    Loading...
                </div>
            ) : (
                <div style={{
                    display: !isOpen ? 'none' : 'block',
                    overflowY: 'auto',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem'
                }}>
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