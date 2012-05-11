// VFW Week 4
// Conrad Aube

// Wait for DOM
window.addEventListener("DOMContentLoaded", function(){
	
	// get element by ID
	function GE(x)	{
		var theElement = document.getElementById(x);
		return theElement;
	};

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
		};
	};
	//Variable Defaults
	var typeGroups = ["Choose A Category", "Food", "Utility", "Survival", "Comfort", "Fun"],
		browseCat = GE('browse');
	makeBrowse();
});