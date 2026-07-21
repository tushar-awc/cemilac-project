<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<%@ include file="header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/login/style.css"">
</head>
<body>
	
		<div style="text-align: center; padding-top: 11ex; font-size: 5ex; color: red">
			Logout is successful. Please close the window.
		</div>
	
	<%@ include file="footer3.jsp"%>


</body>
<script type="text/javascript">
document.getElementById("popupload").style.display = "none";
var status=1;

sessionStorage.setItem('status',1);


$("#pop").hide();
$("#popupload").hide();
$("#popcred").hide();

$(document).ready( function () 
{
	
	//downloadStatic();
});

function downloadStatic()
{
	//$("#popupload").show();
	document.getElementById("popupload").style.display = "block";
	<%-- var sessionIdentifier = "<%= session.getAttribute("userName") %>";
	alert(sessionIdentifier);
	 --%>
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/downloadStatus",
		cache: false,
		success: function(response) 
		{
			if(response == "success") 
			{
				$("#popupload").hide();
			}
			else if(response == "corrupted") 
			{
				$("#popupload").hide();
				document.getElementById("intestcred").innerHTML = "Error 301 : Invalid Static file or file may be corrupted";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();  
			}
			else if(response == "Socket Fail") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 102 : Unable to create socket";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();  
			}
			else if(response == "Bind Fail") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 103 : Bind fail";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Server Not Ready") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 104 : Connection failed, server not ready";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Recieve Fail") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 105 : Data not received from server";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Ack Not Recieve") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 106 : Acknowledgement not received from server";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "File Not Available") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 108 : File not exist at sever";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
				//window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";

			}
			else if(response == "No Write Permission") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 109 : No write permission in destination";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Few files downloaded") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 110 : Only few files are downloaded";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Download Fail") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 111 : Download failed, try after some time";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Permission Denied") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 114 : Permission denied to download files";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Send Fail") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 116 : File send failed";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Dongle error") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 117 : Error in dongle";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "Invalid download mode") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 118 : Invalid download mode";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "De transform fail") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 119 : De transform failed";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}
			else if(response == "General error") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 120 : Download failed";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#pop").show();
			}
			else if(response == "Auth/Nounce Fail") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 121 : Auth/Nounce Fail";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}	
			else if(response == "Lock unavailable") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 122 : Lock unavailable";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
			}	
			
		}
	});	
}
function hidee()
{
	$("#pop").hide();

	window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";
}
function hidecred()
{
	$("#popcred").hide();
	
}
function retryhidee()
{
	
	//document.getElementById("retry").style.display = "none";
	logincheck();
	
}


function logincheck()    
{
	if(sessionStorage.getItem('SEMAPHORE')==1)
	{
		document.getElementById("retry").style.display = "block";
	}
	else
	{
		document.getElementById("retry").style.display = "none";
		var uname = document.getElementById("uname").value;;
		var password =document.getElementById("password").value;
		
		$.ajax({
			type: "get",
			contentType: 'application/json; charset=UTF-8',
			url: "${pageContext.request.contextPath}/api/v1/login?uname="+uname+"&pass="+password,
			cache: false,
			success: function(response) 
			{
				if(response == "login success") 
				{
					
					window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";
					
				}
				else if (response == "Invalid Credentials")
				{
					document.getElementById("errormsg").innerHTML = "Invalid Username / Password";
				}
				else if (response == "already login")
				{
					document.getElementById("errormsg").innerHTML = "User is already Loged-in";
				}
				else if (response == "CredentialFileNotAvailable")
				{
					$("#popupload").hide();
					$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("intestcred").innerHTML = "Error 301 : Invalid Static file or file may be corrupted";
					document.getElementById("msgcred").innerHTML = "Login Failed";
					$("#popcred").show();
				}
				else if (response == "corrupted")
				{
					$("#popupload").hide();
					$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("intestcred").innerHTML = "Error 301 : Invalid Static file or file may be corrupted";
					document.getElementById("msgcred").innerHTML = "Login Failed";
					$("#popcred").show();
				}
				
				else if (response == "connection fail")
				{
					$("#popupload").hide();
					$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("intestcred").innerHTML = "Error 403 : Server not connected";
					document.getElementById("msgcred").innerHTML = "Connection Failed";
					$("#popcred").show();
				}
			
			}
		});
	}
	
		
}
</script>
 <script>
    
    localStorage.openpages = Date.now();
    window.addEventListener('storage', function (e) {
        if(e.key == "openpages") {
            // Listen if anybody else is opening the same page!
            localStorage.page_available = Date.now();
        }
        if(e.key == "page_available") {
            alert("This page is already open");
        }
    }, false);
</script>
</html>



