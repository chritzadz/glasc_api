import { NextRequest, NextResponse } from 'next/server';
import pool from '@/app/db/db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const product_id_str = searchParams.get('product_id');
    const product_id = product_id_str ? parseInt(product_id_str, 10) : null;

    if (!product_id) {
        return NextResponse.json({ error: 'Invalid or missing product_id' }, { status: 400 });
    }

    try {
        const result = await pool.query(
            `SELECT i.ingredient_name FROM products p
                INNER JOIN product_ingredients pi USING(product_id)
                INNER JOIN ingredients i USING(ingredient_id)
                WHERE p.product_id= $1
            ;`,
            [product_id]
        );

        const ingredients: string[] = result.rows.map(row => row.ingredient);;
        return NextResponse.json(ingredients, { status: 201 });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Fail in route', details: (error as Error).message }, { status: 500 });
    }
}