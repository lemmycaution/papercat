'use strict';

import $ from 'jquery';
import riot from 'riot';

import './pc-input';
import './pc-textarea';
import './pc-input-hash';

import './mixins/set_value';
import './mixins/form';
import './mixins/tinymce';
import './mixins/codemirror';


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
    this.defaultRecord = {}
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
    <div class="relative">
      <pc-input type="text" name="pathname"></pc-input>
      <a if="{ record.pathname }" class="absolute right-0 top-0 h5 btn btn-narrow" href="/{ record.pathname }" target="_blank">
        <i class="fa fa-external-link"></i>
      </a>
    </div>
    <h5>Metatags</h5>
    <pc-input-hash name="meta" items="{ record.meta || (record.meta = {}) }"></pc-input-hash>
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

    this.save = (e) => {
      this.$saveBtn = $(e.currentTarget)
      this.$saveBtn.orgHtml = this.$saveBtn.html()
      this.$saveBtn.html('<i class="fa fa-refresh fa-spin"></i>').attr('disabled', true)

      e.preventDefault()
      // instead of fighting with rails strong param for dynamic hashes lets send json string and parse it in model ;)
      // but ensure to not stringify already stringified json
      if (typeof this.record.meta !== 'string') {
        this.record.meta = JSON.stringify(this.record.meta)
      }
      let data = {[this.modelName]: this.record}

      if (this.record.id) {
        opts.api.request('put', `${ opts.resource }/${ this.record.id }`, data)
      } else {
        opts.api.request('post', opts.resource, data)
      }
    }

    this.onUpdate = () => {
      this.record = this.record || this.defaultRecord
      if (typeof this.record.meta === 'string') this.record.meta = JSON.parse(this.record.meta)
    }

    this.onRequestSuccess =  (record) => {
      if (record) {
        if (typeof record.meta === 'string') record.meta = JSON.parse(record.meta)
        this.update({record})
        riot.route(`${ opts.resource }/${ record.id }/edit`, `${ opts.resource } / edit`, true)
      }
      if (this.$saveBtn) this.$saveBtn.html(this.$saveBtn.orgHtml).removeAttr('disabled')
    }

    this.mixin('tinymceMixin')
    this.mixin('codeMirrorMixin')
    this.mixin('formMixin')
  }

);
