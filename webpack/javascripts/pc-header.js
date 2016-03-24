'use strict';

import riot from 'riot';

riot.tag('pc-header',

  `
  <header class="fixed top-0 left-0 right-0 bg-darken-4 white z4">

    <div class="logo fa-stack inline-block">
      <i class="fa fa-file-o fa-stack-2x"></i>
      <i class="fa fa-paw fa-stack-1x"></i>
    </div>

    <a if="{ opts.view === 'index' }" class="h5 btn btn-small btn-primary m1" href="{ parent.resource }/new"
      title="{ parent.resource } / new" onclick="{ parent.navigate }">
      <i class="fa fa-plus"></i>
    </a>
    <virtual if="{ opts.view === 'form' }">
      <button class="h5 btn btn-small bg-green white m1" onclick="{ parent.tags.main.save }">
        <i class="fa fa-floppy-o"></i>
      </button>
      <button if="{ parent.tags.main.opts.id }" class="h5 btn btn-small bg-red white m1" onclick="{ parent.tags.main.delete }">
        <i class="fa fa-trash-o"></i>
      </button>

      <button if="{ parent.tags.main.opts.resource === 'pages' }" class="h5 btn btn-small bg-white gray m1" onclick="{ parent.tags.main.toggleEditor }">
        <i class="fa fa-{ parent.tags.main.currentEditorIcon }"></i>
      </button>

    </virtual>
  </header>
  `,

  `pc-header .logo { transform:scale(0.5);margin-top: -3px; }`,

  function(opts) {
  }

);
