// ==UserScript==
// @name         teachable-super-admin
// @namespace    http://tampermonkey.net/
// @version      0.2
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
        "top: -3px;",
        "right: 14px;",
        "width: 50px;",
        "height: auto;",
        "background: transparent;",
        "color: white;",
        "z-index: 999;",
        "transition: all 0.4s ease-in-out",
        "}",
        ".au-header {",
        "background-color: #dfdfdf;",
        "height: auto;",
        "padding: 5px 0 2px",
        "}",
        ".au-header h2 {",
        "margin: 0;",
        "font-size: 10px;",
        "color: black;",
        "}",
        ".btn-fw {",
        "width: 100%;",
        "font-size: 10px !important;",
        "}",
        ".au-footer {",
        "background-color: #dfdfdf;",
        "}",
        ".au-dropdown {",
        "top: 57px;",
        "transition: all 0.4s ease-in-out",
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

    // store url on load
    var currentPage = window.location.href;
    var $ = window.jQuery;
    var build = "";
    var editor = [];
    var name = ['css', 'head', 'in', 'out'];
    var alertme;
    var btnCount = 0;

    $(window).on("load", function () {
        setTimeout(function() {
            buildUI();
            eventListeners();
            setTimeout(function() {
                dropUI();
            }, 2000);
        }, 1000);
    });

    // listen for changes
    setInterval(function()
    {
        if (currentPage != window.location.href)
        {
            // page has changed, set new page as 'current'
            currentPage = window.location.href;

            buildUI();
            eventListeners();
            setTimeout(function() {
                dropUI();
            }, 2000);

        }
    }, 500);

    function buildUI() {
        document.title = 'Super Admin';
        build = '<div class="au">';
        build += '<div class="au-header">';
        build += '<h2 class="text-center">Super Admin</h2>';
        build += '</div>';
        build += '<div class="au-body">';
        if (window.location.href.indexOf('/admin/site/code-snippets') > -1 ) {
            // build the buttons on the code-snippets page
            $('.ace_editor').each(function(i) {
                //= $(this).parent().parent().parent().parent().parent().parent().find('span').html().split(' ')[0];
                build += '<a id="btn-' + i + '" href="#" class="btn btn-primary btn-fw">' + name[i] + '</a> ';
                // here we need to get a count of the number of buttons
                btnCount++;
            });
        } else {
            $('.ui-sortable-handle').each(function(j) {
                $(this).find('label').append(': <span id="id-' + j + '">'+ j + '</span>');
                build += '<a id="btn-' + j + '" href="#" class="btn btn-primary btn-fw">' + j + '</a> ';
                btnCount++;
            });
        }
        build += '</div>';
        build += '<div class="au-footer">';
        build += '<p class="text-center"><img src="https://www.filepicker.io/api/file/imoHC0XbSS23ZUomL5qf" width="16px"></p>';
        build += '</div>';
        build += '</div>';
        // Delay the ui draw for 500ms
        $('.admin-content').append(build);
        $('.au').css('top', (-btnCount * 31) + 28);
    }

    function eventListeners() {

        $('.ace_editor').each(function(i) {
            editor[i] = ace.edit(this);
        });

        $('.au a').hover(function() {
            $(this).css('background', 'red');
            $('#id-' + this.text).parent().parent().parent().parent().css('border', '1px solid red');
        }, function() {
            $(this).css('background', 'black');
            $('#id-' + this.text).parent().parent().parent().parent().css('border', 'unset');
        });

        $("a").click(function() {
            $('.dummy').remove();
            var button = this.text;
            console.log('button: ', button);
            // Change the button variable to an index based on the name[] array.
            switch(button) {
                case 'css':
                    button = 0;
                    break;
                case 'head':
                    button = 1;
                    break;
                case 'in':
                    button = 2;
                    break;
                case 'out':
                    button = 3;
                    break;
            }
            alertme = editor[button].getSession().getValue();
            // we have the data in alertme - now we need to do something with it.
            // place the data into a dummy element so we can copy it to the clipboard
            //console.log(alertme);
            $('.au').append('<textarea class="dummy"></textarea>');
            $('.dummy').html(alertme);
            $('.dummy').select();
            document.execCommand("copy");
        });

        $('button').click(function() {
            console.log('clicked edit')
            buildUI();
        });

    }

    function dropUI() {
        $('.au').css({
            'top': '58px',
            'transition': 'all 0.4s ease-in-out'
        });
    }


})();