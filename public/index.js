$(function(){
  'use strict';

  $('#upload').on('submit', function(event) {
    event.preventDefault();

    var that = $(this),
        form = that.get(0),
        formData = new FormData(form);

    $.ajax({
      processData: false,
      contentType: false,
      type: that.attr('method'),
      url: that.attr('action'),
      data: formData,
      dataType: 'html'
    }).then(function(json) {
      var data = JSON.parse(json);

      console.log('hidden-value: %s', data.fields['hidden-value']);
      console.log('files: %s', JSON.stringify(data.files, null, 2));
    }).fail(function() {
      console.error.apply(console, arguments);
    });
  });
});
