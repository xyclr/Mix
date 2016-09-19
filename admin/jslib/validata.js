
function isNullByCode(codeid,name){
	var codeValue = eval("document.all."+codeid).value;
	if(codeValue==""){
		ymPrompt.alert(name+"不能为空!");
		eval("document.all."+codeid).focus();
		return false; 
	}
	return true; 
}


/* 
用途：校验ip地址的格式 
输入：strIP：ip地址 
返回：如果通过验证返回true,否则返回false； 

*/ 
function isIP(strIP) { 
if (isNull(strIP)) return false; 
var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式 
if(re.test(strIP)) 
{ 
if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true; 
} 
return false; 
} 

/* 
用途：检查输入字符串是否为空或者全部都是空格 
输入：str 
返回： 
如果全是空返回true,否则返回false 
*/ 
function isNull( str ){ 
if ( str == "" ) return true; 
var regu = "^[ ]+$"; 
var re = new RegExp(regu); 
return re.test(str); 
} 


/* 
用途：检查输入对象的值是否符合整数格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isInteger( str ){ 
var regu = /^[-]{0,1}[0-9]{1,10}$/; 
return regu.test(str); 
} 

/* 
用途：检查输入手机号码是否正确 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkMobile( s ){ 
var regu =/^[1][3][0-9]{9}$/; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
}else{ 
return false; 
} 
} 


/* 
用途：检查输入字符串是否符合正整数格式 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isAgeNumber( s ){ 
	
var regu = /^[0-9]{1,3}$/;  
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
} else { 
return false; 
} 
} 

/* 
用途：检查输入字符串是否为整数 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isNumber( s ){ 
var regu = "^[0-9]+$"; 
var re = new RegExp(regu); 
if (s.search(re) != -1) { 
return true; 
} else { 
return false; 
} 
} 
/* 
用途：检查输入字符串是否是带小数的数字格式,可以是负数 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isDecimal( str ){ 
if(isInteger(str)) return true; 
var regu = "^[0-9]+[\.][0-9]{0,2}$"; 
var re = new RegExp(regu); 
if (re.test(str)) { 
return true; 
} else { 
return false; 
} 
}


/* 
用途：检查输入对象的值是否符合端口号格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isPort( str ){ 
return (isNumber(str) && str<65536); 
} 

/* 
用途：检查输入对象的值是否符合E-Mail格式 
输入：str 输入的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isEmail( str ){ 
var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/; 
if(myReg.test(str)) return true; 
alert("您输入的Email地址格式不正确！请按'xxx@xxx.xxx'格式输入"); 
return false; 
} 

/* 
用途：检查输入字符串是否符合金额格式 
格式定义为带小数的正数，小数点后最多三位 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isMoney( s ){ 
var regu = "^[0-9]+[\.][0-9]{0,2}$";
if(isInteger(s)) return true;  
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
} else { 
return false; 
} 
}

/* 
用途：检查输入字符串是否只由英文字母和数字组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isNumberOrLetter( s ){//判断是否是数字或字母 

var regu = "^[0-9a-zA-Z]+$"; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
}else{ 
return false; 
} 
} 
/* 
用途：检查输入字符串是否只由汉字、字母、数字组成 
输入： 
value：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isChinaOrNumbOrLett( s ){//判断是否是汉字、字母、数字组成 

	var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
	// regu = "/[`~!@#$%^&*()\+{}|\"\'><?\[\]\\;\,\/]/)";
	var re = new RegExp(regu);
	if (re.test(s)) {
		// if(s.match(regu)){
		return true;
	} else {
		return false;
	}
} 

/* 
用途：判断是否是日期 
输入：date：日期；fmt：日期格式 
返回：如果通过验证返回true,否则返回false 
*/ 
function isDate( date, fmt ) { 
if (fmt==null) fmt="yyyyMMdd"; 
var yIndex = fmt.indexOf("yyyy"); 
if(yIndex==-1) return false; 
var year = date.substring(yIndex,yIndex+4); 
var mIndex = fmt.indexOf("MM"); 
if(mIndex==-1) return false; 
var month = date.substring(mIndex,mIndex+2); 
var dIndex = fmt.indexOf("dd"); 
if(dIndex==-1) return false; 
var day = date.substring(dIndex,dIndex+2); 
if(!isNumber(year)||year>"2100" || year< "1900") return false; 
if(!isNumber(month)||month>"12" || month< "01") return false; 
if(day>getMaxDay(year,month) || day< "01") return false; 
return true; 
} 

