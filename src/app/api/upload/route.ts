// app/api/upload/route.js

import { NextRequest, NextResponse } from 'next/server';
import { pdfService } from '@/lib/services/pdf.services';

export async function POST(req: NextRequest) {
    try {
        console.log('Uploading file...');
        
        // Handle file upload
        const formData = await req.formData();
        const file: File | null = formData.get('pdf') as File | null;
        const userId: string = formData.get('userId') as string;

        // Check for file
        if (!file) { return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });}

        // Upload file
        const { name, path, pageCount } = await pdfService.upload(file);
        
        // Create PDF record with pdfService
        const pdf = await pdfService.create({ userId, name, path, pageCount, metadata: {} });

        console.log('PDF created:', pdf);
        return NextResponse.json(pdf, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
