function stringTo12hrFormatTimeString(timeString: string) {
	// Split the time string into hours, minutes, and seconds
	const [hours, minutes, seconds] = timeString.split(":").map(Number);

	// Create a new Date object and set the time
	const date = new Date();
	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(seconds);

	// Format the date to "HH:MM AM/PM" using toLocaleTimeString
	return date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});
}

export {stringTo12hrFormatTimeString}