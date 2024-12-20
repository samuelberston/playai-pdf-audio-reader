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
