import prisma from '@/prisma/index';
import multer from 'multer'; // File upload middleware

// Muster storage configuation
const storage = multer.diskStorage({
    destination: './public/pdfs',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
    
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Please upload a PDF file'));
    }
};

export const upload = multer({ storage, fileFilter });

export const pdfService = {
    // Create a new PDF
    create: async ({ userId, name, path, pageCount, metadata }: { 
        userId: string; 
        name: string; 
        path: string; 
        pageCount: number; 
        metadata: any; 
    }) => { 
        // Create a new PDF record in the database
        const pdf = await prisma.pdf.create({
            data: {
                userId,
                name,
                path,
                pageCount,
                metadata,
            },
        });

        return pdf;
    },

    // Get all PDFs for a user
    findByUserId: async (userId: string) => {
        return await prisma.pdf.findMany({
            where: { userId },
            include: { user: true },
        });
    },
};