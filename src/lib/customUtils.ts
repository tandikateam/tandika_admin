export function isValidEmail(email: string) {
	// Regular expression for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Test the email against the regex
	return emailRegex.test(email);
}

export function colorClass(color: string, fore: string) {
	return ` bg-[${color}] hover:bg-[${color}]  text-[${fore}] ease-in transition-colors`;
}

export function colorClassOutline(color: string, fore: string) {
	return ` bg-[${fore}] hover:bg-[${color}] hover:text-[${fore}]  text-[${color}] border-[${color}] border ease-in transition-colors`;
}

export function getSocialMediaPlatform(url: string) {
	// Convert the URL to lowercase for case-insensitive matching
	const lowercaseUrl = url.toLowerCase();

	// Define patterns for different social media platforms
	const patterns = {
		facebook: /facebook\.com|fb\.com/,
		twitter: /twitter\.com|x\.com/,
		instagram: /instagram\.com|instagr\.am/,
		linkedin: /linkedin\.com/,
		youtube: /youtube\.com|youtu\.be/,
		tiktok: /tiktok\.com/,
		pinterest: /pinterest\.com/,
		snapchat: /snapchat\.com/,
		reddit: /reddit\.com/,
		whatsapp: /whatsapp\.com/,
		telegram: /t\.me|telegram\.org/,
		medium: /medium\.com/,
		github: /github\.com/
	};

	// Check the URL against each pattern
	for (const [platform, pattern] of Object.entries(patterns)) {
		if (pattern.test(lowercaseUrl)) {
			return platform.charAt(0).toUpperCase() + platform.slice(1);
		}
	}

	// If no match is found, return 'Unknown'
	return 'Unknown';
}

export function isValidUrl(string: string) {
	if (!string || string.trim() === '') {
		return false;
	}
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
}
