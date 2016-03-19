'use strict';

import $ from 'jquery';
import riot from 'riot';

riot.mixin('formMixin', {
  init: function () {
    let opts = this.opts;
    let onRequestSuccess = (record) => {
      if (record) {
        this.update({record})
        riot.route(`${ opts.resource }/${ record.id }/edit`, `${ opts.resource } / edit`, true)
      }
      if (this.$saveBtn) this.$saveBtn.html(this.$saveBtn.orgHtml).removeAttr('disabled')
    }
    let onRequestError = (xhr) => {
      if (xhr.status === 422) this.update({errors: xhr.responseJSON.errors})
      if (this.$saveBtn) this.$saveBtn.html(this.$saveBtn.orgHtml).removeAttr('disabled')
    }

    this.on('mount', () => {
      opts.api.on('request.error', onRequestError)
      opts.api.on('request.success', onRequestSuccess)
      if (opts.id) opts.api.request('get', `${ opts.resource }/${ opts.id }`)
    })

    this.on('before-unmount', () => {
      opts.api.off('request.error', onRequestError)
      opts.api.off('request.success', onRequestSuccess)
    })

    this.on('update', () => {
      this.record = this.record || this.defaultRecord
    })

    this.delete = (e) => {
      if (window.confirm('Are you sure?')) {
        opts.api.request('delete', `${ opts.resource }/${ this.record.id }`, null, () => {
          riot.route(opts.resource, opts.resource)
        })
      }
    }

    this.save = (e) => {
      this.$saveBtn = $(e.currentTarget)
      this.$saveBtn.orgHtml = this.$saveBtn.html()
      this.$saveBtn.html('<i class="fa fa-refresh fa-spin"></i>').attr('disabled', true)

      e.preventDefault()
      let data = {[this.modelName]: this.record}

      if (this.record.id) {
        opts.api.request('put', `${ opts.resource }/${ this.record.id }`, data)
      } else {
        opts.api.request('post', opts.resource, data)
      }
    }

    this.ignoreSubmit = (e) => e.preventDefault()
  }
})
