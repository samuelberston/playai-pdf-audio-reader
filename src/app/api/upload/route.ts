// app/api/upload/route.js

import { NextResponse } from 'next/server';
import { pdfService, upload } from '@/lib/services/pdf.services';
import { writeFile } from 'fs/promises';
import { join } from 'path';

// Multer middleware
const multerMiddleware = (req) => {
    return new Promise((resolve, reject) => {
        const singleUpload = upload.single('pdf');

        // req/res object - WHY??? 
        const nextConnectReq = {
            ...req,
            headers: req.headers,
        };

        singleUpload(nextConnectReq, {}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(nextConnectReq);
            }
        });
    });
}

export async function POST(req) {
    try {
        console.log('Uploading file...');
        console.log(req.body);
        // Handle file upload
        const formData = await req.formData();
        const file = formData.get('pdf');
        const userId = formData.get('userId');
        const name = file.name;

        console.log('Received file:', file);
        console.log('User ID:', userId);

        // Check for file
        if (!file) NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}-${file.name}`;
        const path = join(process.cwd(), 'public', 'pdfs', filename);

        // Write the file to disk
        await writeFile(path, buffer);


        // // Multer file processing
        // const processedReq = await multerMiddleware(req);
        // const path = processedReq.file.path;

        // // Get page count and metadata
        // const pageCount = processedReq.file.pageCount;
        // const metadata = processedReq.file.metadata;

        // Create PDF record with pdfService
        const pdf = await pdfService.create({ userId, name, path });
        return NextResponse.json(pdf, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