function getMaxDay(year,month) { 
if(month==4||month==6||month==9||month==11) 
return "30"; 
if(month==2) 
if(year%4==0&&year%100!=0 || year%400==0) 
return "29"; 
else 
return "28"; 
return "31"; 
} 

/* 
用途：字符1是否以字符串2结束 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isLastMatch(str1,str2) 
{ 
var index = str1.lastIndexOf(str2); 
if(str1.length==index+str2.length) return true; 
return false; 
} 


/* 
用途：字符1是否以字符串2开始 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isFirstMatch(str1,str2) 
{ 
var index = str1.indexOf(str2); 
if(index==0) return true; 
return false; 
} 

/* 
用途：字符1是包含字符串2 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isMatch(str1,str2) 
{ 
var index = str1.indexOf(str2); 
if(index==-1) return false; 
return true; 
} 


/* 
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确， 
且结束如期>=起始日期 
输入： 
startDate：起始日期，字符串 
endDate：结束如期，字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkTwoDate( startDate,endDate ) { 
if( !isDate(startDate) ) { 
alert("起始日期不正确!"); 
return false; 
} else if( !isDate(endDate) ) { 
alert("终止日期不正确!"); 
return false; 
} else if( startDate > endDate ) { 
alert("起始日期不能大于终止日期!"); 
return false; 
} 
return true; 
} 



/*
用途：检查输入的电话号码格式是否正确
输入：
strPhone：字符串
返回：
如果通过验证返回true,否则返回false

*/

function checkPhone( strPhone ) { 
var phoneRegWithArea = /^[0-9]{3,15}$/; 
var phoneRegNoArea = /^[0-9]{3,15}$/; 
var prompt = "您输入的电话号码不正确!"
if( strPhone.length > 3 ) {
if( phoneRegWithArea.test(strPhone) ){
return true; 
}else{
//alert( prompt );
return false; 
}
}else{
if( phoneRegNoArea.test( strPhone ) ){
return true; 
}else{
//alert( prompt );
return false; 
}
}
}


/**
检测字符长度,一个汉字按2个字符计算

*/
	
	
function checkStrLen(a_str, len){
	var cnt = 0;
	if(a_str.length == 0 )
		return true;
	for(i=0; i<a_str.length; i++){
		 if (escape(a_str.charAt(i)).length >= 4 ){ 		 	
		 	cnt++; 
		}
		cnt++;
	}
	
	if(cnt > len)
		return false;
	
	return true;
}


function getStrLen(a_str){
var cnt = 0;
if(a_str.length == 0 )
	return cnt;
for(i=0; i<a_str.length; i++){
	 if (escape(a_str.charAt(i)).length >= 4 ){ 		 	
	 	cnt++; 
	}
	cnt++;
}

return cnt;
}

  /** 验证身份证是否合法
checkID

*/  function checkIdcard(idcard){ 
      var Errors=new Array("验证通过!","身份证号码位数不对!","身份证号码出生日期超出范围或含有非法字符!","身份证号码校验错误!","身份证地区非法!");   
      var area={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};   
      var idcard,Y,JYM;   
      var S,M;   
      var idcard_array = new Array();   
      idcard_array = idcard.split("");   
      if(area[parseInt(idcard.substr(0,2))]==null) return Errors[4];    	
	  switch(idcard.length){   
        case 15:   
          if ((parseInt(idcard.substr(6,2))+1900) % 4 == 0 || ((parseInt(idcard.substr(6,2))+1900) % 100 == 0 && (parseInt(idcard.substr(6,2))+1900) % 4 == 0 )){   
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/;//测试出生日期的合法性   
          }   
          else{   
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/;//测试出生日期的合法性   
          }   
          if(ereg.test(idcard)){   
         	// alert(Errors[0]); 
            return true;              
         } else{  
             alert(Errors[2]); 
            return false;  
            } 
        break;   
      case 18:   
        if ( parseInt(idcard.substr(6,4)) % 4 == 0 || (parseInt(idcard.substr(6,4)) % 100 == 0 && parseInt(idcard.substr(6,4))%4 == 0 )){   
          ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;//闰年出生日期的合法性正则表达式   
        }   
        else{   
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;//平年出生日期的合法性正则表达式   
        }   
        if(ereg.test(idcard)){   
          S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3 ;   
          Y = S % 11;   
          M = "F";   
          JYM = "10X98765432";   
          M = JYM.substr(Y,1);  
          if(M.toLowerCase() == idcard_array[17].toLowerCase()){   
            return true;   
          }else{  			 
             alert(Errors[3]+" 该18位身份证号校验位不正确"); 
            return false;   
        }   
        }else { 
          alert(Errors[2]); 
            return false; }  
        break;   
      default:   
         alert(Errors[1]); 
            return false;   
        break;   
      } 
      return true;  
    }  

	
	/**
	*初始化日期。格式"yyyy-MM-dd"
	*/
	function initDate(fieldname)
{ var curdate = new Date();
	var getYear = curdate.getYear();
	var getMonth = curdate.getMonth()+1;
	var getDay = curdate.getDate();

	if(getMonth<=9)
	 getMonth = "0"+getMonth;
	if(getDay<=9)
	 getDay = "0"+getDay; 
	 
	var currentDate = getYear+"-"+getMonth+"-"+getDay;
	document.getElementById(fieldname).value = currentDate;

}



