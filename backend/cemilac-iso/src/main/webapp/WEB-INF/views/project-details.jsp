<!DOCTYPE html>
<html lang="en">
<head>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
  	<meta charset="utf-8">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	<%@ include file="header.jsp" %> 
</head>
<style>
      .blink {
        animation: blinker 1.0s linear infinite;
        color: #1c87c9;
        font-size: 16px;
        font-weight: bold;
        font-family: sans-serif;
      }
      @keyframes blinker {
        50% {
          opacity: 0;
        }
      }
      .blink-one {
        animation: blinker-one 1s linear infinite;
      }
      @keyframes blinker-one {
        0% {
          opacity: 0;
        }
      }
      .blink-two {
        animation: blinker-two 1.4s linear infinite;
      }
      @keyframes blinker-two {
        100% {
          opacity: 0;
        }
      }
 
    </style>
<body>
<div class="popup" id="popdown" style="display: none;">
	 <div class="box" >
         	 <img src="${pageContext.request.contextPath}/img/downicon.png" alt="" >
        	<h3>Please Wait</h3>
        	<p>File is Downloading</p>
        	<div class="progress">
 				<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
			</div>
   	 </div>
</div>

<c:if test="${infectedfilelist ne 'Empty'}">
	 <div class='popup' id='popAlert2' style="display: none;">	 
	 <div class='box' style='width: 415px;'>
	 <img src='${pageContext.request.contextPath}/img/alert.webp'>
	 <h3 id='msgalert' style='color: Red'>Alert</h3>
	 <hr style='border:10px;'>
	 <p style='text-align: justify; color: black;'>Some of the files uploaded on following dates were found malicious, please re-upload the files<p>
	 <hr style='border: 10px;'>
	 <p style='text-align: justify;'>
	 <c:forEach items='${infectedfilelist}' var='infectedfilelist' varStatus='loop'>
		<c:out value='${infectedfilelist.infectedFileInfo}'></c:out>
	 <br>
	 </c:forEach>
	 </p>
	 <button type='button' class='but' onclick='hidealert();'>Continue</button>
	 </div>
	 </div>
</c:if>
	
<!-- <script type="text/javascript">
var status = sessionStorage.getItem('status');
status=3;
if(status==3)
{

	$("#popdown").hide();
	 document.write("<c:if test="${infectedfilelist ne 'Empty'}">");	
	 document.write("<div class='popup' id='popAlert'>");
	 
	 document.write("<div class='box' style='width: 415px;'>");
	 document.write("<img src='${pageContext.request.contextPath}/img/alert.webp'>");
	 document.write("<h3 id='msgalert' style='color: Red'>Alert</h3>");
	 document.write("<hr style='border:10px;'>");
	 document.write("<p style='text-align: justify; color: black;'>Some of the files found malicious that you uploaded on following dates, please re-upload the files again.<p>");
	 document.write("<hr style='border: 10px;'>");
	 document.write("<p style='text-align: justify;'>");
	 document.write("<c:forEach items='${infectedfilelist}' var='infectedfilelist' varStatus='loop'>");
	 document.write("<c:out value='${infectedfilelist.infectedFileInfo}'></c:out>");
	 document.write("<br>");
	 document.write("</c:forEach>");
	 document.write("</p>");
	 document.write("<button type='button' class='but' onclick='hidee();'>Continue</button>");
	 document.write("</div>");
	 document.write("</div>");
	 document.write("</c:if>");

	 status=2;
	 sessionStorage.setItem('status',status);
	 status=3;
	 sessionStorage.setItem('status',status);
	//$("#pop").show();
}	
</script>
 -->
<div class="popup" id="pop" style="display: none;">
	 <div class="box" >
        <img id="myimage" src="${pageContext.request.contextPath}/img/greentik.webp" alt="" >
        <h3 id="msg"></h3>
          <hr>
        <p id="intest" style="color: red"></p>
        <button type="button" class="but" onclick="hide();">Continue</button>
    </div>
</div>
<div class="popup" id="popsomecurpt" style="display: none;">
	 <div class="box" >
        <img id="myimagesomecurpt" src="${pageContext.request.contextPath}/img/cross.png" alt="" >
        <h3 id="msgsomecurpt"></h3>
          <hr>
        <p id="intestsomecurpt" style="color: red"></p>
        <button type="button" class="but" onclick="hidesomecurpt();">Continue</button>
    </div>
</div>

<div class="popup" id="popcurpt" style="display: none;">
	 <div class="box" >
        <img id="myimagecurpt" src="${pageContext.request.contextPath}/img/cross.png" alt="" >
        <h3 id="msgcurpt"></h3>
          <hr>
        <p id="intestcurpt" style="color: red"></p>
        <button type="button" class="but" onclick="hidecurpt();">Continue</button>
    </div>
</div>

