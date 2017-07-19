/* eslint-disable no-undef */
$(function () {
  $('pre code').each(function () {
    var lines = $(this).text().split('\n').length;
    var $numbering = $('<ul/>').addClass('line-number');
    $(this).addClass('has-line-number').parent().append($numbering);
    for (var i = 1; i <= lines; i++) {
      $numbering.append($('<li/>').text(i));
    }
  });
});
//# sourceMappingURL=line-number.js.map
