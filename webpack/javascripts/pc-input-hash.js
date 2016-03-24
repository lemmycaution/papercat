'use strict';

import riot from 'riot';

riot.tag('pc-input-hash',
  `
  <div class="metatags mb2 border">

    <div class="clearfix border-bottom" each="{ name, content in opts.items }">
      <input type="text" class="col col-4 border-none field rounded-left x-group-item" placeholder="Name" name="name" value="{ name }" oninput="{setName}">
      <input type="text" class="col col-6 border-none field not-rounded x-group-item" placeholder="Content" name="content" value="{ content }" oninput="{setContent}">
      <a class="col col-2 center btn border-left bg-white red rounded-right" onclick="{ removeMetaTag }"><i class="fa fa-times"></i></a>
    </div>

    <div class="clearfix">
      <input name="metaTagName" type="text" class="col col-4 border-none  field rounded-left x-group-item" placeholder="Name">
      <input name="metaTagContent" type="text" class="col col-6 border-none  field not-rounded x-group-item" placeholder="Content" >
      <a class="col col-2 center btn border-left bg-white rounded-right" onclick="{ addMetaTag }"><i class="fa fa-plus"></i></a>
    </div>

  </div>
  `,

  function (opts) {

    this.removeMetaTag = (e) => {
      // looped item
      var item = e.item
      delete this.opts.items[e.item.name]
      // index on the collection
      // var index = this.opts.items.indexOf(item)
      // remove from collection
      // this.opts.items.splice(index, 1)
    }

    this.addMetaTag = (e) => {
      var name = this.metaTagName.value
      var content = this.metaTagContent.value
      // var tag = _.find(this.opts.items, function (tag) { return tag.name == name })
      var tag = this.opts.items[name]
      if (!tag && name && content) {
        this.metaTagName.value = null
        this.metaTagContent.value = null
        this.opts.items[name] = content
        // this.opts.items.push({name: name, content: content})
      }
    }

    this.setName = (e) => {
      this.opts.items[e.target.value] = this.opts.items[e.item.name]
      delete this.opts.items[e.item.name]
    }

    this.setContent = (e) => {
      this.opts.items[e.item.name]= e.target.value
    }
  }
)
