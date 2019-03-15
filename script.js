;(function(){
	var buttons = [document.getElementById('about_button'), document.getElementsByTagName('section')[0]],
		arrow = document.getElementsByClassName('fa-angle-down')[0],
		deg = 0

	for (let i = 0; i < 2; i++) {
		buttons[i].addEventListener('click', function() {
			buttons[1].classList.toggle('open')
			deg += 180
			arrow.style.transform = 'rotate(' + deg + 'deg)'
		})
	}
})();
