google.load('search', '1');

function performSearch(id, term) {
  var imageSearch = new google.search.ImageSearch();

  imageSearch.setSearchCompleteCallback(this, function() {
    var result = imageSearch.results[0];

    $.ajax({
      'url': '/submit',
      'dataType': 'json',
      'data': {
        'prevID': id,
        'word': term,
        'url': decodeURIComponent(result.url)
      },
      'success': function(data) {
        $('#whole-list').show();
        data = data.list;
        for (var i = 0; i < data.length; i++) {
          var newImage = $('<img>');
          newImage.attr('src', data[i].url);
          newImage.width(100).height(100);
          $('#whole-list').append(newImage);
          $('#whole-list').append('&larr; '+ data[i].word + '&larr;');
        }
      }
    });
  }, null);

  imageSearch.execute(term);
}

google.setOnLoadCallback(function() {
  $.ajax({
    'url': '/random',
    'dataType': 'json',
    'success': function(data) {
      var id = data._id;

      console.log(data, id, data.url);

      var newImage = $('<img>');
      newImage.attr('src', data.url);
      newImage.width(500).height(500);
      $('#other-picture').append(newImage);

      $('#search').keydown(function(event) {
        if (event.which === 13) {
          performSearch(id, $('#search').val());
        }
      });
    }
  });
});
