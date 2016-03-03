'use strict';

import riot from 'riot';

riot.tag('pc-textarea',
  `
  <textarea class="block col-12 mb2 field { opts.class }" name="{ opts.name }" placeholder="{ opts.name }" oninput="{ setValueByName }">{ parent.record[opts.name] }</textarea>
  <small if="{ parent.errors[opts.name] }" class="inline-error">{ parent.errors[opts.name].join(', ') }</small>
  `,

  function (opts) {
    this.mixin('setValueByNameMixin')
  }
)
