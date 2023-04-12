const getTime = () => {
	const now = new Date();
	const time = now.toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	});
	return time;
};
module.exports = getTime;
