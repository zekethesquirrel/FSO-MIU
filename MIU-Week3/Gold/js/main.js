// VFW Week 4
// Conrad Aube

//JQM Friendly JS

var parseAddForm = function(data){
	//uses form data here;
	console.log(data);
};
// Wait for DOM
$(document).ready(function(){

	var addForm = $('#itemForm');
	
	addForm.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			//console.log($('#addItem').id)
			submitData(this.key);
		}
	});

	// get element by ID
	var GE = function (x){
		var theElement = document.getElementById(x);
		return theElement;
	};
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
	/*function getSelectedCheck(){
		if(GE('packed').checked){
			packedValue = GE('packed').value;
		}else{
			packedValue = "No";
		};
		
	};*/
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
	var submitData = function (key){
		if(!key){//if no key, generate new one
			var key = Math.floor(Math.random()*10000000000);
			var alertTxt = "Item added!";
		}else{//If key exists, edit existing item
			key = key;
			var alertTxt = "Item updated!";
		};
		//Get form values and create a string
		var data = addForm.serialize();
		//Save form data to local storage
		localStorage.setItem(key, data);
		alert(alertTxt);
		$('span.ui-controlgroup-last').html('Add Item')
		getLocalData();
	};
	// Retrieve local storage and display it
	var getLocalData = function (){
		if(localStorage.length === 0){
			alert("No data in local storage. Loading test data.")
			autoFill();
		};
		//Write data from local storage
		$("#itemList").empty();
		//Loop through data and make list items
		for(var i=0, j=localStorage.length; i<j; i++){
			var makeLI = $("<li id='listItem"+i+"'></li>");
			var theKey = localStorage.key(i);
			var dataObj = JSON.parse(localStorage.getItem(theKey)); //Convert local storage string to object
			//Write out data to list
			var optSubText = $( "<img src='images/icons/"+dataObj.cat[1]+".png'/>"+
				"<h3>"+dataObj.name[1]+"</h3>"+
				"<p>"+dataObj.cat[0]+": "+dataObj.cat[1]+"</p>"+
				"<p>"+dataObj.wght[0]+": "+dataObj.wght[1]+"</p>"+
				"<p>"+dataObj.packed[0]+": "+dataObj.packed[1]+"</p>"+
				"<p>"+dataObj.date[0]+": "+dataObj.date[1]+"</p>"+
				"<p>"+dataObj.note[0]+": "+dataObj.note[1]+"</p>" );
			//Create Edit Link
			var editLink = $("<a href='#add' id='edit"+theKey+"'> Edit Item</a>");
				editLink.bind('click', function(){
					editItem(this.id);
				});
			//Create Delete Link
			var deleteLink = $("<a href='#list' id='delete"+theKey+"'>Delete Item</a>");
				deleteLink.bind('click', function(){
					deleteItem(this.id)
				});
			//Make item data the edit link
			editLink.html(optSubText);
			//Append edit and delete links to the list
			makeLI.append(editLink, deleteLink).appendTo("#itemList");
		};
	$("#itemList").listview('refresh');
	};
	// Edit Item Funciton
	var editItem = function (id){
		//Get info from local storage
		var key = parseInt(id.match(/\d+/g));
		var item = JSON.parse(localStorage.getItem(key));
		//Populate form fields
		GE('cats').value = item.cat[1];
		GE('name').value = item.name[1];
		GE('wght').value = item.wght[1];
		GE('packed').value = item.packed[1];
		GE('pdate').value = item.date[1];
		GE('note').value = item.note[1];
		// Remove listener for add item
		//submitLink.removeEventListener("click", submitData);
		//Change "Add Item" to "Edit Item"
		$('span.ui-controlgroup-last').html('Edit Item')
		// Save key value as property of #addItem
		$('#addItem').attr('key', key)
		//Refresh the select menus
		$('select#cats').selectmenu('refresh');
		$('select#packed').slider('refresh');
	};
	//Delete Item Function
	var deleteItem = function (id){
		var ask = confirm("Delete this item?");
		var key = parseInt(id.match(/\d+/g));
		if(ask){
			localStorage.removeItem(key);
			alert("Item deleted!")
			getLocalData();
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
	var autoFill = function (){
		alert("Running Autofill Function!")
		for(var n in json){
			var id = Math.floor(Math.random()*10000000000);
			localStorage.setItem(id, JSON.stringify(json[n]));
		};		
	};
	// Clear local storage
	var clearLocalData = function (){
		if(localStorage.length === 0){
			alert("Packing list is already empty!");
		}else{
			var ask = confirm("Delete ALL items? This can not be undone.")
			if(ask){
				localStorage.clear();
				alert("Packing list cleared!");
				return false;
			}else{
				alert("Packing list not cleared.")
			};
		};
	};
	//Variable Defaults
	var typeGroups = ["Food", "Utility", "Survival", "Comfort", "Fun"],
		packedValue = "No",
		errMsg = GE('errors');
		browseCat = GE('browse');
	makeCats();

	// Click events
	var displayLink = GE('displayData');
	displayLink.addEventListener("click", getLocalData);
	
	var clearLink = GE('clearData');
	clearLink.addEventListener("click", clearLocalData);
	
	var submitLink = GE('addItem');
	//submitLink.addEventListener("click", validate);
});
	