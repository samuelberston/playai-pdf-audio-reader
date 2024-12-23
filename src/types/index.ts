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

// Sidebar PDF List Item
export interface PDFListItemType {
    pdfId: string;
    name: string;
    uploadedAt: Date;
    pageCount: number;
};

// Viewer PDF Record
export interface ViewerPDF {
    pdfUrl: string;
    pageCount: number;
}

// Audio DB Record
export interface AudioRecord {
    audioId: string;
    userId: string;
    pdfId: string;
    page: number;
    name: string;
    path: string;
    uploadedAt: Date;
}

// Audio player object
export interface AudioPlayerObject {
    audioId: string;
    name: string;
    path: string;
    page: number;
}
