this["jui2"] = this["jui2"] || {};
this["jui2"]["tmpl"] = this["jui2"]["tmpl"] || {};

this["jui2"]["tmpl"]["calendar"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return "			<th>"
    + this.escapeExpression(((helper = (helper = helpers['short'] || (depth0 != null ? depth0['short'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"short","hash":{},"data":data}) : helper)))
    + "</th>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<table cellspacing=\"0px\">\r\n	<thead>\r\n		<tr>\r\n			<th><i class=\"fa fa-chevron-left\" style=\"position:static;\"></i>&nbsp;</th>\r\n			<th colspan=\"5\" style=\"width: 180px;\">"
    + this.escapeExpression(((helper = (helper = helpers.month || (depth0 != null ? depth0.month : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"month","hash":{},"data":data}) : helper)))
    + "</th>\r\n			<th>&nbsp;<i class=\"fa fa-chevron-right\" style=\"position:static;\"></i></th>\r\n		</tr>\r\n		<tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.day : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tr>\r\n	</thead>\r\n	<tbody>\r\n	</tbody>\r\n	<tfoot>\r\n		<tr>\r\n			<td colspan=\"7\" style=\"text-align: center\">\r\n				<j-button>Today</j-button>\r\n			</td>\r\n		</tr>\r\n	</tfoot>\r\n</table>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["calendarBody"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "<tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return "	<td>"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</td>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.date : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["jui2"]["tmpl"]["comboToolbar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<j-toolbar><j-spacer></j-spacer><j-textfield icon=\"fa-search\"></j-textfield></j-toolbar>";
},"useData":true});

this["jui2"]["tmpl"]["confirm"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div style=\"height: 100%; width: 100%; position: fixed; top: 0px; left: 0px; background: rgba(0, 0, 0, 0.25) none repeat scroll 0% 0%; z-index: 1000000; vertical-align: middle; text-align: center;\" class=\"j-confirm\"><div style=\"margin: auto; top: 50%; position: absolute; left: 50%; background: rgb(255, 255, 255) none repeat scroll 0% 0%; padding: 20px 0px 0px; transform: translate(-50%, -50%);\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "<div style=\"padding-top: 20px; margin-top: 20px; min-width: 250px; padding-bottom: 20px; background: rgb(242, 242, 242) none repeat scroll 0% 0%;\"><j-button color=\"blue\" id=\"j-ZJe77TP8\" tabindex=\"0\" class=\"j-transition1 j-border-box j-focus-highlight1\">&nbsp;&nbsp;&nbsp;&nbsp;Yes&nbsp;&nbsp;&nbsp;&nbsp;</j-button><j-button color=\"red\" id=\"j-7FQvjocx\" tabindex=\"0\" class=\"j-transition1 j-border-box j-focus-highlight1\">&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;&nbsp;</j-button></div></div></div>";
},"useData":true});

