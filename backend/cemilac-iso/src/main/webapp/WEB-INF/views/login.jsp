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
<body onload="initializePage();">
<div class="bottom-head" >
	    <div class="row">
		  <div class="col-md-6">
		  
		    <h4 class="bottom-head-title py-2" style="margin-left: 27ex;"> </h4>
		  </div>
		  <div class="col-md-6">
		    <h4 class="bottom-head-title py-2"></h4>
		 
		  </div>
		</div>
	  </div>
<div class="popup" id="pop">
	 <div class="box" >
        <img id="myimage" src="${pageContext.request.contextPath}/img/greentik.webp" alt="" >
        <h3 id="msg"></h3>
          <hr>
        <p id="intest" style="color: red"></p>
        <button type="button" class="but" onclick="hidee();">Continue</button>
    </div>
</div>
<div class="popup" id="retry" style="display: none;">
	 <div class="box" >
        <img id="retryimage" src="${pageContext.request.contextPath}/img/info.png" alt="" >
        <h3 id="retrymsg">Please wait !</h3>
          <hr>
       <p id="retryintest" style="color: red">Login in progress.</p>
         <div class="progress">
				<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
		</div>
    </div>
</div>


<div class="popup" id="popcred">
	 <div class="box" >
        <img id="myimagecred" src="${pageContext.request.contextPath}/img/greentik.webp" alt="" >
        <h3 id="msgcred"></h3>
        <hr>
        <p id="intestcred" style="color: red"></p>
        <button type="button" class="but" onclick="hidecred();">Continue</button>
    </div>
</div>
	
<div class="popup" id="popupload" style="display: none;">
 	<div class="box" >
        	 <img src="${pageContext.request.contextPath}/img/downicon.png" alt="" >
       	<h3>Please Wait !</h3>
       	<!-- <p>File is Downloading.</p> -->
       	<div class="progress">
				<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
		</div>
  	 </div>
</div>	

	<section style="padding-top: 16ex;">
		<div class="container">
			
			<div class="row justify-content-center">
				<div class="col-md-12 col-lg-10">
					<div class="wrap d-md-flex">
						<div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
							<div class="text w-100">
								<h2 style="font-family: serif">Welcome <br>to <br>CEMILAC <br> e-Certification System</h2>
						
								
							</div>
			      </div>
						<div class="login-wrap p-4 p-lg-5" style="filter: drop-shadow(2px 4px 20px black);">
			      	
					
		      		
		            
		             <div class="form-group mb-3">
		            	<label class="label" for="password">DA Security Token</label>
		              <input type="text" class="form-control" id="token" placeholder="DA Security Token" required>
		              <span id = "tokenmsg" style="color:red">
		            </div>
		             <div class="form-group mb-3">
		             <span id = "errormsg" style="color:red">
		            	</span>
		            </div>
		            <div class="form-group" style="filter: drop-shadow(2px 4px 6px #000);">
		            	<button type="submit" id="signin" name="signin" class="form-control btn btn-primary submit px-3" onclick="logincheck();" style="font-size: 3.5ex; padding: 2px;">Sign In</button>
		            </div>
		            
		  
		        </div>
		      </div>
				</div>
			</div>
		</div>
	</section>
	
	<%@ include file="footer3.jsp"%>


</body>
<script type="text/javascript">
var c = 0;
sessionStorage.setItem('c',0);


function initializePage() {

	if(sessionStorage.getItem('c')==0)
	{
		 getStatus();
		 downloaStaticCheck();
	}
  

}





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
	$("#popupload").show();
	document.getElementById("popupload").style.display = "block";
	<%-- var sessionIdentifier = "<%= session.getAttribute("userName") %>";
	alert(sessionIdentifier);
	 --%>
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/downloadStatus",
		cache: false,
		async: false,
		success: function(response) 
		{
			if(response == "success") 
			{
				sessionStorage.setItem('staticdowncheck',1);
				$("#popupload").hide();
			}
			else if(response == "corrupted") 
			{
				$("#popupload").hide();
				document.getElementById("intestcred").innerHTML = "Error 301 : Invalid Static file or file may be corrupt";
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

				document.getElementById("intestcred").innerHTML = "Error 108 : File does not exist at server";
				document.getElementById("msgcred").innerHTML = "Error !";
				$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
				$("#popcred").show();
				//window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";

			}
			else if(response == "No Write Permission") 
			{
				$("#popupload").hide();

				document.getElementById("intestcred").innerHTML = "Error 109 : No write permission at destination folder";
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

				document.getElementById("intestcred").innerHTML = "Error 111 : Download failed, try after sometime";
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

				document.getElementById("intestcred").innerHTML = "Error 117 : Dongle error";
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

				document.getElementById("intestcred").innerHTML = "Error 119 : De-transform failed";
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

				document.getElementById("intestcred").innerHTML = "Error 121 : Auth/Nonce fail";
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
	document.getElementById("signin").style.background = '#5998f7'; 
	document.getElementById("signin").style.borderColor = '#5998f7';
	
}
function retryhidee()
{
	logincheck();	
}
//Login after pressing enter
document.body.addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter
    if (event.key === "Enter") {
        
        event.preventDefault();
        logincheck();
    }
});


