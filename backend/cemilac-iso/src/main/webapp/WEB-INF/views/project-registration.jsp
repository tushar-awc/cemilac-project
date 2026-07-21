
<%@page import="com.iso.response.HeaderDataDTO"%>
<html lang="en">
<head>
	<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Registration</title>
	<%@ include file="header.jsp" %> 
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

    <link href="${pageContext.request.contextPath}/css/style.css" rel="stylesheet" />
	<link href="${pageContext.request.contextPath}/css/bootstrap.css" rel="stylesheet" />
	<link rel="stylesheet" href="${pageContext.request.contextPath}/css/step-form.css">
	
	 
	<script src="${pageContext.request.contextPath}/js/form.js" type="text/javascript"></script>  
	<script src="${pageContext.request.contextPath}/js/jquery.js" type="text/javascript"></script>  
	<script src="${pageContext.request.contextPath}/js/script.js" type="text/javascript"></script> 
	<%
response.setHeader("Cache-Control","no-cache, no-store, must-revalidate"); //HTTP 1.1
response.setHeader("Pragma","no-cache"); //HTTP 1.0
response.setDateHeader ("Expires", 0);
//prevents caching at the proxy server
%>
</head>
<script type="text/javascript">
function DOADate() 
{
    var UserDate = document.getElementById("doavalid").value;
    var ToDate = new Date();

    if (new Date(UserDate).getTime() <= ToDate.getTime()) 
    {
    	document.getElementById("doavalmsg").innerHTML = "DOA Validity date is not older than current date"; 
    	doavalid.value=";"
    	document.getElementById("doavalid").style="background-color:#ff9694; text-transform: uppercase;"
    }
   
}

function POADate() 
{
    var UserDate = document.getElementById("poavalid").value;
    var ToDate = new Date();

    if (new Date(UserDate).getTime() <= ToDate.getTime()) 
    {
    	document.getElementById("poavalmsg").innerHTML = "POA Validity date is not older than current date"; 
    	poavalid.value=";"
    	document.getElementById("poavalid").style="background-color:#ff9694; text-transform: uppercase;"
    }
   
}

function limitFieldOfWork ()
{
	var max = 255;
	var data = document.getElementById("ProjDetail").value.length;
	document.getElementById("val").innerHTML = max-data;
}
</script>
<body>

<div class="popup" id="pop" style="display: none">
	 <div class="box" >
        <img id="myimage" src="${pageContext.request.contextPath}/img/greentik.webp" alt="" >
        <h3 id="msg"></h3>
        <p id="intest"></p>
        <button type="button" class="but" onclick="hidee();">Download Registration Form</button>
    </div>
</div>



<div class="popup" id="uploadwait" style="display: none">
	 <div class="box" >
       <img src="${pageContext.request.contextPath}/img/upicon.png" alt="" >
        <h3>Please Wait</h3>
        <p>Submitting registration form</p>
        <div class="progress">
 			 <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;background-color: #0d6efd"></div>
		</div>
    </div>
</div>


