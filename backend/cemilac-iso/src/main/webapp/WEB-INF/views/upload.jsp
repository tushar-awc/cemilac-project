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
<style>
      .blink {
        animation: blinker 1.0s linear infinite;
        color: #1c87c9;
        font-size: 30px;
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
    <style>
.disable-click {
    pointer-events: none;
}


</style>
    
<body>

<div class="popup" id="pop" style="display: none">
	 <div class="box" >
        <img id="myimage" src="${pageContext.request.contextPath}/img/greentik.webp" alt="" >
        <h3 id="msg"></h3>
        <p id="intest"></p>
        <button type="button" class="but" onclick="hidee();">OK</button>
    </div>
</div>
	
<div class="popup" id="popupload" style="display: none">
	 <div class="box" >
       <img src="${pageContext.request.contextPath}/img/upicon.png" alt="" >
        <h3>Please Wait</h3>
        <p>Upload in Progress</p>
        <div class="progress">
 			 <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
		</div>
    </div>
</div>	
	
	
<div class="content-section">
   <div class="container-fluid border-tb-none">
     <div class="row">
	    <%@ include file="sidemenu.jsp" %>     <!--  To display the  left side menu on page  -->
	   
	   <div class="col-md-10" style="background-color: lightgrey; margin-left: -2ex;">
	   		<div class="right-section">
	   		<form id="uploadData" action="${pageContext.request.contextPath}/api/v1/certificate" enctype="multipart/form-data" method="post">
	   			
	   			<%-- <div class="scroll">
	   				<marquee direction="left">** Click on folder icon (<img src="${pageContext.request.contextPath}/img/fileexplorer.png" width="2%"/>) under "observations" tab to copy observation files to external media before shutting down your application/system ** </marquee>
	   			</div>
	   			 --%>
		 		 <h3  class="heading"  style="color: white; border-radius: 3ex;">Applicability Matrix : Document Status</h3>
		  			<div>
			  			<h4 class="proidheading" style="background-color: transparent; color: #1f01f3; font-weight: 900;">
			  				 Project Name - <%=request.getParameter("projectname")%>
			  			</h4>
			  			<c:if test='${totaliter > 1}'>
			  				<h4 style="display: initial;margin-left: 20ex; margin-right: 1ex;">History : </h4> 
			  		
				  			<select name="iterlist" id="iterlist" class="form-select" height="10px" onchange="getIterNum()" style="display: inline-block; width: 11%;border-radius: 1.25rem">
				  					<option disabled selected> Select Iteration</option>
					  			 <c:forEach begin="2" end="${totaliter}" varStatus="loop">
					  			<option value="${loop.count}"/>${loop.count}</option>
					  			
								</c:forEach>		
				  			</select>
			  			</c:if>
			  			
			  			<c:forEach items="${Checkcertificate}" var="check" varStatus="loop"> 
				  			<c:choose>
				  				<c:when test="${check=='yes'}">
				  				</c:when>
				  				<c:otherwise>
				  					<h4 class="proidheading" style="float: right;">
									    
									        <input type="hidden" name="projectid" value="<%=request.getParameter("projectid")%>">
									        <input type="hidden" name="projectname" value="<%=request.getParameter("projectname")%>">
									        <button type="submit" style="text-decoration: blink; color: white; border: none; background-color: transparent; cursor: pointer;">Certificate</button>
									 
									</h4>
				  					
				  					<%-- <h4 class="proidheading" style="float: right;"><a href="${pageContext.request.contextPath}/api/v1/certificate?projectid=<%=request.getParameter("projectid")%>&projectname=<%=request.getParameter("projectname")%>" style="text-decoration: blink; color: white;" > Certificate </a></h4> --%>
				  				</c:otherwise>
				  			</c:choose>
			  			</c:forEach>	
		  			</div>
		  			<div>
		  				<h4 class="proidheading" style="background-color: transparent; color: #1f01f3; font-weight: 900;">
			  				 Project ID - <%=request.getParameter("projectid")%>
			  			</h4>
		  			</div>
		  			</div>
		  				<div class="table-responsive scolltable">
		  					<table class="table table-hover" style="table-layout: fixed;width: 100%;overflow-wrap: break-word">
								  <thead>
								    <tr style="background-color: grey;">
								      <th width="10%">Sr No.</th>
								      <th width="30%">Document Name</th>
								      <th width="10%">Status</th>
								      <th width="40%">Action</th>
								      <th width="10%"></th>
									  <th width="20%" style="text-align: center;">CEMILAC Observations</th>
									  <th width="20%">Remarks</th>
								    </tr>
								  </thead>
								  <tbody style="background-color: white;">
								  
								  <c:forEach items="${statusList}" var="fileStatus" varStatus="loop">
								  <c:choose>
								  	<c:when test="${statusList eq 'Empty'}">
								  		<tbody style="background-color: white;">
								  				<td colspan="6" style="background-color: lightgrey"><h3 style="color: Red; text-align: center;">No data available</h3></td>
								  		</tbody>
								  	</c:when>
								  	<c:when test="${fileStatus.docName eq'invalid'}">
										  	<tbody style="background-color: white;">
									  				<td colspan="6" style="background-color: lightgrey"><h3 style="color: Red; text-align: center;">Invalid Data Found</h3></td>
									  		</tbody>
									 </c:when>
								  	<c:otherwise>
									  	<tr>
									      <td scope="row">${loop.count}</td>
									      <td><c:out value="${fileStatus.docName}"/></td>
									  
									      <c:if test="${fileStatus.status=='Accepted'}">
									      		<td style="color: blue; font-weight: bold;" title="This document is approved by CEMILAC"><c:out value="${fileStatus.status}"/></td>
									      </c:if>
									      
									       <c:if test="${fileStatus.status=='Approved'}">
									      		<td style="color: #006400; font-weight: bold;"><c:out value="${fileStatus.status}"/></td>
									      </c:if>
									       <c:if test="${fileStatus.status=='Infected'}">
									      		<td style="color: Orange; font-weight: bold;"><c:out value="${fileStatus.status}"/></td>
									      </c:if>
									      
									      <c:if test="${fileStatus.status=='ReUpload'}">
									      		<td style="color: Red; font-weight: bold;" title="Please Reupload this document after correction"><c:out value="${fileStatus.status}"/></td>
									      </c:if>	
									      <c:if test="${fileStatus.status=='Pending'}">
									      		<td style="color: black; font-weight: bold;" title="Upload this document"><c:out value="${fileStatus.status}"/></td>
									      </c:if>	
									      	
									       <c:if test="${fileStatus.status=='Submitted'}">
									      		<td style="color: blue; font-weight: bold;" title="Document is sent for approval"><c:out value="${fileStatus.status}"/></td>
									      </c:if>
									       <c:if test="${fileStatus.status!='Submitted' && fileStatus.status!='Pending' &&fileStatus.status!='ReUpload' && fileStatus.status!='Accepted' && fileStatus.status!='Approved'}">
									      		<td style="color: black; font-weight: bold;" title="Document is sent for approval"><c:out value="${fileStatus.status}"/></td>
									      </c:if>
									      <c:if test="${fileStatus.docNeed=='Needed'}">
									      	<td style="word-break:break-all;">
												<input type="file"  id="fileData${loop.index}" name = "fileData" placeholder="Select File" onchange="selectfilevalidation('${loop.index}');" class="file validate[required]"> 
									  			<br><span id = "selectfilemsg${loop.index}" style="color:red">
									  		</td>	
									  		<td>
												<input type="button" name="btnUpload"  class="upload-button" value="Upload" id="btnUpload${loop.index}" onclick="uploadFile('${loop.index}','${fileStatus.docName}','<%=request.getParameter("projectid")%>')"/>
									  		</td>
									      </c:if>	
									      	<c:if test="${fileStatus.docNeed=='NotNeeded'}">
									      	<td style="word-break:break-all;">
												<%-- <input type="file" id="fileData${loop.index}" name = "fileData${loop.index}" placeholder="Select File" > --%> 
									  			<input type="file" id="fileData${loop.index}" name="fileData" class="disable-click"/>
									  			<br><span id = "selectfilemsg${loop.index}" style="color:red">
									  		</td>	
									  		<td>
												<input type="button" name="btnUpload"  class="upload-button" value="Upload" id="btnUpload${loop.index}" onclick="uploadFile('${loop.index}','${fileStatus.docName}','<%=request.getParameter("projectid")%>')" style="background-color: grey; border-color: grey" disabled="disabled"/>
									  		</td>
									      </c:if>
									      				 							  	
									  		<%-- <c:forEach items='${observationfilelist}' var='obserfilelist' varStatus='loopp'>
									  			<c:if test='${fileStatus.docName.equalsIgnoreCase(obserfilelist.folderName)}'> --%>
									  			<td align="center">
												 		<input type="button" name="btnUpload"  class="upload-button-inac" value="Open file" id="bUpload${loop.index}" title="Click here to open files location" disabled="disabled">
												</td> 
									  			<%-- </c:if>
									  		</c:forEach> --%>								 			 		  
											  					 					
									      <td><c:out value="${fileStatus.remarks}"/></td>
									  
									    </tr> 
								  	</c:otherwise>
								  </c:choose>  
								  </c:forEach>
								  
								  </tbody>
							
								</table>
						</div>
					</form>
			</div>
	   </div>
	   
	 </div>
   </div>
</div>

<%@ include file="footer2.jsp" %> 

<script type="text/javascript">
	var i=0;
	document.write("<c:forEach items='${statusList}' var='fileStatus' varStatus='loop'>");
	
	document.write("<c:forEach items='${observationfilelist}' var='obserfilelist' varStatus='loopp'>");
	document.write("<c:if test='${fileStatus.docName.equalsIgnoreCase(obserfilelist.folderName)}'>");
	
	document.getElementById('bUpload'+i).addEventListener('click',function ()
	{
		openlocation('<%=request.getParameter("projectid")%>','${fileStatus.docName}','${obserfilelist.folderloc}')
	});
	document.getElementById('bUpload'+i).style.backgroundColor = '#0f60d7'; 
	document.getElementById('bUpload'+i).disabled = false;
	
	document.write("</c:if>");
	
	document.write("</c:forEach>");
	i++;
	
	document.write("</c:forEach>");

</script>


<script type="text/javascript">

//document.getElementById('fileData0').disabled = true;

	function getIterNum()
	{
		
		var iterNumber = $('#iterlist').val();
		var selectElement = document.getElementById("iterlist");
		selectElement.value = "Select Iteration";
		document.cookie = "iterNumber=" + iterNumber;
		window.open("${pageContext.request.contextPath}/api/v1/IterationHistory","Ratting","minimizable=no,width=1300,height=500,left=350,top=250,toolbar=0,titlebar=no,status=0,");
	
	}

	function hello()
	{
		alert("hello");
	}

	function selectfilevalidation(fileIndex) 
	{
		if ($('#fileData'+fileIndex).val() == "") 
		{
		}
		else
		{
			document.getElementById('btnUpload'+fileIndex).style.backgroundColor = 'Red';  
			document.getElementById('btnUpload'+fileIndex).style.borderColor = 'Red';  
			document.getElementById('btnUpload'+fileIndex).value="Upload";  
		}
		var uploadField = document.getElementById("fileData"+fileIndex);
	
		if(uploadField.files[0].size == 0)  
		{
			document.getElementById("selectfilemsg"+fileIndex).innerHTML = "Selected file has no content, please verify";
			document.getElementById("fileData"+fileIndex).value = "";
			document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
			document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
		}
		if(uploadField.files[0].size >=499897860)  
		{
			document.getElementById("selectfilemsg"+fileIndex).innerHTML = "File size shall be less than 500 MB";
			document.getElementById("fileData"+fileIndex).value = "";
			document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
			document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
		}
		else
		{
			document.getElementById("selectfilemsg"+fileIndex).innerHTML = "";	
		}
	}
	function hidee()
	{
		$("#pop").hide();
	}
	
	var check=0;
	check= sessionStorage.getItem('SEMAPHORE');

	
		function uploadFile(fileIndex,docname,proid)
		{
			
				if(check == 0)
				{			
				sessionStorage.setItem('SEMAPHORE',1);	
				//alert(sessionStorage.getItem('SEMAPHORE'));
				if ($('#fileData'+fileIndex).val() == "") 
				{
					
					document.getElementById("selectfilemsg"+fileIndex).innerHTML = "Please select file to upload";
				}
				else if(document.getElementById('btnUpload'+fileIndex).value == 'Uploaded')
				{
					document.getElementById("selectfilemsg"+fileIndex).innerHTML = "This file is already uploaded, select another file";
				}
				else
				{					
					var fileData = $('#uploadData')[0];
					var multipartData = new FormData(fileData);		
					
				//	var fname = $('#fileData' + fileIndex).val();
					//var fileName = fname.match(/[^/\\]*$/)[0];
					
					
					//$("#popupload").show();
					document.getElementById("popupload").style.display = "block";	
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
							if(response == "Success") {
								
								sessionStorage.setItem('SEMAPHORE',0);	
								
								//$("#popupload").hide();
								document.getElementById("popupload").style.display = "none";	
								
								document.getElementById("intest").innerHTML = "File uploaded successfully";
								document.getElementById("msg").innerHTML = "Thank You!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/greentik.png");
								//$("#pop").show();
								document.getElementById("pop").style.display = "block";
		
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = "Green";  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = 'Green';  
								document.getElementById('btnUpload'+fileIndex).value = 'Uploaded';  
		
								//document.getElementById("fileData"+fileIndex).innerHTML = "uploaded";
								
							} 
							else if(response == "not exist") 
							{
								
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
			
								document.getElementById("intest").innerHTML = "Error 101 : File to be uploaded doesn't exist";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							
							else if(response == "InvalidFileType") 
							{
								
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
								document.getElementById("selectfilemsg"+fileIndex).innerHTML = "This file format is not supported!";
								
							}
							else if(response == "maxfilelength") 
							{
								
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
								document.getElementById("selectfilemsg"+fileIndex).innerHTML = "File name is too long (File name should be less than 30 characters)";
								
							}
							else if(response == "invalidfilename") 
							{
								
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
								document.getElementById("selectfilemsg"+fileIndex).innerHTML = "Improper file name(remove special characters)";
								
							}
							
							else if(response == "Socket Fail") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
				
								document.getElementById("intest").innerHTML = "Error 102 : Unable to create socket";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Bind Fail") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
				
								document.getElementById("intest").innerHTML = "Error 103 : Bind failed";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Server Not Ready") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
				
								document.getElementById("intest").innerHTML = "Error 104 : Connection failed, server not ready";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Recieve Fail") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
				
								document.getElementById("intest").innerHTML = "Error 105 : Data not received from server";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Ack Not Recieve") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
		
								document.getElementById("intest").innerHTML = "Error 106 : Acknowledgement not received from server";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "final aack not receive") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
			
								document.getElementById("intest").innerHTML = "Error 107 : Final acknowledgement not received from server";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Few files uploaded") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
		
								document.getElementById("intest").innerHTML = "Error 110 : Only few files are uploaded";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Permission Denied") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
		
		
								document.getElementById("intest").innerHTML = "Error 113 : Permission denied to upload files or Server storage space full";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Send Fail") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
		
		
								document.getElementById("intest").innerHTML = "Error 116 : File send failed";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Dongle error") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
								document.getElementById("intest").innerHTML = "Error 117 : Dongle error";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Invalid upload mode") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
								document.getElementById("intest").innerHTML = "Error 118 : Invalid upload mode";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "transform fail") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
		
		
								document.getElementById("intest").innerHTML = "Error 119 : Transform failed";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "General error") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";	
								document.getElementById("intest").innerHTML = "Error 120 : Server busy, please try after some time";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Auth fail") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";		
								document.getElementById("intest").innerHTML = "Error 121 : Authentication failed";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "Lock unavailable") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";	
								document.getElementById("intest").innerHTML = "Error 123 : Lock unavailable";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else if(response == "File Size Greater") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";	
								document.getElementById("intest").innerHTML = "Error : File Size is Greater";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							else //if(response == "General error") 
							{
								sessionStorage.setItem('SEMAPHORE',0);	
								document.getElementById("popupload").style.display = "none";
								document.getElementById("intest").innerHTML = "Error 120 : Server busy or Server storage space full";
								document.getElementById("msg").innerHTML = "Upload failed!";
								$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
								document.getElementById("pop").style.display = "block";
								document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
								document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
								
							}
							
						},
						error: function() 
						{
							
							sessionStorage.setItem('SEMAPHORE',0);	
							document.getElementById("popupload").style.display = "none";
							document.getElementById("intest").innerHTML = "Please check connection status";
							document.getElementById("msg").innerHTML = "Upload failed!";
							$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
							//$("#pop").show();
							document.getElementById("pop").style.display = "block";
							document.getElementById('btnUpload'+fileIndex).style.backgroundColor = '#0f60d7';  
							document.getElementById('btnUpload'+fileIndex).style.borderColor = '#0f60d7';  
							
						}
					});
					
					document.getElementById("selectfilemsg"+fileIndex).innerHTML = "";	
					//document.getElementById("fileData"+fileIndex).value = "";	
				}
				$("#fileData"+fileIndex).change(function()  
				{
					if ($('#fileData'+fileIndex).val() != "") 
					{
						document.getElementById("selectfilemsg"+fileIndex).innerHTML = "";
					}
				});			
		}
				else
				{
					document.getElementById("popupload").style.display = "none";
					
					document.getElementById("intest").innerHTML = "Please retry !";
					//document.getElementById("msg").innerHTML = "Upload Failed!";
					$("#myimage").attr("src","${pageContext.request.contextPath}/img/cross.png");
					document.getElementById("pop").style.display = "block";
					
				}
	}
	
	
	function openlocation(proid,docname,foldername)     //// open folder where downloaded files are stored when click on folder icon
	{
		
		document.getElementById("pop").style.display = "none";
		$.ajax({
			type: "get",
			contentType: 'application/json; charset=UTF-8',
			url: "${pageContext.request.contextPath}/api/v1/openfolder?&projectID="+proid+"&docName="+docname+"&foldername="+foldername,
			cache: false,
			success: function(response) 
			{
				//$("#pop").hide();
				document.getElementById("pop").style.display = "none";
	
			}
		});	
	}
	
	
	//document.getElementById('fileData0').disabled = true;
</script>
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function () {
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });
    });
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


