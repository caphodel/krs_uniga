$(document).ready(function(){

});

$.extend($.expr[":"], {
  "containsIgnoreCase": function(elem, i, match, array) {
     return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
}});


// Numeric only control handler
jQuery.fn.inputNumberOnly =
function(){
    return this.each(function(){
        $(this).keydown(function(e){
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, arrows, numbers and keypad numbers ONLY
            return (
                key == 8 ||
                key == 9 ||
                key == 46 ||
                (key >= 37 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};
function strToMinute(time)
{
    var str = time.split(":");
    var min = (str[0]*60) + parseInt(str[1]);
    return min;
}
function switch_tab(obj)
{
    $(".tabs > a").attr("class", "tab");
    $(obj).attr("class", "current_tab");
}
function formatNumber(input)
{
    var num = input.value.replace(/\,/g,'');
    if(!isNaN(num)){
    if(num.indexOf('.') > -1){
    num = num.split('.');
    num[0] = num[0].toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1,').split('').reverse().join('').replace(/^[\,]/,'');
    if(num[1].length > 2){
    alert('You may only enter two decimals!');
    num[1] = num[1].substring(0,num[1].length-1);
    } input.value = num[0]+'.'+num[1];
    } else{ input.value = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1,').split('').reverse().join('').replace(/^[\,]/,'') };
    }
    else{ alert('Anda hanya diperbolehkan memasukkan angka!');
    input.value = input.value.substring(0,input.value.length-1);
    }
}


/* COMMON FUNCTIONS */
function clearAllInterval(){
    var i=0;
    for (i=0;i<intervalId.length;i++){
        clearInterval(intervalId[i]);
    }
    intervalId = new Array();
    countIntervalId = 0;
}

/*function purgeContent(id){
    var content = document.getElementById(id);
    while(content.lastChild)
        content.removeChild(content.lastChild);
}
function removeElement(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
function clearAllChart(){
    var i=0;
    for (i=0;i<chartAll.length;i++){
        purgeContent(chartAll[i]);
    }
    chartAll = new Array();
    countChart = 0;
}*/

function ajaxLoadPage(args)
{
	clearAllInterval();
	var params = {
		url : site,
		dataType : "html",
		data : null,
		targetDiv : ""
	};
	$.extend(params, args);
    //clearAllChart();
    var image_load = "<div class='ajax_loading'><img src='"+loading_image_large+"' /></div>";
    $.ajax({
        url: site+"/"+ params.url,
		type : "post",
		data : params.data,
        beforeSend: function(){
            $(params.targetDiv).html(image_load);
        },
        success: function(response){
            $(params.targetDiv).html(response);
        },
        dataType:params.dataType
    });
    return false;
}

function ajaxLoadAnotherPage(args)
{
	clearAllInterval();
	var params = {
		url : "",
		dataType : "html",
		data : null,
		targetDiv : ""
	};
	$.extend(params, args);
    //clearAllChart();
    var image_load = "<div class='ajax_loading'><img src='"+loading_image_large+"' /></div>";
    $.ajax({
        url:  params.url,
		type : "post",
		data : params.data,
        beforeSend: function(){
            $(params.targetDiv).html(image_load);
        },
        success: function(response){
            $(params.targetDiv).html(response);
        },
        dataType:params.dataType
    });
    return false;
}

function load(page,div){
	genFromFunc = false;
    clearAllInterval();
    //clearAllChart();
    var image_load = "<div class='ajax_loading'><img src='"+loading_image_large+"' /></div>";
    $.ajax({
        url: site+"/"+page,
        beforeSend: function(){
            $(div).html(image_load);
        },
        success: function(response){
            $(div).html(response);
        },
        dataType:"html"
    });
    return false;
}

function loading(div){
    var image_load = "<div class='ajax_loading'><img src='"+loading_image_large+"' /></div>";
    $(div).html(image_load);
    return false;
}
function loadnoBaseUrl(page,div){
    clearAllInterval();
    var image_load = "<div class='ajax_loading'><img src='"+loading_image_large+"' /></div>";
    $.ajax({
        url: "http://"+page,
        beforeSend: function(){
            $(div).html(image_load);
        },
        success: function(response){
            $(div).html(response);
        },
        dataType:"html"
    });
    return false;
}
function send_form_loading(formObj,action,responseDIV)
{
    var image_load = "<div class='ajax_loading'><img src='"+loading_image_large+"' /></div>";
    $.ajax({
        url: site+"/"+action,
        data: $(formObj.elements).serialize(),
        beforeSend: function(){
            $(responseDIV).html(image_load);
        },
        success: function(response){
                $(responseDIV).html(response);
            },
        type: "post",
        dataType: "html"
    });
    return false;
}
function load_small(page,div,loadingDom,opt){
    var image_load_small = "<span class='ajax_loading_small'><img src='"+loading_image_small+"' /></span>";
    $.ajax({
        url: site+"/"+page,
        beforeSend: function(){
            $(loadingDom).html(image_load_small);
        },
        success: function(response){
            $(loadingDom).html('');
            if(opt=="append")
            {
                $(div).append(response);
            }
            else
            {
                $(div).html(response);
            }
        },
        dataType:"html"
    });
    return false;
}

function load_no_loading_noInterval(page,div){
    clearAllInterval();
    $.ajax({
        url: site+"/"+page,
        success: function(response){
            $(div).html(response);
        },
        dataType:"html"
    });
    return false;
}

function load_no_loading(page,div){
    $.ajax({
        url: site+"/"+page,
        success: function(response){
            $(div).html(response);
        },
        dataType:"html"
    });
    return false;
}
function load_no_any(page){
    $.ajax({
        url: site+"/"+page
        //success: function(response){
            //$(div).html(response);
        //},
        //dataType:"html"
    });
    return false;
}
function dummyload(page){
    $.ajax({
        url: site+"/"+page,
        dataType:"html"
    });
    return false;
}
function send_form(formObj,action,responseDIV)
{
    $.ajax({
        url: site+"/"+action,
        data: $(formObj.elements).serialize(),
        success: function(response){
                $(responseDIV).html(response);
            },
        type: "post",
        dataType: "html"
    });
    return false;
}

var image_load = "<div class='ajax_loading'><img src='"+loading_image_large+"' /></div>";
function getAjaxLoad(args){

	// default setting
	var params = {
		url : "",
		type : "POST" ,
		data : "",
		dataType : "html",
		targetDiv : ""
	}
	var site = "";
	// jika tidak ada setting maka default
	args = args || params ;
	// kombinasikan dengan parameter input user dari args ( arguments )
	$.extend(params, args);
	if(params.targetDiv == ""){
		alert("Masukan ID div untuk menampilkan content");
		return ;
	}else{
		var targetDiv = "";
		if(params.targetDiv.indexOf("#") > -1){
			targetDiv = params.targetDiv ;
		}else{
			targetDiv = "#" + params.targetDiv;
		}
		$.ajax({
			url: site+"/"+params.url,
			type : params.type,
			data : params.data,
	        beforeSend: function(){
	            $(targetDiv).html(image_load);
	        },
	        success: function(response){
	            $(targetDiv).html(response);
	        },
	        dataType:params.dataType
		});
		return false;
	}
	return false ; // setting by default adalah false
}

function getAjaxLoad(args){
	var xImage_load = "" || image_load ;
	// default setting
	var params = {
		url : "",
		type : "POST" ,
		data : "",
		dataType : "html",
		targetDiv : ""
	}
	var site = "";
	// jika tidak ada setting maka default
	args = args || params ;
	// kombinasikan dengan parameter input user dari args ( arguments )

	$.extend(params, args);
	if(params.targetDiv == ""){
		alert("Masukan ID div untuk menampilkan content");
		return ;
	}else{
		var targetDiv = "";
		if(params.targetDiv.indexOf("#") > -1){
			targetDiv = params.targetDiv ;
		}else{
			targetDiv = "#" + params.targetDiv;
		}
		$.ajax({
			url: site+"/"+params.url,
			type : params.type,
			data : params.data,
	        beforeSend: function(){
	            $(targetDiv).html(xImage_load);
	        },
	        success: function(response){
	            $(targetDiv).html(response);
	        },
	        dataType:params.dataType
		});
		return false;
	}
	return false ; // setting by default adalah false
}
//paging
var indexPage=1;
    var prevPage=0;
    var minPage = 1;
    var maxPage;
    var jump = 10;
function klik(index){
        $("#container-div").find("#numPage:contains('"+indexPage+"')").removeClass();
            prevPage = indexPage;
            indexPage = index;
            loadPage(indexPage);
        //$("#container-div").find("#numPage:contains('"+index+"')").addClass("here");
        $("#container-div").find("div").eq(index-1).addClass("here");
    }
function ChangePage(){
   jump  = $("#viewPage :selected").val();
    loadPage(1,1);
    $("#container-div").animate({"left": "0px"}, "slow");
    $("#container-div").offset({left: (146)});
    $("#drag").offset({ left: 104 });
}

function showLoading(flag)
{
    if(flag==0)
        $("#load").html("<img src=\""+baseUrl+"asset/images/ajax-loader-1.gif\" width=\"150px\" height=\"20px\">" );
    else if(flag==2)
        $("#load").html("Failed");
	else if(flag=='update')
        $("#load").html("Data Updated");
    else
        $("#load").html("Success");
}

var LongPage;
var walk;
function setPage(jumPage,index)
{
    var tag="";
    LongPage=jumPage*(24);
    for(var i=1;i<=jumPage;i++)
    {
        if(i==index)
            tag = tag+"<div id='numPage' class=\"here\" onclick=\"klik("+i+")\">"+i+"</div>";
        else
            tag = tag+"<div id='numPage' onclick=\"klik("+i+")\">"+i+"</div>";
    }
    indexPage=index;
    $("#container-div").html(tag);
    var WidPage = Math.ceil(LongPage/$("#divPage").width());
    var WidDrag = $("#parentDrag").width()/WidPage;
    $("#drag").width(WidDrag);
    var areaScroll = 326-$("#drag").width();
    var step = LongPage/326;


        $("#drag").draggable({
            cursor: 'pointer',
            containment: '#parentDrag',
            drag: function() {
                   var move = 146 - (($(this).position().left-104)*step);
                   $("#container-div").offset({left: (move)});
           }
        });
}
function last(){
    var areaScroll = 326-$("#drag").width();
    $("#drag").offset({ left: (areaScroll+104) });
    var step = LongPage/326;
    var move = 146 - (($("#drag").position().left-104)*step);
    $("#container-div").offset({left: move});
    loadPage(maxPage);
}
function first(){
         $("#container-div").offset({left: (146)});
          $("#drag").offset({ left: 104 });
         loadPage(1);
}
function goTop()
{
    $('html, body').animate({
                    scrollTop: '0px'
                }, 'slow');
}
//11 mei 2011
$('#divParentTf').on('blur', function() {
    openValue('0','SubDataTf');
    setTimeout('validate()', 500);
});
$('#divParentTf2').on('blur', function() {
    openValue('0','SubDataTf2');
    setTimeout('validate()', 500);
});
$('#divParentTf3').on('blur', function() {
    openValue('0','SubDataTf3');
    setTimeout('validate()', 500);
});
$('#divParentTf4').on('blur', function() {
    openValue('0','SubDataTf4');
    setTimeout('validate()', 500);
});
$('#divParentTf5').on('blur', function() {
    openValue('0','SubDataTf5');
    setTimeout('validate()', 500);
});
//new
String.prototype.replaceAt=function(index, char) {
      return this.substr(0, index) + char + this.substr(index+char.length);
   }
function JustNumber(e,flag)
{
    var code = e.which;
   var kar = String.fromCharCode(code);
   if( kar=='.' || kar=='.')
   {
        return true;
   }
   if((kar>=0 && kar<=9) || code==8 || code==110 ||(code>=96 && code<=105))
   {
            return true;
   }
   else if( e.keyCode=='37' || e.keyCode=='39'|| e.keyCode=='46')
   {
        return true;
   }
   else
        return false;
}
//tgl 18 mei 2012
function virtualPage(index)//-------------------------------->pindahkan ke app.js
{
    var nRow = $("#VirdataTable").find("tbody tr").length;
    var dataRow = $("#VirdataTable").find("tbody").clone();
    var tag = "";
    for(var i=0;i<nRow;i++)
    {
        if(i>=((index-1)*jump)&& i<(index*jump)||jump==0)
        {
            tag = tag + "<tr id='"+dataRow.find("tr:eq("+i+")").attr("id") +"' ondblclick=\""+dataRow.find("tr:eq("+i+")").attr("ondblclick")+"\">"+dataRow.find("tr:eq("+i+")").html()+"</tr>";
        }
    }
	//console.log(tag);
    $("#dataTable").find("tbody").html(tag);

}
function SetSearchField()//-------------------------------->pindahkan ke app.js
            {
                var nColumn = $("#dataTable thead tr").find("th").length;
                $('#cbFilter').html("");
                for(var i=0;i<nColumn;i++)
                {
                    var value = $("#dataTable").find('thead').find("tr").find("th:eq("+i+")").find("div").html();
                    if(value!=null)
                    {
                        $('#cbFilter').append('<option value='+i+'>'+value+'</option>');
                    }

                }
            }
function containObj(x,data)//-------------------------------->pindahkan ke app.js
{ var flag=0;
    for(var i=0;i<data.length;i++)
    {
        if(data[i].name==x)
        {
            flag=1;break;
        }
    }
    if(flag==0)
        return true;
    else
        return false;
}
 function sort(index,data)
{

    if($("#dataTable").find("thead tr").find("th:eq("+index+")").hasClass("asc"))
    {
		$("#dataTable").find("thead tr").find("th").removeClass("asc");
      	$("#dataTable").find("thead tr").find("th").removeClass("dsc");
      	var klas = $("#dataTable").find("thead tr").find("th:eq("+index+")").attr("class");

      	data = data.sort(function(a,b) {
        	//a = eval("a."+klas);
            var a = a[klas];
            var b = b[klas];
           	//b = eval("b."+klas);
			if(a==null){
				a="";}
			if(b==null){
				b="";
			}
            return (b>a);
   			//return (b.toLowerCase()>a.toLowerCase());
     	});
     	$("#dataTable").find("thead tr").find("th:eq("+index+")").addClass("dsc");
    }
    else{
        $("#dataTable").find("thead tr").find("th").removeClass("asc");
        $("#dataTable").find("thead tr").find("th").removeClass("dsc");
        var klas = $("#dataTable").find("thead tr").find("th:eq("+index+")").attr("class");
        data = data.sort(function(a,b) {
				//a = eval("a."+klas);
            var a = a[klas];
            var b = b[klas];
           	//b = eval("b."+klas);
			if(a==null){
				a="";}
			if(b==null){
				b="";
			}
            return (b<a);
			//return (b.toLowerCase()<a.toLowerCase());
         });
         $("#dataTable").find("thead tr").find("th:eq("+index+")").addClass("asc");
    }
    var tag="";
	var tag2="",count=0;
	var searchText = ($("#tfFilter").val()).toUpperCase();
	if(searchText==""){

		$.each(data,function( index, value ) {
			$("#VirdataTable").find("tbody").find("tr#"+value.id).attr("ondblclick");
			tag = tag + "<tr id=\""+value.id+"\" ondblclick=\""+$("#VirdataTable").find("tbody").find("tr#"+value.id).attr("ondblclick")+"\">"+$("#VirdataTable").find("tbody").find("tr#"+value.id).html()+"</tr>";
			if(count<jump || jump==0)
			{
				tag2 = tag2 + "<tr id=\""+value.id+"\" ondblclick=\""+$("#VirdataTable").find("tbody").find("tr#"+value.id).attr("ondblclick")+"\">"+$("#VirdataTable").find("tbody").find("tr#"+value.id).html()+"</tr>";
			}
			count++
		 });
	}
	else{
		var ind = $("#cbFilter").find('option:selected').val();
		$.each(data,function( index, value ) {
			//console.log($("#VirdataTable").find("tbody").find("tr#"+value.id).attr("ondblclick"));
			tag = tag + "<tr id=\""+value.id+"\" ondblclick=\""+$("#VirdataTable").find("tbody").find("tr#"+value.id).attr("ondblclick")+"\">"+$("#VirdataTable").find("tbody").find("tr#"+value.id).html()+"</tr>";

			if($("#VirdataTable").find("tbody").find("tr#"+value.id).find("td:eq("+ind+"):containsIgnoreCase('"+searchText+"')").length>0){
				tag2 = tag2 + "<tr id=\""+value.id+"\" ondblclick=\""+$("#VirdataTable").find("tbody").find("tr#"+value.id).attr("ondblclick")+"\">"+$("#VirdataTable").find("tbody").find("tr#"+value.id).html()+"</tr>";
			}

			count++
		});
	}
	 klik(1);
     $("#VirdataTable").find("tbody").html(tag);
     $("#dataTable").find("tbody").html(tag2);

}

function filterSearch(){//-------------------------------->pindahkan ke app.js
    var searchText = ($("#tfFilter").val()).toUpperCase();
    if(searchText=="")
    {

        $("#divSetPaging").show();
        $("#viewPage").show();
        $("#first").show();
        $("#last").show();
        $("#divPage").show();
        $("#parentDrag").show();
        loadPage(1);
    }
	else if($("#cbCommand").val()==undefined)
    {
        $("#divSetPaging").hide();
        var dataRow = $("#VirdataTable").find("tbody").clone();
        var ind = $("#cbFilter").find('option:selected').val();
        dataRow.find("tr").find("td:eq("+ind+"):not(:containsIgnoreCase('"+searchText+"'))").parent().remove();
        $("#dataTable").find("tbody").html(dataRow.html());
    }
    else
    {
        if($("#cbCommand").val()=='0')
        {
            $("#divSetPaging").hide();
            var dataRow = $("#VirdataTable").find("tbody").clone();
            var ind = $("#cbFilter").find('option:selected').val();
            dataRow.find("tr").find("td:eq("+ind+"):not(:containsIgnoreCase('"+searchText+"'))").parent().remove();
            $("#dataTable").find("tbody").html(dataRow.html());
        }
        else
        {
            $("#divSetPaging").hide();
            var dataRow = $("#VirdataTable").find("tbody").clone();
            var ind = $("#cbFilter").find('option:selected').val();
            dataRow.find("tr").find("td:eq("+ind+"):containsIgnoreCase('"+searchText+"')").parent().remove();
            $("#dataTable").find("tbody").html(dataRow.html());
        }

    }
}
function cetakPDF(tag,type)
{
	if(typeof(type)=='undefined')
		type = 0;
    //setTimeout(function(){
        if(type=='0')
        {
            $("#hidTagPDF").val(tag);
            $("#formHTML2Pdf").submit();
        }
        else if(type=='L'){
            $("#hidTagPDFL").val(tag);
            $("#formHTML2PdfL").submit();
        }
        else if(type=='A3'){
            $("#hidTagPDFA3").val(tag);
            $("#formHTML2PdfA3").submit();
        }
        else if(type=='A2'){
            $("#hidTagPDFA2").val(tag);
            $("#formHTML2PdfA2").submit();
        }

    //		}, 12000);

}

function getNotification(){
	if(typeof user != 'undefined'){
		$.getJSON('index.php/notification/get_data?user='+user, function(json){
			if(json.data)
				$.each(json.data, function(i, val){
					jui2.notification(val[0], val[1]);
					$.getJSON('index.php/notification/received?id='+val[2], function(json){
					})
				})
			setTimeout(function(){
				getNotification();
			}, 10000);
		})
	}
	else{
		setTimeout(function(){
			getNotification();
		}, 10000);
	}
}
getNotification();
