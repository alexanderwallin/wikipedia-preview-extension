
var $links = $('#bodyContent a[href^="/wiki"]').each(function(i, el) {
  var $el = $(el);
  var title = $el.attr('title');
  $el.attr('data-wiki-preview-title', title);
  $el.attr('title', null);
});

var $popup = $('<div />', {
  class: 'wikiPreviewPopup'
});
var $popupTitle = $('<div />', { class: 'wikiPreviewPopup__title' });
var $popupSummary = $('<div />', { class: 'wikiPreviewPopup__summary' });
$popup.append($popupTitle).append($popupSummary);
$popup.appendTo($('body'));

$links.on('mouseover', function() {
  var $link = $(this);
  var url = $(this).attr('href');

  populatePopup();

  $popup.css({
      top: $link.offset().top + $link.outerHeight(),
      left: $link.offset().left
    })
    .addClass('visible');

  $.get({
    url: url,
    success: function(results) {
      var title = $link.attr('data-wiki-preview-title');
      var summary = $(results).find('#mw-content-text p:first').text();
      populatePopup(title, summary);
    },
    error: function(err) {
      console.log(err);
    }
  });
});

$links.on('mouseout', function() {
  $popup.removeClass('visible');
});

function populatePopup(title, summary) {
  console.log(title, summary);
  $popupTitle.html(title || '');
  $popupSummary.html(summary || '');
}
