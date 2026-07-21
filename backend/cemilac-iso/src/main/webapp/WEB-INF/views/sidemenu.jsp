 
 <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<%-- <link rel="stylesheet" href="${pageContext.request.contextPath}/css/all.css" /> 

	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/all.css" /> 
 --%>
	
	<link rel="stylesheet" href="${pageContext.request.contextPath}/fonts/font-awesome-4.7.0/css/all.css">
	
	
</head>


<script>

	/* document.getElementById("upload").style="pointer-events: none;"; */
</script>
<div class="popup" id="popmainpage" style="width: 100%;">
	 <div class="box" >
        <img src="${pageContext.request.contextPath}/img/cross.png" alt="" >
        <h3>Connection failed!</h3>
        <p>Server not connected</p>
        <button type="button" class="but" onclick="hidebox();">Continue</button>
    </div>
</div>


<div class="col-md-2" style="padding:0;" >
	<div class="side-menu">
		<div class="text-center"><a href="${pageContext.request.contextPath}/api/v1/project-details"><img src="${pageContext.request.contextPath}/img/cemilac1.png" class="img-fluid"></a>
		</div>
<!-- 		<h5 class="left-title">Design Agency Dashboard</h5>
 -->		<ul class="left-menu">
 			<li><a><i></i></a></li>
 			<li  id="Registered"><a href="${pageContext.request.contextPath}/api/v1/project-details" id="projdetail"><i class="fa-light fa-address-card" style="color: #7fefd1;"></i> Registered Projects</a></li>
			<li  id="Registration"><a  href="${pageContext.request.contextPath}/api/v1/project-registration" style="text-decoration: none;" id="projreg"><i class="fa-light fa-address-card" style="color: #7fefd1;"></i> New Project Registration</a></li>
 			<li><a href="#" style="text-decoration: none;" id="form" onclick="openHelplocation();"><i class="fa-brands fa-wpforms" style="color: #7fefd1;"></i> Help </a>
 			<%-- <li><a href="${pageContext.request.contextPath}/api/v1/upload" style="text-decoration: none;" id="upload"><i class="fal fa-file-upload" style="color: #983b3c;"></i> Upload Documents</a></li> --%>
			<!-- <li><a href="javascript:downloadData()" style="text-decoration: none;" id="down"><i class="fal fa-file-download" style="color: #983b3c;"></i> Download Documents</a></li> -->
			
			<li><a href="#" style="text-decoration: none;" id="down" onclick="logout();"><i class="fa-brands fa-wpforms" style="color: #7fefd1;" ></i> Logout</a></li>
			
<!-- 			<li><a href="javascript:downloadStatus()" style="text-decoration: none;" id="downstatus"><i class="fal fa-file-download" style="color: #983b3c;"></i> Download Status(Testing)</a></li>
 -->		
 </ul>
	</div>
</div>

<script>
$("#popmainpage").hide();
//document.getElementById("projdetail").style="pointer-events: none;";
//document.getElementById("projreg").style="pointer-events: none;";
//document.getElementById("form").style="pointer-events: none;";
/* document.getElementById("upload").style="pointer-events: none;"; */
//document.getElementById("down").style="pointer-events: none;";

/* function downloadData() 
{	
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/downloadData?mode=1&downloadPath=/home/DownloadedData/",
		cache: false,
		success: function(response) {
			if(response == "success") {
				alert("File Downloaded successfully");
			}
			else if(response == "File Not Available") {
				alert("No file is available for download");
			}
			else if(response == "Permission Denied") 
			{
				alert("Download permissions not available");
			}
			else if(response == "No Write PErmission") 
			{
				alert("No write permission in destination path");
			}
			else {
				alert("File Not downloaded... Please Check Connection Status");
			}
		},
		error: function() {
			
			alert("File Not downloaded... Please Check Connection Status");
		}
	});
	
} */

/*

function downloadStatus()
{	
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/downloadStatus",
		cache: false,
		success: function(response) {
			if(response == "success") {
				alert("File Downloaded successfully");
			}
			else if(response == "File Not Available") {
				alert("No file is available for download");
			}
			else if(response == "Permission Denied") 
			{
				alert("Download permissions not available");
			}
			else if(response == "No Write PErmission") 
			{
				alert("No write permission in destination path");
			}
			else {
				alert("File Not downloaded... Please Check Connection Status");
			}
		},
		error: function() {
			
			alert("File Not downloaded... Please Check Connection Status");
		}
	});
	
}

*/


</script>

<script>

$("li").click(function (){
    $(this).css("color","green")
});

 function logout()
{
	
	 var status=1;

	 sessionStorage.setItem('status',1);
	 $.ajax({
			type: "get",
			contentType: 'application/json; charset=UTF-8',
			url: "${pageContext.request.contextPath}/api/v1/logout",
			cache: false,
			success: function(response) 
			{
				if(response=="true")
				{
					
					window.location.href = "${pageContext.request.contextPath}/api/v1/logoutsuccess";
				}
				else
				{
					window.open("${pageContext.request.contextPath}/api/v1/ObservationListPage","Ratting","minimizable=no,width=1300,height=500,left=350,top=250,toolbar=0,titlebar=no,status=0,");
					
				}
			}
		});	
}
 


function openHelplocation()     //// open folder where downloaded files are stored when click on folder icon
{
	
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/openhelpfile",
		cache: false,
		success: function(response) 
		{
			
		}
	});	
}



function hidebox()
{
	$("#popmainpage").hide();
}

$("#popmainpage").hide();


		if(sessionStorage.getItem('c')==1) 
		{
			

		}
		else 
		{
			$("#popmainpage").hide();
			document.getElementById("down").style="";
			var link = document.getElementById("down");
		    document.addEventListener('click', function (e) 
		    {
			    if (e.target.id === link.id) 
			    {
			    			//alert("Server Not connected");
			                $("#popmainpage").show();
			    			e.preventDefault();
			    }
		 	});
		    document.getElementById("projdetail").style="";
			var link4 = document.getElementById("projdetail");
		    document.addEventListener('click', function (e) 
		    {
			    if (e.target.id === link4.id) 
			    {
			    			//alert("Server Not connected");
			    			$("#popmainpage").show();
			                e.preventDefault();
			    }
		 	});
		    document.getElementById("projreg").style="";
		    var link3 = document.getElementById("projreg");
		    document.addEventListener('click', function (e) 
		    {
			    if (e.target.id === link3.id) 
			    {
			    			//alert("Server Not connected");
			    			$("#popmainpage").show();
			                e.preventDefault();
			    }
		 	});
		
		}



</script>
