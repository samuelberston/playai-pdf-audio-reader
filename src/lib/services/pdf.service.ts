'use server';

import prisma from '@/prisma/index';
import { writeFile } from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { PDFObject, PDFRecord } from '@/types';

// Upload a PDF file to the server
export async function uploadPDF(file: File): Promise<PDFObject> {
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
}

// Create a new PDF record in the database
export async function createPDF({ userId, name, path, pageCount, metadata }: { 
    userId: string; 
    name: string; 
    path: string; 
    pageCount: number; 
    metadata: any; 
}): Promise<PDFRecord> {
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
            uploadedAt: new Date(),
            pageCount,
            metadata,
        };

        // Create a new PDF record in the database
        const pdf: PDFRecord = await prisma.PDF.create({
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
}


export async function findPDFsByUserId(userId: string) {
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
}

export async function findPDFById(pdfId: string) {
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