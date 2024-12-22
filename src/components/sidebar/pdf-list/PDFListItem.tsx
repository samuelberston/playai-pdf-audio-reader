interface PDFListItemProps {
    name: string;
    pdfId: string;
    uploadedAt: Date;
    pageCount: number;
    onSelect: (pdfId: string) => void;
};

export default function PDFListItem({ name, pdfId, uploadedAt, pageCount, onSelect }: PDFListItemProps) {
    const formattedDate = getRelativeTimeString(uploadedAt);
    return (
        <div 
            id={pdfId} 
            onClick={() => onSelect(pdfId)}
            style={{
                backgroundColor: '#2A2A2A',
                color: '#E0E0E0',
                padding: '16px',
                borderRadius: '6px',
                cursor: 'pointer',
                marginBottom: '8px',
                marginLeft: '8px',
                marginRight: '8px',
                border: '1px solid transparent',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <div style={{ 
                marginBottom: '8px',
                fontSize: '0.9em',
                fontWeight: 500 
            }}>{name}</div>
            <div style={{ 
                marginBottom: '8px',
                fontSize: '0.7em',
                color: '#B0B0B0'
            }}>Uploaded {formattedDate}</div>
            <div style={{ 
                fontSize: '0.8em',
                color: '#B0B0B0'
            }}>Page count: {pageCount}</div>
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
