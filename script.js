var buttons = [document.getElementById('about_button'), document.getElementsByTagName('section')[0]]

for (let i = 0; i < 2; i++) {
	buttons[i].addEventListener('click', function() {
		buttons[1].classList.toggle('open')
	})
}
