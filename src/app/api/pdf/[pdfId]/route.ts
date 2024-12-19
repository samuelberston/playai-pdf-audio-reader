/**
 * GET: Retrieves PDF metadata and possibly a signed URL for accessing the file.
 * DELETE: Allows deletion of a PDF (if user permissions are implemented).
 */

import { pdfService } from '@/lib/services/pdf.services';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const userId: string = req.nextUrl.pathname.split('/').pop() as string;
        const pdf = await pdfService.findByUserId(userId);
        return NextResponse.json({PDF: pdf}, {status: 200});
    } catch (error) {
        console.error('Error in GET /api/pdf/[pdfId]:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}