<div class="content-section">
   <div class="container-fluid border-tb-none">
     <div class="row">
	    <%@ include file="sidemenu.jsp" %>     <!--  To display the side menu on page  -->
	   

  <div class="content__inner">
  
    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12 text-center p-0 mt-3 mb-2">
            <div class="card px-2 pt-4 pb-0 mt-3 mb-3">
                <h1 class="form-title"><strong>Project Registration Form</strong></h1>
                <form id="msform" action="${pageContext.request.contextPath}/api/v1/upload-file"  enctype="multipart/form-data" method="post">
                    <!-- progressbar -->
                    <ul id="progressbar" style="margin-left: 250px;">
                        <!-- <li class="step-one active" id="account"><strong>Basic Details</strong></li> -->
                        <li class="step-two active" id="personal"><strong>Contact Information</strong></li>
                        <li class="step-three" id="payment"><strong>Project Details</strong></li>
                        <li class="step-four" id="confirm"><strong>View Application</strong></li>
                    </ul>
                    <!----<div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>----> 
					<div align="right" style="margin-right: 5ex;">
                    	<label id="dateofreg">vcvcv</label>
                    </div>
                    <script type="text/javascript" >
							var today = new Date();
							var dd = String(today.getDate()).padStart(2, '0');
							var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
							var yyyy = today.getFullYear();
							 
							//today = dd + '-' + m + '-' + yyyy;
							today = dd + '-' + mm + '-' + yyyy;
						
							$("#dateofreg").html("<b>Date : </b>  " + today);
						
						
					</script>
						
					
								<!---- step two----->
	
								
	                    <fieldset class="step-from-two">
			             <div class="myborder rounded-3">
			
							<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Applicant's Reference</h3></legend>
							<div class="row">
								<div class="col-md-6">
			           				<input type="text" class="form-control" id="AppReference" name="appReference" maxlength="100" value=<c:out value="${DAID}"/>  disabled="disabled" style="background-color: #EBEBE4; font-weight:bolder; font-size: 2.5ex;">
			                   		  
			            		</div>
							</div>
			           		
						</div>          
						<div class="myborder rounded-3">
					
							<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Contact Person</h3></legend>
								
								<div class="row">
									<div class="mb-3 col-md-6">
										<input type="text" class="form-control" id="fname" name = "fname" placeholder="First Name " maxlength="50">
										<span id = "fnamemsg" style="color:red">
									</div>
									<div class="mb-3 col-md-6">
										<input type="text" class="form-control" id="lname" name = "lname" placeholder="Last Name" maxlength="50">
										<span id = "lnamemsg" style="color:red">
									</div>
									<div class="mb-3 col-md-6">
							            <input type="text" class="form-control" id="jtitle" name="jtitle" placeholder="Job Title" maxlength="50">
							          	<span id = "jtitmsg" style="color:red">
									</div>
									<div class="mb-3 col-md-6">
								  		<input type="text" class="form-control" id="ContNum"  name="contNum" placeholder="Contact Number(Mobile or Landline)" title="Mobile number(10 Digit) or Landline number(STD Code-Number)" maxlength="15">
								  		<span id = "contnummsg" style="color:red">
									</div>
									 <div class="mb-3 col-md-12">
										 <input type="text" class="form-control" id="email" name="email" placeholder="Official e-Mail Address" maxlength="100">
									  	 <span id = "mailmsg" style="color:red">
									</div>		
							</div> 
						</div>
						<div class="myborder rounded-3">
					
							<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Address for Communication</h3></legend>
									
								 	<!-- <div style="text-align: left; margin-top: 2ex; margin-bottom: 2ex;">
								 		<input type="checkbox" id="sameas" name="sameas" value="same"> <b>Same as Previous </b>
								 		 <span id = "sameasmsg" style="color:red">
								 	</div> -->
									<div class="mb-3 d-flex">
									<legend class="float-none w-auto m-0"> <h3 class="reg-h3 bg-primary select-h3" style="width:max-content;" >Company Name</h3></legend>
									
				            			<input type="text" class="form-control m-0 py-0 mx-3" id="CompName" name ="compName" placeholder="Company Name" maxlength="100" value="<c:out value='${DANAME}'/>"  disabled="disabled" style="margin-right:0px !important; height: fit-content; background-color: #EBEBE4; font-weight:bolder; font-size: 2.5ex;">
				             			 <span id = "comnamemsg" style="color:red">
									</div>
									<div class="mb-3">
				            			<input type="text" class="form-control" id="CompAddress" name ="compAddress" placeholder="Company Address" maxlength="100"> 
				             			 <span id = "compaddmsg" style="color:red">
									</div>
									<div class="mb-3">
				            			<input type="text" class="form-control" id="compostoffice" name ="compostoffice" placeholder="Post Office " maxlength="100">
				             			<span id = "compofficemsg" style="color:red">
									</div>
									<div class="row">
										<div class="mb-3 col-md-6">
											<select name="state" id="state" class="form-select" height="10px">
												<option value="Default">Select State</option>
												
												<c:forEach var="state" items="${state_list}">
												    <option value="${state.stateID}" />${state.stateName}</option>
												</c:forEach>
											</select>
											<span id = "statemsg" style="color:red">
										</div>
										<div class="mb-3 col-md-6">
										
											<input type="text" class="form-control" id="dist" name = "dist" placeholder="Enter City" maxlength="50">
										
											<!-- <select class="form-select" name ="dist" id="dist" aria-label="Default select example">
												<option Value="Default">Select City</option> 
												
											</select> -->
											<span id = "distmsg" style="color:red">
										</div>
										 <div class="mb-3 col-md-6">
										 	<input type="text" class="form-control" id="Pincode" name="pincode" placeholder="Pincode" maxlength="6">
											<span id = "pinmsg" style="color:red">
										 </div>
								
									</div>
								</div>
					           <!--    <input type="button" name="previous" onclick="topFunction()" class="daci previous action-button-previous" value="Previous" /> -->
					                <input type="button" name="back" onclick="goBack()" class="action-button" value="Cancel" id="backbtn" /> 
					                <input type="button" name="reset" onclick="resetForm()" class="action-button" value="Reset" id="backbtn" /> 
					               <input type="button" name="next" onclick="topFunction()" class="daci-2 next action-button" value="Next" id="contactDetailsBtn" /> 
					                    </fieldset>
										<!---- step two end----->
										
										
										<!---- step three----->
					                    <fieldset class="step-from-three">
					                        
						<div class="myborder rounded-3">
					
							<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Organization Approval Details</h3></legend>
							<div class="row">
								<div class="mb-3 col-md-6">
					                <input type="text" class="form-control" id="doadetails" name="doadetails" placeholder="DOA Details" maxlength="100">
					                <span id = "doamsg" style="color:red">
								</div>
								
								<div class="mb-3 col-md-6">
								 	<input type="date" class="form-control" id="doavalid"  name="doavalid" style="text-transform: uppercase;" onchange="DOADate();" ><label id="fileLabel"><b>Select DOA Validity</b></label>
								    <br>
								    <span id = "doavalmsg" style="color:red">
								</div>
							</div>	
							<div>
								<div class="mb-3 col-md-12">
					                <textarea id="doascope" name="doascope" placeholder="DOA Scope" rows="4" cols="20" style="width: 100%" maxlength="500"></textarea>
					                 <span id = "doascopeamsg" style="color:red" /> 	    
					            </div>
					            
					         </div>
					         <div class="row">
								<div class="mb-3 col-md-6">
					                <input type="text" class="form-control" id="poadetails" name="poadetails" placeholder="POA Details" maxlength="100">
					                <span id = "poamsg" style="color:red"/>
					         	</div>
					         	
								<div class="mb-3 col-md-6">
								 	<input type="date" class="form-control" id="poavalid"  name="poavalid" style="text-transform: uppercase;" onchange="POADate();" ><label id="fileLabel"><b>Select POA Validity</b></label>
								    <br><span id = "poavalmsg" style="color:red"/>
								</div>
						
							</div>
							<div>
								<div class="mb-3 col-md-12">
					              	<textarea id="poascope" name="poascope" placeholder="POA Scope" rows="4" cols="20" style="width: 100%" maxlength="500"></textarea>
					              	<span id = "poascopeamsg" style="color:red"/> 	
					          	</div>
					            
					         </div>
						</div>
					
						<div  class="myborder rounded-3">
					
							<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >System Description</h3></legend>
							<div class="row">
							 <div class="mb-3 col-md-12">               
					         	<input type="text" class="form-control" id="AirSys" name="airSys" placeholder="Project Name" maxlength="100">
					         	<span id = "airsysmsg" style="color:red">
					      	 </div>
					        
							<div class="mb-3 col-md-12">
								<textarea id="ProjDetail" name="projDetail" placeholder="Provide details about project" onkeyup="limitFieldOfWork();" rows="4" cols="20" style="width: 100%" maxlength="255" ></textarea> 	
								<span id = "val" style="color:red">255 </span> Characters Remaining <br>
								<span id = "prodetailmsg" style="color:red">
					        </div>
					        <div class="mb-3 col-md-6">               
					         	<input type="text" class="form-control" id="partnum" name="partnum" placeholder="Project Part Number" maxlength="100">
					         	<span id = "partnummsg" style="color:red">
					      	 </div>
							<div class="mb-3 col-md-6">
								<select class="form-select" name ="imtar" id="imtar" aria-label="Default select example">
									<option value="Project IMTAR Sub-Part">Project IMTAR Sub-Part</option>
									<option value="B1 - Aircraft and Helicopter">B1 - Aircraft and Helicopter</option>
									<option value="B2 - Unmanned Air System">B2 - Unmanned Air System</option>
									<option value="B3 - ALM">B3 - ALM</option>
									<option value="B4 - Aero Engines">B4 - Aero Engines</option>
									<option value="C1 - Airborne Store Leading to Issue of Type Approval">C1 - Airborne Store Leading to Issue of Type Approval</option>
									<option value="C2 - Airarmament Stores and Air Launched Weapons Leading to Issue of Type Approval">C2 - Airarmament Stores and Air Launched Weapons Leading to Issue of Type Approval</option>
									<option value="C3 - Material for LOTA">C3 - Material for LOTA</option>
									<option value="C4 - Airbones Stores for LOTA">C4 - Airbornes Stores for LOTA</option>
									<option value="C5 - IMTSOA">C5 - IMTSOA</option>
									<option value="C6 - Software and CEH">C6 - Software and CEH</option>
									
									<option value="D - Modification of Air System Leading to AMTC/SMTC">D - Modification of Air System Leading to AMTC/SMTC</option>
									<option value="E - Modification of Airborne Stores">E - Modification of Airborne Stores</option>
									<option value="K - Indigenous Substitutions of Airborne Stores">K - Indigenous Substitutions of Airborne Stores</option>
									<option value="N - Bought-out Air Systems and Airborne Stores">N - Bought-out Air Systems and Airborne Stores</option>
									<option value="S - CFE/CSE">S - CFE/CSE</option>
									<option value="T - Test Rigs/TTGE">T - Test Rigs and TTGE</option>
									<option value="Others">Others</option>
									
								</select>
								<span id = "imtarmsg" style="color:red">
							</div>
						</div>
						</div>
						<div class="myborder rounded-3">
					
							<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Product Breakdown Structure</h3></legend>
						   	<div class="mb-3 custom-file">		
						<input type="file" class="custom-file-input" id="fileData" name="fileData" accept=".pdf,.PDF">
								<label class="custom-file-label" for="fileData" id="filelabel">Choose File (Max Size: 500MB)</label>
								<span id = "msgcustomFile" style="color:red"> 
