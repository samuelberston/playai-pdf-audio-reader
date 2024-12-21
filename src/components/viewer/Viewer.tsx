'use client';

import { useState } from 'react';
import Form from 'next/form';
import { PDFRecord } from '@/types';
import { pdfjs, Document, Page } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const Viewer = ({ pdf }: { pdf: PDFRecord }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    return (
        <div>
            <Document file={pdf.path} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    );
};

export default Viewer;


