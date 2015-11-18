var GuestController = {
	
	init: function () {
		GuestController.setForm();
		GuestController.showList();
	},
	
	setForm: function () {
		var form = document.querySelector('form');
		form.addEventListener('submit', function(event) {
			GuestController.addGuest(form);
			//it is to avoid form submition
			event.preventDefault();
		});
		GuestController.setFocus();
	},
	
	setFocus: function() {
		var inputName = document.getElementById('name');
		inputName.focus();
	},
	
	clearForm: function() {
		var form = document.querySelector('form');
		form.reset();
		GuestController.setFocus();
	},
	
	addGuest: function(form) {
		var guest = {
			name: form.name.value,
			email: form.email.value
		};
		GuestService.add(guest, function(addedGuest) {
			GuestController.addToHTML(addedGuest);
			GuestController.clearForm();
		});
	},
	
//	updateGuest: function(imgUpdate) {
//		form.name.value = imgDelete.dataset.guestname,
//		form.email.value = imgDelete.dataset.guestid;
//		

//	},
	
	deleteGuest: function(imgDelete) {
		var 
			guestName = imgDelete.dataset.guestname,
			guestId = imgDelete.dataset.guestid;
		
		if(confirm('Are you sure to delete ' + guestName + '?')) {
			GuestService.remove(guestId, function(isDeleted) {
				if(isDeleted) {
					$(imgDelete).parents('dl').remove();
				}
			})
		}
	},
	
	showList: function () {
		GuestService.getList(function(list) {
			list.forEach(function(guest) {
				GuestController.addToHTML(guest);
			});	
		});
	},
	
	addToHTML: function (guest) {
		var
			guestList = document.getElementById('guestList'),
			dl = document.createElement('dl'),
			dt = GuestController.createDT(guest),
			ddName = GuestController.createDD(guest.name, 'name'),
			imgDelete = GuestController.createDelete(guest),
//			imgUpdate = GuestController.createUpdate(guest),
			ddEmail = GuestController.createDD(guest.email, 'email');
		
		ddName.appendChild(imgDelete);
//		ddName.appendChild(imgUpdate);
		
		dl.appendChild(dt);
		dl.appendChild(ddName);
		dl.appendChild(ddEmail);
		
		guestList.appendChild(dl);
	},
	
	createImage: function(imageLocation) {
		var img = document.createElement('img');
		img.src = imageLocation;
		return img;
	},
	
	createDT: function(guest) {
		var 
			dt = document.createElement('dt'),
			img = GuestController.createImage('https://www.gravatar.com/avatar/' + md5(guest.email));
		
		dt.appendChild(img);
		dt.className = "photo";
		
		return dt;
	},
	
	createDD: function(value, className) {
		var dd = document.createElement('dd');
		
		dd.innerHTML = value;
		dd.className = className;
		
		return dd;
	},
	
	createDelete: function(guest) {
		var imgDelete = GuestController.createImage('assets/images/delete.gif');
		
		imgDelete.setAttribute('data-guestid', guest.id);
		imgDelete.setAttribute('data-guestname', guest.name);
		
		imgDelete.addEventListener('click', function() {
			GuestController.deleteGuest(this);
		});
		
		return imgDelete;
	},
	
//	createUpdate: function(guest) {
//		var imgUpdate = GuestController.createImage('assets/images/update.gif');
//		
//		imgUpdate.setAttribute('data-guestid', guest.id);
//		imgUpdate.setAttribute('data-guestname', guest.name);
//		
//		imgUpdate.addEventListener('click', function() {
//			GuestController.updateGuest(this);
//		});
		
//		return imgUpdate;
//	}

};

//TODO consider to have an HTMLService.js
//initialization
GuestController.init();
