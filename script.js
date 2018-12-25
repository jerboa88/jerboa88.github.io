var body = document.getElementsByTagName('body')[0],
		max = 150

function getVal() {
	return Math.round(Math.random() * max)
}

document.body.style.background = 'rgb(' + getVal() + ', ' + getVal() + ', ' + getVal() + ')'
