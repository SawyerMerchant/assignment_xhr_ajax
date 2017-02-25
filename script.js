var $ = {
  STATUSES: {
    '100': 'Continue',
    '101': 'Switching Protocols',
    '102': 'Processing',
    '200': 'OK',
    '201': 'Created',
    '202': 'Accepted',
    '203': 'Non-Authoritative Information',
    '204': 'No Content',
    '205': 'Reset Content',
    '206': 'Partial Content',
    '207': 'Multi-Status',
    '208': 'Already Reported',
    '226': 'IM Used',
    '300': 'Multiple Choices',
    '301': 'Moved Permanently',
    '302': 'Found',
    '303': 'See Other',
    '304': 'Not Modified',
    '305': 'Use Proxy',
    '306': 'Switch Proxy',
    '307': 'Temporary Redirect',
    '308': 'Permanent Redirect',
    '400': 'Bad Request',
    '401': 'Unauthorized',
    '402': 'Payment Required',
    '403': 'Forbidden',
    '404': 'Not Found',
    '405': 'Method Not Allowed',
    '406': 'Not Acceptable',
    '407': 'Proxy Authentication Required',
    '408': 'Request Timeout',
    '409': 'Conflict',
    '410': 'Gone',
    '411': 'Length Required',
    '412': 'Precondition Failed',
    '413': 'Request Entity Too Large',
    '414': 'Request-URI Too Long',
    '415': 'Unsupported Media Type',
    '416': 'Requested Range Not Satisfiable',
    '417': 'Expectation Failed',
    '418': 'I’m a teapot',
    '420': 'Enhance Your Calm',
    '422': 'Unprocessable Entity',
    '423': 'Locked',
    '424': 'Failed Dependency',
    '425': 'Unordered Collection',
    '426': 'Upgrade Required',
    '428': 'Precondition Required',
    '429': 'Too Many Requests',
    '431': 'Request Header Fields Too Large',
    '444': 'No Response',
    '449': 'Retry With',
    '450': 'Blocked by Windows Parental Controls',
    '451': 'Unavailable For Legal Reasons',
    '499': 'Client Closed Request',
    '500': 'Internal Server Error',
    '501': 'Not Implemented',
    '502': 'Bad Gateway',
    '503': 'Service Unavailable',
    '504': 'Gateway Timeout',
    '505': 'HTTP Version Not Supported',
    '506': 'Variant Also Negotiates',
    '507': 'Insufficient Storage',
    '508': 'Loop Detected',
    '509': 'Bandwidth Limit Exceeded',
    '510': 'Not Extended',
    '511': 'Network Authentication Required',
    '598': 'Network read timeout error',
    '599': 'Network connect timeout error'
  },

  ajax: function(userOptions) {

    var options = {
      data: '',
      headers: {},
      method: 'GET',
      url: window.location.href,
      async: true,
    };

    Object.assign(options, userOptions);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener( "load", function(e) {
      var statusText;
      if (xhr.status >= 200 && xhr.status < 300) {
        statusText = "success";
        options.success(xhr.responseText, statusText, xhr);
      } else {
        statusText = "error";
        var errorThrown = $.STATUSES[String(xhr.status)];
        options.error(xhr.responseText, statusText, errorThrown);
      }
      options.complete(xhr.responseText, statusText);
    });

    xhr.open(options.method, options.url, options.async);

    for (var key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key] );
    }
    xhr.send(options.data);
  },

  get: function(options) {
    options.method = "GET";
    $.ajax(options);
  },

  post: function(options) {
    options.method = "POST";
    $.ajax(options);
  },
};

var sampleData = {
  url: 'https://reqres.in/api/users/',
  data: 'first_name=Abe&last_name=Lincoln',
  async: true,
  method: 'GET',
  headers: { "Content-type": "application/x-www-form-urlencoded", },

  success: function(data, status, xhr) {
    console.log("success", data, status, xhr);
  },

  error: function(responseText, statusText, errorThrown) {
    console.log("error", responseText, statusText, errorThrown);
  },

  complete: function(responseText, statusText) {
    console.log("complete", responseText, statusText);
  },

};

$.get(sampleData);
