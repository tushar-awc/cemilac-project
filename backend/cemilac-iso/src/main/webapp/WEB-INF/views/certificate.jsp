<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	<%@ include file="header.jsp" %> 
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css">
</head>

<body>

<div class="popup" id="pop">
	 <div class="box" >
        <img id="myimage" src="${pageContext.request.contextPath}/img/greentik.webp" alt="" >
        <h3 id="msg"></h3>
        <p id="intest"></p>
        <button type="button" class="but" onclick="hidee();">Continue</button>
    </div>
	</div>
	
	
<div class="content-section">
   <div class="container-fluid border-tb-none">
     <div class="row">
	    <%@ include file="sidemenu.jsp" %>     <!--  To display the  left side menu on page  -->
	   
	   <div class="col-md-10" style="background-color: lightgrey; margin-left: -2ex;">
	   		<div class="right-section">
	   		
	   			
	   			<%-- <div class="scroll">
	   				<marquee direction="left">** Click on folder icon (<img src="${pageContext.request.contextPath}/img/fileexplorer.png" width="2%"/>) to get your Certificate ** </marquee>
	   			</div> --%>
	   			
		 		 <h3  class="heading"  style="color: white; border-radius: 3ex;">List of Issued Certificates</h3>
		 		
		  			<div>
		  			<h4 class="proidheading" style="background-color: transparent; color: #1f01f3; font-weight: 900;">
			  				 Project Name - <%=request.getParameter("projectname")%>
			  			</h4>
			  			</div>
			  			<div>
		  			<h4 class="proidheading" style="background-color: transparent; color: #1f01f3; font-weight: 900;">
		  				 Project ID - <%=request.getParameter("projectid")%>
		  			</h4>
		  			
		  			
		  				<form action="${pageContext.request.contextPath}/api/v1/upload" method="post" style="display: inline;">
					       	<input type="hidden" name="projectid" value="<%=request.getParameter("projectid")%>">
					        <input type="hidden" name="projectname" value="<%=request.getParameter("projectname")%>">
					        <button type="submit" style="text-decoration: underline; color: blue; border: none; background-color: transparent; cursor: pointer;">Project Details</button>
					    </form>

		  			</h4>
		  			</div>
		  			</div>
		  				<div class="table-responsive scolltable">
		  					<table class="table table-hover">
								  <thead>
								    <tr style="background-color: grey;">
								      <th width="10%">Sr No.</th>
								      <th width="70%">Certificate Type.</th>			 
								      <th width="20%">Open Certificate</th>
								    </tr>
								  </thead>
								  
								    <tbody style="background-color: white;">
								  
								  <c:forEach items="${CertificatesList}" var="nameofcertificate" varStatus="loop">     
								  	 
									   <tr>
									   <c:choose>
								  			<c:when test="${nameofcertificate=='Empty'}">
								  			<tbody style="background-color: white;">
								  				<td colspan="3" style="background-color: lightgrey"><h3 style="color: Red; text-align: center;">No Certificate Available</h3></td>
								  			</tbody>
								  			</c:when>
								  			<c:otherwise>
								  			<td scope="row">${loop.count}</td>
								  			<td><c:out value="${nameofcertificate.certificatType}"/></td>						   
									  		<td>
									  		<%-- <a href="#" onclick="opencertlocation('<%=request.getParameter("projectid")%>','${nameofcertificate.certificatType}')" style="text-decoration: underline; color: blue;" id="upload">Open Certificate</a> --%>
									 		<input type="button" name="btnUpload"  class="upload-button-inac" value="Open Certificate" id="bUpload${loop.index}" title="Click here to open get certificate" onclick="opencertlocation('<%=request.getParameter("projectid")%>','${nameofcertificate.certificatType}')" style="background-color: #0f60d7;">	
									 		</td>   
								  			</c:otherwise>
									      	    	
										</c:choose>	 
										</tr>
										
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

<script type="text/javascript">
$("#pop").hide();

function hidee()
{
	$("#pop").hide();
}


function uploadFile(fileIndex,docname,proid)
{

	/* alert(document.getElementById("fileData").value); */
	
		//stop submit the form, we will post it manually.
		if ($('#fileData'+fileIndex).val() == "") 
		{
			
			document.getElementById("selectfilemsg"+fileIndex).innerHTML = "Select File to Upload";
		}
		
		else
		{
			var fileData = $('#uploadData')[0];
			var multipartData = new FormData(fileData);
			
			var mode = 1;

			$.ajax({
				type: "post",
				enctype : 'multipart/form-data',
				url: "${pageContext.request.contextPath}/api/v1/upload-save?id="+mode+"&uploadIndex="+fileIndex+"&docName="+docname+"&projectID="+proid,
				data: multipartData,
				processData : false, //prevent jQuery from automatically transforming the data into a query string
				contentType : false,
				cache: false,
				success: function(response) 
				{
					if(response == "success") {
						document.getElementById("intest").innerHTML = "File uploaded successfully";
						document.getElementById("msg").innerHTML = "Thank You!";
						$("#myimage").attr("src","${pageContext.request.contextPath}/img/greentik.webp");
						$("#pop").show();
					} 
					else if(response == "Permission Denied") 
					{
						document.getElementById("intest").innerHTML = "Upload permissions not available";
						document.getElementById("msg").innerHTML = "Upload Failed!";
						$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
						$("#pop").show();
					}
					else {
						//errRes = response.errors[0];
						//alert("something went wrong ...Please check Connection Status");
						document.getElementById("intest").innerHTML = "Please check connection status";
						document.getElementById("msg").innerHTML = "Upload Failed!";
						$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
						$("#pop").show();
					}
				},
				error: function() {
					document.getElementById("intest").innerHTML = "Please check connection status";
					document.getElementById("msg").innerHTML = "Upload Failed!";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					$("#pop").show();
				}
			});
			
			document.getElementById("selectfilemsg"+fileIndex).innerHTML = "";	
			document.getElementById("fileData"+fileIndex).value = "";	
		}
		$("#fileData"+fileIndex).change(function()  
		{
			if ($('#fileData'+fileIndex).val() != "") 
			{
				document.getElementById("selectfilemsg"+fileIndex).innerHTML = "";
			}
		});
		
		
}

function opencertlocation(proid,certtype)     //// open folder where downloaded files are stored when click on folder icon
{
	$("#pop").hide();
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/opencertificatefolder?&projectID="+proid+"&certtype="+certtype,
		cache: false,
		success: function(response) 
		{
			$("#pop").hide();
		}
	});	
}

	


</script>
<script>

    // Broadcast that you're opening a page.
    localStorage.openpages = Date.now();
    window.addEventListener('storage', function (e) {
        if(e.key == "openpages") {
            // Listen if anybody else is opening the same page!
            localStorage.page_available = Date.now();
        }
        if(e.key == "page_available") {
        	 window.location.href = "${pageContext.request.contextPath}";
        	 alert("User is already logged in");
           
        }
    }, false);
</script> 
</body>
</html>


