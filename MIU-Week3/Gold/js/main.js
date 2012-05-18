// VFW Week 4
// Conrad Aube

//JQM Friendly JS

var parseAddForm = function(data){
	//uses form data here;
	console.log (data);
};
// Wait for DOM
$(document).ready(function(){
	// get element by ID
	function GE(x){
		var theElement = document.getElementById(x);
		return theElement;
	};

	var addForm = $('#itemForm');
	
	addForm.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			/* JQuery Form Handling
			var data = addForm.serialize();
			parseAddForm(data);		*/
			//Old Form Handling
			if(!key){//if no key, generate new one
				var id = Math.floor(Math.random()*10000000000);
				var alertTxt = "Item added!";
			}else{//If key exists, edit existing item
				id = key;
				alertTxt = "Item updated!";
			};
			//Get form values, store in object
			//object properties contain array with label and value
			getSelectedCheck();
			var item = {};
				item.name = ["Name", GE('name').value];
				item.cat = ["Category", GE('cats').value];
				item.wght = ["Weight", GE('wght').value];
				item.packed = ["Packed", packedValue];
				item.date = ["Date", GE('pdate').value];
				item.note = ["Notes", GE('note').value];
			//Stringify and save
			localStorage.setItem(id, JSON.stringify(item));
			alert(alertTxt);
			}
	});

	//Create select field elements and add options
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //array of form tags
			selectSelect = GE('cats');
		for (var i=0, j=typeGroups.length; i<j; i++){
			var makeOptions = document.createElement('option');
			var optText = typeGroups[i];
			makeOptions.setAttribute("value", optText);
			makeOptions.innerHTML = optText;
			selectSelect.appendChild(makeOptions);
		};
	};
	// Find checkbox value
	function getSelectedCheck(){
		if(GE('packed').checked){
			packedValue = GE('packed').value;
		}else{
			packedValue = "No";
		};
		
	};
	/*
	// Create browse by category list
	function makeBrowse(){
		// i starts at 1 to skip the first option, "Select a category"
		for (var i=1, j=typeGroups.length; i<j; i++){
			var makeLI = document.createElement('li');
			var catText = typeGroups[i];
			var brLink = document.createElement('a');
				brLink.href = '#';
				brLink.innerHTML = catText;
			makeLI.appendChild(brLink);
			browseCat.appendChild(makeLI);
			console.log(catText);
		};
	};	
	*/
	// Save to local storage
	function submitData(key){
		if(!key){//if no key, generate new one
			var id = Math.floor(Math.random()*10000000000);
			var alertTxt = "Item added!";
		}else{//If key exists, edit existing item
			id = key;
			var alertTxt = "Item updated!";
		};
		//Get form values, store in object
		//object properties contain array with label and value
		getSelectedCheck();
		var item = {};
			item.name = ["Name", GE('name').value];
			item.cat = ["Category", GE('cats').value];
			item.wght = ["Weight", GE('wght').value];
			item.packed = ["Packed", packedValue];
			item.date = ["Date", GE('pdate').value];
			item.note = ["Notes", GE('note').value];
		//Stringify and save
		localStorage.setItem(id, JSON.stringify(item));
		alert(alertTxt);
	};
	// Retrieve local storage and display it
	function getLocalData(){
		//toggleControls("on");
		if(localStorage.length === 0){
			alert("No data in local storage. Loading test data.");
			autoFill();
		};
		//Write data from local storage
		$("#itemList").empty();
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeLI = document.createElement('li');
			var key = localStorage.key(i);
			//var value = localStorage.getItem(key);
			var dataObj = JSON.parse(localStorage.getItem(key)); //Convert local storage string to object
			console.log(dataObj.cat[1]);
			var makeSubList = $("<li></li>");
			var makeSubLI = $('<img src="images/icons/' + dataObj.cat[1] + '.png">' +
				"<h3>" + dataObj.name[1] + "</h3>" +
				"<p><strong>" + dataObj.cat[0] + ":</strong> " + dataObj.cat[1] + "</p>" +
				"<p><strong>" + dataObj.wght[0] + ":</strong> " + dataObj.wght[1] + "</p>" +
				"<p><strong>" + dataObj.packed[0] + ":</strong> " + dataObj.packed[1] + "</p>" +
				"<p><strong>" + dataObj.date[0] + ":</strong> " + dataObj.date[1] + "</p>" +
				"<p><strong>" + dataObj.note[0] + ":</strong> " + dataObj.note[1] + "</p>");
			var makeLink = $("<a href='#' id='"+key+"'>Edit Item</a>");
				makeLink.on('click', editItem());
		};
		$("#itemList").listview('refresh');
	};
	// Make item links function
	function makeItemLinks(key, linksDiv){
		//Edit Item
		var editLink = document.createElement('a');
			editLink.setAttribute('data-role', 'button');
			editLink.setAttribute('data-icon', 'gear');
			editLink.href = '#';
			editLink.key = key;
			editText = "Edit Item ";
			editLink.addEventListener("click", editItem);
			editLink.innerHTML = editText;
		linksDiv.appendChild(editLink);
		//Delete Item
		var deleteLink = document.createElement('a');
			deleteLink.setAttribute('data-role', 'button');
			deleteLink.setAttribute('data-icon', 'delete');
			deleteLink.href = '#';
			deleteLink.key = key;
			deleteText = "Delete Item";
			deleteLink.addEventListener("click", deleteItem);
			deleteLink.innerHTML = deleteText;
		linksDiv.appendChild(deleteLink);
	};
	// Edit Item Funciton
	function editItem(){
		//Get info from local storage
		var value = localStorage.getItem(this.id);
		var item = JSON.parse(value);
		//toggleControls("off"); //shows form
		//Populate form fields
		GE('cats').value = item.cat[1];
		GE('name').value = item.name[1];
		GE('wght').value = item.wght[1];
		if(item.packed[1] == "Yes"){
			GE('packed').setAttribute("checked", "checked");
		};
		GE('pdate').value = item.date[1];
		GE('note').value = item.note[1];
		// Remove listener for add item
		submitLink.removeEventListener("click", submitData);
		//Change "Add Item" to "Edit Item"
		GE('addItem').value = "Edit Item";
		var editSubmit = GE('addItem');
		// Save key value as property of editSubmit event
		//editSubmit.addEventListener("click", validate);
		editSubmit.key = this.id;
	};
	//Delete Item Function
	function deleteItem(){
		var ask = confirm("Delete this item?");
		if(ask){
			localStorage.removeItem(this.id);
			alert("Item deleted!")
			window.location.reload();
		}else{
			alert("Item NOT deleted.")
		};
	};
	//Validate function
	function validate(e){
		//Define elements to check
		var getCat = GE('cats');
		var getName = GE('name');
		//Reset Error Messages
		errMsg.innerHTML = "";
		getCat.style.border = "none";
		getName.style.border = "none";
		//Error Messages
		var errMess = [];
		//Category Validation
		if(getCat.value === ""){
			var catErr = "Please select a category!";
			getCat.style.border = "1px solid red";
			errMess.push(catErr);
		};
		//Item name validation
		if(getName.value === ""){
			var nameErr = "Item needs a name!";
			getName.style.border = "1px solid red";
			errMess.push(nameErr);
		};
		//Display errors if any
		if(errMess.length >= 1){
			for(var i=0, j=errMess.length; i<j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = errMess[i];
				errMsg.appendChild(txt);
			};
			e.preventDefault();
			return false;
		}else{
			//If validation passes, submit data with key
			submitData(this.key);
		};
	};
	//Load data from json.js and store in local storage
	function autoFill(){
		alert("Running Autofill Function!")
		for(var n in json){
			var id = Math.floor(Math.random()*10000000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};		
	};
	// Toggle links
	/*
	function toggleControls(n){
		switch(n){
			case "on":
				GE('addForm').style.display = "none";
				GE('clearData').style.display = "inline";
				GE('displayData').style.display = "none";
				GE('showForm').style.display = "inline";
				break;
			case "off":
				GE('addForm').style.display = "block";
				GE('clearData').style.display = "inline";
				GE('displayData').style.display = "inline";
				GE('showForm').style.display = "none";
				GE('items').style.display = "none";
				break;
			default:
				return false;
		};
	};
	*/
	// Clear local storage
	function clearLocalData(){
		if(localStorage.length === 0){
			alert("Packing list is already empty!");
		}else{
			var ask = confirm("Delete ALL items? This can not be undone.")
			if(ask){
				localStorage.clear();
				alert("Packing list cleared!");
				window.location.reload();
				return false;
			}else{
				alert("Packing list not cleared.")
			};
		};
	};
	//Get image for data based on category
	function getImage(makeSubList, catName){
		var newImg = document.createElement('img');
			newImg.id = 'itemIcon'
		var setSrc = newImg.setAttribute("src", "images/icons/" + catName + ".png");
		makeSubList.appendChild(newImg);
	};
	//Variable Defaults
	var typeGroups = ["Food", "Utility", "Survival", "Comfort", "Fun"],
		packedValue = "No",
		errMsg = GE('errors');
		browseCat = GE('browse');
	makeCats();
	//makeBrowse();
	

	// Click events
	var displayLink = GE('displayData');
	displayLink.addEventListener("click", getLocalData);
	
	var clearLink = GE('clearData');
	clearLink.addEventListener("click", clearLocalData);
	
	var submitLink = GE('addItem');
	//submitLink.addEventListener("click", validate);
	
});