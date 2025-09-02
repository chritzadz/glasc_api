"use client";

export default function AddUserPage() {
	const handleSubmit = async () => {
		try {
			const res = await fetch("/api/skincare", {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			const data = await res.json();
			console.log(data);

		} catch(details){
			console.log(details);
		}
	}

	return (
		<div className="bg-white text-black w-screen h-screen" onClick={handleSubmit}>
			ClickMe!
		</div>
	);
}
