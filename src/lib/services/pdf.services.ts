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

        try {
            // Validate input parameters - UPDATE THIS LATER
            if (!userId || !name || !path || !pageCount || !metadata) {
                throw new Error('Invalid input parameters');
            }

            const createData = {
                userId,
                name,
                path,
                pageCount,
                metadata,
            };

            // Create a new PDF record in the database
            const pdf = await prisma.PDF.create({
                data: createData,
            }); 

            console.log('PDF created:', pdf);
            return pdf;
        } catch (error) {
            console.error('Error in pdfService.create:');
            console.error('Error message:', error.message);
            console.error('Error details:', error);
            if (error.code) {
                console.error('Prisma error code:', error.code);
            }
            throw error;
        }
    },

    // Get all PDFs for a user
    findByUserId: async (userId: string) => {
        return await prisma.pdf.findMany({
            where: { userId },
            include: { user: true },
        });
    },
};