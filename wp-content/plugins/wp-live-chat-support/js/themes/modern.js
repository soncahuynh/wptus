

jQuery(document).on("wplc_minimize_chat", function( e ) {
    wplc_is_chat_open = false;
    jQuery('#wp-live-chat').height("");
    if(jQuery("#wp-live-chat").attr("original_pos") === "bottom_right"){
        jQuery("#wp-live-chat").css("left", "");
        jQuery("#wp-live-chat").css("bottom", "0");
        jQuery("#wp-live-chat").css("right", "20px");
    } else if(jQuery("#wp-live-chat").attr("original_pos") === "bottom_left"){
        jQuery("#wp-live-chat").css("left", "20px");
        jQuery("#wp-live-chat").css("bottom", "0");
        jQuery("#wp-live-chat").css("right", "");
    } else if(jQuery("#wp-live-chat").attr("original_pos") === "left"){
        jQuery("#wp-live-chat").css("left", "20px");
        jQuery("#wp-live-chat").css("bottom", "100px");
    } else if(jQuery("#wp-live-chat").attr("original_pos") === "right"){
        //jQuery("#wp-live-chat").css("left", "");
        //jQuery("#wp-live-chat").css("right", "0");
        //jQuery("#wp-live-chat").css("bottom", "100px");
        //jQuery("#wp-live-chat").css("width", "");
    }
    jQuery('#wp-live-chat').addClass("wplc_close");
    jQuery('#wp-live-chat').removeClass("wplc_open");
    //jQuery("#wp-live-chat").css(jQuery("#wp-live-chat").attr("original_pos"), "100px");
    jQuery("#wp-live-chat").css("top", "");
    jQuery("#wp-live-chat").css("height", "");
    jQuery("#wp-live-chat-1").show();
    jQuery("#wp-live-chat-1").css('cursor', 'pointer');
    jQuery("#wp-live-chat-2").hide();
    jQuery("#wp-live-chat-3").hide();
    jQuery("#wp-live-chat-4").hide();
    jQuery("#wplc_social_holder").hide();
    jQuery("#nifty_ratings_holder").hide();
    jQuery("#nifty_ratings_holder").hide();
    jQuery("#wp-live-chat-react").hide();
    jQuery("#wp-live-chat-minimize").hide();

    jQuery("#wp-live-chat-header").show();

});

jQuery(document).on("wplc_start_chat", function( e ) { 
	jQuery("#wp-live-chat-2-inner").hide("slow");
	/* changed in version 7 as we now allow users to start typing immediately */
    /* jQuery("#wp-live-chat-3").show(); */
    jQuery.event.trigger({type: "wplc_open_chat_1"});
    jQuery.event.trigger({type: "wplc_open_chat_2", wplc_online: wplc_online});

});

jQuery(document).on( "wplc_open_chat_1", function( e ) {
    jQuery('#wp-live-chat').removeClass("wplc_close");
    jQuery('#wp-live-chat').addClass("wplc_open");
    jQuery("#wp-live-chat-react").hide();
    
    //jQuery("#wp-live-chat-header").hide();
    
    Cookies.set('wplc_hide', "", { expires: 1, path: '/' });
    jQuery("#wp-live-chat-minimize").show();




});
jQuery(document).on("wplc_agent_joined", function(e) {

    var temail = '';
    var tname = '';
    var taid = '';
    var ta_tagline = '';
    var ta_bio = '';

    if (typeof e.ndata.other.email !== "undefined") { temail = e.ndata.other.email; }
    if (typeof e.ndata.other.name !== "undefined") { tname = e.ndata.other.name; }
    if (typeof e.ndata.other.aid !== "undefined") { taid = e.ndata.other.aid; }
    if (typeof e.ndata.other.agent_tagline !== "undefined") { ta_tagline = e.ndata.other.agent_tagline; }
    if (typeof e.ndata.other.agent_bio !== "undefined") { ta_bio = e.ndata.other.agent_bio; }


    jQuery(".wplc_no_answer").remove();

    jQuery(".admin_chat_name").html(tname);
    wplc_node_pair_name = tname;
    wplc_agent_name = tname;

    var timageurl = 'http://www.gravatar.com/avatar/'+temail;

    jQuery(".wplc_agent_info").html('');
    if ( ! jQuery( '#agent_grav_'+taid ).length ) {
      jQuery('<p/>', {
        'class': '',
        'style': 'text-align:center;',
        html: '<img class="img-thumbnail img-circle wplc_thumb32 wplc_agent_involved" style="max-width:inherit;" id="agent_grav_'+taid+'" title="'+tname+'" src="'+timageurl+'?s=40" /><br /><span class="wplc_agent_name wplc-color-2">'+tname+'</span>'+ta_tagline+ta_bio
      }).appendTo('.wplc_agent_info');
    }
    var csst = "url(http://www.gravatar.com/avatar/20a6e5c8b75ce87f4896f46ed6f49832?s=60);";

    jQuery("#wplc_chatbox_header_bg").css('background-image', 'url('+timageurl+'?s=380)');
    jQuery("#wplc_chatbox").css("top",
       jQuery("#wplc_chatbox_header").height()+18+"px"
    );
})



