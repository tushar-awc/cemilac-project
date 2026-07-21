$(document).ready(function() 
{
	
	  

  

	/*var current_fs, next_fs, previous_fs; //fieldsets
	var opacity;
	var current = 1;
	var steps = $("fieldset").length;
	
	setProgressBar(current);
	
	$(".next").click(function(){
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//Add Class Active
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;
	
	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	next_fs.css({'opacity': opacity});
	},
	duration: 500
	});
	setProgressBar(++current);
	});
	
	
	$(".previous").click(function(){
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//Remove class active
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show();
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;
	
	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	previous_fs.css({'opacity': opacity});
	},
	duration: 500
	});
	setProgressBar(--current);
	});*/




	//click on steps 

	$(".step-one").click(function() {
		$(".step-two").removeClass("active");
		$(".step-three").removeClass("active");
		$(".step-four").removeClass("active");
		$(".step-from-one").addClass("d-block");
		$(".step-from-one").removeClass("d-none");
		$(".step-from-two").addClass("d-none");
		$(".step-from-two").removeClass("d-block");
		$(".step-from-three").addClass("d-none");
		$(".step-from-three").removeClass("d-block");
		$(".step-from-four").addClass("d-none");
		$(".step-from-four").removeClass("d-block");
	 
	});


	$(".step-two").click(function() {
		if(isValidateBasicDetails())
		{
			$(this).addClass("active");
			$(".step-three").removeClass("active");
			$(".step-four").removeClass("active");
			$(".step-from-two").addClass("d-block");
			$(".step-from-two").removeClass("d-none");
			$(".step-from-one").addClass("d-none");
			$(".step-from-one").removeClass("d-block");
			$(".step-from-three").addClass("d-none");
			$(".step-from-three").removeClass("d-block");
			$(".step-from-four").addClass("d-none");
			$(".step-from-four").removeClass("d-block");
		}
	});

	$(".step-three").click(function() {
		if(isValidateContactDetails())
		{
			$(this).addClass("active");
			$(".step-four").removeClass("active");
			$(".step-two").addClass("active");
			$(".step-from-three").addClass("d-block");
			$(".step-from-three").removeClass("d-none");
			$(".step-from-two").addClass("d-none");
			$(".step-from-two").removeClass("d-block");
			$(".step-from-one").addClass("d-none");
			$(".step-from-one").removeClass("d-block");
			$(".step-from-four").addClass("d-none");
			$(".step-from-four").removeClass("d-block");
	
		}
	});

	$(".step-four").click(function() {
		if(isValidateCompanyDetails())
		{
			$(this).addClass("active");
			$(".step-four").removeClass("active");
			$(".step-two").addClass("active");
			$(".step-three").addClass("active");
			$(".step-from-four").addClass("d-block");
			$(".step-from-four").removeClass("d-none");
			$(".step-from-two").addClass("d-none");
			$(".step-from-two").removeClass("d-block");
			$(".step-from-three").addClass("d-none");
			$(".step-from-three").removeClass("d-block");
			$(".step-from-one").addClass("d-none");
			$(".step-from-one").removeClass("d-block");

			fillPreviewData();
		}
	});


	// step one next button
	$(".dan").click(function() {


		if (isValidateBasicDetails()) {

			$(".step-two").addClass("active");
			$(".step-from-two").removeClass("d-none");
			$(".step-from-two").addClass("d-block");
			$(".step-from-one").addClass("d-none");
			$(".step-from-one").removeClass("d-block");
			$(".step-from-three").addClass("d-none");
			$(".step-from-four").addClass("d-none");
		}
		//$(this).addClass("active");   
	});

	// step two next button
	$(".daci-2").click(function() {

		if (isValidateContactDetails()) {
			$(".step-three").addClass("active");
			$(".step-from-three").removeClass("d-none");
			$(".step-from-three").addClass("d-block");
			$(".step-from-one").addClass("d-none");
			$(".step-from-one").removeClass("d-bloc");
			$(".step-from-two").addClass("d-none");
			$(".step-from-two").removeClass("d-block");
			$(".step-from-four").addClass("d-none");
		}
		//$(this).addClass("active");   
	});

	// step two  previous button
	$(".daci").click(function() {
		$(".step-two").removeClass("active");
		$(".step-from-one").addClass("d-block");
		$(".step-from-one").removeClass("d-none");
		$(".step-from-two").addClass("d-none");
		$(".step-from-two").removeClass("d-block");
		$(".step-from-three").addClass("d-none");
		$(".step-from-three").removeClass("d-block");
		$(".step-from-four").addClass("d-none");
		$(".step-from-four").removeClass("d-block");
		//$(this).addClass("active");   
	});


	// step three next button
	$(".CRN-2").click(function() {

		if (isValidateCompanyDetails()) {
			$(".step-four").addClass("active");
			$(".step-from-four").addClass("d-block");
			$(".step-from-four").removeClass("d-none");
			$(".step-from-one").addClass("d-none");
			$(".step-from-one").removeClass("d-block");
			$(".step-from-two").addClass("d-none");
			$(".step-from-two").removeClass("d-block");
			$(".step-from-three").addClass("d-none");
			$(".step-from-three").removeClass("d-block");
			
			fillPreviewData();
		}
		//$(this).addClass("active");   
	});

	// step three previous button
	$(".CRN-1").click(function() {
		$(".step-two").addClass("active");
		$(".step-three").removeClass("active");
		$(".step-from-one").removeClass("d-block");
		$(".step-from-one").addClass("d-none");
		$(".step-from-two").addClass("d-block");
		$(".step-from-two").removeClass("d-none");
		$(".step-from-three").addClass("d-none");
		$(".step-from-three").removeClass("d-block");
		$(".step-from-four").addClass("d-none");
		$(".step-from-four").removeClass("d-block");
		//$(this).addClass("active");   
	});



	// step four previous button
	$(".final-pre").click(function() {
		/*$(".step-three").addClass("active");
		$(".step-four").removeClass("active");
		$(".step-from-one").removeClass("d-block");
		$(".step-from-one").addClass("d-none");
		$(".step-from-two").removeClass("d-block");
		$(".step-from-two").addClass("d-none");
		$(".step-from-three").addClass("d-block");
		$(".step-from-three").removeClass("d-noe");
		$(".step-from-four").addClass("d-none");
		$(".step-from-four").removeClass("d-block");
		$(".step-two").removeClass("active");
		$(".step-three").removeClass("active");
		$(".step-four").removeClass("active");
		$(".step-from-one").addClass("d-block");
		$(".step-from-one").removeClass("d-none");
		$(".step-from-two").addClass("d-none");
		$(".step-from-two").removeClass("d-block");
		$(".step-from-three").addClass("d-none");
		$(".step-from-three").removeClass("d-block");
		$(".step-from-four").addClass("d-none");
		$(".step-from-four").removeClass("d-block");
		//$(this).addClass("active");   */
		$(".step-two").addClass("active");
		$(".step-three").removeClass("active");
		$(".step-from-one").removeClass("d-block");
		$(".step-from-one").addClass("d-none");
		$(".step-from-two").addClass("d-block");
		$(".step-from-two").removeClass("d-none");
		$(".step-from-three").addClass("d-none");
		$(".step-from-three").removeClass("d-block");
		$(".step-from-four").addClass("d-none");
		$(".step-from-four").removeClass("d-block");
	});

	function setProgressBar(curStep) {
		var percent = parseFloat(100 / steps) * curStep;
		percent = percent.toFixed();
		$(".progress-bar")
			.css("width", percent + "%")
	}

	$(".submit").click(function() {
		return false;
	})

});

