// GET: Retrieves all PDF IDs for a user for the sidebar

import { pdfService } from '@/lib/services/pdf.service';
import { NextRequest, NextResponse } from 'next/server';

// GET: Retrieves all PDF IDs for a user for the sidebar
export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.pathname.split('/').pop() as string
        // Validate userId - use validator function...
        if (!userId) {
            throw new Error('Invalid userId');
        }
        const pdfs = await pdfService.findByUserId(userId);
        return NextResponse.json({PDFs: pdfs}, {status: 200});
    } catch (error) {
        console.error('Error in GET /api/pdf/user/[userId]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};

// POST: Upload a new PDF for a specific user
export async function POST(req: NextRequest) {
    try {
        const userId = req.nextUrl.pathname.split('/').pop() as string;
        if (!userId) {
            throw new Error('Invalid userId');
        }

        const formData = await req.formData();
        const file: File | null = formData.get('pdf') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Upload file
        const { name, path, pageCount } = await pdfService.upload(file);
        
        // Create PDF record with pdfService
        const pdf = await pdfService.create({ userId, name, path, pageCount, metadata: {} });

        return NextResponse.json(pdf, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/pdf/user/[userId]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
