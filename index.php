<?php
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
?>
<!DOCTYPE html>
<html lang="en-US">

<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">	
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale = 1.0, user-scalable=0">

  <meta property="og:title" content="HowSecure | What's your password's score?" />
  <meta property="og:description" content="Check your password's score!"/>

	<title>HowSecure | What's your password's score?</title>

  <link rel="stylesheet" id="css" href="css/style.css" type="text/css" media="all">
  <link rel="stylesheet" id="google-webfonts-css" href="css/css.css" type="text/css" media="all">
  <script src="js/howsecure.js"></script>
</head>

<body class="home">
  <div class="container">
    <div id="page-container">
      <div id="logo">
        <a href="http://howsecure.pw/" title="What's your password's score?" class="logo-link">
          <h1 class="logo">HowSecure</h1>
          <h2>is your password?</h2>
        </a>
      </div>
      <div id="content">
        <input type="password" id="password" name="password" autocomplete="off" onkeyup="vCheck(this.value);" placeholder="Enter your password...">
        <table class="table">
          <tr>
            <th colspan="3" class="head">Positive (+)</th>
            <th class="head right" colspan="3">Negative (-)</th>
          </tr>
          <tr>
            <td>Number of characters</td>
            <td class="fixed" id="nLength"></td>
            <td class="fixed" id="nLengthBonus"></td>
            <td>Letters only</td>
            <td class="fixed" id="nAlphasOnly"></td>
            <td class="fixed" id="nAlphasOnlyBonus"></td>
          </tr>
          <tr>
            <td>Uppercase letters</td>
            <td class="fixed" id="nAlphaUC"></td>
            <td class="fixed" id="nAlphaUCBonus"></td>
            <td>Numbers only</td>
            <td class="fixed" id="nNumbersOnly"></td>
            <td class="fixed" id="nNumbersOnlyBonus"></td>
          </tr>
          <tr>
            <td>Lowercase letters</td>
            <td class="fixed" id="nAlphaLC"></td>
            <td class="fixed" id="nAlphaLCBonus"></td>
            <td>Repeated characters</td>
            <td class="fixed" id="nRepChar"></td>
            <td class="fixed" id="nRepCharBonus"></td>
          </tr>
          <tr>
            <td>Numbers</td>
            <td class="fixed" id="nNumber"></td>
            <td class="fixed" id="nNumberBonus"></td>
            <td>Consecutive uppercase letters</td>
            <td class="fixed" id="nConsecAlphaUC"></td>
            <td class="fixed" id="nConsecAlphaUCBonus"></td>
          </tr>
          <tr>
            <td>Symbols</td>
            <td class="fixed" id="nSymbol"></td>
            <td class="fixed" id="nSymbolBonus"></td>
            <td>Consecutive lowercase letters</td>
            <td class="fixed" id="nConsecAlphaLC"></td>
            <td class="fixed" id="nConsecAlphaLCBonus"></td>
          </tr>
          <tr>
            <td>Middle numbers or symbols</td>
            <td class="fixed" id="nMidChar"></td>
            <td class="fixed" id="nMidCharBonus"></td>
            <td>Consecutive numbers</td>
            <td class="fixed" id="nConsecNumber"></td>
            <td class="fixed" id="nConsecNumberBonus"></td>
          </tr>
          <tr>
            <td class="right" colspan="6"><h2>Total score:</h2> <h2 id="nScore"></h2></td>
          </tr>
        </table>
        <table class="table sharer">
          <tr>
            <td class="share">
              <a href="https://twitter.com/intent/tweet?hashtags=howsecure&amp;text=Check+your+password%27s+score%21&amp;url=http%3A%2F%2Fhowsecure.pw%2F" onclick="javascript:window.open(this.href,
                '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;">
                Share on Twitter
              </a>
            </td>
            <td class="share">
              <a href="https://www.facebook.com/sharer/sharer.php?app_id=557903150974660&amp;sdk=joey&amp;u=http%3A%2F%2Fhowsecure.pw%2F&amp;display=popup" onclick="javascript:window.open(this.href,
                '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;">
                Share on Facebook
              </a>
            </td>
            <td class="share">
              <a href="https://plus.google.com/share?url=http%3A%2F%2Fhowsecure.pw%2F" onclick="javascript:window.open(this.href,
                '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;">
                Share on Google+
              </a>
            </td>
          </tr>
        </table>
        <div class="clear"></div>
  		</div>
  	</div>

    <div id="footer">
     	<div class="copyright">Copyright &copy; <?php error_reporting(0); echo date("Y"); ?> HowSecure.pw</div>
    	<div class="clear"></div>
    </div>
  </div>
</body>
</html>
