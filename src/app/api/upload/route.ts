// app/api/upload/route.js

import { NextRequest, NextResponse } from 'next/server';
import { pdfService } from '@/lib/services/pdf.services';
import { PDFDocument } from 'pdf-lib';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
    try {
        console.log('Uploading file...');
        
        // Handle file upload
        const formData = await req.formData();
        const file: File | null = formData.get('pdf') as File | null;
        const pdfId: string = formData.get('pdfId') as string;
        const userId: string = formData.get('userId') as string;

        // Check for file
        if (!file) { return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });}

        const name = file.name;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Get page count and metadata
        const pdfDoc = await PDFDocument.load(buffer);
        const pageCount = pdfDoc.getPageCount();
        
        // Create a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}-${name}`;
        const path = join(process.cwd(), 'public', 'pdfs', filename);

        // Write the file to disk
        await writeFile(path, buffer);
        
        // Create PDF record with pdfService
        const pdf = await pdfService.create({ pdfId, userId, name, path, pageCount, metadata: {} });
        console.log('PDF created:', pdf);
        return NextResponse.json(pdf, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
