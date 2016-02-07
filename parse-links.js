
var $links = $('#bodyContent a[href^="/wiki"]');

var $popup = $('<div />', {
  class: 'wiki-preview-popup'
});

$popup.appendTo($('body'));

$links.on('mouseover', function() {
  var $link = $(this);
  var url = $(this).attr('href');

  $popup.html(' ')
    .css({
      top: $link.offset().top + $link.outerHeight(),
      left: $link.offset().left
    })
    .addClass('visible');

  $.get({
    url: url,
    success: function(results) {
      var $results = $(results);
      var $description = $results.find('#mw-content-text p:first');

      $popup.html($description.text());
    },
    error: function(err) {
      console.log(err);
    }
  });
});

$links.on('mouseout', function() {
  $popup.removeClass('visible');
});
