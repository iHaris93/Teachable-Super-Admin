// ==UserScript==
// @name         Teachable Admin Upgrade
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Script to upgrade some of Teachable's admin functions
// @author       Tom Lorimer
// @match        *://*.purplehippo.io/admin/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_log
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    var css = [
        ".au {",
        "position: fixed;",
        "top: 10px;",
        "right: 50px;",
        "width: 70px;",
        "height: auto;",
        "background: red;",
        "color: white;",
        "border: 1px solid black;",
        "z-index: 1000;",
        "}",
        ".au-header {",
        "background-color: #dfdfdf;",
        "height: auto;",
        "padding: 5px 0 2px",
        "}",
        ".au-header h2 {",
        "margin: 0;",
        "font-size: 14px;",
        "color: black;",
        "}",
        ".btn-fw {",
        "width: 100%",
        "}"
    ].join("\n");

     if (typeof GM_addStyle != "undefined") {
         GM_addStyle(css);
     } else {
         var node = document.createElement("style");
         node.type = "text/css";
         node.appendChild(document.createTextNode(css));
         var heads = document.getElementsByTagName("head");
         if (heads.length > 0) {
             heads[0].appendChild(node);
         } else {
             // no head yet, stick it whereever
             document.documentElement.appendChild(node);
         }
    };

    var $ = window.jQuery;
    var build = "";
    var editor = [];
    var alertme;

    $(window).on('load', function () {
        buildUI();
        eventListeners();
    });

    // store url on load
    var currentPage = window.location.href;

    // listen for changes
    setInterval(function()
                {
        if (currentPage != window.location.href)
        {
            // page has changed, set new page as 'current'
            currentPage = window.location.href;

            buildUI();
            eventListeners();
        }
    }, 500);

    function buildUI() {
        document.title = 'Super Admin';
        build = '<div class="au">';
        build += '<div class="au-header">';
        build += '<h2 class="text-center">Super Admin</h2>';
        build += '</div>';
        build += '<div class="au-body">';
        // build the buttons
        $('.ace_editor').each(function(i) {
            build += '<a id="btn-' + i + '" href="#" class="btn btn-primary btn-fw">' + i + '</a> ';
        });
        $('.ui-sortable-handle').each(function(j) {
            build += '<a id="btn-' + j + '" href="#" class="btn btn-primary btn-fw">' + j + '</a> ';
        });
        build += '</div>';
        build += '</div>';
        $('.admin-content').append(build);
    }

    function eventListeners() {

        $('.ace_editor').each(function(i) {
            editor[i] = ace.edit(this);
        });

        $("a").click(function() {
            var button = this.text;
            alertme = editor[button].getSession().getValue();
            // we have the data in alertme - now we need to do something with it.
            console.log(alertme);
        });

        $('button').click(function() {
            console.log('clicked edit')
            buildUI();
        });

    }


})();