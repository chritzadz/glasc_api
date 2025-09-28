"use client";
import { useState } from "react";

export default function ScanPage() {
    const [result, setResult] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = (reader.result as string).split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    async function handleClick() {
        setResult(null);
        if (!selectedFile) {
            setResult("Please select an image file first.");
            return;
        }
        setLoading(true);
        try {
            const encoded = await fileToBase64(selectedFile);
            const res = await fetch('https://z3ci47ecgtvo5i4hxomvw2j3dq0ngxyu.lambda-url.ap-southeast-2.on.aws/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: encoded })
            });
            const data = await res.json();
            setResult(JSON.stringify(data));
        } catch (err) {
            setResult("Error fetching data");
        } finally {
            setLoading(false);
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    }

    return (
        <main style={{ maxWidth: 400, margin: "2rem auto", padding: 20 }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleClick} disabled={loading}>{loading ? "Loading..." : "Fetch Something"}</button>
            {result && <pre>{result}</pre>}
        </main>
    );
}
