'use client';

import { useState } from 'react';
import { PDFRecord } from '@/types';
import { pdfjs, Document, Page } from 'react-pdf';
// import type { PDFDocumentProxy } from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Viewer = ({ selectedPDF }: { selectedPDF: PDFRecord }) => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const { path, pageCount } = selectedPDF;
    return (
        <div>
            <Document file={path}>
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {pageCount}</p>
        </div>
    );
};

export default Viewer;