<div class="content-section">
	<div class="container-fluid border-tb-none">
		<div class="row">
			 <%@ include file="sidemenu.jsp" %>     <!--  To display the side menu on page  -->
	    	
	    	
	    	
	   			 <div class="col-md-10" style="background-color: lightgrey;">
	   			  
		  			
	    		 <div class="right-section">
	    		
		  			<h3 class="heading" style="color: white; border-radius: 3ex;">List of Registered Projects</h3>
		  			
		  			<!-- Rejected Project -->
		  					  			
		  				<div>
			  				<c:forEach items="${rejectedprojlist}" var="rejectedlist" varStatus="loop"> 
					  			<c:choose>
					  				<c:when test="${rejectedlist=='Empty'}">
					  				</c:when>
					  				<c:otherwise>
					  					<h4 class="proidheading" style="float: right;"><a href="${pageContext.request.contextPath}/api/v1/rejected-projects" style="text-decoration: blink; color: white;" > Rejected Projects </a></h4>	
					  				</c:otherwise>
					  			</c:choose>
				  			</c:forEach>
		  				</div>
		  						  			
		  				<div class="table-responsive scolltable">
		  					<table class="table table-hover" style="overflow-wrap: break-word;">
								  <thead>
								    <tr style="background-color: grey;">
								      
								      <th width="30"> Sr No.</th>
								      <th width="150"> Project ID</th>
								      <th width="200"> Project Part Number</th>
								      <th width="150"> Project Name</th>
									  <th width="150"> Status </th>
									  <th width="150"> Navigation </th>
								    </tr>
								  </thead>
								  <tbody style="background-color: white;">
									  <c:forEach items="${dashboarddataList}" var="headerdata" varStatus="loop">
									  
									  <c:choose>
									  	<c:when test="${headerdata=='Empty'}">
										  	<tbody style="background-color: white;">
									  				<td colspan="6" style="background-color: lightgrey"><h3 style="color: Red; text-align: center;">No data available</h3></td>
									  		</tbody>
									  	</c:when>
									  <c:when test="${headerdata.projectID=='invalid'}">
										  	<tbody style="background-color: white;">
									  				<td colspan="6" style="background-color: lightgrey"><h3 style="color: Red; text-align: center;">Invalid Data Found</h3></td>
									  		</tbody>
									  	</c:when>
									  	<c:otherwise>
									  		  <tr>
												  <c:choose>
												  	<c:when test="${headerdata.projectID=='null' || headerdata.projectID=='' ||headerdata.projectID==' '}">
												  		<tbody style="background-color: white;">
						<!-- 					  				<td colspan="6" style="background-color: lightgrey"><h3 style="color: Red; text-align: center;">No Projects Available</h3></td> -->
											  			</tbody>
												  	</c:when>
											  		<c:otherwise>
											  			<td scope="row">${loop.count}</td>
											  			<td id="pid${loop.index}"><c:out value="${headerdata.projectID}"/></td> 
											  			<td id="partnum${loop.index}"><c:out value="${headerdata.projectPartNumber}"/></td>
											  			<td id="proname${loop.index}"><c:out value="${headerdata.projectName}"/></td>
											  			
											  			<td id="pstat${loop.index}"><c:out value="${headerdata.status}"/></td>
											  			<%-- <td><a href="${pageContext.request.contextPath}/api/v1/upload?projectid=${headerdata.projectID}&projectname=${headerdata.projectName}" style="text-decoration: underline; color: blue;" id="upload">Project Details</a></td> --%>
											  			<td>
														    <form action="${pageContext.request.contextPath}/api/v1/upload" method="post" style="display: inline;">
														        <input type="hidden" name="projectid" value="${headerdata.projectID}">
														        <input type="hidden" name="projectname" value="${headerdata.projectName}">
														        <button type="submit" style="text-decoration: underline; color: blue; border: none; background-color: transparent; cursor: pointer;">Project Details</button>
														    </form>
														</td>
											  		</c:otherwise>
											  	</c:choose>
									 		 </tr>
									  	</c:otherwise>
									  </c:choose>
									
									  </c:forEach>
								  </tbody>
								</table>
						</div>
					</div>
	  			 </div>
			 </div>
 	  </div>
</div>

<%@ include file="footer2.jsp" %> 


<script>
var link5 = document.getElementById("form");
document.addEventListener('click', function (e) 
		{
		    if (e.target.id === link5.id) 
		    {
		    	e.preventDefault();
		    			//alert("logout");
		    }
			});

var link4 = document.getElementById("down");

