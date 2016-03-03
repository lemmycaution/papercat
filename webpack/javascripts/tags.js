'use strict';

import riot from 'riot';
import './pc-header';
import './pc-index';
import './pc-thumb';
import './pc-dock';
import './pc-form';

riot.tag('pc-app',

  `
  <pc-header view="{ view }"></pc-header>
  <div class="py4 main"></div>
  <pc-dock></pc-dock>
  `,

  function(opts) {
    this.navigate = (e) => {
      e.preventDefault()
      riot.route(e.currentTarget.getAttribute('href'), e.currentTarget.title)
    }
    
    this.on('update', () => {
      if (this.view && this.resource) {
        let tag = this.view === 'index' ? `pc-${this.view}` : `pc-${this.resource}-${this.view}`
        this.tags['main'] = riot.mount('.main', tag, {api: opts.api, resource: this.resource, navigate: this.navigate, id: this.id})[0]
      }
    })

    riot.route('/', () => {
      this.update({view: null, resource: null, id: null})
    })
    
    riot.route('/*', (resource) => {
      this.update({view: 'index', resource, id: null})
      opts.api.request('get', resource)
    })
    
    riot.route('/*/new', (resource) => {
      this.update({view: 'form', resource, id: null})
    })
    
    riot.route('/*/*/edit', (resource, id) => {
      this.update({view: 'form', resource, id})
    })
    
    opts.api.on('request.error.404', () => riot.route('/'))
    
    riot.route.start(true)
  }

);





