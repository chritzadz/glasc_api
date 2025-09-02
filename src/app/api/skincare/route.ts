import { NextResponse } from 'next/server';
export async function GET() {
    try {
        const res = await fetch("https://skincare-api.herokuapp.com/products", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		const data = await res.json();
        return NextResponse.json(data, { status: 201 });
        
    } catch (error) {
        console.error('Fetch error:', error);
        return NextResponse.json({ error: 'Fail in route', details: (error as Error).message }, { status: 500 });
    }
}