$(function() 
{
	
	$("#AppReference").change(function() 
	{
		var appref=document.getElementById("AppReference");
	
		if(!appref.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("refmsg").innerHTML = "Kindly enter valid reference details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("AppReference").focus();
			AppReference.value="";
			document.getElementById("AppReference").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("refmsg").innerHTML = "";
			document.getElementById("AppReference").style="";
		}
	});

/*	
	$("#AppName").change(function() 
	{
		var AppName=document.getElementById("AppName");
	
		if(!AppName.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("appnamemsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("AppName").focus();
			AppName.value="";
			document.getElementById("AppName").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("appnamemsg").innerHTML = "";
			document.getElementById("AppName").style="";
		}
	});
	$("#AppNum").change(function() 
	{
		var AppNum=document.getElementById("AppNum");
	
		if( (AppNum.value.match(/^[1-9]{1}\d{9}$/)) || (AppNum.value.match(/^[0-9]{1}[1-9]{2,5}[-][0-9]*$/)))
		{
			
			document.getElementById("appnummsg").innerHTML = "";
			document.getElementById("AppNum").style="";
		}
		else
		{
			document.getElementById("appnummsg").innerHTML = "Kindly enter valid mobile(10 Digit) or landline number(Ex. STD code - Number)";
			document.getElementById("AppNum").focus();
			AppNum.value="";
			document.getElementById("AppNum").style="background-color:#ff9694;";
		}
	});
	$("#AppCompName").change(function() 
	{
		var AppCompName=document.getElementById("AppCompName");
	
		if(!AppCompName.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("appcomnamemsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("AppCompName").focus();
			AppCompName.value="";
			document.getElementById("AppCompName").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("appcomnamemsg").innerHTML = "";
			document.getElementById("AppCompName").style="";
		}
		  
		if (document.getElementById('sameas').checked)
		{
			CompName.value=document.getElementById("AppCompName").value;	
		} 
		
	}); 
	$("#AppCompAddress").change(function() 
	{
		var AppCompAddress=document.getElementById("AppCompAddress");
	
		if(!AppCompAddress.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("appcompaddmsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("AppCompAddress").focus();
			AppCompAddress.value="";
			document.getElementById("AppCompAddress").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("appcompaddmsg").innerHTML = "";
			document.getElementById("AppCompAddress").style="";
		}
		if (document.getElementById('sameas').checked)
		{
			CompAddress.value=document.getElementById("AppCompAddress").value;
		} 
	});
	$("#Apppostoffice").change(function() 
	{
		
		var Apppostoff=document.getElementById("Apppostoffice");
	
		if(!Apppostoff.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("Apppofficemsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("Apppostoffice").focus();
			Apppostoffice.value="";
			document.getElementById("Apppostoffice").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("Apppofficemsg").innerHTML = "";
			document.getElementById("Apppostoffice").style="";
		}
		if (document.getElementById('sameas').checked)
		{
			compostoffice.value=document.getElementById("Apppostoffice").value;
		} 
	});
	$("#AppState").change(function() 
	{
		var AppState=document.getElementById("AppState");
	
		if($('#AppState').val() == "Default")
		{
			document.getElementById("appstatemsg").innerHTML = "Select State";
			document.getElementById("AppState").focus();
			document.getElementById("AppState").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("appstatemsg").innerHTML = "";
			document.getElementById("AppState").style="";
		}
		if (document.getElementById('sameas').checked)
		{
			state.value=$("#AppState").val();	
		} 
	});
	$("#appdist").change(function() 
	{
		var appdist=document.getElementById("appdist");
	
		if($('#appdist').val() == "Default")
		{
			document.getElementById("appdistmsg").innerHTML = "Select City";
			document.getElementById("appdist").focus();
			document.getElementById("appdist").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("appdistmsg").innerHTML = "";
			document.getElementById("appdist").style="";
		}
		if (document.getElementById('sameas').checked)
		{
			dist.value=$("#appdist").val();	
		} 
	});
	$("#AppPincode").change(function() 
	{
		var AppPincode=document.getElementById("AppPincode");
	
		if(!AppPincode.value.match(/^[1-9]{1}\d{5}$/))
		{
			document.getElementById("apppinmsg").innerHTML = "Enter valid 6 digit pinCode";
			document.getElementById("AppPincode").focus();
			AppPincode.value="";
			document.getElementById("AppPincode").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("apppinmsg").innerHTML = "";
			document.getElementById("AppPincode").style="";
		}
		if (document.getElementById('sameas').checked)
		{
			Pincode.value=document.getElementById("AppPincode").value;	
		} 
	});
	
	*/
	$("#fname").change(function() 
	{
		var fname=document.getElementById("fname");
	
		if (!fname.value.match(/^[A-Za-z\s]+$/))
		{
			document.getElementById("fnamemsg").innerHTML = "Only Alphabets are allowed";
			document.getElementById("fname").focus();
			fname.value="";
			document.getElementById("fname").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("fnamemsg").innerHTML = "";
			document.getElementById("fname").style="";
		}
	});
	$("#lname").change(function() 
	{
		var lname=document.getElementById("lname");
	
		if (!fname.value.match(/^[A-Za-z\s]+$/))
		{
			document.getElementById("lnamemsg").innerHTML = "Only Alphabets are allowed";
			document.getElementById("lname").focus();
			lname.value="";
			document.getElementById("lname").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("lnamemsg").innerHTML = "";
			document.getElementById("lname").style="";
		}
	});
	$("#jtitle").change(function() 
	{
		var jtitle=document.getElementById("jtitle");
	
		if(!jtitle.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("jtitmsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("jtitle").focus();
			jtitle.value="";
			document.getElementById("jtitle").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("jtitmsg").innerHTML = "";
			document.getElementById("jtitle").style="";
		}
	});
	$("#ContNum").change(function() 
	{
		var ContNum=document.getElementById("ContNum");
	
		if( (ContNum.value.match(/^[1-9]{1}\d{9}$/)) || (ContNum.value.match(/^[0]{1}[0-9]{2,5}[-][0-9]*$/)))
																			 
		{
			document.getElementById("contnummsg").innerHTML = "";
			document.getElementById("ContNum").style="";	
		}
		else
		{
			document.getElementById("contnummsg").innerHTML = "Kindly enter valid mobile(10 Digit) or landline number(Ex. STD code - Number)";
			document.getElementById("ContNum").focus();
			ContNum.value="";
			document.getElementById("ContNum").style="background-color:#ff9694;";
			
		}
	});
	/*$("#ContNum").change(function() 
	{
		var ContNum=document.getElementById("ContNum");
	
		if(!ContNum.value.match(/^[1-9]{1}\d{9}$/))
		{
			document.getElementById("contnummsg").innerHTML = "Kindly enter 10 digit valid mobile number";
			document.getElementById("ContNum").focus();
			ContNum.value="";
			document.getElementById("ContNum").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("contnummsg").innerHTML = "";
			document.getElementById("ContNum").style=""
		}
	});
	*/
	
	//**********************
	
	/*$("#ContNum").change(function() 
	{
		var AppNum=document.getElementById("ContNum");
	
		if( (AppNum.value.match(/^[1-9]{1}\d{9}$/)) || (AppNum.value.match(/^[0-9]{1}[1-9]{2,5}[-][0-9]*$/)))
		{
			
			document.getElementById("contnummsg").innerHTML = "";
			document.getElementById("ContNum").style="";
		}
		else
		{
			document.getElementById("contnummsg").innerHTML = "Kindly enter valid mobile(10 Digit) or landline number(Ex. STD code - Number)";
			document.getElementById("ContNum").focus();
			ContNum.value="";
			document.getElementById("ContNum").style="background-color:#ff9694;";
		}
	});*/
	//************************
	
	$("#email").change(function() 
	{
		var email=document.getElementById("email");
	
		if(!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
		{
			document.getElementById("mailmsg").innerHTML = "Kindly enter valid email address";
			document.getElementById("email").focus();
			email.value="";
			document.getElementById("email").style="background-color:#ff9694;";
		}
		else
		{
			document.getElementById("mailmsg").innerHTML = "";
			document.getElementById("email").style="";
		}
	});
/*	$('input[name="sameas"]').on('click', function() 
    {
	
        if (document.getElementById('sameas').checked) 
        {
       		CompName.value=document.getElementById("AppCompName").value;
        	CompAddress.value=document.getElementById("AppCompAddress").value;
        	compostoffice.value=document.getElementById("Apppostoffice").value;
        	state.value=$("#AppState").val();
        	dist.value=$("#appdist").val();
        	Pincode.value=document.getElementById("AppPincode").value;
        	
        	if($('#CompName').val() != "")
        	{
				document.getElementById("CompName").setAttribute('readonly', true);
        		document.getElementById("CompName").style="background-color:#D3D3D3;";
        		
        		document.getElementById("CompAddress").setAttribute('readonly', true);
        		document.getElementById("CompAddress").style="background-color:#D3D3D3;";
        		
        		document.getElementById("compostoffice").setAttribute('readonly', true);
        		document.getElementById("compostoffice").style="background-color:#D3D3D3;";
        		
        		document.getElementById("state").setAttribute('disabled', true);
        		document.getElementById("state").style="background-color:#D3D3D3;";
        		
        		document.getElementById("dist").setAttribute('disabled', true);
        		document.getElementById("dist").style="background-color:#D3D3D3;";
        		
        		document.getElementById("Pincode").setAttribute('readonly', true);
        		document.getElementById("Pincode").style="background-color:#D3D3D3;";
        		
        		document.getElementById("comnamemsg").innerHTML = "";
        		document.getElementById("compaddmsg").innerHTML = "";
        		document.getElementById("compofficemsg").innerHTML = "";
        		document.getElementById("statemsg").innerHTML = "";
        		document.getElementById("distmsg").innerHTML = "";
        		document.getElementById("pinmsg").innerHTML = "";
			}
        	else
        	{
	
				document.getElementById("CompName").style="";
	        	document.getElementById("CompAddress").style="";
	        	document.getElementById("compostoffice").style="";
	        	document.getElementById("state").style="";
	        	document.getElementById("dist").style="";
	        	document.getElementById("Pincode").style="";
	        	document.getElementById("comnamemsg").innerHTML = "";
        		document.getElementById("compaddmsg").innerHTML = "";
        		document.getElementById("compofficemsg").innerHTML = "";
        		document.getElementById("statemsg").innerHTML = "";
        		document.getElementById("distmsg").innerHTML = "";
        		document.getElementById("pinmsg").innerHTML = "";
        		
        		
			}
        	
        	
        }
        else
        {
			CompName.value="";
        	CompAddress.value="";
        	compostoffice.value="";
        	state.value="Default";
        	dist.value="Default";
        	Pincode.value="";
        	
    		document.getElementById("CompName").style="";
        	document.getElementById("CompAddress").style="";
        	document.getElementById("compostoffice").style="";
        	document.getElementById("state").style="";
        	document.getElementById("dist").style="";
        	document.getElementById("Pincode").style="";
        	
    		document.getElementById("CompName").removeAttribute('readonly', true);
			document.getElementById("CompAddress").removeAttribute('readonly', true);
					document.getElementById("compostoffice").removeAttribute('readonly', true);
			document.getElementById("state").removeAttribute('disabled', true);
			document.getElementById("dist").removeAttribute('disabled', true);
			document.getElementById("Pincode").removeAttribute('readonly', true);
        	
		}
    });
    */
    $("#CompName").change(function() 
	{
		var CompName=document.getElementById("CompName");
	
		if(!CompName.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("comnamemsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("CompName").focus();
			CompName.value="";
			document.getElementById("CompName").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("comnamemsg").innerHTML = "";
			document.getElementById("CompName").style=""
		}
	});
	$("#CompAddress").change(function() 
	{
		var CompAddress=document.getElementById("CompAddress");
	
		if(!CompAddress.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("compaddmsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("CompAddress").focus();
			CompAddress.value="";
			document.getElementById("CompAddress").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("compaddmsg").innerHTML = "";
			document.getElementById("CompAddress").style=""
		}
	});
	$("#compostoffice").change(function() 
	{
		var CompPos=document.getElementById("compostoffice");
	
		if(!CompPos.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("compofficemsg").innerHTML = "Kindly enter valid details (Allowed Characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("compostoffice").focus();
			compostoffice.value="";
			document.getElementById("compostoffice").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("compofficemsg").innerHTML = "";
			document.getElementById("compostoffice").style=""
		}
	});
	$("#state").change(function() 
	{
		var state=document.getElementById("state");
	
		if($('#state').val() == "Default")
		{
			document.getElementById("statemsg").innerHTML = "Select State";
			document.getElementById("state").focus();
			document.getElementById("state").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("statemsg").innerHTML = "";
			document.getElementById("state").style="";
		}
	});
	$("#dist").change(function() 
	{
		var dist=document.getElementById("dist");
	
		if($('#dist').val() == "Default")
		{
			document.getElementById("distmsg").innerHTML = "Select City";
			document.getElementById("dist").focus();
			document.getElementById("dist").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("distmsg").innerHTML = "";
			document.getElementById("dist").style="";
		}
	});
	$("#Pincode").change(function() 
	{
		var Pincode=document.getElementById("Pincode");
	
		if(!Pincode.value.match(/^[1-9]{1}\d{5}$/))
		{
			document.getElementById("pinmsg").innerHTML = "Enter valid 6 digit pinCode";
			document.getElementById("Pincode").focus();
			Pincode.value="";
			document.getElementById("Pincode").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("pinmsg").innerHTML = "";
			document.getElementById("Pincode").style=""
		}
	});
	$("#doadetails").change(function() 
	{
		var doadetails=document.getElementById("doadetails");
	
		if(!doadetails.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("doamsg").innerHTML = "Kindly enter valid details (Allowed characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("doadetails").focus();
			doadetails.value="";
			document.getElementById("doadetails").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("doamsg").innerHTML = "";
			document.getElementById("doadetails").style=""
		}
	});
	$("#doavalid").change(function() 
	{
		var doavalid=document.getElementById("doavalid");
	
		if($('#doavalid').val() != "")
		{
			document.getElementById("doavalmsg").innerHTML = "";
			document.getElementById("doavalid").style="text-transform: uppercase;";
			
		}
	});
	$("#doascope").change(function() 
	{
		var doascope=document.getElementById("doascope");
	
		if(!doascope.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("doascopeamsg").innerHTML = "Kindly enter valid details (Allowed characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("doascope").focus();
			doascope.value="";
			document.getElementById("doascope").style = "width: 100%; background-color:#ff9694";
		}
		else
		{
			document.getElementById("doascopeamsg").innerHTML = "";
			document.getElementById("doascope").style = "width: 100%;";
		}
	});
    $("#poadetails").change(function() 
	{
		var poadetails=document.getElementById("poadetails");
	
		if(!poadetails.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("poamsg").innerHTML = "Kindly enter valid details (Allowed characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("poamsg").focus();
			poadetails.value="";
			document.getElementById("poadetails").style = "background-color:#ff9694";
		}
		else
		{
			document.getElementById("poamsg").innerHTML = "";
			document.getElementById("poadetails").style = "";
		}
	});
	$("#poavalid").change(function() 
	{
		var poavalid=document.getElementById("poavalid");
	
		if($('#poavalid').val() != "")
		{
			document.getElementById("poavalmsg").innerHTML = "";
			document.getElementById("poavalid").style="text-transform: uppercase;";
			
		}
	});
	$("#poascope").change(function() 
	{
		var poascope=document.getElementById("poascope");
	
		if(!poascope.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("poascopeamsg").innerHTML = "Kindly enter valid details (Allowed characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("poascope").focus();
			poascope.value="";
			document.getElementById("poascope").style = "width: 100%; background-color:#ff9694";
		}
		else
		{
			document.getElementById("poascopeamsg").innerHTML = "";
		document.getElementById("poascope").style = "width: 100%;";
		}
	});
	$("#AirSys").change(function() 
	{
		var AirSys=document.getElementById("AirSys");
	
		if(!AirSys.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("airsysmsg").innerHTML = "Kindly enter valid details (Allowed characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("AirSys").focus();
			AirSys.value="";
			document.getElementById("AirSys").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("airsysmsg").innerHTML = "";
			document.getElementById("AirSys").style=""
		}
	});
	
	$("#ProjDetail").change(function() 
	{
		var ProjDetail=document.getElementById("ProjDetail");
	
		if(!ProjDetail.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("prodetailmsg").innerHTML = "Kindly enter valid details (Allowed characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("ProjDetail").focus();
			ProjDetail.value="";
			document.getElementById("ProjDetail").style = "width: 100%; background-color:#ff9694";
		}
		else
		{
			document.getElementById("prodetailmsg").innerHTML = "";
		document.getElementById("ProjDetail").style = "width: 100%;";
		}
	});
	$("#imtar").change(function() 
	{
		var imtar=document.getElementById("imtar");
	
		if($('#imtar').val() == "Project IMTAR Sub-Part")
		{
			document.getElementById("imtarmsg").innerHTML = "Select Project IMTAR Sub-Part";
			document.getElementById("imtar").focus();
			document.getElementById("imtar").style="background-color:#ff9694;"
		}
		else
		{
			document.getElementById("imtarmsg").innerHTML = "";
			document.getElementById("imtar").style="";
		}
	});
	$("#partnum").change(function() 
	{
		var partnum=document.getElementById("partnum");
	
		
		if(!partnum.value.match(/^[0-9A-Za-z\s\-\.\,\-\_\&\:\;\/]+$/))
		{
			document.getElementById("partnummsg").innerHTML = "Kindly enter valid details (Allowed characters: 'A-Z,a-z,0-9' '-' '.' ',' '_' '&' ':' ';' '/')";
			document.getElementById("partnum").focus();
			partnum.value="";
			document.getElementById("partnum").style = "width: 100%; background-color:#ff9694";
		}
		else
		{
			document.getElementById("partnummsg").innerHTML = "";
			document.getElementById("partnum").style="";
		}
	});
	
	var myfile="";
	$('#fileData').on( 'change', function() 
	{
  		 myfile= $( this ).val();
   		var ext = myfile.split('.').pop();
   		if(ext=="pdf" || ext=="PDF")
   		{
       		document.getElementById("msgcustomFile").innerHTML = "";
			document.getElementById("fileData").style="";	
   		} 
  		else
  		{
       		
			document.getElementById("msgcustomFile").innerHTML = "Only .pdf Files are Accepted";
			document.getElementById("fileData").focus();
			fileData.value="";
			document.getElementById("fileData").style="background-color:#ff9694;"	
   		}
	});
	var uploadField = document.getElementById("fileData");

	uploadField.onchange = function() {
    if(this.files[0].size > 499897860)
    {
       document.getElementById("msgcustomFile").innerHTML = "File Size Should Not be Greated Than 500MB";
       document.getElementById("fileData").focus();
		fileData.value="";
		document.getElementById("fileData").style="background-color:#ff9694;"	
       this.value = "";
    }
    else
    {
		document.getElementById("msgcustomFile").innerHTML = "";
		document.getElementById("fileData").style="";	
	}
	if(this.files[0].size == 0)
    {
       document.getElementById("msgcustomFile").innerHTML = "Selected file has no content, please verify";
       document.getElementById("fileData").focus();
		fileData.value="";
		document.getElementById("fileData").style="background-color:#ff9694;"	
       this.value = "";
    }
    else
    {
		document.getElementById("msgcustomFile").innerHTML = "";
		document.getElementById("fileData").style="";	
	}
};
	/*
	if(document.getElementById("dec1").checked != true || document.getElementById("dec2").checked != true || document.getElementById("dec3").checked != true) 
	{
		alert("Please check on I agree to proceed.");
		
	}*/
});

function isValidateBasicDetails() {

	var isValid = true;
	
	
	if ($('#AppReference').val() == "") {
		document.getElementById("refmsg").innerHTML = "Enter Applicant Reference";
		document.getElementById("AppReference").focus();
		document.getElementById("AppReference").style = "background-color:#ff9694;";
		isValid = false;
	}
	if ($('#AppName').val() == "") {
		document.getElementById("appnamemsg").innerHTML = "Enter Applicant Name";
		document.getElementById("AppName").focus();
		document.getElementById("AppName").style = "background-color:#ff9694;";
		isValid = false;
	}
	
	if ($('#AppNum').val() == "") {
		document.getElementById("appnummsg").innerHTML = "Enter Applicant Contact Number";
		document.getElementById("AppNum").focus();
		document.getElementById("AppNum").style = "background-color:#ff9694;";
		isValid = false;
	}
	
	if ($('#AppCompName').val() == "") {
		document.getElementById("appcomnamemsg").innerHTML = "Enter Company Name";
		document.getElementById("AppCompName").focus();
		document.getElementById("AppCompName").style = "background-color:#ff9694;";
		isValid = false;
	}
	
	if ($('#AppCompAddress').val() == "") {
		document.getElementById("appcompaddmsg").innerHTML = "Enter Company Address";
		document.getElementById("AppCompAddress").focus();
		document.getElementById("AppCompAddress").style = "background-color:#ff9694;";
		isValid = false;
	}
	if ($('#Apppostoffice').val() == "") {
		document.getElementById("Apppofficemsg").innerHTML = "Enter Post Office";
		document.getElementById("Apppostoffice").focus();
		document.getElementById("Apppostoffice").style = "background-color:#ff9694;";
		isValid = false;
	}
	if ($('#AppState').val() == "Default") {
		document.getElementById("appstatemsg").innerHTML = "Select State";
		document.getElementById("AppState").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#appdist').val() == "Default") {
		document.getElementById("appdistmsg").innerHTML = "Select City";
		document.getElementById("appdist").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#AppPincode').val() == "") {
		document.getElementById("apppinmsg").innerHTML = "Enter Pincode";
		document.getElementById("AppPincode").focus();
		document.getElementById("AppPincode").style = "background-color:#ff9694;"
		isValid = false;
	}
	return isValid;
	
	
}

function isValidateContactDetails() {

	var isValid = true;
	if ($('#AppReference').val() == "") {
		document.getElementById("refmsg").innerHTML = "Enter Applicant Reference";
		document.getElementById("AppReference").focus();
		document.getElementById("AppReference").style = "background-color:#ff9694;";
		isValid = false;
	}
	if ($('#fname').val() == "") {
		document.getElementById("fnamemsg").innerHTML = "Enter First Name";
		document.getElementById("fname").focus();
		document.getElementById("fname").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#lname').val() == "") {
		document.getElementById("lnamemsg").innerHTML = "Enter Last Name";
		document.getElementById("lname").focus();
		document.getElementById("lname").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#jtitle').val() == "") {
		document.getElementById("jtitmsg").innerHTML = "Enter Job Tittle";
		document.getElementById("jtitle").focus();
		document.getElementById("jtitle").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#ContNum').val() == "") {
		document.getElementById("contnummsg").innerHTML = "Enter Contact Number";
		document.getElementById("ContNum").focus();
		document.getElementById("ContNum").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#email').val() == "") {
		document.getElementById("mailmsg").innerHTML = "Enter e-Mail Address";
		document.getElementById("email").focus();
		document.getElementById("email").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#CompName').val() == "") {
		document.getElementById("comnamemsg").innerHTML = "Enter Company Name";
		document.getElementById("CompName").focus();
		document.getElementById("CompName").style = "background-color:#ff9694;";
		isValid = false;
	}
	
	if ($('#CompAddress').val() == "") {
		document.getElementById("compaddmsg").innerHTML = "Enter Company Address";
		document.getElementById("CompAddress").focus();
		document.getElementById("CompAddress").style = "background-color:#ff9694;";
		isValid = false;
	}
	if ($('#compostoffice').val() == "") {
		document.getElementById("compofficemsg").innerHTML = "Enter Post Office";
		document.getElementById("compostoffice").focus();
		document.getElementById("compostoffice").style = "background-color:#ff9694;";
		isValid = false;
	}
	if ($('#state').val() == "Default") {
		document.getElementById("statemsg").innerHTML = "Select State";
		document.getElementById("state").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#dist').val() == "") {
		document.getElementById("distmsg").innerHTML = "Select City";
		document.getElementById("dist").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#Pincode').val() == "") {
		document.getElementById("pinmsg").innerHTML = "Enter Pincode";
		document.getElementById("Pincode").focus();
		document.getElementById("Pincode").style = "background-color:#ff9694;"
		isValid = false;
	}
	return isValid;
}

function isValidateCompanyDetails() 
{
	var isValid = true;
	
/*	if ($('#doadetails').val() == "") {
		document.getElementById("doamsg").innerHTML = "Enter DOA Details";
		document.getElementById("doadetails").focus();
		document.getElementById("doadetails").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#doavalid').val() == "") {
		document.getElementById("doavalmsg").innerHTML = "Enter DOA Validity";
		document.getElementById("doavalid").focus();
		document.getElementById("doavalid").style="background-color:#ff9694; text-transform: uppercase;"
		isValid = false;
	}
	if ($('#doascope').val() == "") {
		document.getElementById("doascopeamsg").innerHTML = "Enter DOA Scope";
		document.getElementById("doascope").focus();
		document.getElementById("doascope").style = "width: 100%; background-color:#ff9694";
		isValid = false;
	}
	
	if ($('#poadetails').val() == "") {
		document.getElementById("poamsg").innerHTML = "Enter POA Details";
		document.getElementById("poadetails").focus();
		document.getElementById("poadetails").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#poavalid').val() == "") {
		document.getElementById("poavalmsg").innerHTML = "Enter POA Validity";
		document.getElementById("poavalid").focus();
		document.getElementById("poavalid").style = "background-color:#ff9694; text-transform: uppercase;"
		isValid = false;
	}
	if ($('#poascope').val() == "") {
		document.getElementById("poascopeamsg").innerHTML = "Enter POA Scope";
		document.getElementById("poascope").focus();
		
		document.getElementById("poascope").style = "width: 100%; background-color:#ff9694";
		isValid = false;
	}   */
	if ($('#AirSys').val() == "") {
		document.getElementById("airsysmsg").innerHTML = "Enter Air System Description";
		document.getElementById("AirSys").focus();
		document.getElementById("AirSys").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#ProjDetail').val() == "") {
		document.getElementById("prodetailmsg").innerHTML = "Enter Projectd Details";
		document.getElementById("ProjDetail").focus();
		document.getElementById("ProjDetail").style = "width: 100%; background-color:#ff9694";
		isValid = false;
	}
	
	if ($('#imtar').val() == "Project IMTAR Sub-Part") 
	{
		document.getElementById("imtarmsg").innerHTML = "Select Project IMTAR Sub-Part";
		document.getElementById("imtar").style = "background-color:#ff9694;"
		isValid = false;
	}
	if ($('#partnum').val() == "") {
		document.getElementById("partnummsg").innerHTML = "Enter Project Part Number";
		document.getElementById("partnum").focus();
		document.getElementById("partnum").style = "background-color:#ff9694";
		isValid = false;
	}
	
	if ($('#fileData').val() == "") {
		document.getElementById("msgcustomFile").innerHTML = "Select File";
		document.getElementById("fileData").focus();
		document.getElementById("fileData").style = "background-color:#ff9694";
		isValid = false;
	}
	if(document.getElementById("dec1").checked != true || document.getElementById("dec2").checked != true || document.getElementById("dec3").checked != true )
	{
		document.getElementById("decmsg").innerHTML = "Select all options";
		isValid = false;
	}
	/*if(document.getElementById("dec1").checked == true && document.getElementById("dec2").checked == true && document.getElementById("dec3").checked == true )
	{
		document.getElementById("decmsg").innerHTML = "";
		isValid = true;
	}*/
	return isValid;
}

function fillPreviewData() {
	
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			
			const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			const d = new Date();
			var m = monthNames[d.getMonth()];
			today = dd + '-' + m + '-' + yyyy;
		
	
			$("#lblAppRef").html("<b>Applicant Reference : </b> : " + $("#AppReference").val());
			
		/*	$("#lblAppName").html("<b>Applicant Name</b> : " + $("#AppName").val());
			$("#lblAppNum").html("<b>Applicant Contact Number</b> : " + $("#AppNum").val());
			
			$("#lblCompName").html("<b>Company Name</b> : " + $("#AppCompName").val());
			$("#lblCompAdd").html("<b>Address</b> : " + $("#AppCompAddress").val() + " " + $("#AppState").val()+","+$("#appdist").val()+" "+$("#AppPincode").val());
			$("#lblpostoffice").html("<b>Post Office</b> : " + $("#Apppostoffice").val());
			*/
			$("#lblContPerName").html("<b>Contact Person Name</b> : " + $("#fname").val()+ " " + $("#lname").val());
			$("#lblJobTit").html("<b>Job Tittle</b> : " + $("#jtitle").val());
			$("#lblContNum").html("<b>Contact Number</b> : " + $("#ContNum").val());
			$("#lblEmailAdd").html("<b>Email</b> : " + $("#email").val());
			
			$("#lblComminComName").html("<b>Company Name : </b>" + $("#CompName").val());
			$("#lblComunAddress").html("<b>Address</b> : " + $("#CompAddress").val() + " "+","+$("#dist").val()+"-"+$("#Pincode").val()+ " ("+ document.getElementById("state").options[document.getElementById("state").selectedIndex].text+")");
			$("#lblcomppostoffice").html("<b>Post Office</b> : " + $("#compostoffice").val());
		
			$("#lbldoadetails").html("<b>DOA Details : </b>" + $("#doadetails").val());
			$("#lbldoavalid").html("<b>DOA Validity : </b>" + $("#doavalid").val());
			$("#lbldoascope").html("<b>DOA Scope : </b>" + $("#doascope").val());
			
			$("#lblpoadetails").html("<b>DOA Details : </b>" + $("#poadetails").val());
			$("#lblpoavalid").html("<b>POA Validity : </b>" + $("#poavalid").val());
			$("#lblpoascope").html("<b>POA Scope : </b>" + $("#poascope").val());
			
			$("#lblAirSysDes").html("<b>Air System Description : </b>" + $("#AirSys").val());
			$("#lblProjDet").html("<b>Project Details : </b>" + $("#ProjDetail").val());
			$("#lblpartnum").html("<b>Project Part Number : </b>" + $("#partnum").val());
			$("#lblIMTAR").html("<b>IMTAR Sub-Parts : </b>" + $("#imtar").val());
			$("#lblProdBreakStruc").html("<b>Product Breakdown Structure  : </b>" + $("#fileData").val().split("\\").pop());
			
}








