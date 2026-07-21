
<%@page import="com.iso.response.HeaderDataDTO"%>
<html lang="en">
<head>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Download</title>
	
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

    <link href="${pageContext.request.contextPath}/css/style.css" rel="stylesheet" />
	<link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/step-form.css"> 
	<script src="${pageContext.request.contextPath}/js/form.js" type="text/javascript"></script>  
	<script src="${pageContext.request.contextPath}/js/jquery.js" type="text/javascript"></script>  
	<script src="${pageContext.request.contextPath}/js/script.js" type="text/javascript"></script> 
	
	<script	src="${pageContext.request.contextPath}/js/jspdf.umd.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jspdf.min.js"></script>	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/html2canvas.js"></script>
	
</head>

<body onload="convertHTMLToPDF();">

<div class="content-section" id="html-template">

   <div class="container-fluid border-tb-none">
     <div class="row">
	   
	   

  <div class="content__inner">
  
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12 text-center p-0 mt-3 mb-2" style="border-radius: 20px !important;border: 10px solid #00265c!important;">
            <div class="px-0 pb-0 mb-3">
            <div class="row justify-content-center pb-4" style="background: #00265c; padding-top:25px; margin-left:0px; margin-right:0px; border-top-left-radius: 10px 10px; border-top-right-radius: 10px 10px;">
            
                <div class="col-md-5 bordr-right pb-2" style="justify-content:center; display: flex;">
					  <div class="for-mobile"><a href="${pageContext.request.contextPath}/api/v1/project-details"><img src="${pageContext.request.contextPath}/img/logo.png" class="img-fluid"></a></div>
				</div>
				<div class="col-md-5 align-items-center bordr-left pb-2" style="font-size: 38px;color: #fff; justify-content:center; display: flex;">
			  		Project Registration Details
			  	</div>
		
            </div>
		<div class="bottom-head" >
	    <div class="row">
		  <div class="col-md-6">
		    <c:forEach items="${HeaderDataDTO}" var="headerdata">   
		      
		    <h4 class="bottom-head-title py-2" style="margin-left: 13ex;">Design Agency ID - DA<c:out value="${headerdata.daid}"/> </h4>
		  </div>
		  <div class="col-md-6">
		    <h4 class="bottom-head-title py-2">Design Agency Name - <c:out value="${headerdata.daname}"/></h4>
		   </c:forEach>
		  </div>
		</div>
	  </div>
	  	
	  	<!-- <hr style="background:#082d52; opacity:1; height: 12px;"> -->
                
                    <!-- progressbar -->
                    
                    
                    </div>
					<form id="msform" method="post">
                   	
		                    <fieldset class="step-from-four" style="margin: 0 15px;">
		                        <div class="form-card">
								
								<c:forEach items="${datalist}" var="headerdata">   
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Applicant Reference </h3></legend>
									<div class="mb-3">							
		                               <p id="lblAppRef"><b>Applicant Reference : </b><c:out value="${headerdata.appref}"/> </p>
									</div>
								</div>
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3">Contact Person </h3></legend>
									
									<div class="mb-3">
			                            <div class="row">
			                           		<div class="col-md-6">							
			                               		<p id="lblContPerName"> <b>Contact Person Name : </b><c:out value="${headerdata.fname}"/> <c:out value="${headerdata.lname}"/></p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblJobTit"><b>Job Title : </b> <c:out value="${headerdata.jtitle}"/></p>
										   </div>
			                               <div class="col-md-6">							
			                               		<p id="lblContNum"> <b>Contact Number : </b><c:out value="${headerdata.contNum}"/></p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblEmailAdd"><b>Email : </b><c:out value="${headerdata.email}"/> </p>
										   </div>
									</div>
								
								</div>
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3">Address for Communication </h3></legend>
									<div class="mb-3">							
		                               <p id="lblComminComName"> <b>Company Name : </b><c:out value="${headerdata.compName}"/></p>
									</div>
									<div class="mb-3">							
		                               <p id="lblComunAddress"><b>Address : </b> <c:out value="${headerdata.compAddress}"/>, <c:out value="${headerdata.dist}"/>-<c:out value="${headerdata.pincode}"/>(<c:out value="${headerdata.state}"/>)</p>
									</div>
									<div class="mb-3">							
                             			<p id="lblcomppostoffice"><b>Post Office : </b> <c:out value="${headerdata.compostoffice}"/></p>
									</div>
								</div>
							
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3">Organization Approval Details </h3></legend>
									
									<div class="mb-3">
			                            <div class="row">
			                           		<div class="col-md-6">							
			                               		<p id="lbldoadetails"> <b>DOA Details : </b><c:out value="${headerdata.doadetails}"/></p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lbldoavalid"> <b>DOA Validity : </b><c:out value="${headerdata.doavalid}"/></p>
										   </div>
			                               <div class="col-md-6">							
			                               		<p id="lbldoascope"><b>DOA Scope : </b> <c:out value="${headerdata.doascope}"/></p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpoadetails"> <b>POA Details : </b><c:out value="${headerdata.poadetails}"/></p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpoavalid"><b>POA Validity : </b><c:out value="${headerdata.poavalid}"/> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpoascope"> <b>POA Scope : </b><c:out value="${headerdata.poascope}"/></p>
										   </div>
									</div>
							
								</div>
								
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Air System Description </h3></legend>
									
									<div class="mb-3">
			                            <div class="row">
			                           		<div class="col-md-6">							
			                               		<p id="lblAirSysDes"><p><b>Project Name : </b><c:out value="${headerdata.airSys}"/> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblProjDet"> <b>Project Details : </b><c:out value="${headerdata.projDetail}"/></p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpartnum"><b>Project Part Number : </b><c:out value="${headerdata.partnum}"/> </p>
										   </div>
			                          	   <div class="col-md-6">							
			                               		<p id="lblIMTAR"><b>IMTAR Sub-Parts : </b><c:out value="${headerdata.imtar}"/> </p>
										   </div>
									</div>
									
									</div>
								</div>
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Product Breakdown Structure </h3></legend>
									<div class="mb-3">							
		                           <p id="lblProdBreakStruc"><b> Product Breakdown Structure : </b> <c:out value="${headerdata.customFile}"/></p>
									</div>
								</div>
							</c:forEach>
		                      </div>
		                        </div>
		                    </fieldset>
		                        
					<!---- step four end----->
                </form>
            </div>
        </div>
    </div>
