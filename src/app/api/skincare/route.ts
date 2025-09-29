import { NextResponse } from 'next/server';
import pool from '@/app/db/db';
import { SkincareProduct } from '@/types/skincare_product';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get('product_id');

        let query: string;
        let params: (string | number | boolean | null)[];

        if (productId) {
            query = 'SELECT * FROM products WHERE product_id = $1;';
            params = [productId];
        } else {
            query = 'SELECT * FROM products LIMIT 50;';
            params = [];
        }

        const result = await pool.query(query, params);

        const existingProduct: SkincareProduct[] = result.rows;
        
        if (productId && existingProduct.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(existingProduct, { status: 200 });
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Fail in route', details: (error as Error).message }, { status: 500 });
    }
}