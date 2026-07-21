 <%
response.setHeader("Cache-Control","no-cache, no-store, must-revalidate"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0);
//prevents caching at the proxy server
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Observations</title>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>  
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.min.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css">
	<script src="${pageContext.request.contextPath}/js/jquery.js" type="text/javascript"></script>
</head>

<body>

	

<div class="content-section">
	<div class="container-fluid border-tb-none">
		<div class="row">
			
	   
	   			 <div class="col-md-9" style="background-color: lightgrey; width: 100%">
	    		 <div class="right-section">
		  			<h5>List of observations received from CEMILAC. Please save all the observations in external media before logout. The observations will be deleted as the system is restored on logout. Click on OPEN FILE to get observations document.</h5>
		  
		  				<div class="table-responsive scolltable">
		  					<table class="table table-hover">
								  <thead>
								    <tr style="background-color: grey;">
								      <th width="10%"> Sr No.</th>
								      <th width="20%"> Project ID</th>
								       <th width="20%"> Project Name</th>
								      <th width="10%"> Document Name</th>
								       <th width="5%" style="text-align: center;"> Action </th>
								     
								    </tr>
								  </thead>
								  <tbody style="background-color: white;">
									  <c:forEach items="${ObservationList}" var="observationlist" varStatus="loop">
									  	 <tr>
										 		<td scope="row">${loop.count}</td>
									  			<td><c:out value="${observationlist.projectID}"/></td> 
									  			  <c:forEach items="${dashData}" var="dashdata">
										  			  <c:if test='${observationlist.projectID.equalsIgnoreCase(dashdata.projectID)}'>
										  			  	<td><c:out value="${dashdata.projectName}"/></td> 
										  			  </c:if>
									  			  </c:forEach>
									  			
									  			<td><c:out value="${observationlist.documentName}"/></td>
												<td align="center">
											 		<input type="button" name="btnUpload" style="background-color: red; border-color: red;" class="upload-button" value="Open file" id="btnUpload${loop.index}" onclick="openlocation('${loop.index}','${observationlist.projectID}','${observationlist.documentName}','${observationlist.dynamicfoldername}')" title="Click here to open files location">
 										 		</td> 
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


<script type="text/javascript">

function openlocation(fileIndex,proid,docname,foldername)     // open folder where downloaded files are stored when click on folder icon
{
	
	document.getElementById('btnUpload'+fileIndex).style.backgroundColor = 'green';  
	document.getElementById('btnUpload'+fileIndex).style.borderColor = 'green';  
	//location.reload();

	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/openfolder?&projectID="+proid+"&docName="+docname+"&foldername="+foldername,
		cache: false,
		success: function(response) 
		{
			
		}
	});	
	
}

</script>
</body>
</html>


