'use client';

import { useState } from 'react';
import Upload from '../upload/Upload';
import { PDF } from '@/types';

interface MainContentProps {
    selectedPdf?: PDF;
}

export default function MainContent({ selectedPdf }: MainContentProps) {
    const [activeMode, setActiveMode] = useState<'upload' | 'viewer'>(
        selectedPdf ? 'viewer' : 'upload'
    );

    return (
        <main className="flex-1 p-6 ml-64"> {/* ml-64 matches sidebar width */}
            <div className="h-full flex items-center justify-center">
                {activeMode === 'upload' ? (
                    <div className="max-w-lg w-full">
                        <Upload onUploadComplete={() => setActiveMode('viewer')} />
                    </div>
                ) : (
                    <div className="w-full h-full">
                        {/* PDF Viewer component will go here */}
                        <p>PDF Viewer Mode (Coming soon)</p>
                    </div>
                )}
            </div>
        </main>
    );
}
