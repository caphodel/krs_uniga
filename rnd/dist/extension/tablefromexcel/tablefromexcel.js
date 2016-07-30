/**
 * @classdesc Extension for loading data from excel
 * @class tablefromexcel @extension loader
 */
(function($){

  jui2.attrChange['j-loader_xls'] = function(el, oldVal, newVal){
    head.load([jui2.path+'extension/tablefromexcel/jszip.js', jui2.path+'extension/tablefromexcel/xlsx.js'], function(){
      if(newVal){
        $(el).removeAttr('src');
        $(el).attr('fn', 'xls'+$(el).attr('id'));
        window['xls'+$(el).attr('id')] = function(param, callback, always){
          var oReq = new XMLHttpRequest();
          oReq.open("GET", newVal, true);
          oReq.responseType = "arraybuffer";

          oReq.onload = function(e) {
            if (e.status !== 200) {
              var arraybuffer = oReq.response;
              /* convert data to binary string */
              var data = new Uint8Array(arraybuffer), arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");

              /* Call XLSX */
              var workbook = XLSX.read(bstr, {type:"binary"}),
              worksheet = workbook.Sheets[workbook.SheetNames[0]],
              aaData = XLSX.utils.sheet_to_json(worksheet, {header:1}),
              count = aaData.length
              aaData = aaData.splice(param.iDisplayStart, param.iDisplayLength);
              callback({sEcho: param.sEcho, iTotalRecords: count, iTotalDisplayRecords: param.iDisplayLength, aaData: aaData});
            }
            always();
          }
          oReq.send()
        }
        $(el).parent()[0].generateData();
      }
    })
  }

  jui2.attrChange['j-loader_local-xls'] = function(el, oldVal, newVal){
    head.load([jui2.path+'extension/tablefromexcel/jszip.js', jui2.path+'extension/tablefromexcel/xlsx.js'], function(){
      if(newVal){
        $(el).removeAttr('src');
        $(el).attr('fn', 'xls'+$(el).attr('id'));
        window['xls'+$(el).attr('id')] = function(param, callback, always){
          var oReq = new XMLHttpRequest();
          oReq.open("GET", newVal, true);
          oReq.responseType = "arraybuffer";

          oReq.onload = function(e) {
            if (e.status !== 200) {
              var arraybuffer = oReq.response;
              /* convert data to binary string */
              var data = new Uint8Array(arraybuffer), arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");

              /* Call XLSX */
              var workbook = XLSX.read(bstr, {type:"binary"}),
              worksheet = workbook.Sheets[workbook.SheetNames[0]],
              aaData = XLSX.utils.sheet_to_json(worksheet, {header:1}),
              count = aaData.length
              aaData = aaData.splice(param.iDisplayStart, param.iDisplayLength);
              callback({sEcho: param.sEcho, iTotalRecords: count, iTotalDisplayRecords: param.iDisplayLength, aaData: aaData});
            }
            always();
          }
          oReq.send()
        }
        $(el).parent()[0].generateData();
      }
    })
  }

}(jQuery))
