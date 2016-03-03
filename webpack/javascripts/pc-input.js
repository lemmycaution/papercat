'use strict';

import riot from 'riot';

riot.tag('pc-input',

  `
  <label if="{ opts.type === 'checkbox'  }" class="inline-block mb2"><input type="{ opts.type }" name="{ opts.name }" onchange="{ setValueByName }" checked="{ parent.record[opts.name] }" /> { opts.name }</label>
  <label if="{ opts.type === 'radio'  }" class="inline-block mb2"><input type="{ opts.type }" name="{ opts.name }" onchange="{ setValueByName }" selected="{ parent.record[opts.name] }" /> { opts.name }</label>
  <input if="{ opts.type !== 'checkbox' && opts.type !== 'radio' }" class="block col-12 mb2 field" type="{ opts.type }" name="{ opts.name }" placeholder="{ opts.name }" oninput="{ setValueByName }" value="{ parent.record[opts.name] }" />
  <small if="{ parent.errors[opts.name] }" class="inline-error">{ parent.errors[opts.name].join(', ') }</small>
  `,

  function (opts) {
    this.mixin('setValueByNameMixin')
  }
)