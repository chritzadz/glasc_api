import { NextResponse } from 'next/server';
import pool from '@/app/db/db';
import { SkincareProduct } from '@/types/skincare_product';

export async function GET() {
    try {
        const result = await pool.query(
            'SELECT * FROM products;',
            []
        );

        const existingProduct: SkincareProduct[] = result.rows;
        return NextResponse.json(existingProduct, { status: 201 });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Fail in route', details: (error as Error).message }, { status: 500 });
    }
}