function validateToken() {
    var tokenInput = document.getElementById("token");
    var tokenValue = tokenInput.value.trim();

    // Regular expression for validating alphanumeric input of length 8 to 15
    var alphanumericRegex = /^[a-zA-Z0-9]{8,15}$/;

    if (!alphanumericRegex.test(tokenValue)) {
        // Display an error message
        document.getElementById("tokenmsg").innerHTML = "Invalid token!";
        return false;
    } else {
        // Clear any previous error message
        document.getElementById("tokenmsg").innerHTML = "";
        return true;
    }
}

function logincheck()    
{
	 var isTokenValid = validateToken();

	    if (!isTokenValid) {
	        
	        return;
	    }
	    
	document.getElementById("retry").style.display = "block";
	document.getElementById("signin").style.background = '#8c9095'; 
	document.getElementById("signin").style.borderColor = '#8c9095';

	if(sessionStorage.getItem('conchk')==402)
	{
		$("#popupload").hide();

		document.getElementById("intestcred").innerHTML = "Error 402 : Unable to create socket";
		document.getElementById("msgcred").innerHTML = "Error !";
		$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
		$("#popcred").show();
		document.getElementById("retry").style.display = "none";
	}
	else if(sessionStorage.getItem('conchk')==403)
	{
		$("#popupload").hide();

		document.getElementById("intestcred").innerHTML = "Error 403 : Bind failed";
		document.getElementById("msgcred").innerHTML = "Error !";
		$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
		$("#popcred").show();
		document.getElementById("retry").style.display = "none";
	}
	else if(sessionStorage.getItem('conchk')==412)
	{
		$("#popupload").hide();

		document.getElementById("intestcred").innerHTML = "Error 412 : Server not reachable";
		document.getElementById("msgcred").innerHTML = "Error !";
		$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
		$("#popcred").show();
		document.getElementById("retry").style.display = "none";
	}
	else if(sessionStorage.getItem('conchk')==417)
	{
		$("#popupload").hide();

		document.getElementById("intestcred").innerHTML = "Error 417 : Dongle error";
		document.getElementById("msgcred").innerHTML = "Error !";
		$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
		$("#popcred").show();
		document.getElementById("retry").style.display = "none";
	}
	else if(sessionStorage.getItem('conchk')==1)
	{
		$("#popupload").hide();

		document.getElementById("intestcred").innerHTML = "Error : Server not reachable";
		document.getElementById("msgcred").innerHTML = "Error !";
		$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
		$("#popcred").show();
		document.getElementById("retry").style.display = "none";
	}
	else
	{
		if(sessionStorage.getItem('SEMAPHORE')==1)
		{
			setTimeout(() => {
				document.getElementById("retry").style.display = "block";
				document.getElementById("signin").style.background = '#8c9095'; 
				document.getElementById("signin").style.borderColor = '#8c9095';
				logincheck();
				
			}, 5000); 	
		}
		else
		{
			document.getElementById("signin").style.background = '#8c9095'; 
			document.getElementById("signin").style.borderColor = '#8c9095';
			document.getElementById("retry").style.display = "block";
			
			var token =document.getElementById("token").value;
			
			$.ajax({
				type: "get",
				contentType: 'application/json; charset=UTF-8',
				url: "${pageContext.request.contextPath}/api/v1/login?token="+token,
				cache: false,
				async: false,
				success: function(response) 
				{
					if(response == "login success") 
					{
						
						window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";
						
						
					}
					
					else if (response == "already login")
					{
						document.getElementById("errormsg").innerHTML = "User session is already running. Please close the tab/browser";
						document.getElementById("retry").style.display = "none";
						document.getElementById("signin").style.background = '#5998f7'; 
						document.getElementById("signin").style.borderColor = '#5998f7';
					}
					else if (response == "CredentialFileNotAvailable")
					{
						$("#popupload").hide();
						document.getElementById("retry").style.display = "none";
						
						$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
						document.getElementById("intestcred").innerHTML = "Error 301 : Invalid static file or file may be corrupt";
						document.getElementById("msgcred").innerHTML = "Login Failed";
						$("#popcred").show();
					}
					else if (response == "corrupted")
					{
						$("#popupload").hide();
						$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
						document.getElementById("intestcred").innerHTML = "Error 302 : Invalid Static file or file may be corrupt";
						document.getElementById("msgcred").innerHTML = "Login Failed";
						$("#popcred").show();
						document.getElementById("retry").style.display = "none";

					}
					else if (response == "invalid Data")  // when invald carachters found in credential file
					{
						$("#popupload").hide();
						$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
						document.getElementById("intestcred").innerHTML = "Error : Invalid data found";
						document.getElementById("msgcred").innerHTML = "Login Failed";
						$("#popcred").show();
						document.getElementById("retry").style.display = "none";

					}
					
					else if (response == "connection fail")
					{
						$("#popupload").hide();
						$("#myimagecred").attr("src","${pageContext.request.contextPath}/img/cross.png");
						document.getElementById("intestcred").innerHTML = "Error 403 : Server not reachable";
						document.getElementById("msgcred").innerHTML = "Connection Failed";
						$("#popcred").show();
						document.getElementById("retry").style.display = "none";
						
						
						
						

					}
				
				}
			});
		}
	}

	
		
}
</script>


</html>