<!-- 								<input type="file"  id="fileData" name = "fileData" placeholder="Choose File" class="file validate[required]" > 
 -->							</div>		
				
						</div>
						<p>
					     <div  class="myborder rounded-3">
						
							<legend class="float-none w-auto px-3">  <h3 class="reg-h3 select-h3">Applicant's Declaration</h3></legend>
								
						    	<div style="text-align: left;">
							 		<b>	<input type="checkbox" id="dec1" name="dec1" class="chkboxsize"> &nbsp; &nbsp; I declare that I am authorized by my organization to submit this application to CEMILAC and that all information provided in this application form is correct and  &nbsp;  &nbsp;  &nbsp;&nbsp;  &nbsp;  &nbsp;&nbsp;  &nbsp;  &nbsp;&nbsp;  &nbsp;  &nbsp;complete. <br>
							 	</div>
							 	<div style="text-align: left;">
							 		<input type="checkbox" id="dec2" name="de2" class="chkboxsize">  &nbsp; &nbsp; I acknowledge that I have read and understood the IMTAR-21. <br>
							 	</div>
							 	<br>
						  		<div style="text-align: left;">
							 		<input type="checkbox"  id="dec3" name="dec3" class="chkboxsize">  &nbsp;  &nbsp; I understand that the submission of the application does not entitle certification coverage by CEMILAC.
						
							 	</b>
							 	<br>
							 	<span id = "decmsg" style="color:red">
							 	</div>
									
						</div>	 </p>
								
							<input type="button" name="previous" onclick="topFunction()" class="CRN-1 previous action-button-previous" value="Previous" />
							<input type="button" name="back" onclick="goBack();" class="action-button" value="Cancel" id="backbtn" />  
							<input type="button" name="reset" onclick="resetForm()" class="action-button" value="Reset" id="backbtn" /> 
							
							<input type="button" name="next" onclick="topFunction()" class="CRN-2 next action-button" value="Next" id="companyDetailsBtn" /> 
		                    </fieldset>
							<!---- step three end----->
							
									<!---- step four----->
		                    <fieldset class="step-from-four">
		                        <div class="form-card">
								
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Applicant Reference </h3></legend>
									<div class="mb-3">							
		                               <p id="lblAppRef"> </p>
									</div>
								</div>
							
								<!-- <div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Applicant Information </h3></legend>
									
									<div class="mb-3">
			                            <div class="row">
			                           		<div class="col-md-6">							
			                               		<p id="lblAppName"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblAppNum"> </p>
										   </div>
			                               <div class="col-md-6">							
			                               		<p id="lblCompName"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblCompAdd"> </p>
										   </div>
										    <div class="mb-3">							
			                               		<p id="lblpostoffice"> </p>
										   </div>
										   
									</div>
									
									</div>
								</div> -->
								
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3">Contact Person </h3></legend>
									
									<div class="mb-3">
			                            <div class="row">
			                           		<div class="col-md-6">							
			                               		<p id="lblContPerName"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblJobTit"> </p>
										   </div>
			                               <div class="col-md-6">							
			                               		<p id="lblContNum"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblEmailAdd"> </p>
										   </div>
									</div>
								
								</div>
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3">Address for Communication </h3></legend>
									<div class="mb-3">							
		                               <p id="lblComminComName"> </p>
									</div>
									<div class="mb-3">							
		                               <p id="lblComunAddress"> </p>
									</div>
									<div class="mb-3">							
                             			<p id="lblcomppostoffice"> </p>
									</div>
								</div>
							
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3">Organization Approval Details </h3></legend>
									
									<div class="mb-3">
			                            <div class="row">
			                           		<div class="col-md-6">							
			                               		<p id="lbldoadetails"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lbldoavalid"> </p>
										   </div>
			                               <div class="col-md-6">							
			                               		<p id="lbldoascope"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpoadetails"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpoavalid"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpoascope"> </p>
										   </div>
									</div>
							
								</div>
								
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Air System Description </h3></legend>
									
									<div class="mb-3">
			                            <div class="row">
			                           		<div class="col-md-6">							
			                               		<p id="lblAirSysDes"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblProjDet"> </p>
										   </div>
										   <div class="col-md-6">							
			                               		<p id="lblpartnum"> </p>
										   </div>
			                          	   <div class="col-md-6">							
			                               		<p id="lblIMTAR"> </p>
										   </div>
									</div>
									
									</div>
								</div>
								<div class="myborder rounded-3">
									<legend class="float-none w-auto"> <h3 class="reg-h3 select-h3" >Product Breakdown Structure </h3></legend>
									<div class="mb-3">							
		                           <p id="lblProdBreakStruc"> </p>
									</div>
								</div>
		                      </div>
		                        </div>
		                        <div align="center" style="text-align: center;" id="butDiv"> 
								<input type="button" name="previous" onclick="topFunction()" class="final-pre previous action-button-previous" value="Edit" />
								<input type="button" name="next" onclick="saveRegistrationData()" class="next action-button" value="Submit" />
								<input type="button" name="back" onclick="goBack()" class="action-button" value="Cancel" id="backbtn" />
								
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
     		
         </div>
	
