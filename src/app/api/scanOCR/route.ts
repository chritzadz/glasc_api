import { NextRequest, NextResponse } from 'next/server';
import { createWorker } from 'tesseract.js';
import pool from '@/app/db/db';

export async function POST(request: NextRequest) {
    //upload to aws s3, for the image. 
    console.log("in POST")
    try {
        const body = await request.json();
        const { image } = body;

        console.log("fetch lambda");
        const ocrRes = await fetch("https://wuvfgytc6fulr3vvdtr3nbro5u0afaas.lambda-url.ap-southeast-2.on.aws/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image }),
        });
        console.log("done fetching lambda");

        if (!ocrRes.ok) {
            const err = await ocrRes.json();
            throw new Error(err.error || 'Failed to OCR image');
        }

        const { ocrText } = await ocrRes.json();

        const query = `
            SELECT product_name, similarity(product_name, $1) AS sim
            FROM products
            ORDER BY sim DESC
            LIMIT 5;
        `;
        const { rows } = await pool.query(query, [ocrText]);
        return NextResponse.json({ ocrText, matches: rows }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to process image', details: (error as Error).message }, { status: 400 });
    }
}