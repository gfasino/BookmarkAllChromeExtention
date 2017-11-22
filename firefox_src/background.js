//get all bookmarks
browser.bookmarks.getTree(function(tree){
	//add listener to browser button
	browser.browserAction.onClicked.addListener(function(tab) {

	    //on click get all open tabs
        var tabs = browser.tabs.query({}, function(tabs){
	        console.log(tabs);
	        //search each url if already exist
           	for (var i = 0; i < tabs.length; i++) {

			        //enclosed return function
			        var searchRet = (function(page){
				        return (function(res){
					        //save page only if not exist
					        if(res.length < 1)
						        browser.bookmarks.create({'parentId': tree.id,
				         			'title': page.title, 'url': page.url});
				        });
			        })(tabs[i]);

			        browser.bookmarks.search(tabs[i].url, searchRet);
           	}
        });
	});
});
