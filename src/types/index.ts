// Upload PDF stream
export interface PDFObject {
    name: string;
    path: string;
    pageCount: number;
};

// Create PDF database record
export interface PDFRecord {
    pdfId: string;
    userId: string;
    name: string;
    path: string;
    uploadedAt: Date;
    pageCount: number;
    metadata: Record<string, string>;
};
