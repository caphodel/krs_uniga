$(function(){
    $.ajax({
        url: 'secondarykediri/getkaryawan',
        dataType: 'json',
        success: function(response){
            $('#readTemp2').render(response).appendTo("#tabel");
        }
    });
});
