function validate()
{
    // true = form will submit
    // false = form wont submit
    var errflag = true;
    
    //Get form values by id
    var cc_number = document.getElementById("cc_number").value;
    var cc_name = document.getElementById("cc_name").value;
    var cc_month = document.getElementById("cc_month").value;
    var cc_year = document.getElementById("cc_year").value;
    var cc_cvv = document.getElementById("cc_cvv").value;
    
    //Get span tag objects by id
    var span_cc_number = document.getElementById("errmsg_cc_number");
    var span_cc_name = document.getElementById("errmsg_cc_name");
    var span_cc_month = document.getElementById("errmsg_cc_month");
    var span_cc_year = document.getElementById("errmsg_cc_year");
    var span_cc_cvv = document.getElementById("errmsg_cc_cvv");

    
    // ******************************Validate form values*******************************
    
    //*****************Card number validation*****************
    
    // check if 16 digits are present and shows the error messages
    cc_number = cc_number.replace(/\s+/g,'');
    var boolCardFormat = validateFormat(/^\d{16}$/, cc_number);
    if (boolCardFormat === false) {
        // update span tag with format error
        span_cc_number.innerHTML = "Card number must be 16 digits";
        span_cc_number.style.visibility = "visible";
        errflag = false;
    } else {
        // update span tag with no error
        span_cc_number.innerHTML = "";
    }
    
    //***************Card holder name validation***************
    
    // Check if empty
    if (cc_name === "") {
        span_cc_name.innerHTML = "Name cannot be empty";
        span_cc_name.style.visibility = "visible";
        errflag = false;
    } else {
        span_cc_name.innerHTML = "";
        span_cc_name.style.visibility = "visible";
    }
    
    //******************Month date validation******************
    
    // Check for valid month format
    var MonthDateFormat = validateFormat(/^\d{2}$/, cc_month);
    if (MonthDateFormat === true) {
        span_cc_month.innerHTML = "";
        // Check if month is between 1-12
        if (!((cc_month >= 1 && cc_month <= 12))) {
            span_cc_month.innerHTML = "Month: 01-12";
            span_cc_month.style.visibility = "visible";
            errflag = false;
        } else {
            span_cc_month.innerHTML = "";
            span_cc_month.style.visibility = "visible";
        }
    } else {
        span_cc_month.innerHTML = "Format: MM";
        span_cc_month.style.visibility = "visible";
        errflag = false;
    }
    
    //******************Year date validation******************
    
    // Check for valid month format
    var YearDateFormat = validateFormat(/^\d{2}$/, cc_year);
    if (YearDateFormat === true) {
        span_cc_year.innerHTML = "";
        // Check if year is >=2017
        if (!((cc_year >= 17))) {
            span_cc_year.innerHTML = "Year: >= 2017";
            span_cc_year.style.visibility = "visible";
            errflag = false;
        } else {
            span_cc_year.innerHTML = "";
            span_cc_year.style.visibility = "visible";
        }
    } else {
        span_cc_year.innerHTML = "Format: YY";
        span_cc_year.style.visibility = "visible";
        errflag = false;
    }
    
    //********************CVV Validation*******************
    
    var CVVFormat = validateFormat(/^\d{3}$/, cc_cvv);
    if (CVVFormat === false) {
        span_cc_cvv.innerHTML = "CVV : Must be 3 digits";
        span_cc_cvv.style.visibility = "visible";
        errflag = false;
    } else {
        span_cc_cvv.innerHTML = "";
        span_cc_cvv.style.visibility = "visible";
    }
    
    return errflag;
    
}
//*****************Card number validation*****************  
// check if 16 digits are present automatically eliminating all lettes and symbols
function verify_CC_number(value) {
  var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  var matches = v.match(/\d{4,16}/g);
  var match = matches && matches[0] || '';
  var parts = [];
  for (i=0, len=match.length; i<len; i+=4) {
    parts.push(match.substring(i, i+4));
  }
  if (parts.length) {
    return parts.join(' ')
  } else {
    return v
  }
}
//runs in the background  
onload = function() {
  document.getElementById('cc_number').oninput = function() {
    this.value = verify_CC_number(this.value)
  }
}

//*****************Onfocus*****************
//a help message will appear and replace span with a new message for every text field   
function focusMsg(inputTag) {
    
    var inputTags = inputTag.name;
    var Ports = document.getElementsByName("paymentForm")[0];
    
    if (inputTags === "cc_number") {
        
        // Create span element and append msg
        var span_helpMsg_number = document.createElement('span');
        span_helpMsg_number.setAttribute("id", "helpmsg_number");
        span_helpMsg_number.innerHTML = "Enter the 16 digit card number";
        
        // Insert into the DOM
        Ports.insertBefore(span_helpMsg_number, inputTag);
    } else if (inputTags === "cc_name") {
        
        var span_helpMsg_name = document.createElement('span');
        span_helpMsg_name.setAttribute("id", "helpmsg_name");
        span_helpMsg_name.innerHTML = "Enter the cardholder's full name";
        Ports.insertBefore(span_helpMsg_name, inputTag);
         
    } else if (inputTags === "cc_month") {
        
        var span_helpMsg_month = document.createElement('span');
        span_helpMsg_month.setAttribute("id", "helpmsg_month");
        span_helpMsg_month.innerHTML = "Enter the month of expiry in the form MM";
        Ports.insertBefore(span_helpMsg_month, inputTag);
    
    } else if (inputTags === "cc_year") {
        
        var span_helpMsg_year = document.createElement('span');
        span_helpMsg_year.setAttribute("id", "helpmsg_year");
        span_helpMsg_year.innerHTML = "Enter the year of expiry in the form YY";
        Ports.insertBefore(span_helpMsg_year, inputTag);
               
    } else if (inputTags === "cc_cvv") {
        
        var span_helpMsg_cvv = document.createElement('span');
        span_helpMsg_cvv.setAttribute("id", "helpmsg_cvv");
        span_helpMsg_cvv.innerHTML = "Enter the last 3 digit security code located on the back of your card";
        Ports.insertBefore(span_helpMsg_cvv, inputTag);
               
    }
} 

//*****************Onblur*****************
//the help message will be removed when the condition is met 
function blurMsg(inputTag) {
    
    var inputTags = inputTag.name;
    var Ports = document.getElementsByName("paymentForm")[0];
    
    if (inputTags === "cc_number") {
        Ports.removeChild(document.getElementById("helpmsg_number"));
    } else if (inputTags === "cc_name") {
        Ports.removeChild(document.getElementById("helpmsg_name"));
    } else if (inputTags === "cc_month") {
        Ports.removeChild(document.getElementById("helpmsg_month"));
    } else if (inputTags === "cc_year") {
        Ports.removeChild(document.getElementById("helpmsg_year"));
    } else if (inputTags === "cc_cvv") {
        Ports.removeChild(document.getElementById("helpmsg_cvv"))
    }
}

//*****************Onkeypress*****************
//it only allows the specified ASCII Printable Characters (alphabets & spaces)
function lettersOnly(event){
    var char = event.which;
    if(char>31 && char != 32 && (char<65 || char>90) && (char <97 || char>122))
        return false;
}

//*****************Onkeypress*****************
//it only allows the specified ASCII Printable Characters (numbers)
function numbersOnly(event){
    var char = event.which;
    if(char<48 || char>57)
        return false;
}

function validateFormat(pattern, somestring) {
    if (somestring.search(pattern) === -1){
        return false;
    } else {
        return true;
    }
}