this["jui2"]["tmpl"]["dataView"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "			<tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "			</tr>\r\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1;

  return "				<td>"
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</td>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"j-table-body\">\r\n	<table>\r\n		<tbody>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</tbody>\r\n	</table>\r\n</div>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["dataViewData"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<tr"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0,(depths[1] != null ? depths[1].type : depths[1]),"table",{"name":"is","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\r\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\r\n";
},"2":function(depth0,helpers,partials,data) {
    return " class=\"j-tr-bg-hover\"";
},"4":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "	<td"
    + ((stack1 = (helpers.is || (depth0 && depth0.is) || helpers.helperMissing).call(depth0,(depths[2] != null ? depths[2].type : depths[2]),"table",{"name":"is","hash":{},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</td>\r\n";
},"5":function(depth0,helpers,partials,data) {
    return " class=\"j-border-bot1 j-pad1\"";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["dateTime"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<table style=\"width: 100px !important\">\r\n	<tr>\r\n		<td><i class=\"fa fa-angle-up\"/></td>\r\n		<td><i class=\"fa fa-angle-up\"/></td>\r\n	</tr>\r\n	<tr>\r\n		<td><input type=\"text\" class=\"j-border1 j-input-field j-transition1 j-focus-highlight1 j-datetime-hour\" value=\""
    + alias3(((helper = (helper = helpers.hour || (depth0 != null ? depth0.hour : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"hour","hash":{},"data":data}) : helper)))
    + "\" style=\"width: 30px !important;\"></td>\r\n		<td><input type=\"text\" class=\"j-border1 j-input-field j-transition1 j-focus-highlight1 j-datetime-minute\" value=\""
    + alias3(((helper = (helper = helpers.minute || (depth0 != null ? depth0.minute : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"minute","hash":{},"data":data}) : helper)))
    + "\" style=\"width: 30px !important;\"></td>\r\n	</tr>\r\n	<tr>\r\n		<td><i class=\"fa fa-angle-down\"/></td>\r\n		<td><i class=\"fa fa-angle-down\"/></td>\r\n	</tr>\r\n</table>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["hslider"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<i class=\"fa fa-caret-left\"></i><div></div><i class=\"fa fa-caret-right\"></i>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["mask"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"j-disable "
    + this.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\"></div>";
},"useData":true});

this["jui2"]["tmpl"]["pagination"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<i class=\"fa fa-angle-left\"></i>\r\n<j-textfield class=\"j-gotopage\">Page</j-textfield>\r\n<span class=\"j-pageof\">of&nbsp;</span>\r\n<i class=\"fa fa-angle-right\"></i>\r\n<j-combofield class=\"j-itemPerPage\" value=\"10\" search=\"false\">\r\n<j-table>\r\n  [[\"Items per page\"],[10],[25],[50],[100],[200]]\r\n</j-table>\r\n</j-combofield>\r\n<span>items per page</span>\r\n<i class=\"fa fa-refresh\"></i>\r\n<j-spacer></j-spacer>\r\n<span class=\"j-total\">0 items</span>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["radioField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return ": ";
},"3":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "<input name=\""
    + alias2(alias1((depths[1] != null ? depths[1].id : depths[1]), depth0))
    + "\" class=\"j-border1 j-input-field j-transition1 j-focus-highlight1\" value=\""
    + ((stack1 = alias1((depth0 != null ? depth0['0'] : depth0), depth0)) != null ? stack1 : "")
    + "\" type=\""
    + alias2(alias1((depths[1] != null ? depths[1].type : depths[1]), depth0))
    + "\"></input><label>"
    + alias2(alias1((depth0 != null ? depth0['1'] : depth0), depth0))
    + "</label>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=this.lambda;

  return "<label class=\"j-label\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</label>"
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),"",{"name":"isnt","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<input name=\""
    + alias3(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\"j-border1 j-input-field j-transition1 j-focus-highlight1\" value=\""
    + ((stack1 = alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.radios : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1['0'] : stack1), depth0)) != null ? stack1 : "")
    + "\" type=\""
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></input><label>"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.radios : depth0)) != null ? stack1['0'] : stack1)) != null ? stack1['1'] : stack1), depth0))
    + "</label>"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.radios : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\r\n";
},"useData":true,"useDepths":true});

this["jui2"]["tmpl"]["rightMenu"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "";
},"useData":true});

this["jui2"]["tmpl"]["scroll"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div style=\"width:100%; display:block;\">\r\n	<div style=\"display: block; height: 0px;\">&nbsp;</div>\r\n</div>";
},"useData":true});

