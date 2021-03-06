'use strict';

import riot from 'riot';

riot.tag('pc-dock',

  `<footer class="fixed bottom-0 left-0 right-0 center z4">
  
  <a each="{ items }" class="btn btn-narrow bg-darken-4 white m1" href="{ href }" title="{ href }" onclick="{ parent.parent.navigate }">
    <i class="fa fa-fw fa-{ icon }"></i>
  </a>
  <a class="btn btn-narrow bg-darken-4 white m1" href="/users/sign_out" title="signout">
    <i class="fa fa-fw fa-sign-out"></i>
  </a>

  </footer>`,

  function (opts) {
    this.items = [
      {href: 'templates', icon: 'code'},
      {href: 'javascripts', icon: 'flash'},
      {href: 'stylesheets', icon: 'paint-brush'},
      {href: 'pages', icon: 'file-text-o'},
    ]
  }

);