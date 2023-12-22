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
			card.dataset.pairId = index;
			card.style.order = Math.floor(Math.random() * imagesArray.length)
			cardContainer.appendChild(card);
		};
	});
};

renderCards();

let attemptCounter = 0;
let flipCounter = 0;
let currentlyFlippedCards = [];
let timeoutId = undefined;

let memoryCards = document.querySelectorAll(".memory-card");

const flipCard = (flippedCard)=> {		
	clearInterval(timeoutId)
	currentlyFlippedCards.push(flippedCard);
	if (flipCounter < 2) {
		flipCounter++;		
	} else {
		flipCounter = 0;
		currentlyFlippedCards = [];;
		flipUnpairedCardsBack();
	}		

	if (flipCounter === 2 && currentlyFlippedCards[0].dataset.pairId === currentlyFlippedCards[1].dataset.pairId) {
		console.log("Match");
		currentlyFlippedCards.forEach((flippedCard)=> {	
			flippedCard.dataset.pairIdMatched = "true";
		})
	}

	flippedCard.style.backgroundImage = `url(${imagesArray[event.currentTarget.dataset.pairId]})`
};


const flipUnpairedCardsBack = ()=> {
		memoryCards = document.querySelectorAll(".memory-card");
		memoryCards.forEach((card) => {
			if (card.dataset.pairIdMatched !== "true") {
				card.style.background = "radial-gradient(rgb(212, 64, 24), rgb(223, 223, 223))";	
				card.style.backgroundSize = "cover";
			};

		});
		flipCounter = 0;
		currentlyFlippedCards = [];
}

const markPairedCards = ()=> {
	attemptCounter++;
}

memoryCards.forEach((card) => {
	card.addEventListener("click", ()=> {
		
		flipCard(event.currentTarget);			
		timeoutId = setTimeout(()=>{
			flipUnpairedCardsBack()}, 3000)
	});
});


