'use client';

import React, { useState } from 'react';

export default function ScanPage() {
    const [image, setImage] = useState<File | null>(null);
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return;

        setLoading(true);
        setResult(null);

        // Convert image to base64
        const reader = new FileReader();
        reader.onloadend = async () => {
            try {
                const base64String = (reader.result as string).split(',')[1];
                console.log("fecthing base64: " + base64String);
                const res = await fetch('/api/scanOCR', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64String }),
                });
                console.log("finish fetching");
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.details|| 'Unknown error');
                }
                const data = await res.json();
                setResult(data);
            } catch (error) {
                console.error('Error during OCR fetch:', error);
                setResult({ error: (error as Error).message });
            } finally {
                setLoading(false);
            }
        };
        reader.readAsDataURL(image);
    };

    return (
        <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
            <h2>Scan Product Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit" disabled={!image || loading} style={{ marginLeft: 8 }}>
                    {loading ? 'Scanning...' : 'Scan'}
                </button>
            </form>
            {result && (
                <div style={{ marginTop: 24 }}>
                    <h4>OCR Text:</h4>
                    <pre>{result.ocrText}</pre>
                    <h4>Top Matches:</h4>
                    <ul>
                        {result.matches?.map((row: any, idx: number) => (
                            <li key={idx}>{row.product_name} (similarity: {row.sim.toFixed(2)})</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}