document.addEventListener('click', function (e) 
{
    if (e.target.id === link4.id) 
    {
    	e.preventDefault();
    			//alert("logout");
    }
	});



    // Add an event listener for the popstate event
    window.addEventListener('popstate', function (event) {
        // Display your message when the back button is pressed
        //alert('You pressed the back button!');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '${pageContext.request.contextPath}/api/v1/pressBackButtonLogout', true);
        window.location.href = "${pageContext.request.contextPath}";
        xhr.send();
    });

    // Manipulate the browser history to prevent the user from navigating away
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL);
    });
</script>



<script type="text/javascript">

	var i=0;
	document.write("<c:forEach items='${dashboarddataList}' var='headerdata' varStatus='loop'>");
	
	document.write("<c:forEach items='${idList}' var='idList' varStatus='loopp'>");
	document.write("<c:if test='${headerdata.projectID.equalsIgnoreCase(idList)}'>");
	
	document.getElementById('pid'+i).style.color = '#21A224'; 
	document.getElementById('partnum'+i).style.color = '#21A224'; 
	document.getElementById('proname'+i).style.color = '#21A224'; 
	document.getElementById('pstat'+i).style.color = '#21A224'; 
	
	document.getElementById('pid'+i).style.fontWeight="bold";
	document.getElementById('partnum'+i).style.fontWeight="bold";
	document.getElementById('proname'+i).style.fontWeight="bold";
	document.getElementById('pstat'+i).style.fontWeight="bold";
	
	document.getElementById('pid'+i).className = "blink";  
	document.getElementById('partnum'+i).className = "blink";  
	document.getElementById('proname'+i).className = "blink";  
	document.getElementById('pstat'+i).className = "blink";  
	
	document.write("</c:if>");
	
	document.write("</c:forEach>");
	i++;
	
	document.write("</c:forEach>");
</script>

<script type="text/javascript">
	document.getElementById("Registered").style = "width: 100%; background-color:#ed4d4d";
	function hidee()
	{
		//$("#popAlert").hide();
		document.getElementById("popAlert").style.display = "none";
	}
	function hide()
	{		
		window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";
		document.getElementById("popAlert2").style.display = "block";	
		document.getElementById("pop").style.display = "none";
		document.getElementById("popsomecurpt").style.display = "none";
	}

	function hidesomecurpt()
	{
		document.getElementById("popsomecurpt").style.display = "none";
		window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";
	}
	function hidecurpt()
	{
		document.getElementById("popcurpt").style.display = "none";
	}
	function hidealert()
	{	
		document.getElementById("popAlert2").style.display = "none";
		document.getElementById("popdown").style.display = "none";
	}
	document.getElementById("popdown").style.display = "none";
</script>

<script>
    // Ensure the DOM is fully loaded before attaching the event listener
    document.addEventListener('DOMContentLoaded', function () {
        // Broadcast that you're opening a page.
        localStorage.setItem('openpages', Date.now());

        // Listen for changes in the local storage
        window.addEventListener('storage', function (e) {
            if (e.key === 'openpages') {
                // Listen if anybody else is opening the same page!
                localStorage.setItem('page_available', Date.now());
            }
            if (e.key === 'page_available') {
                // Redirect to a new page if someone else is already logged in
                alert("User is already logged in");
                window.location.href = "${pageContext.request.contextPath}";
            }
        });
    });