/*
	select all. name is checkbox name.
*/
	function onCheckAll(name){
		var emt = document.getElementsByName(name);
		for(var i = 0;i < emt.length;i++){
			if(!emt[i].checked)
				emt[i].checked = true;
		}			
	}
	
	/*
	reset
	*/
		function htmlReset(){
		document.form[0].reset();
	}

/* 
用途：判断是否为浮点数 
输入：str 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function IsFloat(str)
{
    flag_Dec = 0
    for (ilen = 0; ilen < str.length; ilen++)
    {
        if (str.charAt(ilen) == '.')
        {
            flag_Dec++;
            if (flag_Dec > 1)
                return false;
            else
                continue;
        }
        if (str.charAt(ilen) < '0' || str.charAt(ilen) > '9')
        {
            return false;
        }
    }
    return true;
}

/* 
用途：判断是否为整数 
输入：str 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function is_int(field) {
    var Ret = true;
    var NumStr = "0123456789";
    var chr;

    for (i = 0; i < field.length; ++i)
    {
        chr = field.charAt(i);
        if (NumStr.indexOf(chr, 0) == -1)
        {
            Ret = false;
        }
    }
    if (Number(field) > 2147483647 || Number(field) < 0) {
        Ret = false;
    }
    return(Ret);
}

/*
*用途：去掉字符串里面的空格并返回
*作者：szj
*/
function myTrim(str) {
    //replace(/(^\s*)|(\s*$)/g, "");     去掉字符串里面的所有空格
    return (str.replace(/(^\s*)/g, "")).replace(/(\s*$)/g, "");  //先去掉左边的空格再去掉右边的空格
} 

/*
*预处理经过格式化的金额数据
*将金额中的,去掉
*/
function dealMoneyData(textName){
    var myMoney = $("[@name="+textName+"]").val();
    if(myMoney&&myMoney!=""&&myMoney.indexOf(",")>-1){
	    var myArr = myMoney.split(",");
	    myMoney = "";
	    for(var i = 0;i<myArr.length;i++){
	        myMoney = myMoney + myArr[i];
	    }  
	    $("[@name="+textName+"]").val(myMoney);             
    }
    return true;
}


/**检查输入字符长度**/
function textLimitCheck(thisArea, maxLength){   
	var len = getStrLen(thisArea.value);//thisArea.value.length;

    if (len > maxLength){   

        alert(maxLength/2 + ' 个字限制. \r超出的将自动去除.');   

        var tempStr = "";   

        var areaStr = thisArea.value.split("");   

        var tempLen = 0;   

        for(var i=0,j=areaStr.length;i<j;i++){   

           // tempLen += areaStr[i].length;   
            tempLen += getStrLen(areaStr[i]);
            if(tempLen<=maxLength){   

                tempStr += areaStr[i];   
            }                  
        }              
        thisArea.value = tempStr   

        thisArea.focus();   

    }

}


$.extend($.fn.validatebox.defaults.rules, {

    maxLength: {     
        validator: function(value, param){     
            return param[0] >= value.length;     
        },     
        message: '最多输入{0}位字符.'    
    }
});

