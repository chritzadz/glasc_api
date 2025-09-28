'use client';

export default function HomePage() {
	const handleDownload = () => {
		const apkUrl = "/glasc_v1.0.0.apk";
		const link = document.createElement('a');
		link.href = apkUrl;
		link.download = 'GlascApp.apk';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="bg-gradient-to-br from-[#B87C4C] to-[#B87C4C] min-h-screen flex items-center justify-center p-4">
			<div className="bg-[#F7F4EA] rounded-lg shadow-xl p-8 max-w-md w-full text-center">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-800 mb-2">Glasc</h1>
					<p className="text-gray-600">Download the latest version of our mobile app</p>
				</div>
				
				<div className="mb-6">
					<div className="w-20 h-20 bg-[#B87C4C] rounded-full flex items-center justify-center mx-auto mb-4">
						<svg className="w-10 h-10 text-[#F7F4EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
						</svg>
					</div>
					<p className="text-sm text-gray-500">Version 1.0.0</p>
				</div>

				<button
					onClick={handleDownload}
					className="w-full bg-[#B87C4C] hover:bg-[#996032] text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
					<span>Download APK</span>
				</button>

				<p className="text-xs text-gray-400 mt-4">
					Make sure to enable &quot;Install from unknown sources&quot; in your device settings
				</p>
			</div>
		</div>
	);
}
