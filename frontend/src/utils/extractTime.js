export function extractTime(dateString) {
// const dateString = "2024-07-07T14:30:00Z";
	const date = new Date(dateString);
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${hours}:${minutes}`;
}

// Helper function to pad single-digit numbers with a leading zero
//Converts the number to a string.
// Pads the string with leading zeros until it is at least 2 characters long.(return string)
function padZero(number) {
	return number.toString().padStart(2, "0");
}