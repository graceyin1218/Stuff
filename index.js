google.load('search', '1');

function performSearch(term) {
  var imageSearch = new google.search.ImageSearch();

  imageSearch.setSearchCompleteCallback(this, function() {
    var results = imageSearch.results;
    //for (var i = 0; i < results.length; i++) {
    var result = results[0];
    var newImage = document.createElement('img');
    newImage.src = decodeURIComponent(result.url);
    newImage.style.width = '100px';
    newImage.style.height = '100px';
    document.body.appendChild(newImage);
    //}
  }, null);

  imageSearch.execute(term);
}

google.setOnLoadCallback(function() {
  document.getElementById('search').addEventListener('keydown', function(event) {
    if (event.which === 13) {
      performSearch(document.getElementById('search').value);
    }
  });
});
