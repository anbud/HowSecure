/*
 *  HowSecure
 * 
 *  Copyright (C) 2014 - Andrej Budinčević
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *  You should have received a copy of the GNU General Public License
 *  along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */

function $() {
	var aElms = [];
	for (var i=0; i < arguments.length; i++) {
		var elm = arguments[i];
		if (typeof(elm == "string")) 
			elm = document.getElementById(elm);

		if (arguments.length == 1) 
			return elm; 
		
		aElms.push(elm);
	}
	return aElms;
}

function vCheck(passwd) {
	var oScore = $("nScore");
	var nScore=0, nLength=0, nAlphaUC=0, nAlphaLC=0, nNumber=0, nSymbol=0, nMidChar=0, nRequirements=0, nAlphasOnly=0, nNumbersOnly=0, nUnqChar=0, nRepChar=0, nRepInc=0, nConsecAlphaUC=0, nConsecAlphaLC=0, nConsecNumber=0, nConsecSymbol=0, nConsecCharType=0, nSeqAlpha=0, nSeqNumber=0, nSeqSymbol=0, nSeqChar=0, nReqChar=0, nMultConsecCharType=0;
	var nMultRepChar=1, nMultConsecSymbol=1;
	var nMultMidChar=2, nMultRequirements=2, nMultConsecAlphaUC=2, nMultConsecAlphaLC=2, nMultConsecNumber=2;
	var nReqCharType=3, nMultAlphaUC=3, nMultAlphaLC=3, nMultSeqAlpha=3, nMultSeqNumber=3, nMultSeqSymbol=3;
	var nMultLength=4, nMultNumber=4;
	var nMultSymbol=6;
	var nTmpAlphaUC="", nTmpAlphaLC="", nTmpNumber="", nTmpSymbol="";
	var sAlphaUC="0", sAlphaLC="0", sNumber="0", sSymbol="0", sMidChar="0", sRequirements="0", sAlphasOnly="0", sNumbersOnly="0", sRepChar="0", sConsecAlphaUC="0", sConsecAlphaLC="0", sConsecNumber="0", sSeqAlpha="0", sSeqNumber="0", sSeqSymbol="0";
	var nMinpasswdLen = 8;

	if (passwd) {
		nScore = parseInt(passwd.length * nMultLength);
		nLength = passwd.length;
		var apasswd = passwd.replace(/\s+/g,"").split(/\s*/);
		var apasswdLen = apasswd.length;
		
		for (var a=0; a < apasswdLen; a++) {
			if (apasswd[a].match(/[A-Z]/g)) {
				if (nTmpAlphaUC !== "") { if ((nTmpAlphaUC + 1) == a) { nConsecAlphaUC++; nConsecCharType++; } }
				nTmpAlphaUC = a;
				nAlphaUC++;
			}
			else if (apasswd[a].match(/[a-z]/g)) { 
				if (nTmpAlphaLC !== "") { if ((nTmpAlphaLC + 1) == a) { nConsecAlphaLC++; nConsecCharType++; } }
				nTmpAlphaLC = a;
				nAlphaLC++;
			}
			else if (apasswd[a].match(/[0-9]/g)) { 
				if (a > 0 && a < (apasswdLen - 1)) { nMidChar++; }
				if (nTmpNumber !== "") { if ((nTmpNumber + 1) == a) { nConsecNumber++; nConsecCharType++; } }
				nTmpNumber = a;
				nNumber++;
			}
			else if (apasswd[a].match(/[^a-zA-Z0-9_]/g)) { 
				if (a > 0 && a < (apasswdLen - 1)) { nMidChar++; }
				if (nTmpSymbol !== "") { if ((nTmpSymbol + 1) == a) { nConsecSymbol++; nConsecCharType++; } }
				nTmpSymbol = a;
				nSymbol++;
			}

			var bCharExists = false;
			for (var b=0; b < apasswdLen; b++) {
				if (apasswd[a] == apasswd[b] && a != b) { 
					bCharExists = true;
					nRepInc += Math.abs(apasswdLen/(b-a));
				}
			}
			if (bCharExists) { 
				nRepChar++; 
				nUnqChar = apasswdLen-nRepChar;
				nRepInc = (nUnqChar) ? Math.ceil(nRepInc/nUnqChar) : Math.ceil(nRepInc); 
			}
		}
		
		$("nLengthBonus").innerHTML = "+ " + nScore; 
		if (nAlphaUC > 0 && nAlphaUC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaUC) * 2));
			sAlphaUC = "+ " + parseInt((nLength - nAlphaUC) * 2); 
		}
		if (nAlphaLC > 0 && nAlphaLC < nLength) {	
			nScore = parseInt(nScore + ((nLength - nAlphaLC) * 2)); 
			sAlphaLC = "+ " + parseInt((nLength - nAlphaLC) * 2);
		}
		if (nNumber > 0 && nNumber < nLength) {	
			nScore = parseInt(nScore + (nNumber * nMultNumber));
			sNumber = "+ " + parseInt(nNumber * nMultNumber);
		}
		if (nSymbol > 0) {	
			nScore = parseInt(nScore + (nSymbol * nMultSymbol));
			sSymbol = "+ " + parseInt(nSymbol * nMultSymbol);
		}
		if (nMidChar > 0) {	
			nScore = parseInt(nScore + (nMidChar * nMultMidChar));
			sMidChar = "+ " + parseInt(nMidChar * nMultMidChar);
		}
		$("nAlphaUCBonus").innerHTML = sAlphaUC; 
		$("nAlphaLCBonus").innerHTML = sAlphaLC;
		$("nNumberBonus").innerHTML = sNumber;
		$("nSymbolBonus").innerHTML = sSymbol;
		$("nMidCharBonus").innerHTML = sMidChar;
		
		if ((nAlphaLC > 0 || nAlphaUC > 0) && nSymbol === 0 && nNumber === 0) { 
			nScore = parseInt(nScore - nLength);
			nAlphasOnly = nLength;
			sAlphasOnly = "- " + nLength;
		}
		if (nAlphaLC === 0 && nAlphaUC === 0 && nSymbol === 0 && nNumber > 0) { 
			nScore = parseInt(nScore - nLength); 
			nNumbersOnly = nLength;
			sNumbersOnly = "- " + nLength;
		}
		if (nRepChar > 0) {
			nScore = parseInt(nScore - nRepInc);
			sRepChar = "- " + nRepInc;
		}
		if (nConsecAlphaUC > 0) {
			nScore = parseInt(nScore - (nConsecAlphaUC * nMultConsecAlphaUC)); 
			sConsecAlphaUC = "- " + parseInt(nConsecAlphaUC * nMultConsecAlphaUC);
		}
		if (nConsecAlphaLC > 0) {
			nScore = parseInt(nScore - (nConsecAlphaLC * nMultConsecAlphaLC)); 
			sConsecAlphaLC = "- " + parseInt(nConsecAlphaLC * nMultConsecAlphaLC);
		}
		if (nConsecNumber > 0) {
			nScore = parseInt(nScore - (nConsecNumber * nMultConsecNumber));  
			sConsecNumber = "- " + parseInt(nConsecNumber * nMultConsecNumber);
		}

		$("nAlphasOnlyBonus").innerHTML = sAlphasOnly; 
		$("nNumbersOnlyBonus").innerHTML = sNumbersOnly; 
		$("nRepCharBonus").innerHTML = sRepChar; 
		$("nConsecAlphaUCBonus").innerHTML = sConsecAlphaUC; 
		$("nConsecAlphaLCBonus").innerHTML = sConsecAlphaLC; 
		$("nConsecNumberBonus").innerHTML = sConsecNumber;

		var aChars = [nLength,nAlphaUC,nAlphaLC,nNumber,nSymbol];
		var aCharsIds = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol"];
		var aCharsLen = aChars.length;
		for (var c=0; c < aCharsLen; c++) {
			var oBonus = $(aCharsIds[c] + 'Bonus');
			$(aCharsIds[c]).innerHTML = aChars[c];
			if (aCharsIds[c] == "nLength") { var minVal = parseInt(nMinpasswdLen - 1); } else { var minVal = 0; }
			if (aChars[c] >= parseInt(minVal + 1)) { nReqChar++; oBonus.className = "pass"; }
			else { oBonus.className = "fail"; }
		}

		var aChars = [nMidChar];
		var aCharsIds = ["nMidChar"];
		var aCharsLen = aChars.length;
		for (var c=0; c < aCharsLen; c++) {
			var oBonus = $(aCharsIds[c] + 'Bonus');
			$(aCharsIds[c]).innerHTML = aChars[c];
			if (aChars[c] >= parseInt(minVal + 1)) { oBonus.className = "pass"; }
			else { oBonus.className = "fail"; }
		}

		var aChars = [nAlphasOnly,nNumbersOnly,nRepChar,nConsecAlphaUC,nConsecAlphaLC,nConsecNumber];
		var aCharsIds = ["nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber"];
		var aCharsLen = aChars.length;
		for (var c=0; c < aCharsLen; c++) {
			var oBonus = $(aCharsIds[c] + 'Bonus');
			$(aCharsIds[c]).innerHTML = aChars[c];
			if (aChars[c] > 0) { oBonus.className = "warn"; }
			else { oBonus.className = "pass"; }
		}
		
		if (nScore < 0)
			nScore = 0;
		
		oScore.innerHTML = nScore;
	}
	else {
		vInit();
	}
}

