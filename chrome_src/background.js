//get all bookmarks
chrome.bookmarks.getTree(function(tree){
	//add listener to browser button
	chrome.browserAction.onClicked.addListener(function(tab) {
		//on click get all open tabs
		chrome.tabs.getAllInWindow(null, function(tabs){
			//console.log(tabs);
			//search each url if already exist
	   	for (var i = 0; i < tabs.length; i++) {

				//enclosed return function
				var searchRet = (function(page){
					return (function(res){
						//save page only if not exist
						if(res.length < 1)
							chrome.bookmarks.create({'parentId': tree.id,
					 			'title': page.title, 'url': page.url});
					});
				})(tabs[i]);

				chrome.bookmarks.search(tabs[i].url, searchRet);
	   	}
		});
	});
});
