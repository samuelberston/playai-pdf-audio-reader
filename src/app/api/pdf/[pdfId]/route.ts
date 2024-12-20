/**
 * GET: Retrieves PDF metadata and possibly a signed URL for accessing the file.
 */

import { pdfService } from '@/lib/services/pdf.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const pdfId: string = req.nextUrl.pathname.split('/').pop() as string;
        const pdf = await pdfService.findById(pdfId);
        return NextResponse.json({PDF: pdf}, {status: 200});
    } catch (error) {
        console.error('Error in GET /api/pdf/[pdfId]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
