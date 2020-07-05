let down_button = document.getElementById('down-button'),
nextAnchor = document.getElementById('about')

if (down_button) {
	down_button.setAttribute('href', 'javascript:;')
	down_button.addEventListener('click', function() {
		nextAnchor.scrollIntoView(true)
	})
}
