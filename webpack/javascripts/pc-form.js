'use strict';

import $ from 'jquery';
import riot from 'riot';

import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';

import './pc-input';
import './pc-textarea';
import './pc-input-hash';

riot.mixin('tinymceMixin', {
  init: function () {
    this.on('mount',  () => {
      let $textarea = $('textarea.wyswyg', this.root)
      $textarea.addClass('hide')
      this.wyswygFieldName = $textarea.attr('name')
      $.getScript('//cdn.tinymce.com/4/tinymce.min.js').then(() => {
        tinymce
        .init({ plugins: 'autoresize', selector:'textarea.wyswyg',  menubar: false, statusbar: false})
        .then(()=> {
          this.tinyMce = tinymce.editors[0]

          this.tinyMce.on('change', () => {
            this.record[this.wyswygFieldName] = this.tinyMce.getContent()
            $textarea.val(this.record[this.wyswygFieldName])
          })
          
          this.on('update', () => {
            if (this.record && this.record[this.wyswygFieldName]) {
              this.tinyMce.setContent(this.record[this.wyswygFieldName])
            }
          })
        })
      })
    })
  }
})
riot.mixin('codeMirrorMixin', {
  init: function () {
    
    this.on('mount',  () => {
      let $textarea = $('textarea.code', this.root)
      this.codeFieldName = $textarea.attr('name')
      this.codeMirror = CodeMirror.fromTextArea($textarea[0], {
        lineNumbers: true,
        mode: $textarea.data('mode')
      });

      this.codeMirror.on('change', (cm) => {
        this.record[this.codeFieldName] = cm.getDoc().getValue()
        $textarea.val(this.record[this.codeFieldName])
      })
    })
    
    this.on('update', () => {
      if (this.record && this.record[this.codeFieldName]) {
        this.codeMirror.setValue(this.record[this.codeFieldName])
      }
    })
    this.on('updated', () => {
      this.codeMirror.refresh()
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

riot.tag('pc-templates-form',

  `
  <form class="px2" onsubmit="{ ignoreSubmit }">
    <pc-input type="text" name="path"></pc-input>
    <pc-input type="text" name="format" ></pc-input>
    <pc-input type="text" name="handler" ></pc-input>
    <pc-input type="text" name="locale" ></pc-input>
    <pc-input type="checkbox" name="partial" ></pc-input>
    <pc-textarea name="body" class="code" mode="htmlmixed"></pc-textarea>
  </form>
  `,

  function (opts) {
    this.defaultRecord = {format: 'html', handler: 'erb', locale: 'en'}
    this.modelName = opts.resource.substr(0, opts.resource.length - 1)
    
    this.mixin('codeMirrorMixin')
    this.mixin('formMixin')
  }

);

riot.tag('pc-javascripts-form',

  `
  <form class="px2" onsubmit="{ ignoreSubmit }">
    <pc-input type="text" name="pathname"></pc-input>
    <pc-textarea name="source" class="code" mode="javascript"></pc-textarea>
  </form>
  `,

  function (opts) {
    this.defaultRecord = {format: 'html', handler: 'erb', locale: 'en'}
    this.modelName = opts.resource.substr(0, opts.resource.length - 1)
    
    this.mixin('codeMirrorMixin')
    this.mixin('formMixin')
  }

);

riot.tag('pc-stylesheets-form',

  `
  <form class="px2" onsubmit="{ ignoreSubmit }">
    <pc-input type="text" name="pathname"></pc-input>
    <pc-textarea name="source" class="code" mode="css"></pc-textarea>
  </form>
  `,

  function (opts) {
    this.defaultRecord = {}
    this.modelName = opts.resource.substr(0, opts.resource.length - 1)
    
    this.mixin('codeMirrorMixin')
    this.mixin('formMixin')
  }

);

riot.tag('pc-pages-form',

  `
  <form class="px2" onsubmit="{ ignoreSubmit }">
    <pc-input type="text" name="title"></pc-input>
    <pc-input type="text" name="pathname"></pc-input>
    <h5>Metatags</h5>
    <pc-input-hash name="meta" items="{ record.meta }"></pc-input-hash>
    <pc-input type="checkbox" name="default"></pc-input>
    <pc-textarea name="body" class="code" mode="htmlmixed"></pc-textarea>
    <pc-textarea name="body" class="wyswyg" ></pc-textarea>
  </form>
  `,

  function (opts) {
    this.defaultRecord = {meta: {}}
    this.modelName = opts.resource.substr(0, opts.resource.length - 1)
    
    this.currentEditorIcon = 'eye'
    this.currentEditor
    this.toggleEditor = (e) => {
      e.preventDefault()
      this.update()
      if (this.currentEditorIcon === 'code') {
        this.currentEditorIcon = 'eye'
        // this.tinyMce.show()
        // $('.CodeMirror.cm-s-default', this.root).css({display: 'none'})
        $('.code', this.root).toggleClass('hide', true)
        $('.wyswyg', this.root).toggleClass('hide', false)
      } else {
        this.currentEditorIcon = 'code'
        // this.tinyMce.hide()
        // $('.CodeMirror.cm-s-default', this.root).css({display: 'block'})
        $('.code', this.root).toggleClass('hide', false)        
        $('.wyswyg', this.root).toggleClass('hide', true)
      }
    }
    
    this.on('mount', () => $('.code', this.root).toggleClass('hide', true))
    
    this.mixin('tinymceMixin')
    this.mixin('codeMirrorMixin')
    this.mixin('formMixin')
  }

);