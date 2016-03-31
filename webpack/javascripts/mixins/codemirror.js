'use strict';

import $ from 'jquery'
import riot from 'riot';

import CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';


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
