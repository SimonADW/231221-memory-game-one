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


let timeoutId = undefined;
let memoryCards = document.querySelectorAll(".memory-card");
let isFlipped = false;
let firstCard = undefined;
let secondCard = undefined;
let isMatch = false;
let lockBoard = false;

const matchPair = ()=> {
	isMatch = firstCard.dataset.pairId === secondCard.dataset.pairId;

	if (isMatch) {
		console.log("Match!");
		disableClickListeners();
		return;
	}
}

const flipCard = (flippedCard)=> {		
	if (lockBoard) return;
	clearTimeout(timeoutId);	
	if (!isFlipped) {
		firstCard = event.currentTarget;		
		isFlipped = true;	
	}

	secondCard = event.currentTarget;
	flippedCard.style.backgroundImage = `url(${imagesArray[event.currentTarget.dataset.pairId]})`;
	matchPair();
};

const disableOtherCards = ()=> {

}

const disableClickListeners = ()=> {
	firstCard.removeEventListener("click", flipCard)
	secondCard.removeEventListener("click", flipCard)
}

const flipUnpairedCardsBack = ()=> {
	if (!isMatch) {
		firstCard.style.background = "radial-gradient(rgb(212, 64, 24), rgb(223, 223, 223))";
		firstCard.style.backgroundSize = "cover";
		secondCard.style.background = "radial-gradient(rgb(212, 64, 24), rgb(223, 223, 223))";
		secondCard.style.backgroundSize = "cover";
	}
	isFlipped = false;
}


memoryCards.forEach((card) => {
	card.addEventListener("click", ()=> {		
		flipCard(event.currentTarget);	
		
		

		timeoutId = setTimeout(()=>{
			flipUnpairedCardsBack()}, 2000);	
	});
});


