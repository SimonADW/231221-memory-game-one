const cardContainer = document.querySelector(".game-container");

const imagesArray = [
	"./assets/images/ballon-tomas-nozina.jpg",
	"./assets/images/donald-kin-li.jpg",
	"./assets/images/ferris-wheel-taylor-r.jpg",
	"./assets/images/mini-mouse-adrian-valverde.jpg",
	"./assets/images/palace-bastien-nvs.jpg",
	"./assets/images/wall-e-erik-mclean.jpg",
]

let attemptCounter = 0;
let currentlyFlippedCards = [];
let memoryCards = [];
let timeoutId = undefined;

const renderCards = ()=> {
	imagesArray.forEach((image, index)=> {
		for (let i = 0; i < 2; i++) {
			const card = document.createElement("div");
			card.className = "memory-card";
			card.dataset.pairId = index;
			card.style.order = Math.floor(Math.random() * imagesArray.length)
			cardContainer.appendChild(card);
		};
	});

	memoryCards = document.querySelectorAll(".memory-card");
	memoryCards.forEach(card => card.addEventListener("click", flipCard));
};

let gameOverMessage = document.querySelector("span");

const matchPair = ()=> {
	if (
		currentlyFlippedCards.length >= 2 &&
		currentlyFlippedCards[0].dataset.pairId ===
		 currentlyFlippedCards[1].dataset.pairId
	) {
		currentlyFlippedCards.forEach((matchedCard)=> {
			matchedCard.dataset.pairIdMatched = "true";
		});
		currentlyFlippedCards = [];
	};
};

const checkForWin = ()=> {
	return Array.from(memoryCards).every(card => card.classList.contains("is-flipped"));
}

const limitAttempts = ()=> {
	if (attemptCounter > 12) {
		gameOverMessage.classList.replace("hidden", "display");

		memoryCards.forEach((card) => {
			card.removeEventListener("click", flipCard)
		});
				
		setTimeout(()=>{
			window.location.reload();
		}, 5000)
	}
}

const flipCard = (flippedCard)=> {		
	const cardDOM = flippedCard.currentTarget;
	clearTimeout(timeoutId);

	if (cardDOM.classList.contains("is-flipped")) {
		return;
	}

	currentlyFlippedCards.push(cardDOM);		
	cardDOM.classList.toggle("is-flipped");	
	cardDOM.style.backgroundImage = `url(${
		imagesArray[cardDOM.dataset.pairId]
	})`;

	if (currentlyFlippedCards.length > 2) { 
		flipUnpairedCardsBack();		
	};
	
	if (currentlyFlippedCards.length === 2) {
		matchPair();	
		attemptCounter++;
		timeoutId = setTimeout(flipUnpairedCardsBack, 3000);
	};

	if (checkForWin()) {
		gameOverMessage.classList.replace("hidden", "display");
		gameOverMessage.style.color = "rgb(0,81,104)";
		gameOverMessage.textContent = `Game won on ${attemptCounter} attempts!`;
	}

	limitAttempts();
};

const flipUnpairedCardsBack = ()=> {
	memoryCards.forEach((card) => {
		if (card.dataset.pairIdMatched !== "true") {
			card.classList.remove("is-flipped");
			card.style.background =
			 "radial-gradient(rgb(212, 64, 24), rgb(223, 223, 223))";	
			card.style.backgroundSize = "cover";
		};
	});

	currentlyFlippedCards = [];		
}

renderCards();