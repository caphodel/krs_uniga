Ext.data.JsonP.tree({"tagname":"class","name":"tree","autodetected":{},"files":[{"filename":"jui2.js","href":"jui2.html#tree"}],"extends":"jui2","params":[{"tagname":"params","type":"object","name":"tree","doc":"<p>options</p>\n","html_type":"object"}],"return":{"type":"object","name":"return","doc":"<p>jui2 tree object\nExample Usage:</p>\n\n<pre class='inline-example '><code>jui2.tree({\n    data: 'path/to/data/url',\n    root: false\n})\n</code></pre>\n\n<p>To create tree children with click event, you can add event using javascript like in this example:</p>\n\n<pre class='inline-example '><code>jui2.tree({\n    data: 'path/to/data/url',\n    root: false,\n    event: {\n        click: function(tree, record){\n            console.log('You clicked the tree!');\n        }\n    }\n})\n</code></pre>\n\n<p>This one is the HTML version example:</p>\n\n<pre class='inline-example '><code>&lt;ul jui2=\"true\" role=\"tree\" event=\"event\" data=\"path/to/data/url\" root=\"false\"&gt;&lt;/ul&gt;\n&lt;script&gt;\n    var event = {\n        click: function(tree, record){\n            console.log('You clicked the tree!');\n        }\n    }\n    jui2.create()\n&lt;/script&gt;\n</code></pre>\n","properties":null,"html_type":"object"},"author":[{"tagname":"author","name":"Deddy Lasmono Putro","email":null}],"docauthor":[{"tagname":"docauthor","name":"Deddy Lasmono Putro","email":null}],"members":[{"name":"","tagname":"property","owner":"tree","id":"property-","meta":{}},{"name":"findHighestZIndex","tagname":"method","owner":"jui2","id":"method-findHighestZIndex","meta":{"private":true}},{"name":"random","tagname":"method","owner":"jui2","id":"method-random","meta":{"private":true}}],"alternateClassNames":[],"aliases":{},"id":"class-tree","short_doc":"JUI2 tree UI ...","component":false,"superclasses":["jui2"],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'><a href='#!/api/jui2' rel='jui2' class='docClass'>jui2</a><div class='subclass '><strong>tree</strong></div></div><h4>Files</h4><div class='dependency'><a href='source/jui2.html#tree' target='_blank'>jui2.js</a></div></pre><div class='doc-contents'><p>JUI2 tree UI</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>tree</span> : object<div class='sub-desc'><p>options</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>object</span><div class='sub-desc'><p>jui2 tree object\nExample Usage:</p>\n\n<pre class='inline-example '><code>jui2.tree({\n    data: 'path/to/data/url',\n    root: false\n})\n</code></pre>\n\n<p>To create tree children with click event, you can add event using javascript like in this example:</p>\n\n<pre class='inline-example '><code>jui2.tree({\n    data: 'path/to/data/url',\n    root: false,\n    event: {\n        click: function(tree, record){\n            console.log('You clicked the tree!');\n        }\n    }\n})\n</code></pre>\n\n<p>This one is the HTML version example:</p>\n\n<pre class='inline-example '><code>&lt;ul jui2=\"true\" role=\"tree\" event=\"event\" data=\"path/to/data/url\" root=\"false\"&gt;&lt;/ul&gt;\n&lt;script&gt;\n    var event = {\n        click: function(tree, record){\n            console.log('You clicked the tree!');\n        }\n    }\n    jui2.create()\n&lt;/script&gt;\n</code></pre>\n</div></li></ul></div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='tree'>tree</span><br/><a href='source/jui2.html#tree-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/tree-property-' class='name expandable'></a> : <a href=\"#!/api/Object\" rel=\"Object\" class=\"docClass\">Object</a><span class=\"signature\"></span></div><div class='description'><div class='short'><p><em>js/create.js</em>**</p>\n</div><div class='long'><p><em>js/create.js</em>**</p>\n</div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-findHighestZIndex' class='member first-child inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/jui2' rel='jui2' class='defined-in docClass'>jui2</a><br/><a href='source/jui2.html#jui2-method-findHighestZIndex' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jui2-method-findHighestZIndex' class='name expandable'>findHighestZIndex</a>( <span class='pre'></span> ) : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Fungsi untuk mencari z-index tertinggi ...</div><div class='long'><p>Fungsi untuk mencari z-index tertinggi</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'><a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a></span><div class='sub-desc'><p>z-index</p>\n</div></li></ul></div></div></div><div id='method-random' class='member  inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><a href='#!/api/jui2' rel='jui2' class='defined-in docClass'>jui2</a><br/><a href='source/jui2.html#jui2-method-random' target='_blank' class='view-source'>view source</a></div><a href='#!/api/jui2-method-random' class='name expandable'>random</a>( <span class='pre'>length, chars</span> )<span class=\"signature\"><span class='private' >private</span></span></div><div class='description'><div class='short'>Function to create random string ...</div><div class='long'><p>Function to create random string</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>length</span> : <a href=\"#!/api/Number\" rel=\"Number\" class=\"docClass\">Number</a><div class='sub-desc'><p>Length of the generated string</p>\n</div></li><li><span class='pre'>chars</span> : <a href=\"#!/api/String\" rel=\"String\" class=\"docClass\">String</a><div class='sub-desc'><p>String combination that allowed to generate, consist of 'a' representing lowercased alphabet char, 'A' for uppercased alphabet char, '#' for number and ! for other chars</p>\n\n<p>Example use:\n    @example\n    <a href=\"#!/api/jui2-method-random\" rel=\"jui2-method-random\" class=\"docClass\">jui2.random</a>(8, 'aA#')</p>\n\n<p>Those code will create a random character consist of uppercased and lowercased alphabet and number with 8 character length</p>\n</div></li></ul></div></div></div></div></div></div></div>","meta":{}});