</div>
	
  </div>
</div>
				<!-- <div align="center" style="text-align: center;">
					<input type="button" name="previous" onclick="convertHTMLToPDF();" class="final-pre previous action-button-previous" value="Download" />
					<input type="button" name="next" onclick="cancel();" class="next action-button" value="Cancel" />

              	</div>	 -->
       
	


<%-- <%@ include file="footer.jsp" %>  --%>

 <script>
$(document).ready( function () {
	
	convertHTMLToPDF();
	});

function cancel()
{
	if(confirm('Please download the form, if it is closed you are not able to download this form in future (click on cancel to download)'))
		window.location.href ="${pageContext.request.contextPath}/api/v1/project-details";
}

function convertHTMLToPDF() 
{

		//$(".btn").addClass("d-none");
		var data = document.getElementById("html-template")
		
		//alert(filename);
		html2canvas(data,{
			onrendered:function(canvas){
				
				var img = canvas.toDataURL("image/png");
				var doc = new jsPDF('l', 'mm', [1000, 1280 ]);
				window.location.href ="${pageContext.request.contextPath}/api/v1/project-details";
				doc.addImage(img,'JPEG',20,5);
			
				//doc.save('da-registration${id}".pdf');
				
				doc.save("Registration Form"+'.pdf');
				
				
				/* setTimeout(function () {
					 location.reload(true);
				    }, 5000); */
			}
			
		});
}

</script>
 
</body>
</html>



