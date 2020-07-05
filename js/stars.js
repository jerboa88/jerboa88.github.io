(function() {
	// Config
	let numberOfStars = 300,
			maxStarSize = 5,
			minStarSize = 1,
			starClassName = 'star',
			starParentClass = 'background';

	// Runtime variables
	let actualMaxStarSize = maxStarSize - minStarSize + 1,
			parentContainer = document.getElementsByClassName(starParentClass)[0],
			isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


	numberOfStars = (isMobile) ? numberOfStars / 2 : numberOfStars;


	function generateStar() {
    this.obj = document.createElement('div');
		this.obj.classList.add(starClassName);
		this.obj.style.left = Math.floor((100 * Math.random())) + '%';
		this.obj.style.top = Math.floor((50 * Math.random())) + '%';
    this.size = Math.floor(actualMaxStarSize * Math.random()) + minStarSize;
    this.obj.style.height = this.size + 'px';
		this.obj.style.width = this.size + 'px';
		this.obj.setAttribute('data-rellax-speed', this.size);

    parentContainer.appendChild(this.obj);
	}


	;(function generateAllStars() {
		for (let i = 0 ; i < numberOfStars; i++) {
			generateStar();
		}

		new Rellax('.' + starClassName);

		window.scrollTo(0,0);
	})()
})();
