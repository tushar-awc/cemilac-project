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
		  			<h5 style="color: red;text-align: center;font-family: monospace;font-weight: bold;">Iteration-<c:out value="${iterNumber}"/>  Applicability Matrix : Document Status</h5>
		  
		  			
		  			
		  				<div class="table-responsive scolltable">
		  				
		  					<table class="table table-hover">
								  <thead>
								    <tr style="background-color: grey;">
								      <th width="10%"> Sr No.</th>
								      <th width="70%"> Document Name</th>
								       <th width="20%"> Document Status</th>
								      
								    </tr>
								  </thead>
								  <tbody style="background-color: white;">
									  <c:forEach items="${iterationHistoryList}" var="iterationHistoryList" varStatus="loop">
									  	 <tr>
									  		<c:if test='${iterationHistoryList.interationNumber == iterNumber}'>
									  			<c:set var="counter" value="${counter + 1}" />
										  		<td scope="row">${counter}</td>
										  		<td scope="row">${iterationHistoryList.documName}</td>
										  		<td scope="row">${iterationHistoryList.documStatus}</td>		  	
										  	</c:if>
										 	
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


