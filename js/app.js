const cardContainer = document.querySelector(".game-container");

const imagesArray = [
	"./assets/images/ballon-tomas-nozina.jpg",
	"./assets/images/donald-kin-li.jpg",
	"./assets/images/ferris-wheel-taylor-r.jpg",
	"./assets/images/mini-mouse-adrian-valverde.jpg",
	"./assets/images/palace-bastien-nvs.jpg",
	"./assets/images/wall-e-erik-mclean.jpg",
]

const renderCards = ()=> {
	imagesArray.forEach((image, index)=> {
		for (let i = 0; i < 2; i++) {
			const card = document.createElement("div");
			card.className = "memory-card";
			card.dataset.pair = index;
			card.style.order = Math.floor(Math.random() * imagesArray.length)
			// card.style.backgroundImage = `url(${image})`;			
			cardContainer.appendChild(card);
		};
	});
};

renderCards();

const memoryCards = document.querySelectorAll(".memory-card");

const flipCard = (flippedCard)=> {	
	flippedCard.style.backgroundImage = `url(${imagesArray[event.currentTarget.dataset.pair]})`
};

memoryCards.forEach((card) => {
	card.addEventListener("click", ()=> {
		flipCard(card);
	});
});


