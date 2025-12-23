const btnMenu = document.querySelector('.qela-btn-menu');
const menuAside = document.querySelector('.qela-menu');
const menuLinks = menuAside.querySelectorAll('.nav-link small');
const sidebarTooltips = document.querySelectorAll('[data-bs-custom-class="qela-sidebar-tooltip"],[data-bs-custom-class="qela-sidebar-tooltip settings"]');


// open/close menu
if (menuAside) {
	btnMenu.addEventListener('click', () => {
		btnMenu.classList.toggle('close');
		menuAside.classList.toggle('close');
		// document.body.classList.toggle('active');
	});
	const observer = new ResizeObserver(entrirs => {
		const elem = entrirs[0];
		let widthAside = elem.borderBoxSize[0].inlineSize;
		document.body.style.paddingLeft = widthAside + 'px';
	})
	observer.observe(menuAside);

	for (let i = 0; i < menuLinks.length; i++) {
		const el = menuLinks[i];
		const parentWidth = el.parentElement.offsetWidth;

		const contentWidth = el.scrollWidth;

		if (contentWidth > parentWidth) {
			el.classList.add('sm');
		} else {
			el.classList.remove('sm');
		}
	}
}
// hide tooltips when menu open
for (let i = 0; i < sidebarTooltips.length; i++) {
	sidebarTooltips[i].addEventListener('show.bs.tooltip', event => {
		if (!menuAside.classList.contains('close') && window.innerWidth > 1440) return event.preventDefault();
		else if (menuAside.classList.contains('close') && window.innerWidth < 1440) return event.preventDefault();
	})
}
// tooltip
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
// toast
// const toastElList = document.querySelectorAll('.toast');
// const toastList = [...toastElList].map(toastEl => new bootstrap.Toast(toastEl));
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
	toastTrigger.addEventListener('click', () => {
		const toast = new bootstrap.Toast(toastLiveExample)
		toast.show()
	})
}

// texarea autoheight
const myText = document.querySelector('textarea[type="message"]');
if (myText) {
	const maxHeight = (myText.dataset.maxHeight * 23 + (myText.scrollHeight - 25));
	myText.style.height = `${myText.scrollHeight}px`;
	myText.addEventListener("input", function () {
		this.style.height = "auto";
		if (myText.scrollHeight <= maxHeight) {
			this.style.cssText = `height: ${this.scrollHeight}px; overflow-y: hidden`;
		} else {
			this.style.cssText = `height: ${maxHeight}px; overflow-y: auto`;
		}
	});
}
// fix IOS modals zoom 
document.addEventListener('DOMContentLoaded', function () {
	const isIOS = /iP(ad|hone|od)/.test(navigator.userAgent);
	let scrollPosition = 0;
	if (isIOS) {
		const modals = document.querySelectorAll('.modal');
		modals.forEach(modal => {
			modal.addEventListener('show.bs.modal', () => {
				scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
				modal.style.position = 'absolute';
				modal.style.top = scrollPosition + 'px';
			});

			modal.addEventListener('hidden.bs.modal', () => {
				modal.style.position = '';
				modal.style.top = '';
				window.scrollTo(0, scrollPosition);
			});
		});
	}
});

document.addEventListener('DOMContentLoaded', () => {
	const ddHover = document.querySelectorAll('.qela-hover-dropdown');
	if (ddHover.length > 0) {
		ddHover.forEach(dd => {
			const toggle = dd.querySelector('.btn');
			if (!toggle) return; // защита от null
			const dropdown = new bootstrap.Dropdown(toggle); // инициализация вручную
			dd.addEventListener('mouseenter', () => {
				dropdown.show();
			});

			dd.addEventListener('mouseleave', () => {
				dropdown.hide();
			});
		});
	}
});