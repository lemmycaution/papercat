'use strict';

import $ from 'jquery';
import riot from 'riot';

riot.mixin('tinymceMixin', {
  init: function () {
    this.on('mount',  () => {
      let $textarea = $('textarea.wyswyg', this.root)
      $textarea.addClass('hide')
      this.wyswygFieldName = $textarea.attr('name')

      $.getScript('//cdn.tinymce.com/4/tinymce.min.js').then(() => {
        tinymce
        .init({
          plugins: 'autoresize image media textcolor paste',
          selector:'textarea.wyswyg',
          toolbar: 'undo redo | fontselect fontsizeselect styleselect forecolor backcolor | link unlink image media',
          menubar: false,
          statusbar: false,
          verify_html : false,
          content_css : $('body').data('content-css'),
          paste_data_images: true,
          images_upload_url: 'api/images',
          images_upload_credentials: true
        })
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

          this.on('before-unmount', () => {
            this.tinyMce.destroy()
          })

          this.$toolbar = $('.mce-toolbar-grp')
          this.tTop = this.$toolbar.offset().top
          $(window).on('scroll', this.onScroll)

        })
      })
    })

    this.on('unmount', () => {
      $(window).off('scroll', this.onScroll)
    })

    this.onScroll = (e) => {
      this.$toolbar.toggleClass('fixed', this.tTop <= document.scrollingElement.scrollTop)
    }
  }
})
