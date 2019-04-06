/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Header.
	if ($banner.length > 0
		&& $header.hasClass('alt')) {

		$window.on('resize', function () { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function () { $header.removeClass('alt'); },
			enter: function () { $header.addClass('alt'); },
			leave: function () { $header.removeClass('alt'); }
		});

	}

	// Menu.
	var $menu = $('#menu');

	$menu._locked = false;

	$menu._lock = function () {

		if ($menu._locked)
			return false;

		$menu._locked = true;

		window.setTimeout(function () {
			$menu._locked = false;
		}, 350);

		return true;

	};

	$menu._show = function () {

		if ($menu._lock())
			$body.addClass('is-menu-visible');

	};

	$menu._hide = function () {

		if ($menu._lock())
			$body.removeClass('is-menu-visible');

	};

	$menu._toggle = function () {

		if ($menu._lock())
			$body.toggleClass('is-menu-visible');

	};

	$menu
		.appendTo($body)
		.on('click', function (event) {

			event.stopPropagation();

			// Hide.
			$menu._hide();

		})
		.find('.inner')
		.on('click', '.close', function (event) {

			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			// Hide.
			$menu._hide();

		})
		.on('click', function (event) {
			event.stopPropagation();
		})
		.on('click', 'a', function (event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			$menu._hide();

			// Redirect.
			window.setTimeout(function () {
				window.location.href = href;
			}, 350);

		});

	$body
		.on('click', 'a[href="#menu"]', function (event) {

			event.stopPropagation();
			event.preventDefault();

			// Toggle.
			$menu._toggle();

		})
		.on('keydown', function (event) {

			// Hide on escape.
			if (event.keyCode == 27)
				$menu._hide();

		});

})(jQuery);

class Contact {
	constructor(subject, name, email, phone, message) {
		this.subject = subject;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.message = message;
	}
}
class UI {
	static displayContact() {
		const contacts = Store.getcontact();
		contacts.forEach((contact) => UI.addContactToList(contact));
	}
	static addContactToList(contact){
	const list = document.querySelector('#contact-list')
	const row = document.createElement('tr');
	row.innerHTML = `
		<td>${contact.subject}</td>
		<td>${contact.name}</td>
		<td>${contact.email}</td>
		<td>${contact.phone}</td>
		<td>${contact.message}</td>
		<td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>`;
	list.appendChild(row);
	}
	//	Delete Contact
	static deleteContact(el){
		if(el.classList.contains('delete')){
			console.log("ReSTO");
			
			el.parentElement.parentElement.remove();
		}
	
	}
	static clearFields() {
		document.querySelector('#subject').value = '';
		document.querySelector('#name').value = '';
		document.querySelector('#email').value = '';
		document.querySelector('#phone').value = '';
		document.querySelector('#message').value = '';
	  }
}


document.addEventListener('DOMContentLoaded',UI.displayContact);

document.querySelector('#contact')

class Store {
	static getcontact() {
		let contacts;
		if(localStorage.getItem('contacts') === null) {
			contacts = [];
		}else{
			contacts = JSON.parse(localStorage.getItem('contacts'));
		}
		return contacts;
	}
	static addContact(contact) {
		const contacts = Store.getcontact();
		contacts.push(contact);
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}
	static removeContact(message) {
		const contacts = Store.getcontact();
		console.log(message);
		contacts.forEach((contact,index) => {
			if(contact.message === message ){
				contacts.splice(index,1);
				console.log("ReSTO");
			}
		});
		localStorage.setItem('contacts',JSON.stringify(contacts));
	}
}
document.querySelector('#contact-form').addEventListener('submit', (e) => {

e.preventDefault();

const subject = document.querySelector('#subject').value;
const name = document.querySelector('#name').value;
const email = document.querySelector('#email').value;
const phone = document.querySelector('#phone').value;
const message = document.querySelector('#message').value;

if(subject === '' || name === '' || email === '' || phone === '' || message === '') {
	//UI.showAlert('Please fill in all fields', 'danger');
	
  } else {
    const contact =new Contact(subject,name,email,phone,message);
    UI.addContactToList(contact);
    Store.addContact(contact);
		UI.clearFields();
	
  }

});

document.querySelector('#contact-list').addEventListener('click', (e) => {

	UI.deleteContact(e.target);
	// Remove book from store
	console.log("ReSTO");
	Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
	//UI.showAlert('Contact Removed', 'success');
  });






