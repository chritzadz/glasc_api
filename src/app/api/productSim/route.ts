import pool from "@/app/db/db";
import { OcrProduct } from "@/types/ocrProduct";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');

    if (!text) {
        return NextResponse.json(
            { error: 'Missing text query parameter' },
            { status: 400 }
        );
    }

    try {
        const task = await pool.query(
            `SELECT product_id, product_name, similarity(product_name, $1) AS sim
                FROM products
                ORDER BY sim DESC
                LIMIT 5;`,
            [text]
        );

        const simProducts: OcrProduct[] = task.rows;
        return NextResponse.json({ simProducts }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed fetching skincare routine', details: (error as Error).message },
            { status: 500 }
        );
    }
}
