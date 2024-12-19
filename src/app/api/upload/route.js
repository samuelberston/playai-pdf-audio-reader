// app/api/upload/route.js

import { NextResponse } from 'next/server';
import { pdfService, upload } from '@/lib/services/pdf.services';

// Multer middleware
const multerMiddleware = (req) => {
    return new Promise((resolve, reject) => {
        const singleUpload = upload.single('pdf');

        // req/res object
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
        // Handle file upload
        const formData = await req.formData();
        const file = formData.get('pdf');
        const userId = formData.get('userId');
        const name = file.name;

        // Check for file
        if (!file) NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        // Multer file processing
        const processedReq = await multerMiddleware(req);
        const path = processedReq.file.path;

        // Get page count and metadata
        const pageCount = processedReq.file.pageCount;
        const metadata = processedReq.file.metadata;

        // Create PDF record with pdfService
        const pdf = await pdfService.create({ userId, name, path, pageCount, metadata });
        return NextResponse.json(pdf, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
