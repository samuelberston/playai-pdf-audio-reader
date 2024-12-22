'use client';

import { useState } from 'react';
import { PDFRecord } from '@/types';
import { pdfjs, Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface ViewerProps {
    selectedPDF: PDFRecord;
    setActiveMode: (mode: string) => void;
}

const Viewer = ({ selectedPDF, setActiveMode }: ViewerProps) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const { path, pageCount } = selectedPDF;
    const pdfName = path.split('/').pop();
    const pdfUrl = `/pdfs/${pdfName}`;

    const nextPage = () => {
        if (pageNumber < pageCount) {
            setPageNumber(pageNumber + 1);
        }
    }

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center overflow-auto">
            <Document file={pdfUrl} className="max-h-full">
                <Page 
                    pageNumber={pageNumber} 
                    className="max-w-full"
                    scale={0.8}
                    height={800}
                />
            </Document>
            <div className="flex items-center gap-4 mt-4">
                {pageNumber > 1 && (
                    <button 
                        onClick={prevPage}
                        disabled={pageNumber <= 1}
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                >
                        <ChevronLeft size={24} />
                    </button>
                )}
                <p>Page {pageNumber} of {pageCount}</p>
                {pageNumber < pageCount && (
                    <button 
                        onClick={nextPage}
                        disabled={pageNumber >= pageCount}
                        className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-50"
                    >
                        <ChevronRight size={24} />
                    </button>
                )}
            </div>
            <div className="mt-3">
                <button 
                    onClick={() => setActiveMode('upload')}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                    Upload another PDF
                </button>
            </div>
        </div>
    );
};

export default Viewer;
