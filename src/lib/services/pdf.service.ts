import prisma from '@/prisma/index';
import { writeFile } from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

export interface PDFMetadata {
    pdfId: string,
    userId: string,
    name: string,
    path: string,
    pageCount: string,
}

export const pdfService = {
    // Create a new PDF
    create: async ({ userId, name, path, pageCount, metadata }: { 
        userId: string; 
        name: string; 
        path: string; 
        pageCount: number; 
        metadata: any; 
    }) => { 
        // Validate input parameters - UPDATE THIS LATER
        if (!userId || !name || !path || !pageCount || !metadata) {
            throw new Error('Invalid input parameters');
        }

        try {
            // Create a unique PDF ID
            const pdfId = uuidv4();

            // Create the PDF record
            const createData = {
                pdfId,
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

    // Upload a PDF file to local storage (for now - will be a cloud storage solution later)
    upload: async (file: File) => {
        // Check for file
        if (!file) { throw new Error('No file uploaded'); }

        try {
            // Convert file to buffer
            const bytes  = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            
            // Get page count and name
            const pdfDoc    = await PDFDocument.load(buffer);
            const pageCount = pdfDoc.getPageCount();
            
            // Create a unique filename
            const name         = file.name;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const filename     = `${uniqueSuffix}-${name}`;
            const path         = join(process.cwd(), 'public', 'pdfs', filename);
    
            // Write the file to disk - development only
            await writeFile(path, buffer);
    
            return { name, path, pageCount };

        } catch (error) {
            console.error('Error in pdfService.upload:', error);
            throw error;
        }
    },

    // Get all PDFs for a user
    findByUserId: async (userId: string) => {
        try {
            // Validate userId - UPDATE THIS
            if (!userId) {
                throw new Error('Invalid userId');
            }

            return await prisma.PDF.findMany({
                where: { userId },
                include: { user: false, userId: false, path: false },
            });
        } catch (error) {
            console.error('Error in pdfService.findByUserId:', error);
            throw error;
        }
    },

    // Get a PDF by ID
    findById: async (pdfId: string) => {
        try {
            // Validate pdfId - UPDATE THIS
            if (!pdfId) {
                throw new Error('Invalid pdfId');
            }

            return await prisma.PDF.findUnique({ where: { pdfId } });
        } catch (error) {
            console.error('Error in pdfService.findById:', error);
            throw error;
        }
    }
};