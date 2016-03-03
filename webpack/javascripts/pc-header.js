'use strict';

import riot from 'riot';

riot.tag('pc-header',

  `
  <header class="fixed top-0 left-0 right-0 bg-darken-4 white">
    <a if="{ opts.view === 'index' }" class="btn btn-narrow" href="{ parent.resource }/new" title="{ parent.resource } / new" onclick="{ parent.navigate }">New</a>
    <virtual if="{ opts.view === 'form' }">
    <button class="btn btn-narrow" onclick="{ parent.tags.main.save }">Save</button>
    <button if="{ parent.tags.main.opts.id }" class="btn btn-narrow" onclick="{ parent.tags.main.delete }">Delete</button>
    </virtual>
  </header>
  `,

  function(opts) {
  }

);