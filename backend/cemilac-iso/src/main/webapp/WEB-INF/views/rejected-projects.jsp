<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rejected Projects</title>
	<%@ include file="header.jsp" %> 
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.css">
</head>

<body>

	
	
<div class="content-section">
   <div class="container-fluid border-tb-none">
     <div class="row">
	    <%@ include file="sidemenu.jsp" %>     <!--  To display the  left side menu on page  -->
	   
	   <div class="col-md-10" style="background-color: lightgrey; margin-left: -2ex;">
	   		<div class="right-section">
	   		<form id="rejectproject" method="post">
	   			
	   			
		 		 <h3  class="heading"  style="color: white; border-radius: 3ex;">List of Rejected Projects</h3>
		 		
		  			
		  			</div>
		  				<div class="table-responsive scolltable">
		  					<table class="table table-hover">
								  <thead>
								    <tr style="background-color: grey;">
								      <th width="10%">Sr No.</th>
								      <th width="20%">Project Part Number</th>			 
								      <th width="20%">Project Name</th>
								     <!--  <th width="20%">Project Status</th> -->
								      <th width="50%">Remarks</th>
								    </tr>
								  </thead>
								  
								    <tbody style="background-color: white;">
								  
								  		<c:forEach items="${rejectedprojlist}" var="rejectedlist" varStatus="loop">     
								  	 
										   <tr>
											   <c:choose>
										  			<c:when test="${rejectedlist=='Empty'}">
										  			<tbody style="background-color: white;">
										  				<td colspan="3" style="background-color: lightgrey"><h3 style="color: Red; text-align: center;">No data available</h3></td>
										  			</tbody>
										  			</c:when>
										  			<c:otherwise>
											  			<td scope="row">${loop.count}</td>
											  			<td><c:out value="${rejectedlist.partNumber}"/></td>	
											  			<td><c:out value="${rejectedlist.projName}"/></td>
											  			<%-- <td><c:out value="${rejectedlist.projStatus}"/></td> --%>
											  			<td><c:out value="${rejectedlist.remarks}"/></td>					   
											  		  
										  			</c:otherwise>
											      	    	
												</c:choose>	 
											</tr>
										
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


