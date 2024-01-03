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
let currentlyFlippedCards = [];
let timeoutId = undefined;

let memoryCards = document.querySelectorAll(".memory-card");

const limitAttempts = ()=> {
	if (attemptCounter > 10) {
		alert("Game Over, sucker!");

		setTimeout((window.location.reload()), 2000)
	}
}

const matchPair = ()=> {
	if (currentlyFlippedCards.length >= 2 && (currentlyFlippedCards[0].dataset.pairId === currentlyFlippedCards[1].dataset.pairId)) {
		currentlyFlippedCards.forEach((matchedCard)=> {
			matchedCard.dataset.pairIdMatched = "true";
			console.log(matchedCard.dataset.pairIdMatched);
		});
		currentlyFlippedCards = [];
	};
};

const flipCard = (flippedCard)=> {		
	if (event.currentTarget === currentlyFlippedCards[0]) return;
	clearInterval(timeoutId);
	currentlyFlippedCards.push(flippedCard);		
	matchPair();	
	flippedCard.style.backgroundImage = `url(${imagesArray[event.currentTarget.dataset.pairId]})`;

	if (currentlyFlippedCards.length > 2) { 
		flipUnpairedCardsBack();		
	};		
	
	limitAttempts();
};


const flipUnpairedCardsBack = ()=> {
		memoryCards = document.querySelectorAll(".memory-card");
		memoryCards.forEach((card) => {
			if (card.dataset.pairIdMatched !== "true") {
				card.style.background = "radial-gradient(rgb(212, 64, 24), rgb(223, 223, 223))";	
				card.style.backgroundSize = "cover";
			};
		});	
		currentlyFlippedCards = [];
		attemptCounter++;
}

memoryCards.forEach((card) => {
	card.addEventListener("click", ()=> {		
		
		flipCard(event.currentTarget);	
		
		timeoutId = setTimeout(()=>{
			flipUnpairedCardsBack()}, 2000);		
	});
});