</script>

 
<script type="text/javascript">

	$(document).ready( function () 
	{
		document.getElementById("popdown").style.display = "none";
		$("#popAlert2").hide();
		downloadDynamicData();
	});

	function downloadDynamicData()
	{
		sessionStorage.setItem('SEMAPHORE',1);
		var status = sessionStorage.getItem('status');
		if(status == 1)
		{
			document.getElementById("popdown").style.display = "block";
		}
		//alert(status)
		if(status == 2)
		{
			status=3;
			sessionStorage.setItem('status',status);
			//$("#popAlert2").show();
			document.getElementById("popAlert2").style.display = "block";
		}
		if(status == 4)
		{
			status=3;
			sessionStorage.setItem('status',status);
			//$("#popAlert2").show();
			document.getElementById("popAlert2").style.display = "block";
		}	
		//document.getElementById("popAlert2").style.display = "block";
		//$("#pop").hide();
		//$("#popdown").show();
		document.getElementById("popdown").style.display = "block";	
		$.ajax({
			
			type: "get",
			contentType: 'application/json; charset=UTF-8',
			url: "${pageContext.request.contextPath}/api/v1/downloadData?mode=1",  /* //&downloadPath=/home/DownloadedData/", */
			cache: false,
			success: function(response) 
			{
				if(response == "success") {
					
					sessionStorage.setItem('SEMAPHORE',0);
					status=2;
					sessionStorage.setItem('status',status);
					document.getElementById("popdown").style.display = "none";
					$("#popAlert2").show();
					//document.getElementById("popAlert2").style.display = "block";
					
					document.getElementById("msg").innerHTML = "Alert";
					document.getElementById("intest").innerHTML = "Observations received on registered project, please download and save all the observations by clicking on 'Open File' button under 'Project Details' before logout";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/alert.webp");
					document.getElementById("pop").style.display = "block";
			
				}
				else if(response == "Some files corrupt") 
				{
				
					sessionStorage.setItem('SEMAPHORE',0);
					status=2;
					sessionStorage.setItem('status',status);
					document.getElementById("popdown").style.display = "none";
					$("#popAlert2").show();
					//document.getElementById("popAlert2").style.display = "block";
					
					document.getElementById("intestcurpt").innerHTML = "Error 502 : Invalid Dynamic File or file may be corrupt";
					document.getElementById("msgcurpt").innerHTML = "Error !";
					//$("#myimage").attr("src","${pageContext.request.contextPath}/img/alert.webp");
					
					document.getElementById("popcurpt").style.display = "block";
					document.getElementById("msg").innerHTML = "Alert";
					document.getElementById("intest").innerHTML = "Observations received on registered project please download and save all the observations by clicking on Open File button under Project Details before logout";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/alert.webp");
					document.getElementById("pop").style.display = "block";
					
				}		
				else if(response == "File Corrupted") 
				{
					sessionStorage.setItem('SEMAPHORE',0);		
					document.getElementById("intestsomecurpt").innerHTML = "Error 502 : Invalid dynamic file or file may be corrupt";
					document.getElementById("msgsomecurpt").innerHTML = "Error !";
					//$("#myimage").attr("src","${pageContext.request.contextPath}/img/alert.webp");
					//document.getElementById("pop").style.display = "block";				
					document.getElementById("popsomecurpt").style.display = "block";				
					status=4;
					sessionStorage.setItem('status',status);
					document.getElementById("popdown").style.display = "none";				
					$("#popAlert2").show();
					//document.getElementById("popAlert2").style.display = "block";				
					document.getElementById("pop").style.display = "block";
				}		
				else if(response == "Only mal found")
				{
					sessionStorage.setItem('SEMAPHORE',0);
					status=2;
					sessionStorage.setItem('status',status);
					document.getElementById("popdown").style.display = "none";
					window.location.href = "${pageContext.request.contextPath}/api/v1/project-details";
					document.getElementById("popAlert2").style.display = "block";			
				}
				else if(response == "Tar not available") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 502 : Invalid dynamic file or file may be corrupt";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
			
				}	
				else if(response == "Socket Fail") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
				
					document.getElementById("intest").innerHTML = "Error 202 : Unable to create socket";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Bind Fail") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 203 : Bind failed";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Server Not Ready") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 204 : Connection failed, server not ready";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Recieve Fail") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 205 : Data not received from server";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Ack Not Recieve") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 206 : Acknowledgement not received from server";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
			 	else if(response == "File Not Available") 
				{
			 		sessionStorage.setItem('SEMAPHORE',0);
			 		document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "No observations received";
					document.getElementById("intest").style.color = "green";
					document.getElementById("msg").innerHTML = "Message !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/info.png");
					document.getElementById("pop").style.display = "block";
				} 
				else if(response == "No Write Permission") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 209 : No write permission in destination path";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Few files downloaded") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 210 : Only few files are downloaded";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
	
				}
				else if(response == "Download Fail") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 211 : Download failed, try after some time";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Permission Denied") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 214 : Permission denied to download files";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
	
				}
				else if(response == "Send Fail") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 216 : Send failed";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Dongle error") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 217 : Dongle error";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "Invalid download mode") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 218 : Invalid download mode";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "De transform fail") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 219 : De-transform failed";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}
				else if(response == "General error") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
					document.getElementById("intest").innerHTML = "Error 220 : Download failed";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}		
				else if(response == "Auth/Nounce Fail") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 221 : Auth/Nonce fail";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}	
				else if(response == "Lock unavailable") 
				{
					sessionStorage.setItem('SEMAPHORE',0);
					//$("#popdown").hide();
					document.getElementById("popdown").style.display = "none";
	
					document.getElementById("intest").innerHTML = "Error 223 : Lock unavailable";
					document.getElementById("msg").innerHTML = "Error !";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
				}	
				else
					{
					sessionStorage.setItem('SEMAPHORE',0);
				//	$("#popdown").hide();
					document.getElementById("popdown").style.display = "none";
					}			
			},
			error: function() {
				
				sessionStorage.setItem('SEMAPHORE',0);
				//$("#popdown").hide();
				document.getElementById("popdown").style.display = "none";
				/*$(".loader").hide();
				$(".sec").show();*/
				document.getElementById("intest").innerHTML = "File not downloaded, please check connection status";
				$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
				document.getElementById("msg").innerHTML = "Download failed";
				document.getElementById("pop").style.display = "block";			
			}
		});
	}
	document.getElementById("popdown").style.display = "none";
</script>
</body>
</html>



