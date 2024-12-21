'use client';

import SidebarHeader from './header/SiderbarHeader';
import PDFListItem from './pdf-list/PDFListItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PDFListItemType } from '@/types';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    pdfs: PDFListItemType[];
}

export default function Sidebar({ isOpen = true, onToggle, pdfs }: SidebarProps) {
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

            <div style={{
                display: !isOpen ? 'none' : 'block',
                overflowY: 'auto',
                paddingLeft: '0.5rem',
                paddingRight: '0.5rem'
            }}>
                {pdfs && pdfs.map((pdf) => (
                    <PDFListItem
                        key={pdf.pdfId}
                        name={pdf.name}
                        pdfId={pdf.pdfId}
                        uploadedAt={pdf.uploadedAt}
                        pageCount={pdf.pageCount}
                    />
                ))}
            </div>
        </div>
    );
};