this["jui2"] = this["jui2"] || {};
this["jui2"]["tmpl"] = this["jui2"]["tmpl"] || {};

this["jui2"]["tmpl"]["tmpl_accordion"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return "	<li id=\""
    + alias2(alias1((depths[1] != null ? depths[1].id : depths[1]), depth0))
    + "-"
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\r\n		<a href=\"#"
    + alias2(alias1((depths[1] != null ? depths[1].id : depths[1]), depth0))
    + "-"
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "<span></span></a>\r\n		<div class=\"j-accordion-sub\"></div>\r\n	</li>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<ul id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-accordion "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"accordion\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["tmpl_bar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-bar j-color-"
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + " "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"bar\" style=\"overflow:hidden\"><div style=\"border: 0px none; display: inline-block; margin: 0px 0px 0px 2px; padding: 3px 8px 6px; font-size: 14px; position: absolute; left: -5px; background: none repeat scroll 0% 0% rgb(255, 255, 255);z-index:1000\" class=\"j-bar-prev-item\"><i class=\"fa fa-angle-double-left\"></i></div><div style=\"border: 0px none; display: inline-block; margin: 0px 0px 0px 2px; padding: 3px 8px 6px; font-size: 14px; position: absolute; right: 0px; background: none repeat scroll 0% 0% rgb(255, 255, 255);\" class=\"j-bar-next-item\"><i class=\"fa fa-angle-double-right\"></i></div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_button"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<button id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-button j-body j-border "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"button\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<span>"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span></button>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_calendar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<table id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-calendar\" role=\"calendar\">\r\n	<thead>\r\n		<tr>\r\n			<td colspan=\"7\" class=\"j-calendar-top-toolbar\"></td>\r\n		</tr>\r\n		<tr>\r\n			<td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.dateName : depth0)) != null ? stack1.sun : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td>\r\n			<td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.dateName : depth0)) != null ? stack1.mon : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td>\r\n			<td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.dateName : depth0)) != null ? stack1.tue : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td>\r\n			<td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.dateName : depth0)) != null ? stack1.wed : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td>\r\n			<td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.dateName : depth0)) != null ? stack1.thu : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td>\r\n			<td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.dateName : depth0)) != null ? stack1.fri : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td>\r\n			<td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.dateName : depth0)) != null ? stack1.sat : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td>\r\n		</tr>\r\n	</thead>\r\n	<tbody>\r\n	"
    + ((stack1 = ((helper = (helper = helpers.datesOfMonth || (depth0 != null ? depth0.datesOfMonth : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"datesOfMonth","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\r\n	</tbody>\r\n	<tfoot>\r\n		<tr>\r\n			<td colspan=\"7\" class=\"j-calendar-bottom-toolbar\"></td>\r\n		</tr>\r\n	</tfoot>\r\n</table>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_calendarDate"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "<tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\r\n";
},"2":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "	<td value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.text : depth0), depth0))
    + "</td>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.weeks : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["jui2"]["tmpl"]["tmpl_checkboxField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "		<input type=\"checkbox\" value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "\"></input><label for=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.display : depth0), depth0))
    + "</label>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-checkboxField "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"checkboxField\">\r\n	"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<div>\r\n</div>";
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["tmpl_comboField"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0,"left",(depths[1] != null ? depths[1].labelposition : depths[1]),{"name":"is","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"4":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" style=\"vertical-align: baseline !important;\"></i>";
},"6":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0,"right",(depths[1] != null ? depths[1].labelposition : depths[1]),{"name":"is","hash":{},"fn":this.program(7, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"7":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return " <label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-textField j-comboField "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"comboField\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div><input id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></input><input class=\"j-value\" type=\"hidden\"></input>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<i class=\"fa fa-times\" style=\"vertical-align: baseline !important;\"></i></div>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["tmpl_dataView"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"j-dataview\" style=\"height: "
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + "; width: "
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" role=\"dataView\">\r\n	<div class=\"j-dataview-header j-toolbar-header\">\r\n	</div>\r\n	<div class=\"j-dataview-content jn-body-data\">\r\n	</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_dataViewContent"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div style=\"border: 1px solid #f1f1f1;border-radius: 3px;margin: 4px;\">\r\n	<div style=\"background: none repeat scroll 0 0 #f7f7f7;border-bottom: 1px solid #f1f1f1;padding: 4px;\">\r\n		"
    + alias3(((helper = (helper = helpers['0'] || (depth0 != null ? depth0['0'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"0","hash":{},"data":data}) : helper)))
    + "\r\n	</div>\r\n	<div style=\"padding: 4px;\">\r\n		"
    + alias3(((helper = (helper = helpers['1'] || (depth0 != null ? depth0['1'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"1","hash":{},"data":data}) : helper)))
    + "\r\n	</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_datePicker"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-datePicker\" role=\"datePicker\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div><input id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\"></input><i class=\"fa fa-calendar\" style=\"vertical-align: baseline !important;\"></i></div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_datePickerFooter"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"j-body j-bar j-color-bar \"><div class=\"j-body j-spacer\"></div><button class=\"j-button j-body j-border \"><span>Today</span></button><div class=\"j-body j-spacer\"></div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_datePickerHeader"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"j-body j-bar j-color-bar \"><button class=\"j-button j-body j-border j-bg-inherit j-border-inherit\"><i class=\"fa fa-chevron-left\"></i><span></span></button><div class=\"j-body j-spacer\"></div><button class=\"j-button j-body j-border j-bg-inherit j-calendar-select-month j-border-inherit\"><span></span></button><div class=\"j-body j-spacer\"></div><button class=\"j-button j-body j-border j-bg-inherit j-border-inherit\"><i class=\"fa fa-chevron-right\"></i><span></span></button></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_group"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div id=\""
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-group\" role=\"group\"></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_icon"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-icon "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa "
    + alias3(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_layout_horizontal"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias1).call(depth0,0,(data && data.index),{"name":"isnt","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<div id=\""
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-layout-content\"></div>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "	<div class=\"jn-layout-border-vertical\" style=\"width: 5px; background: none repeat scroll 0% 0% #F7F7F9; cursor: w-resize;\"></div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-flex jn-layout\" style=\"height:"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + ";width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + ";\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_layout_vertical"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias1).call(depth0,0,(data && data.index),{"name":"isnt","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<div id=\""
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-layout-content\"></div>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "	<div class=\"jn-layout-border-horizontal\" style=\"height: 5px; background: none repeat scroll 0% 0% #F7F7F9; cursor: n-resize;\"></div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-flex-vertical jn-layout\" style=\"height:"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + ";width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + ";\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_listItems"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "<td style=\"padding-right: 10px;\">"
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</td>";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda;

  return "				<tr value=\""
    + ((stack1 = alias1((depth0 != null ? depth0.value : depth0), depth0)) != null ? stack1 : "")
    + "\">"
    + ((stack1 = alias1((depth0 != null ? depth0.label : depth0), depth0)) != null ? stack1 : "")
    + "</tr>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"j-body j-listItems "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"listItems\">\r\n	<div class=\"j-listItems-top-toolbar\">\r\n		<div role=\"bar\" class=\"j-body j-bar j-color-bar \">\r\n			<div role=\"textField\" class=\"j-body j-textField j-listItems-searchText\">\r\n				<div><input value=\""
    + alias3(((helper = (helper = helpers.valueSearch || (depth0 != null ? depth0.valueSearch : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"valueSearch","hash":{},"data":data}) : helper)))
    + "\"><i style=\"vertical-align: baseline !important;\" class=\"fa fa-search\"></i></div>\r\n			</div>\r\n		</div>\r\n	</div>\r\n	<div class=\"j-listItems-container\" style=\"max-height: "
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + ";\">\r\n		<table>\r\n			<thead style=\"display:block;background:#f1f1f1\">\r\n				<tr class=\"j-listItems-header\">"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.displayName : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\r\n			</thead>\r\n			<tbody style=\"max-height:"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + ";display: block;overflow:auto;\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</tbody>\r\n		</table>\r\n	</div>\r\n	<div class=\"j-listItems-bottom-toolbar\">\r\n		<div role=\"bar\" class=\"j-body j-bar j-color-bar \"><div class=\"j-icon \"><i class=\"fa fa-angle-left\"></i></div><div class=\"j-body j-itemList-pageOf\">Page <input style=\"width:20px\"></input> of <span></span></div><div class=\"j-icon \"><i class=\"fa fa-angle-right\"></i></div><div class=\"j-icon \"><i class=\"fa fa-refresh\"></i></div><div class=\"j-body j-spacer\"></div></div>\r\n	</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_loadingMask"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"j-loadingMask\"><i class=\"fa fa-refresh\"></i><span>Loading...</span></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_loadingMaskProgress"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"j-loadingMask\"><i class=\"fa fa-refresh\"></i><span>Loading...</span><br/><div class=\"j-progress-bar\" style=\"width:"
    + this.escapeExpression(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "\"><div></div></div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_menu"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "j-menu-"
    + this.escapeExpression(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)));
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.menu : depth0),{"name":"if","hash":{},"fn":this.program(4, data, 0),"inverse":this.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "		<a class=\"j-menu-item "
    + alias2(alias1((depth0 != null ? depth0['class'] : depth0), depth0))
    + "\" unselectable=\"on\" items='"
    + alias2((helpers.jui2MenuFnChildMenu || (depth0 && depth0.jui2MenuFnChildMenu) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.menu : depth0),{"name":"jui2MenuFnChildMenu","hash":{},"data":data}))
    + "'><span><i class=\"fa "
    + alias2(alias1((depth0 != null ? depth0.icon : depth0), depth0))
    + "\"></i><span>"
    + ((stack1 = alias1((depth0 != null ? depth0.label : depth0), depth0)) != null ? stack1 : "")
    + "</span><i class=\"fa fa-caret-right\" style=\"padding-top:3px; padding-right: 8px; position: absolute; right: 0px;\"></i></span></a>\r\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "		<a class=\"j-menu-item "
    + alias2(alias1((depth0 != null ? depth0['class'] : depth0), depth0))
    + "\" unselectable=\"on\" items='undefined'><span><i class=\"fa "
    + alias2(alias1((depth0 != null ? depth0.icon : depth0), depth0))
    + "\"></i><span>"
    + ((stack1 = alias1((depth0 != null ? depth0.label : depth0), depth0)) != null ? stack1 : "")
    + "</span></span></a>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-modal-menu j-body "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.child : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"menu\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.menu : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_menuButton"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<button id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-button j-body j-border "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"menuButton\"><i class=\"fa "
    + alias3(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i><span>"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</span> <i class=\"fa fa-sort-down j-right-icon\" style=\"vertical-align: top;\"></i></button>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_modal"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"j-modal\" style=\"max-width: 100%; max-height: 100%;width: "
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + " !important;overflow: auto;\">\r\n	<div class=\"j-modal-top-toolbar\"></div>\r\n	<div class=\"j-modal-content\" style=\"overflow: auto;height: "
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + " !important;\"></div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_monthPicker"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<table id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-monthPicker "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"monthPicker\">\r\n	<tr><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.jan : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.jul : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td></tr>\r\n	<tr><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.feb : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.aug : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td></tr>\r\n	<tr><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.mar : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.sep : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td></tr>\r\n	<tr><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.apr : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.oct : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td></tr>\r\n	<tr><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.may : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.nov : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td></tr>\r\n	<tr><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.jun : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td><td>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.monthsName : depth0)) != null ? stack1.dec : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</td></tr>\r\n</table>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_overlay"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" style=\"top:"
    + alias3(((helper = (helper = helpers.top || (depth0 != null ? depth0.top : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"top","hash":{},"data":data}) : helper)))
    + "px;left:"
    + alias3(((helper = (helper = helpers.left || (depth0 != null ? depth0.left : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"left","hash":{},"data":data}) : helper)))
    + "px;height :"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + "px;width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "px;z-index:"
    + alias3(((helper = (helper = helpers.z || (depth0 != null ? depth0.z : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"z","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-overlay "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"overlay\">"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_pagination"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div role=\"pagination\" class=\"j-body j-bar j-color-bar j-pagination\" id="
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n	<div class=\"j-icon j-pagination-prev\">\r\n		<i class=\"fa fa-angle-left\"></i>\r\n	</div>\r\n	<div role=\"textField\" class=\"j-body j-textField table_sppbgoto j-table-textfield j-pagination-page\">\r\n		<label>Page</label>: <div><input value=\"1\"></div>\r\n	</div>\r\n	<div class=\"j-body j-text j-table-pageOf\" style=\"color: rgb(0, 0, 0);\">&nbsp;of "
    + alias3(((helper = (helper = helpers.pageOf || (depth0 != null ? depth0.pageOf : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"pageOf","hash":{},"data":data}) : helper)))
    + "</div>\r\n	<div class=\"j-icon j-pagination-next\">\r\n		<i class=\"fa fa-angle-right\"></i>\r\n	</div>\r\n	<div class=\"j-icon j-pagination-refresh\">\r\n		<i class=\"fa fa-repeat\"></i>\r\n	</div>\r\n	<div class=\"j-body j-spacer\"></div>\r\n	<div class=\"j-body j-text j-table-items\" style=\"color: #000;\">"
    + alias3(((helper = (helper = helpers.items || (depth0 != null ? depth0.items : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"items","hash":{},"data":data}) : helper)))
    + " items</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_part_bar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"j-part-bar\">"
    + this.escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_passwordField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" style=\"vertical-align: baseline !important;\"></i>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-textField\" role=\"passwordField\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div><input id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" type=\"password\"></input>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_popover"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"j-popover j-body\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n	<div class=\"j-arrow-"
    + alias3(((helper = (helper = helpers.arrow || (depth0 != null ? depth0.arrow : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"arrow","hash":{},"data":data}) : helper)))
    + "\">\r\n		<div class=\"j-part-bar\">"
    + ((stack1 = ((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n		<div class=\"j-popover-body\">"
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n	</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_radioField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "		<input type=\"radio\" value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\" id=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1].name : depths[1]), depth0))
    + "\"></input><label for=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.display : depth0), depth0))
    + "</label>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-radioField "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"radioField\">\r\n	"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<div>\r\n</div>";
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["tmpl_slider"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias1).call(depth0,0,(data && data.index),{"name":"isnt","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		<div class=\"jn-slider-item\">"
    + this.escapeExpression(((helper = (helper = helpers['1'] || (depth0 != null ? depth0['1'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"1","hash":{},"data":data}) : helper)))
    + "</div>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "		<div class=\"jn-spacer\"></div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-body jn-slider\" style=\"height:"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + ";width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + ";\" role=\"slider\">\r\n	<div class=\"jn-slider-bar\"><div class=\"jn-slider-cursor jn-border\"></div></div>\r\n	<div class=\"jn-flex\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_slimPagination"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-widget jn-border jn-body jn-toolbar jn-pagination jn-flex "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"pagination\">\r\n		<i class=\"jn-body jn-inline jn-pointer jn-radius fa fa-angle-double-left jn-pagination-first\"></i>\r\n		<i class=\"jn-body jn-inline jn-pointer jn-radius fa fa-angle-left jn-pagination-back\"></i>\r\n		<div class=\"jn-inline jn-separator\"></div>\r\n		<div class=\"jn-body jn-text-block jn-pagination-text-page\">Page</div>\r\n		<input class=\"jn-border jn-none jn-body jn-pagination-page\" style=\"width:30px;background:#fff;\" value=\"1\"></input>\r\n		<div class=\"jn-body jn-text-block jn-pagination-text-of\">"
    + alias3(((helper = (helper = helpers.of || (depth0 != null ? depth0.of : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"of","hash":{},"data":data}) : helper)))
    + "</div>\r\n		<div class=\"jn-inline jn-separator\"></div>\r\n		<i class=\"jn-body jn-inline jn-pointer jn-radius fa fa-angle-right jn-pagination-next\"></i>\r\n		<i class=\"jn-body jn-inline jn-pointer jn-radius fa fa-angle-double-right jn-pagination-last\"></i>\r\n		<div class=\"jn-inline jn-separator\"></div>\r\n		<i class=\"jn-inline jn-pointer jn-radius fa fa-refresh jn-pagination-refresh\" style=\"font-size: 14px;font-weight:500;\"></i>\r\n		<div class=\"jn-spacer\"></div>\r\n		<div class=\"jn-body jn-text-block jn-pagination-text-info\"></div>\r\n		<div style=\"border: 0px none; display: inline-block; margin: 0px 0px 0px 2px; padding: 3px 8px 6px; font-size: 17px; position: absolute; left: -5px; background: #F4F4F4;z-index:1000\" class=\"j-bar-prev-item\"><i class=\"fa fa-angle-double-left\"></i></div><div style=\"border: 0px none; display: inline-block; margin: 0px 0px 0px 2px; padding: 3px 8px 6px; font-size: 17px; position: absolute; right: 0px; background: #F4F4F4;\" class=\"j-bar-next-item\"><i class=\"fa fa-angle-double-right\"></i></div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_slimTable"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "	<div class=\"jn-widget jn-border jn-body jn-toolbar\"><b style=\"color:#666666\">"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</b></div>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\" jn-body jn-border jn-table "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"slimTable\" style=\"width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + ";height:"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + ";display: block; overflow: hidden;\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<div class=\"jn-header j-table-head\"></div>\r\n	<div style=\"overflow-x:hidden;\" class=\"jn-table-body\">\r\n		<table width=\"100%\" height=\"100%\" class=\"jn-collapse\" style=\"display:block;\">\r\n			<thead class=\"jn-header jn-header-data\" style=\"display:block;overflow:hidden;\">\r\n			</thead>\r\n			<tbody class=\"jn-body-data\" style=\"display: block; width: 100%; overflow: auto;\">\r\n			</tbody>\r\n		</table>\r\n	</div>\r\n	<div class=\"jn-footer\"></div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_slimTableData"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "<td class=\"jn-border\"><div style=\"padding: 3px;\">"
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</div></td>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<tr>"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tr>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_spacer"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div id=\""
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-spacer\"></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_splitButton"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-button j-body j-border\" role=\"splitButton\"><a><span><span><i class=\"fa "
    + alias3(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" style=\"vertical-align: baseline !important;\"></i> <span>"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</span> <i class=\"fa fa-sort-down j-splitButton-sub\"></i></span></span></a></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_symbol"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_table"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "			<div class=\"j-table-title\"><div>"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div><div class=\"j-group\" style=\"position: absolute;right: 5px;top: 5px;\"><div class=\"j-icon\" style=\"float:right\" onclick=\"jui2('#"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "')[0].expand()\"><i class=\"fa fa-expand\"></i></div><div class=\"j-icon\" style=\"float:right\" onclick=\"jui2('#"
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "')[0].settings()\"><i class=\"fa fa-cog\"></i></div></div></div>\r\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "				<tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "					<td colspan=\"1\" width=\"auto\" min-width=\"20px\"></td>\r\n				</tr>\r\n";
},"4":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "					<td colspan=\""
    + alias2(alias1((depth0 != null ? depth0.colspan : depth0), depth0))
    + "\" rowspan=\""
    + alias2(alias1((depth0 != null ? depth0.rowspan : depth0), depth0))
    + "\" width=\""
    + alias2(alias1((depth0 != null ? depth0.width : depth0), depth0))
    + "\" onmouseover=\"$(this).find('.j-table-header-menu').show()\" onmouseout=\"$(this).find('.j-table-header-menu').hide()\">\r\n						<div style=\"position: relative;width: "
    + alias2(alias1((depth0 != null ? depth0.width : depth0), depth0))
    + "\">"
    + ((stack1 = alias1((depth0 != null ? depth0.text : depth0), depth0)) != null ? stack1 : "")
    + "\r\n							<div class=\"j-table-header-menu\"><i class=\"fa fa-sort-down\"></i><div class=\"j-table-header-resize\" style=\"height:100%\"></div></div>\r\n						</div>\r\n					</td>\r\n";
},"6":function(depth0,helpers,partials,data) {
    return "						<td></td>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-table "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"table\" style=\"width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + ";height:"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + "\">\r\n	<div class=\"j-table-preview\"></div>\r\n	<div class=\"j-table-ruler\"></div>\r\n	<div class=\"j-table-top-toolbar\">\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n	<div class=\"j-table-head\">\r\n		<table>\r\n			<thead>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.columns : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</thead>\r\n			<tbody>\r\n				<tr>\r\n"
    + ((stack1 = (helpers['for'] || (depth0 && depth0['for']) || alias1).call(depth0,0,(depth0 != null ? depth0.colCount : depth0),1,{"name":"for","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "						<td class=\"j-table-last-td\"></td>\r\n				</tr>\r\n			</tbody>\r\n		</table>\r\n	</div>\r\n	<div class=\"j-table-body\">\r\n	</div>\r\n	<div class=\"j-table-bottom-toolbar\"></div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_tableData"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "		<colgroup><col></col></colgroup>\r\n";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "		<tr pk=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0.___id : depth0), depth0))
    + "\""
    + ((stack1 = helpers['if'].call(depth0,(depths[1] != null ? depths[1].preview : depths[1]),{"name":"if","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers['if'].call(depth0,(depths[1] != null ? depths[1].previewurl : depths[1]),{"name":"if","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(8, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			<td class=\"j-table-field\"><div>&nbsp;</div></td>\r\n		</tr>\r\n";
},"4":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return " ondblclick=\"jui2('#"
    + alias2(alias1((depths[2] != null ? depths[2].id : depths[2]), depth0))
    + "')[0].preview('"
    + alias2(alias1((depth0 != null ? depth0.___id : depth0), depth0))
    + "')\"";
},"6":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return " ondblclick=\"jui2('#"
    + alias2(alias1((depths[2] != null ? depths[2].id : depths[2]), depth0))
    + "')[0].previewUrl('"
    + alias2(alias1((depths[2] != null ? depths[2].previewurl : depths[2]), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0['0'] : depth0), depth0))
    + "')\"";
},"8":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.lt || (depth0 && depth0.lt) || helpers.helperMissing).call(depth0,(data && data.index),(depths[2] != null ? depths[2].colCount : depths[2]),{"name":"lt","hash":{},"fn":this.program(9, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"9":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.checkarray || (depth0 && depth0.checkarray) || helpers.helperMissing).call(depth0,(depths[3] != null ? depths[3].drop : depths[3]),(data && data.index),{"name":"checkarray","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.program(12, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"10":function(depth0,helpers,partials,data,blockParams,depths) {
    return "			<td class=\"j-table-field j-table-drop\" onclick=\"jui2($(this).parents('#"
    + this.escapeExpression(this.lambda((depths[4] != null ? depths[4].id : depths[4]), depth0))
    + "'))[0].showDrop(this)\"><div><i class=\"fa fa-plus-square-o\"></i></div></td>\r\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1;

  return "			<td class=\"j-table-field\"><div>"
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</div></td>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<table class=\"j-body "
    + this.escapeExpression(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" cellpadding=\"0\" cellspacing=\"0\">\r\n"
    + ((stack1 = (helpers['for'] || (depth0 && depth0['for']) || alias1).call(depth0,0,(depth0 != null ? depth0.colCount : depth0),1,{"name":"for","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		<colgroup><col></col></colgroup>\r\n	<tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</tbody>\r\n</table>\r\n<table class=\"j-table-sticky\">\r\n<tbody></tbody>\r\n</table>";
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["tmpl_tableDrop"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<tr class=\"jn-table-drop\"><td class=\"jn-border\" colspan=\""
    + this.escapeExpression(((helper = (helper = helpers.colspan || (depth0 != null ? depth0.colspan : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"colspan","hash":{},"data":data}) : helper)))
    + "\"></td></tr>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_tableHeader"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "<tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\r\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "	<td colspan=\""
    + alias3(((helper = (helper = helpers.colspan || (depth0 != null ? depth0.colspan : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"colspan","hash":{},"data":data}) : helper)))
    + "\" rowspan=\""
    + alias3(((helper = (helper = helpers.rowspan || (depth0 != null ? depth0.rowspan : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"rowspan","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-border\"><div style=\"padding: 3px;width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"text","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div></td>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.columns : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["jui2"]["tmpl"]["tmpl_text"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-text "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_textArea"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" style=\"vertical-align: baseline !important;\"></i>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-textArea "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"textArea\">\r\n	"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div style=\"min-width:232px !important;\">\r\n	<div class=\"j-textArea-top-toolbar j-color-bar j-bar\" style=\"height: inherit\">\r\n		\r\n	</div><div class=\"j-textArea-symbols\" style=\"width: 103px;\"></div><div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-textArea-editor\" style=\"white-space: pre-wrap;min-width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "px;\"><iframe width=\"100%\" height=\"100%\"></iframe></div>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_textField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"3":function(depth0,helpers,partials,data) {
    return "readonly";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" style=\"vertical-align: baseline !important;\"></i>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-textField "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"textField\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div><input class=\"jn-border-box\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.readonly : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "></input>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_timeField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"3":function(depth0,helpers,partials,data) {
    return "readonly";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" style=\"vertical-align: baseline !important;\"></i>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-textField "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + " j-timeField\" role=\"timeField\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div><input id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.readonly : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "></input> : <input id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.readonly : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "></input>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_timeLine"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "		<section style=\"width:"
    + alias2(alias1((depths[1] != null ? depths[1].scaleWidth : depths[1]), depth0))
    + "px\">"
    + alias2(alias1(depth0, depth0))
    + "</section>\r\n";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=this.escapeExpression;

  return "		<tr style=\"border-top: 1px solid #d9d9d9\">\r\n			<td></td><td style=\"position: relative;\"></td>\r\n		</tr>\r\n		<tr class=\"j-timeline-data\">\r\n			<td style=\"width:"
    + alias1(this.lambda((depths[1] != null ? depths[1].labelWidth : depths[1]), depth0))
    + "px\">"
    + alias1(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</td><td style=\"padding-bottom: 7px\"><div style=\"position:relative\">"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.line : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div></td>\r\n		</tr>\r\n";
},"4":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<span data-body=\""
    + alias3(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper)))
    + "\" style=\"left: "
    + alias3(alias4((depth0 != null ? depth0.pos : depth0), depth0))
    + "px; width: "
    + alias3(alias4((depth0 != null ? depth0.width : depth0), depth0))
    + "px; background: #fff3a1; border: 1px solid #52c4dd\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</span>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"j-body j-timeline "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" role=\"timeLine\">\r\n	<div class=\"j-timeline-title\">"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\r\n	<div class=\"j-timeline-scale\">\r\n		<section style=\"width:"
    + alias3(((helper = (helper = helpers.labelWidth || (depth0 != null ? depth0.labelWidth : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"labelWidth","hash":{},"data":data}) : helper)))
    + "px\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</section>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.scale : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n	<table style=\"width:100%;border-collapse:collapse;\" class=\"j-timeline-bar\">\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</table>\r\n</div>";
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["tmpl_tooltip"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<div class=\"j-body j-tooltip\" id=\""
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"><div class=\"j-tooltip-content\">"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div><div class=\"j-arrow-bottom-tooltip\"></div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_tree"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<ul id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-tree "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" width=\""
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + "\" role=\"tree\"><li></li>\r\n</ul>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_treeData"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<li>\r\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0['1'] : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<div data=\""
    + alias2(alias1((depth0 != null ? depth0.___id : depth0), depth0))
    + "\" class=\"j-tree-head\">"
    + alias2(alias1((depth0 != null ? depth0['0'] : depth0), depth0))
    + "</div>\r\n	<div class=\"j-tree-body\"></div>\r\n</li>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "	<i class=\"fa fa-plus-square-o\" data=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['1'] : depth0), depth0))
    + "\"></i>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["jui2"]["tmpl"]["tmpl_uploadField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label for=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>: ";
},"3":function(depth0,helpers,partials,data) {
    return "readonly";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\" style=\"vertical-align: baseline !important;\"></i>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-textField "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"uploadField\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.label : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<div><input id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.readonly : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " type=\"file\"></input>"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</div></div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_window"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"jn-body jn-window "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" style=\"width:"
    + alias3(((helper = (helper = helpers.width || (depth0 != null ? depth0.width : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"width","hash":{},"data":data}) : helper)))
    + ";height:"
    + alias3(((helper = (helper = helpers.height || (depth0 != null ? depth0.height : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"height","hash":{},"data":data}) : helper)))
    + ";\">\r\n	<div class=\"jn-title jn-flex\" style=\"height:35px;\">\r\n		"
    + alias3(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "\r\n		<div class=\"jn-spacer\"></div>\r\n		<div class=\"jn-pointer jn-hover-glow jn-window-minimize\" style=\"padding-top:6px;\">\r\n			<i class=\"fa fa-minus\"></i>\r\n		</div>\r\n		<div class=\"jn-pointer jn-hover-glow jn-window-expand\">\r\n			<i class=\"fa fa-expand\"></i>\r\n		</div>\r\n		<div class=\"jn-pointer jn-hover-glow jn-window-close\">\r\n			<i class=\"fa fa-times\"></i>\r\n		</div>\r\n	</div>\r\n	<div class=\"jn-header jn-flex\"></div>\r\n	<div class=\"jn-window-body\"></div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_windowPanel"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-windowPanel j-body j-border2 "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"windowPanel\">\r\n	<div class=\"j-windowPanel-main\">\r\n		<div class=\"j-windowPanel-buttonBar\"><i class=\"fa fa-minus\" onclick=\"$(this).parent().parent().parent()[0].jui2.minimize()\"></i> <i class=\"fa fa-times\" onclick=\"$(this).parent().parent().parent()[0].jui2.destroy()\"></i></div>\r\n		<div class=\"j-windowPanel-top-toolbar\"></div>\r\n		<div class=\"j-windowPanel-content\">"
    + ((stack1 = ((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"content","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\r\n	<div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tmpl_yearPicker"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<table id=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-body j-yearPicker "
    + alias3(((helper = (helper = helpers['class'] || (depth0 != null ? depth0['class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"class","hash":{},"data":data}) : helper)))
    + "\" role=\"yearPicker\">\r\n	<thead>\r\n		<tr><td colspan=\"2\" class=\"j-yearPicker-top-toolbar\"></td></tr>\r\n	</thead>\r\n	<tbody>\r\n		<tr><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"-",4,{"name":"math","hash":{},"data":data}))
    + "</td><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"+",1,{"name":"math","hash":{},"data":data}))
    + "</td></tr>\r\n		<tr><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"-",3,{"name":"math","hash":{},"data":data}))
    + "</td><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"+",2,{"name":"math","hash":{},"data":data}))
    + "</td></tr>\r\n		<tr><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"-",2,{"name":"math","hash":{},"data":data}))
    + "</td><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"+",3,{"name":"math","hash":{},"data":data}))
    + "</td></tr>\r\n		<tr><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"-",1,{"name":"math","hash":{},"data":data}))
    + "</td><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"+",4,{"name":"math","hash":{},"data":data}))
    + "</td></tr>\r\n		<tr><td class=\"j-yearPicker-selected\">"
    + alias3(((helper = (helper = helpers.year || (depth0 != null ? depth0.year : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"year","hash":{},"data":data}) : helper)))
    + "</td><td>"
    + alias3((helpers.math || (depth0 && depth0.math) || alias1).call(depth0,(depth0 != null ? depth0.year : depth0),"+",5,{"name":"math","hash":{},"data":data}))
    + "</td></tr>\r\n	</tbody>\r\n</table>";
},"useData":true});