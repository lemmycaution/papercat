'use strict';

import riot from 'riot';

riot.tag('pc-thumb',

  `
  <div class="sm-col sm-col-3 center p1">
    <a class="block p2 bg-white rounded" href="{ parent.opts.resource }/{ id }/edit" title="{ parent.opts.resource } / edit" onclick="{ parent.opts.navigate }">
      <i class="fa fa-file fa-2x"></i>
      <h6 class="break-word">{ title }<br><small>/{ pathname }</small></h6>
    </a>
  </div>
  `,

  function(opts) {
  }

);
