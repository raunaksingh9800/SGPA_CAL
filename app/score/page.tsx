'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import Link from 'next/link';

function ScoreContent() {
    const searchParams = useSearchParams();
    const s = searchParams.get('s');

    useEffect(() => {
        if (!s) return;

        confetti({
            particleCount: 1000,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, [s]);

    return (
        <div className=' text-center flex flex-col w-screen h-screen justify-center items-center'>
            <h1 className=' text-2xl mb-2 opacity-60'>Your Score</h1>
            <h2 className='text-8xl font-semibold'>{s}</h2>

            <Link href={'/'} className=' underline mt-4'>Go back</Link>
        </div>
    );
}

export default function ScorePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ScoreContent />
        </Suspense>
    );
}
