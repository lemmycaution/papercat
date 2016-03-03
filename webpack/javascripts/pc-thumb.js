'use strict';

import riot from 'riot';

riot.tag('pc-thumb',

  `
  <div class="col col-3 center">
    <a class="inline-block p2 bg-white" href="{ parent.opts.resource }/{ id }/edit" title="{ parent.opts.resource } / edit" onclick="{ parent.opts.navigate }">
      <i class="fa fa-file"></i>
      <h6 class="break-word">{ pathname }</h6>
    </a>
  </div>
  `,

  function(opts) {
  }

);