</div>	
</section>   
	 </div>
   </div>
</div>

<%@ include file="footer.jsp" %> 

<script>
$("#pop").hide();


function resetForm()
{
	window.location.href ="${pageContext.request.contextPath}/api/v1/project-registration";
}

function hidee()
{
	$("#pop").hide();
	window.location.href ="${pageContext.request.contextPath}/api/v1/downloadView";
}
function goBack()
{
	if(confirm('All the Filled information is lost!'))
	{

		window.location.href ="${pageContext.request.contextPath}/api/v1/project-details";
	}
}
// When the user clicks on the button, scroll to the top of the document
function topFunction()
{
  document.body.scrollTop = 100;
  document.documentElement.scrollTop = 100;
}
</script>
<script>
document.getElementById("Registration").style = "width: 100%; background-color:#ed4d4d";
// Add the following code if you want the name of the file appear on select
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
 	
  		var  myfile= $( this ).val();
		var ext = myfile.split('.').pop();
		var uploadField = document.getElementById("fileData");

		if(uploadField.files[0].size == 0)  
		{
			//alert("hello");
			//document.getElementById("msgcustomFile").innerHTML = "Selected file has no content, please verify";


		}
		
		if(ext=="pdf" || ext=="PDF")
		{
  			$(this).siblings(".custom-file-label").addClass("selected").html(fileName);
		}
		else
		{
			$(this).siblings(".custom-file-label").addClass("selected").html("Choose");
		}
		
});


