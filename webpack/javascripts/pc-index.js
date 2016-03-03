'use strict';

import riot from 'riot';

riot.tag('pc-index',

  `
  <h1 class="caps center">{ opts.resource }</h1>
  <h3 class="center m2 p2" if="{ !collection || collection.length === 0 }">You don not have any { opts.resource } yet.<br><a class="mt2 btn btn-primary" href="{ opts.resource }/new" onclick="{ opts.navigate }">Create New</a></h3>
  <div class="clearfix p2"><pc-thumb each="{ collection }"></pc-thumb></div>
  `,

  function (opts) {
    let onRequestSuccess = (collection) => this.update({collection})
    this.on('mount', () => opts.api.on('request.success', onRequestSuccess) )
    this.on('before-unmount', () => opts.api.off('request.success', onRequestSuccess) )
  }

);