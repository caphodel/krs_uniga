/**
 * @classdesc Chart extension for j-table
 * @class chart @extension table
 */
(function($){
  head.load([jui2.path+'extension/tablechart/chart.js'], function(){
    jui2.ui.table.proto.colors = {};
    jui2.ui.table.proto.colors.names = {
      0: "#56E289",
      1: "#56E2CF",
      2: "#56AEE2",
      3: "#5668E2",
      4: "#8A56E2",
      5: "#CF56E2",
      6: "#E256AE",
      7: "#E25668",
      8: "#E28956",
      9: "#E2CF56",
      10: "#AEE256",
      11: "#68E256",
      12: "#56E289"
    };

    jui2.ui.table.proto.colors.random = function() {
      var result, count = 0;
      for (var prop in this.names)
          if (Math.random() < 1/++count)
             result = prop;
      return result;
    };

    jui2.ui.table.proto.removeChart = function(target){
      if(target)
        target.find(' > canvas').remove()
      else
        $(this).find('> .j-table-body > canvas').remove();
    }

    jui2.ui.table.proto.chart = function(type, legend, datax, datay, target){
      if(target)
        var absolute = false
      else
        var absolute = true

      var $self = $(this), self = this, type = type || 'line', legend = legend || $self.find(' > .j-table-body > table > tbody > tr > td:nth-child(1)').map(function(){
        return $(this).text();
      }).get(),
      datax = $self.find(' > .j-table-body > table > thead > tr > th:nth-child(n+2)').map(function(){
        return $(this).text();
      }).get(),
      datay = $self.find(' > .j-table-body > table > tbody > tr').map(function(){
        return [$(this).children('td:nth-child(n+2)').map(function(){
          return $(this).text()
        }).get()];
      }).get(),
      data, canvas, ctx, chart, tableBody = $self.find(' > .j-table-body'), target = target || $self.find(' > .j-table-body'), title = '';

      if($self.find(' > .j-title').length > 0)
        title = $self.find(' > .j-title').text();

      target.find(' > canvas').remove()

      if(absolute){
        target.append('<canvas style="background: inherit; top: 0px; left: 0px; position: absolute; width: '+tableBody.outerWidth()+'px; height: '+tableBody.outerHeight()+'px;"></canvas>');
      }
      else {
        target.append('<canvas style="background: inherit; width: '+tableBody.outerWidth()+'px; height: '+tableBody.outerHeight()+'px;"></canvas>');
      }
      
      canvas = target.find(' > canvas')
      canvas.css('z-index', jui2.findHighestZIndex())

      if(type.toLowerCase()=='line'){
        var tmp = [];
        var a = 0;
        for( i in legend){
          if(legend.hasOwnProperty(i)){
            var color = this.colors.names[a];
            tmp.push({
      				label: legend[i],
      				data: datay[i],
              strokeColor: color,
              pointColor: color
      			})
            a++;
          }
        }
        data = {
      		labels: datax,
          datasets: tmp
        }
        ctx = canvas[0].getContext("2d");
      	chart = new Chart(ctx).Line(data, {
      		bezierCurve: false,
      		datasetFill: false,
      		onAnimationComplete: function(){
            $self.triggerHandler('chartafterdraw')
      		},
          tooltipFillColor: "rgba(0,0,0,0.8)",
          multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>"
      	});
      }
    }
  });

}(jQuery))
