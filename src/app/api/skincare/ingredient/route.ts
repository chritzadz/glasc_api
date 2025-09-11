import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/db/db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const product_name = searchParams.get('product_name');

    try {
        const result = await pool.query(
            `SELECT pi.ingredient FROM products p INNER JOIN product_ingredients pi USING(product_name)
                WHERE p.product_name = $1
            ;`,
            [product_name]
        );

        const ingredients: string[] = result.rows;
        return NextResponse.json(ingredients, { status: 201 });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Fail in route', details: (error as Error).message }, { status: 500 });
    }
}