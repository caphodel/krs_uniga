var headOld=0,tailOld=0,headNew=0,tailNew=0,action=0,OpenMenu=0,OpenSubMenu=0;
	function noClick()
	{
		action=1;
	}
	function hideAll()
	{
		var i=1;
		for(i=1;i<11;i++)
		{
			$("#submenu"+i).hide();
		}
		for(i=1;i<11;i++)
		{
			for(var j=1;j<11;j++)
			{
				$("#sub"+i+"content"+j).hide();
			}
		}
	}
	function initTail(ptail)
	{
		tailNew=ptail;
	}
	function init(phead,ptail)
	{
		headNew = phead;
	}
	$(document).click(
			function(event){
			if (action == 0) {
			 //console.log(headNew+" "+tailNew+" "+headOld+" "+tailOld);
				if (tailNew != 0) {
				    if(OpenSubMenu==tailNew && tailNew==tailOld)
                    {
                        $("#sub" + headOld + "content" + tailOld).hide(200);
                        OpenSubMenu=0;
                    }
                    else
                    {
                        $("#sub" + headOld + "content" + tailOld).hide(200);
					    $("#sub" + headNew + "content" + tailNew).show(200);
                        OpenSubMenu=tailNew;
                    }
				}
                else if(OpenMenu==headNew && headNew==headOld)
                {
                    $("#submenu" + headOld).hide(200);
                    OpenMenu = 0;
                }
				else {
					$("#submenu" + headOld).hide(200);
					$("#submenu" + headNew).show(200);
					$("#sub" + headOld + "content" + tailOld).hide();
                    OpenMenu = headNew;
				}
				headOld = headNew;
				tailOld = tailNew;
			}
			else 
				action = 0;
		});
		
	$(document).ready(function(){
	hideAll();
		
	});