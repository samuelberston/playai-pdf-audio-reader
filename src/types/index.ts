export interface PDFObject {
    name: string;
    path: string;
    pageCount: number;
};

export interface PDFRecord {
    pdfId: string;
    userId: string;
    name: string;
    path: string;
    uploadedAt: Date;
    pageCount: number;
    metadata: Record<string, string>;
};
