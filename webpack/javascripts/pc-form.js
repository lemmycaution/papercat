'use strict';

import $ from 'jquery';
import riot from 'riot';
import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

import './pc-input';
import './pc-textarea';

riot.mixin('codeMirrorMixin', {
  init: function () {
    
    this.on('mount',  () => {
      var $textarea = $('textarea.code', this.root)
      this.codeFieldName = $textarea.attr('name')
      this.codeMirror = CodeMirror.fromTextArea($textarea[0], {
        lineNumbers: true
      });

      this.codeMirror.on('change', (cm) => {
        var val = cm.getDoc().getValue()
        this.record[this.codeFieldName] = val
        $textarea.val(val)
      })
    })
    
    this.on('update', () => {
      if (this.record && this.record[this.codeFieldName]) {
        this.codeMirror.setValue(this.record[this.codeFieldName])
      }
    })
  }
});

riot.mixin('setValueByNameMixin', {
  setValueByName: function (e) {
    let input = e.currentTarget
    this.parent.record[input.name] = input.type === 'checkbox' ? 
      input.checked : 
      ((input.type === 'radio') ? input.selected : input.value);
  }
});

riot.mixin('formMixin', {
  init: function () {
    let opts = this.opts;
    let onRequestSuccess = (record) => {
      if (record) {
        this.update({record})
        riot.route(`${ opts.resource }/${ record.id }/edit`, `${ opts.resource } / edit`, true)
      }
      if (this.$saveBtn) this.$saveBtn.text("Save").removeAttr('disabled')
    }
    let onRequestError = (errors) => {
      this.update({errors})
      if (this.$saveBtn) this.$saveBtn.text("Save").removeAttr('disabled')
    }

    this.on('mount', () => {
      opts.api.on('request.error.422', onRequestError)
      opts.api.on('request.success', onRequestSuccess)
      if (opts.id) opts.api.request('get', `${ opts.resource }/${ opts.id }`)
    })

    this.on('before-unmount', () => {
      opts.api.off('request.error.422', onRequestError)
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
      this.$saveBtn.text("Saving").attr('disabled', true)
      
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

riot.tag('pc-templates-form',

  `
  <form class="px2" onsubmit="{ ignoreSubmit }">
    <pc-input type="text" name="path"></pc-input>
    <pc-input type="text" name="format" ></pc-input>
    <pc-input type="text" name="handler" ></pc-input>
    <pc-input type="text" name="locale" ></pc-input>
    <pc-input type="checkbox" name="partial" ></pc-input>
    <pc-textarea name="body" class="code"></pc-textarea>
  </form>
  `,

  function (opts) {
    this.defaultRecord = {format: 'html', handler: 'erb', locale: 'en'}
    this.modelName = opts.resource.substr(0, opts.resource.length - 1)
    
    this.mixin('codeMirrorMixin')
    this.mixin('formMixin')
  }

);