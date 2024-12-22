'use client';

import { useState } from 'react';
import { PDFRecord } from '@/types';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
// import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Viewer = ({ selectedPDF }: { selectedPDF: PDFRecord }) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const { path, pageCount } = selectedPDF;
    const pdfName = path.split('/').pop();
    const pdfUrl = `/pdfs/${pdfName}`;

    return (
        <div className="w-full h-full flex flex-col items-center overflow-auto">
            <Document file={pdfUrl} className="max-h-full">
                <Page 
                    pageNumber={pageNumber} 
                    className="max-w-full"
                    scale={1.0}
                />
            </Document>
            <p className="mt-4">Page {pageNumber} of {pageCount}</p>
        </div>
    );
};

export default Viewer;
