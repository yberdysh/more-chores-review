document.addEventListener("DOMContentLoaded", () => {
	console.log("loaded")


	const choresURL = ` http://localhost:3000/chores`
	let choreList = document.querySelector('#chore-list')
	const choreForm = document.getElementById('new-chore-form')

	fetch(choresURL)
		.then(res => res.json())
		.then(chores => chores.forEach(displayChore))

	function displayChore(chore) {

		const choreCard = document.createElement('div');
		choreCard.className = "chore-card";

		// console.log(chore)
		choreCard.innerHTML = `
    <button data-id=${chore.id} class="delete-button">x</button>
    <h3>${chore.title}</h3>
    <p>${chore.duration}</p>
    <input class="change-priority" value='${chore.priority}'>
`
		choreList.append(choreCard)

		const choreInput = choreCard.querySelector("input");
		console.log(choreInput);
		choreInput.addEventListener("blur", e => {
			console.log(e)
			fetch(`http://localhost:3000/chores/${chore.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify({
					priority: e.target.value
				})

			})
		})
		// .addEventListener("click", event => {
		//   if(event.target.classList.contains("change-priority")) {
		//    console.log("hi")
		//   }
		// })
	}

	choreForm.addEventListener('submit', event => {
		event.preventDefault()
		let title = (event.target.title.value)
		let priority = (event.target.priority.value)
		let duration = (event.target.duration.value)
		fetch(choresURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					priority,
					title,
					duration
				})
			}).then(request => request.json())
			.then(displayChore)

	})

	choreList.addEventListener("click", (e) => {
		if (e.target.className === "delete-button") {
			deleteChore(e)
		}
	})

	function deleteChore(e) {
		let choreId = (e.target.dataset.id)
		// e.target.parentElement.remove()
		fetch(`http://localhost:3000/chores/${choreId}`, {
				method: "DELETE"
			})
			.then(() => e.target.parentElement.remove())
	}

	// const patchLabel = choreList.querySelector('.change-priority')
	// console.log(patchLabel)
	// console.log(choreList)

})
