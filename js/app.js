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


const flipCard = (flippedCard)=> {		

	flippedCard.style.backgroundImage = `url(${imagesArray[event.currentTarget.dataset.pairId]})`;
};

const flipUnpairedCardsBack = ()=> {

}


memoryCards.forEach((card) => {
	card.addEventListener("click", ()=> {		
		flipCard(event.currentTarget);	
		
		timeoutId = setTimeout(()=>{
			flipUnpairedCardsBack()}, 2000);	
	});
});


