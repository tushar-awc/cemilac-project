 <%
response.setHeader("Cache-Control","no-cache, no-store, must-revalidate"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0);
//prevents caching at the proxy server
%>
<style>
.loader {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid blue;
  border-bottom: 5px solid blue;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
<script>
$("#popp").hide();
var contextPath = "${pageContext.request.contextPath}";
</script>
	<link rel="icon" href="${pageContext.request.contextPath}/img/cemilac.png" type="image/x-icon">
	<script src="${pageContext.request.contextPath}/js/jquery.js" type="text/javascript"></script>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css">



<body onload="initializePage()">
	
<div class="top-header">
    <div class="container-fluid bottom-none-border p-0" >
	  <div class="row">
	    <div class="col-md-3 d-flex align-center bordr-right">
		  <div class="for-mobile"><a href="${pageContext.request.contextPath}/api/v1/project-details"><img src="${pageContext.request.contextPath}/img/logo.png" class="img-fluid"></a></div>
		</div>
		<div class="col-md-7">
		   <h2 class="logo-title h-100 d-flex align-items-center justify-content-center pr-3" style="font-size: 9ex; color: yellow;font-family: serif;">	Design Agency Dashboard   </h2>
		</div>
		<div class="col-md-2 bordr-left">
		   <div class="connection-status"><br>
		    <h3 style="color: white;">Connection Status</h3>
		    
			
			<ul>
				<label class="loader" id="load" style="display: none;"></label>
				<br>
				<div id="green" style="display: none;">
					<label style="color: white;"><b> &nbsp;&nbsp; Connected <li class="led-box led-green"><i aria-hidden="true"></i></li></b></label>
				</div>
				
				<div id="red" style="display: none;">
					<label style="color: white;"><b> &nbsp;&nbsp; Not Reachable <li class="led-box led-red"><i aria-hidden="true"></i></li></b></label>
				</div>
			
			</ul>
			 <div align="center">
              	<label id="date" style="color: white;"></label>
             </div>
			<script>
				var today = new Date();
				var dd = String(today.getDate()).padStart(2, '0');
				var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
				var yyyy = today.getFullYear();
				const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
				const d = new Date();
				var m = monthNames[d.getMonth()];
				today = dd + '-' + m + '-' + yyyy;
				$("#date").html("<b>Date: </b>  " + today);	
			</script>
		   </div>
		</div>
	  </div>
	  


	  <div class="bottom-head" >
	    <div class="row">
		  <div class="col-md-6">
		    <c:forEach items="${HeaderDataDTO}" var="headerdata">   
		      
		    <h4 class="bottom-head-title py-2" style="margin-left: 27ex; color: yellow">Design Agency ID - DA<c:out value="${headerdata.daid}"/> </h4>
		  </div>
		  <div class="col-md-6">
		    <h4 class="bottom-head-title py-2" style="color:yellow">Design Agency Name - <c:out value="${headerdata.daname}"/></h4>
		   </c:forEach>
		  </div>
		</div>
	  </div>
	
	
	</div>
</div>

<div class="popup" id="popp" style="display: none;">
	 <div class="box" >
        <img src="${pageContext.request.contextPath}/img/cross.png" alt="" >
        <h2 id="hmsg"></h3>
        <p id="pmsg"></p>
        <button type="button" class="but" onclick="hiden();">OK</button>
    </div>
</div>

</body>

<script>


setInterval(function () {
    getStatus();
    
}, 60000); // 60 seconds in milliseconds



var staticdowncheck = 0;
sessionStorage.setItem('staticdowncheck',0);


$(document).ready( function () 
		{
	//$("#popp").hide();
	document.getElementById("popp").style.display = "none";
		});

document.getElementById("popp").style.display = "none";

function hiden()
{
	document.getElementById("popp").style.display = "none";
}
var SEMAPHORE;
sessionStorage.setItem('SEMAPHORE',0);
var check=0;
check= sessionStorage.getItem('SEMAPHORE');


if(check == 0)
{
	
function getStatus() 
{	

	var conchk=0;
	sessionStorage.setItem('SEMAPHORE',1);
	//$("#load").show();	
	document.getElementById("load").style.display = "block";
	document.getElementById("green").style.display = "none";
	document.getElementById("red").style.display = "none";
	document.getElementById("popp").style.display = "none";

	
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/connectionStatus",
		cache: false,
		async: false,
		success: function(response) {
			if(response == "success") 
			{
				
				sessionStorage.setItem('conchk',0);
				sessionStorage.setItem('c',1);
				sessionStorage.setItem('SEMAPHORE',0);
				document.getElementById("green").style.display = "block";
				document.getElementById("red").style.display = "none";

				document.getElementById("load").style.display = "none";

				document.getElementById("popp").style.display = "none";
				
				//downloadStatic();
				//downloaStaticCheck();
			}
			else if(response == "socket fail")
			{
				sessionStorage.setItem('conchk',402);
				sessionStorage.setItem('SEMAPHORE',0);
				document.getElementById("pmsg").innerHTML = "Error 402 : Unable to create socket";
				document.getElementById("hmsg").innerHTML = "Connection Failure!";
				$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");

				document.getElementById("popp").style.display = "block";

				document.getElementById("green").style.display = "none";
				document.getElementById("red").style.display = "block";
				//$("#load").hide();
				document.getElementById("load").style.display = "none";
				$("#popupload").hide();
			}
			else if(response == "bind fail")
			{
				sessionStorage.setItem('conchk',403);
				sessionStorage.setItem('SEMAPHORE',0);
				document.getElementById("pmsg").innerHTML = "Error 403 : Bind failed";
				document.getElementById("hmsg").innerHTML = "Connection Failure!";
				$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
				
				document.getElementById("popp").style.display = "block";
				document.getElementById("green").style.display = "none";
				document.getElementById("red").style.display = "block";

				document.getElementById("load").style.display = "none";
				$("#popupload").hide();
			}
			else if(response == "not reach")
			{
				sessionStorage.setItem('conchk',412);
				
				sessionStorage.setItem('SEMAPHORE',0);
				document.getElementById("pmsg").innerHTML = "Error 412 : Server not reachable";
				document.getElementById("hmsg").innerHTML = "Connection Failure!";
				$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
	
				document.getElementById("popp").style.display = "block";
				document.getElementById("green").style.display = "none";
				document.getElementById("red").style.display = "block";
		
				document.getElementById("load").style.display = "none";
				$("#popupload").hide();
			}
			else if(response == "Dongle error")
			{
				sessionStorage.setItem('conchk',417);
				sessionStorage.setItem('SEMAPHORE',0);
				document.getElementById("pmsg").innerHTML = "Error 417 : Dongle error";
				document.getElementById("hmsg").innerHTML = "Connection Failure!";
				$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
			//	$("#popp").show();
				document.getElementById("popp").style.display = "block";
				
				document.getElementById("green").style.display = "none";
				document.getElementById("red").style.display = "block";
	
				document.getElementById("load").style.display = "none";
				$("#popupload").hide();
			}
		},
		error: function() {
			
			sessionStorage.setItem('conchk',1);
			sessionStorage.setItem('SEMAPHORE',0);
			document.getElementById("green").style.display = "none";
			document.getElementById("red").style.display = "block";
		
			document.getElementById("popp").style.display = "none";
			document.getElementById("load").style.display = "none";
			$("#popupload").hide();
		}
	});
}

}

document.getElementById("popp").style.display = "none";
document.getElementById("popupload").style.display = "none";



//Set up setInterval to call getStatus() every 30 seconds



function downloaStaticCheck()
{
	if(sessionStorage.getItem('staticdowncheck')==0)
	{
		downloadStatic();
	}

}



</script>
<script type="text/javascript">

if(sessionStorage.getItem('conchk')==0)
{
	document.getElementById("green").style.display = "block";
	document.getElementById("red").style.display = "none";
	
}
else
{
	document.getElementById("green").style.display = "none";
	document.getElementById("red").style.display = "block";
}

</script>

