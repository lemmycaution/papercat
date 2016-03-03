'use strict';

import riot from 'riot';
import $ from 'jquery';

let api = riot.observable();

api.request = function(method, path, params, callback) {
  $.ajax({
    url: `/api/${path}`, 
    type: method,
    data: JSON.stringify(params),
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Csrf-Token", $('[name=csrf-token]').attr('content'));
    },
  })
  .fail((xhr) => api.trigger(`request.error.${xhr.status}`, xhr.responseJSON && xhr.responseJSON.errors))
  .then((result) => {
    if (typeof callback === 'function') {
      callback(result)
    } else {
      api.trigger(`request.success`, result)
    }
  })
};

export default api;