this["jui2"]["tmpl"]["tableFilter"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<table width=\"100%\">\r\n	<tr>\r\n		<td>\r\n		Filter :<br />\r\n		<table class=\"j-table-filter-body\">\r\n			<tbody>\r\n			</tbody>\r\n		</table><br/><br/>\r\n		<j-button class=\"j-table-filter-search\" color=\"blue\">Search</j-button>\r\n		<j-button class=\"j-table-filter-add-edit\">Add/Edit Filter</j-button>\r\n		<j-button class=\"j-table-filter-clear\">Clear</j-button>\r\n	</td>\r\n		<td style=\"float: right;vertical-align: top;\">\r\n			<j-combofield class=\"j-table-filter-add\">Add Filter\r\n				<j-table>\r\n					"
    + alias3(((helper = (helper = helpers.filterList || (depth0 != null ? depth0.filterList : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"filterList","hash":{},"data":data}) : helper)))
    + "\r\n				</j-table>\r\n			</j-combofield><br/>\r\n			<j-combofield class=\"j-table-filter-filter\" pk=\"0\">Filter Name\r\n				<j-table>\r\n					<j-loader src=\""
    + alias3(((helper = (helper = helpers.filterSource || (depth0 != null ? depth0.filterSource : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"filterSource","hash":{},"data":data}) : helper)))
    + "\"></j-loader>\r\n						[[\"\", \"\", \"Name\", \"\", \"\"]]\r\n					<j-pagination>\r\n					</j-pagination>\r\n				</j-table>\r\n			</j-combofield>\r\n		</td>\r\n	</tr>\r\n</table>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["tableForm"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div>\r\n</div>\r\n<j-toolbar>\r\n	<j-spacer>\r\n	</j-spacer>\r\n	<j-button class=\"j-table-form-cancel\">"
    + alias3(((helper = (helper = helpers.cancel || (depth0 != null ? depth0.cancel : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cancel","hash":{},"data":data}) : helper)))
    + "</j-button>\r\n	<j-button class=\"j-table-form-submit\" color=\"blue\">"
    + alias3(((helper = (helper = helpers.submit || (depth0 != null ? depth0.submit : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"submit","hash":{},"data":data}) : helper)))
    + "</j-button>\r\n</j-toolbar>";
},"useData":true});

this["jui2"]["tmpl"]["tableHeader"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return "		<th class=\"j-border-bot2 j-bg1 j-no-wrap j-border-right1\"><div class=\"j-pad1\">"
    + ((stack1 = this.lambda(depth0, depth0)) != null ? stack1 : "")
    + "<div class=\"j-table-sort\"></div><j-resize drag=\"true\" direction=\"horizontal\"></j-resize></div></th>\r\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<thead>\r\n	<tr>\r\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.columns : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</tr>\r\n</thead>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["tableInPlaceForm"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<j-toolbar>\r\n	<j-spacer>\r\n	</j-spacer>\r\n	<j-button class=\"j-table-form-cancel\">"
    + alias3(((helper = (helper = helpers.cancel || (depth0 != null ? depth0.cancel : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cancel","hash":{},"data":data}) : helper)))
    + "</j-button>\r\n	<j-button class=\"j-table-form-submit\" color=\"blue\">"
    + alias3(((helper = (helper = helpers.submit || (depth0 != null ? depth0.submit : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"submit","hash":{},"data":data}) : helper)))
    + "</j-button>\r\n</j-toolbar>";
},"useData":true});

this["jui2"]["tmpl"]["textArea"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return ": ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<label class=\"j-label\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</label>"
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),"",{"name":"isnt","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<textarea class=\"j-border1 j-input-field\"></textarea>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["textField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return ": ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function";

  return "<label class=\"j-label\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</label>"
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),"",{"name":"isnt","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<input class=\"j-border1 j-input-field j-transition1 j-focus-highlight1\" type=\""
    + this.escapeExpression(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></input>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["timeField"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return ": ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<label class=\"j-label\">"
    + ((stack1 = ((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</label>"
    + ((stack1 = (helpers.isnt || (depth0 && depth0.isnt) || alias1).call(depth0,(depth0 != null ? depth0.label : depth0),"",{"name":"isnt","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "<input type=\""
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></input> : <input type=\""
    + alias3(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></input>\r\n";
},"useData":true});

this["jui2"]["tmpl"]["timeFieldBody"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div style=\"display: none;\">\r\n	<table>\r\n		<tr>\r\n			<td colspan=\"12\">Hour</td>\r\n		</tr>\r\n		<tr>\r\n			<td>00</td>\r\n			<td>01</td>\r\n			<td>02</td>\r\n			<td>03</td>\r\n			<td>04</td>\r\n			<td>05</td>\r\n			<td>06</td>\r\n			<td>07</td>\r\n			<td>08</td>\r\n			<td>09</td>\r\n			<td>10</td>\r\n			<td>11</td>\r\n		</tr>\r\n		<tr>\r\n			<td>12</td>\r\n			<td>13</td>\r\n			<td>14</td>\r\n			<td>15</td>\r\n			<td>16</td>\r\n			<td>17</td>\r\n			<td>18</td>\r\n			<td>19</td>\r\n			<td>20</td>\r\n			<td>21</td>\r\n			<td>22</td>\r\n			<td>23</td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"12\">Minute</td>\r\n		</tr>\r\n		<tr>\r\n			<td>00</td>\r\n			<td>05</td>\r\n			<td>10</td>\r\n			<td>15</td>\r\n			<td>20</td>\r\n			<td>25</td>\r\n			<td>30</td>\r\n			<td>35</td>\r\n			<td>40</td>\r\n			<td>45</td>\r\n			<td>50</td>\r\n			<td>55</td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"12\">\r\n				<j-button class=\"j-timeField-setTime\">Set Time</j-button>\r\n			</td>\r\n		</tr>\r\n	</table>\r\n</div>\r\n";
},"useData":true});