function uploadpbsfile()
{
	document.getElementById("uploadwait").style.display = "block";	
	var fileData = $('#msform')[0];
	var multipartData = new FormData(fileData);
	
	var id = 1;

	$.ajax({
		type: "post",
		enctype : 'multipart/form-data',
		url: "${pageContext.request.contextPath}/api/v1/upload-pbsfile?id="+id,
		data: multipartData,
		processData : false, //prevent jQuery from automatically transforming the data into a query string
		contentType : false,
		cache: false,
		success: function(response) 
		{
			if(response == "success") {
				document.getElementById("uploadwait").style.display = "none";	
				document.getElementById("intest").innerHTML = "Registration request submitted successfully";
				document.getElementById("msg").innerHTML = "Success";
				$("#myimage").attr("src","${pageContext.request.contextPath}/img/greentik.webp");
			} 
			else {
				//errRes = response.errors[0];
				alert("Error while uplaoding a file! please try again later");
			}
		},
		error: function() {
			alert("Something Went Wrong ...Please check Connection Status");
		}
	});
	
	
}
/*
function displayCity()
{
	//alert($('#state').val());
	$('#dist').empty();
	
	var stateID = $('#state').val();
	
	//var tt = document.getElementById("state");
	
	//alert(document.getElementById("state").options[document.getElementById("state").selectedIndex].text);
	
	$.ajax({
		type: "get",
		contentType: 'application/json; charset=UTF-8',
		url: "${pageContext.request.contextPath}/api/v1/getCityList?stateID="+stateID,
		cache: false,
		success: function(response) 
		{ 
			
			
			$('#dist').append("<option>"+"Select City"+"</option>");
			for(var i=0; response.length;i++)
			{
				$('#dist').append("<option>"+(response[i].cityName)+"</option>");
			}
			
				
				 
				 
		}
	});	
	
}
*/
function saveRegistrationData() {
	topFunction();

	var formData = {
			
			"appReference": $("#AppReference").val(),
			
			"fname": $("#fname").val(),
			"lname":$("#lname").val(),
			"jtitle":$("#jtitle").val(),
			"contNum":$("#ContNum").val(),
			"email": $("#email").val(),
			"compName": $("#CompName").val(),
			"compAddress": $("#CompAddress").val(),
			"compostoffice": $("#compostoffice").val(),
			"state" :  document.getElementById("state").options[document.getElementById("state").selectedIndex].text,  //$("#state").val(),
			"dist": $("#dist").val(),
			"pincode" : $("#Pincode").val(),
			"doadetails": $("#doadetails").val(),
			"doavalid": $("#doavalid").val(),
			"doascope": $("#doascope").val(),
			"poadetails": $("#poadetails").val(),
			"poavalid": $("#poavalid").val(),
			"poascope": $("#poascope").val(),
			"airSys": $("#AirSys").val(),
			"projDetail" : $("#ProjDetail").val(),
			"partnum" : $("#partnum").val(),	
			"imtar" : $("#imtar").val(),
			"customFile" : $("#fileData").val().split("\\").pop(),
		};



		$.ajax({
			type: "post",
			contentType: 'application/json; charset=UTF-8',
			url: "${pageContext.request.contextPath}/api/v1/project-registration",
			data: JSON.stringify(formData),
			cache: false,
			success: function(response) {
				if(response.code == "success") 
				{
					//alert("Registration Request Submitted Successfully");
					butDiv
					document.getElementById("butDiv").style.display = "none";
					uploadpbsfile();
					document.getElementById("pop").style.display = "block";
					
					
				} else {
					errRes = response.errors[0];
					alert(errRes.message);
				}
			},
			error: function() {
				/*$(".loader").hide();
				$(".sec").show();*/
				alert("error occurred");
			}
		});
	
}

/* function goBack() {
    window.location.hash = window.location.lasthash[window.location.lasthash.length-1];
    //blah blah blah
    window.location.lasthash.pop();
} */
$(document).ready( function () {
	
	
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