jQuery(document).on("wplc_animation_done", function(e) {

    jQuery("#nifty_text_editor_holder").remove(); 
    jQuery("#wplc_msg_notice").remove();
    jQuery("#wp-live-chat-minimize").remove();

    jQuery("#wplc_logo").prependTo("#wplc_chatbox_header");





    if (jQuery("wplc_chatbox").hasClass("wplc-shrink")) {
        /**
         * The +18px is to compensate for the 18px of padding at the bottom of the header box
         */
        jQuery("#wplc_chatbox").css("top",
           jQuery("#wplc_chatbox_header").height()+18+"px"
        );
        jQuery("#wplc_logo").show();
    } else {
        /**
         * The +18px is to compensate for the 18px of padding at the bottom of the header box
         */
        jQuery("#wplc_chatbox").css("top",
            jQuery("#wplc_chatbox_header").height()+18+"px"
        ); 
        jQuery("#wplc_logo").hide();
    }
    jQuery("#wplc_chatbox").css("bottom", "0");
        


});
jQuery(document).on( "wplc_open_chat_2", function( e ) {
	jQuery("#wp-live-chat-1").hide();
	jQuery("#wp-live-chat-2-inner").hide();

	jQuery("#wp-live-chat-2").show();

    if(!jQuery("#wp-live-chat-header").hasClass("active")){
       jQuery("#wplc_chatmsg").focus();
    }

    jQuery("#wp-live-chat-header").addClass("active");

    wplc_chat_status = Cookies.get('wplc_chat_status');
    if (typeof e.wplc_online !== "undefined" && e.wplc_online === true) {
	   jQuery("#wp-live-chat-4").show();
       jQuery("#wplc_social_holder").show();
       jQuery("#nifty_ratings_holder").show();
       jQuery.event.trigger({type: "wplc_animation_done"});
       
       
    }

	jQuery("#wp-live-chat-3").hide();

	jQuery("#wp-live-chat-minimize").css("right","23px");
	Cookies.set('wplc_minimize', "", { expires: 1, path: '/' });



});



var wplc_leave_window_alone = false;

jQuery(document).ready(function() { 

    
    jQuery("body").on("mousewheel", "#wplc_chatbox", function(turn, delta){

        if (delta == 1) {
            /**
             * The +18px is to compensate for the 18px of padding at the bottom of the header box
             */
            jQuery("#wplc_chatbox_header").removeClass("wplc-shrink"); 
            jQuery("#wplc_chatbox").css("top",
                jQuery("#wplc_chatbox_header").height()+18+"px"
            );  
            jQuery("#wplc_logo").show();
      } 
          else {
            // going down



            /**
             * The +18px is to compensate for the 18px of padding at the bottom of the header box
             */
            jQuery("#wplc_chatbox_header").addClass("wplc-shrink"); 
            jQuery("#wplc_chatbox").css("top",
                jQuery("#wplc_chatbox_header").height()+18+"px"
            );    
            jQuery("#wplc_logo").hide();

        }

    });


	//opens chat when clicked on top bar
	jQuery("body").on("click", "#wp-live-chat-header", function() {
       
        
	});


    jQuery("body").on("click", ".wplc_retry_chat", function() {            
        jQuery("#wplc_chatbox").html("");
        jQuery("#wp-live-chat-4").fadeOut();
        Cookies.remove('wplc_chat_status');
        jQuery("#wp-live-chat-2-inner").fadeIn();
        wplc_shown_welcome = false;
    });


    jQuery("body").on("click", "#wp-live-chat-header", function(){
        //if (!wplc_is_chat_open) {

            if (jQuery(this).hasClass('active')) {
                jQuery("#wplc_hovercard").fadeOut("fast");
                jQuery("#wp-live-chat-2").fadeOut("fast");
                jQuery(this).removeClass('active');
                jQuery.event.trigger({type: "wplc_minimize_chat"});
                
            } else {
                jQuery("#wplc_hovercard").fadeIn('fast');
                jQuery(this).addClass('active');

                wplc_chat_status = Cookies.get('wplc_chat_status');
                if (parseInt(wplc_chat_status) == 3 || parseInt(wplc_chat_status) == 2 || parseInt(wplc_chat_status) == 0 || parseInt(wplc_chat_status) == 12 || parseInt(wplc_chat_status) == 10) {
                    jQuery("#speeching_button").click();
                }

            }


            
        //}
    });
    jQuery("body").on("click", "#wplc_hovercard_min", function() {
     jQuery("#wplc_hovercard").fadeOut('fast');
    });
    jQuery("body").on("click", "#speeching_button", function() {
        jQuery("#wplc_hovercard").fadeOut("fast");
        jQuery("#wplc-chat-alert").removeClass('is-active');
        wplc_is_chat_open = true;
        jQuery.event.trigger({type: "wplc_open_chat"});
        
    });
    jQuery("body").on("click", "#wp-live-chat-minimize", function() {

        jQuery("#wp-live-chat-header").removeClass('active');
    })



            


});

!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});