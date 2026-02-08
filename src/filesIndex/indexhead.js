
function addDarkClass() {
	try {
		if (localStorage.getItem("theme") === "night-theme") {
			document
				.body
				.classList
				.add("night-theme");
		} else {
			document
				.body
				.classList
				.remove("night-theme");
		}
	} catch (err) { }
}
addDarkClass();
