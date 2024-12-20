interface PDFListItemProps {
    name: string;
    pdfId: string;
    uploadedAt: Date;
    pageCount: number;
    onClick?: () => void;
};

export default function PDFListItem({ name, pdfId, uploadedAt, pageCount, onClick }: PDFListItemProps) {
    const formattedDate = getRelativeTimeString(uploadedAt);
    return (
        <div id={pdfId} onClick={onClick}>
            <div>{name}</div>
            <div>Uploaded at: {formattedDate}</div>
            <div>Page count: {pageCount}</div>
        </div>
    );
};

function getRelativeTimeString(date: Date) {
    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    return rtf.format(diffInDays, 'day');
};
