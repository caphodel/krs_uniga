<br />
<j-combofield id="cmbLembaga" onselect='check_lembaga()'>Lembaga
    <j-table>
        [
            [ "", "LEVEL"],
            [ "1" , "Directorate"],
            [ "2" , "Division"],
            [ "3" , "Department"],
            [ "4" , "Section"]   
        ]
    </j-table>
</j-combofield><br />
<div style='display:none'><j-textfield id='txtDirectorate'>Directorate</j-textfield><br /></div>
<div style='display:none'><j-textfield id='txtDivision'>Division</j-textfield><br /></div>
<div style='display:none'><j-textfield id='txtDepartment'>Department</j-textfield><br /></div>
<div style='display:none'><j-textfield id='txtSection'>Section</j-textfield><br /></div>
<j-combofield id="cmbActive" onselect='check_status()'>Active
    <j-table>
        [
            [ "", "STATUS"],
            [ "1" , "ACTIVE"],
            [ "0" , "INACTIVE"]
        ]
    </j-table>
</j-combofield><br />
<div style="display: none;"><j-editor id='txtReason'>Reason</j-editor></div>
<br />
<j-button id='btnSave' color='blue'>Save</j-button><j-button id='btnCancel'>Cancel</j-button><br /><br />
<j-table id="list_department" class="doc" title="List Department">
	<j-toolbar id="toolbar">
		<j-spacer></j-spacer><j-textfield id="searchText">Search</j-textfield>
        <j-button id="btnSearch">Search</j-button>
        <j-button id="btnDeptEdit" color="blue">&nbsp;&nbsp;Edit&nbsp;&nbsp;</j-button>
	</j-toolbar>
	  [
		["","No", "Directorate", "Division", "Department", "Section","Active","Created By","[ ]"]
	  ]
	<j-loader src="index.php/master/get_data_dept"></j-loader>
    <j-pagination></j-pagination>
    <j-custom target="1">
        function(record){
            return record[7];
        }
	</j-custom>
    <j-custom target="2">
        function(record){
            return record[2];
        }
	</j-custom>
    <j-custom target="3">
        function(record){
            return record[3];
        }
	</j-custom>
    <j-custom target="4">
        function(record){
            return record[4];
        }
	</j-custom>
    <j-custom target="5">
        function(record){
            return record[5];
        }
	</j-custom>
    <j-custom target="6">
        function(record){
            return record[10];
        }
	</j-custom>
    <j-custom target="7">
        function(record){
            var txt=record[9]+''+record[8]+'<hr />'+record[12]+''+record[11];
            return txt;
        }
	</j-custom>
    <j-custom target="8">
        function(record){
            if(record[0]!="1")
                return '<center><input type="radio" name="select" value="'+record[0]+'" ></input></center>';
            else
                return '';
        }
	</j-custom>
</j-table>
<script>
    var idEdit="";
    $("#btnCancel").click(function(){
        $("#txtDirectorate").val("");
        $("#txtDivision").val("");
        $("#txtDepartment").val("");
        $("#txtSection").val("");
        $("#txtReason").val("");
        idEdit="";
    })
    
    $("#btnDeptEdit").click(function(){
        data    =$('#list_department').val()[0];
        idEdit  =data[0];
        $("#txtDirectorate").val(data[2]);
        $("#txtDivision").val(data[3]);
        $("#txtDepartment").val(data[4]);
        $("#txtSection").val(data[5]);
        $("#cmbLembaga").val(data[1]);
        $("#cmbActive").val(data[6]);
        $("#cmbLembaga").select();
    })
    
    $("#btnSave").click(function(){
        var tipeLembaga=$("#cmbLembaga").val();
        if(tipeLembaga=="1"){
            if($("#txtDirectorate").val()=="")
            {
                alert("Please Fill Out The Form");
                return;
            }
        }
        if(tipeLembaga=="2"){
            if($("#txtDirectorate").val()==""||$("#txtDivision").val()=="")
            {
                alert("Please Fill Out The Form");
                return
            }
        }
        if(tipeLembaga=="3"){
            if($("#txtDirectorate").val()==""||$("#txtDivision").val()==""||$("#txtDepartment").val()=="")
            {
                alert("Please Fill Out The Form");
                return
            }
        }
        if(tipeLembaga=="4"){
            if($("#txtDirectorate").val()==""||$("#txtDivision").val()==""||$("#txtDepartment").val()==""||$("#txtSection").val()=="")
            {
                alert("Please Fill Out The Form");
                return
            }
        }        
        if(confirm("Are You Sure?")){
            var value = $("#master_content").jui2Serialize();
            var param={
                idEdit      : idEdit,
                directorate : value.txtDirectorate.trim(),
                division    : value.txtDivision.trim(),
                department  : value.txtDepartment.trim(),
                section     : value.txtSection.trim(),
                level       : value.cmbLembaga.trim(),
                is_active   : value.cmbActive,
                user        : user.trim()
            }
            $.getJSON('index.php/master/check_dept', param).done(function(json){
                if(json.jumlah=="0"||idEdit!=""){
                    $.getJSON('index.php/master/insert_dept', param).done(function(json){
                        $("#btnCancel").click();
                        alert(json.message);
                    }).always(function(){
                        $('#list_department')[0].generateData();
                    }).fail(function(){
                        alert('Insert Fail');
                    })
                }
                else{
                    alert("Data Already Exist");
                    return;
                }
            })
        }
    })
    
    function check_lembaga(){
        var tipeLembaga=$("#cmbLembaga").val();
        if(tipeLembaga=="1"){
            $("#txtDirectorate").parent().show();
            $("#txtDivision").parent().hide();
            $("#txtDepartment").parent().hide();
            $("#txtSection").parent().hide();
        }
        if(tipeLembaga=="2"){
            $("#txtDirectorate").parent().show();
            $("#txtDivision").parent().show();
            $("#txtDepartment").parent().hide();
            $("#txtSection").parent().hide();
        }
        if(tipeLembaga=="3"){
            $("#txtDirectorate").parent().show();
            $("#txtDivision").parent().show();
            $("#txtDepartment").parent().show();
            $("#txtSection").parent().hide();
        }
        if(tipeLembaga=="4"){
            $("#txtDirectorate").parent().show();
            $("#txtDivision").parent().show();
            $("#txtDepartment").parent().show();
            $("#txtSection").parent().show();
        }
    }
    $('#btnSearch').click(function(){
		$('#list_department j-loader')[0].param.sSearch=$('#searchText').val()
		$('#list_department')[0].generateData();
	})
    function check_status(){
        if($("#cmbActive").val()==0){
            $("#txtReason").parent().show();
        }else{
            $("#txtReason").parent().hide();
        }
    }
</script>