/**
 *  Copyright (c) 2011 Grid Dynamics Consulting Services, Inc, All Rights Reserved
 *  http://www.griddynamics.com
 *
 *    Licensed under the Apache License, Version 2.0 (the "License"); you may
 *    not use this file except in compliance with the License. You may obtain
 *    a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *    License for the specific language governing permissions and limitations
 *    under the License.
 *
 *    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function( $ ){
    var methods = {
        init : function( options ) {
            var settings = {
                'template' : 'ajax_table_template',
                'url' : '',
                'autoUpdate' : true,
                'interval' : 5000,
                'beforeUpdate' : null,
                'afterUpdate' : null,
                'sortable': false,
                'cacheable': false // NOTE: this param isn't used in current version
            };
            if ( options ) {
                $.extend( settings, options );
            }

            var $this = $(this);
            var data = $this.data('ajaxTable');

            if (!data){
                $(this).data('ajaxTable', {
                    timers : {},
                    beforeUpdate : settings.beforeUpdate,
                    afterUpdate : settings.afterUpdate,
                    cachedData: null
                });
                data = $this.data('ajaxTable');

            }
           
            var selector = this;

            var findRow = function(dataItems, dataValue, column){
                for (var i=0; i<dataItems.length; i++){
                    var dataItem = dataItems[i];
                    for (var p in dataItem){
                        if (p == column && dataItem[p] == dataValue){
                            return dataItem;
                        }
                    }
                }
                return null;
            }

            var sort = function(sortOrder, column){
                var sorted_data = [];
                if (data.cachedData){
                    var sorted_column = new Array();
                    for (var i=0;i<data.cachedData.length; i++)
                    {
                        var currentItem = data.cachedData[i];
                        var dataItem = null;
                        for (var pi in currentItem)
                        {
                            if (pi == column){
                                dataItem = currentItem[pi];
                            }
                        }
                        sorted_column.push(dataItem);
                    }
                    sorted_column = sorted_column.sort();

                    if (sortOrder == 'desc') {
                        sorted_column = sorted_column.reverse();
                    }

                    for (i=0; i< sorted_column.length; i++){
                        // TODO: fix issue with non unique data in columns
                        // need to check all fields
                        var line = findRow(data.cachedData, sorted_column[i], column)
                        sorted_data.push(line);
                    }
                }
                selector.each(function(){
                    var elem = this;
                    var body = $(elem).children("tbody");
                    body.html("");
                    $("#" + settings.template).tmpl(sorted_data).appendTo(body);
                });
            }

            var initSort = function(isUpdated, tableData){
                var cache = new Array();
                selector.each(function(){
                    $(this).children("thead").children("tr").children("th").click(function(){
                        var th = $(this);
                        var sortOrder = th.attr("sortOrder");

                        if (sortOrder){
                            if (sortOrder == 'asc'){
                                sortOrder = 'desc';
                            } else {
                                sortOrder = 'asc';
                            }
                        } else {
                            sortOrder = 'asc';
                        }
                        var tableHeaders = selector.children("thead").children("tr").children("th");
                        tableHeaders.removeAttr("sortOrder");
                        tableHeaders.removeClass("sorted-asc sorted-desc");
                        th.attr("sortOrder", sortOrder);
                        th.addClass("sorted-"+sortOrder);
                        sort(sortOrder, th.attr("key"));
                    });
                });
                data.cachedData = tableData;
            }

            function update(){
                selector.children("thead").children("tr").children("th").unbind("click");
                
                if (data.beforeUpdate){
                    data.beforeUpdate();
                }

                selector.each(function(){
                    var elem = this;
                    $.get(settings.url, function(response){
                        var body = $(elem).children("tbody");
                        body.html("");
                        $("#" + settings.template).tmpl(response).appendTo(body);

                        if (data.afterUpdate){
                            data.afterUpdate();
                        }
                        if (settings.sortable){
                            var isUpdated = true;
                            if (settings.cacheable){
                                isUpdated = false;
                            }
                            initSort(isUpdated, response);
                            selector.children("thead").children("tr").children("th.sorted-asc").each(function(){

                                sort($(this).attr("sortOrder"), $(this).attr("key"));
                            });
                            selector.children("thead").children("tr").children("th.sorted-desc").each(function(){
                                sort($(this).attr("sortOrder"), $(this).attr("key"));
                            });
                        }
                    })
                    .error(function() { 
                        var body = $(elem).children("tbody");
                        body.html("");
                        $("#" + settings.template).tmpl("response").appendTo(body);
                        //alert("error"); 
                    });
                });
            }

            update();

            if (settings.autoUpdate && !data.timers[this.selector]){
                data.timers[this.selector] = window.setInterval(update, settings.interval);
                intervalId[countIntervalId] = data.timers[this.selector];
                countIntervalId++;
            }
			
			/**
			* add function by developer
			**/
			
			
        },
        stop : function( ) {
            var $this = $(this);
            var data = $this.data('ajaxTable');
            if (data){
                window.clearInterval(data.timers[this.selector]);
                data.timers[this.selector] = null;
            }
        }
    };

    $.fn.ajaxTable = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
        }	
    };
})( jQuery );