function vInit() {
	var aZeros = ["nLength","nAlphaUC","nAlphaLC","nNumber","nSymbol","nMidChar","nAlphasOnly","nNumbersOnly","nRepChar","nConsecAlphaUC","nConsecAlphaLC","nConsecNumber","nLengthBonus","nAlphaUCBonus","nAlphaLCBonus","nNumberBonus","nSymbolBonus","nMidCharBonus","nAlphasOnlyBonus","nNumbersOnlyBonus","nRepCharBonus","nConsecAlphaUCBonus","nConsecAlphaLCBonus","nConsecNumberBonus"];
	var aPass = ["nAlphasOnlyBonus","nNumbersOnlyBonus","nRepCharBonus","nConsecAlphaUCBonus","nConsecAlphaLCBonus","nConsecNumberBonus"];
	var aFail = ["nLengthBonus","nAlphaUCBonus","nAlphaLCBonus","nNumberBonus","nSymbolBonus","nMidCharBonus"];
	for (var i in aZeros) 
		$(aZeros[i]).innerHTML = "0"; 

	for (var i in aPass) 
		$(aPass[i]).className = "pass"; 

	for (var i in aFail)
		$(aFail[i]).className = "fail"; 

	$("password").value = "";
 	$("nScore").innerHTML = "0";
}


window.onload = function() {
	vInit();
};