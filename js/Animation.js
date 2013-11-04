/**
 * Created by toddshelton on 11/3/13.
 */
// The module pattern, self executing function
var Animation = (function(){
    //public variables
    var wrapper = $('#content-wrapper'),
        logo = $('#introLogo'),
        banner = $('header'),
        infoSec = $('#info'),
        gsImage = $("#gsGuy"),
        gsap = $("#bigGS p"),
        descTextBox = $("#descText"),
        descTextPara = $("#descText p"),
        titleText = $("#titleText"),
        events = $("#events"),
        info = $("#info"),
        fullBar = $(".fullwidthBar"),
        footer = $("footer"),
        browserImages = $("#browserHolder img"),
        masterTimeLine = new TimelineLite({paused: true}),
        windowWidth = $(window).width(),
        windowHeight = $(window).height(),
        halfHeight = +((windowHeight / 2) - (logo.height() /2)),
        halfWidth = ((windowWidth / 2) - (logo.width() /2));

    //this is the function that gets called from the scripts.js file that kicks everything off
    //we also set up the logo's css propterites so we can animate them.
    var _introTimeLine = function(seekTime){
        //$('#introLogo').css('top',((windowHeight / 2) - ($('#introLogo').height() /2)) );
        //$('#introLogo').css('left',((windowWidth / 2) - ($('#introLogo').width() /2)) );

        //we are adding the timelines to the master time line
        //masterTimeLine.add(getIntroTimeLine());
        masterTimeLine.add(getBannerAnimation());
        masterTimeLine.play(seekTime);

    }

    //this is the banner animation
    //we are just building the animation and returning the timeline.
    function getBannerAnimation(){
        var _loadBannerTL = new TimelineMax({onComplete:_buildInWebsite})
            .set($('#introLogo'),{css:{display: "none"}})
            .set(wrapper,{css:{"min-height": "600px"}})
            .set(banner,{opacity: 1, display: "block", top: (windowHeight / 2) - (banner.height() / 2)})
            .add(TweenMax.from(banner, 1, {scale: 0}))
            .add(TweenMax.from(gsImage, 1, {left: 1000, opacity: 0, ease: Elastic.easeOut},.3))
            .add(TweenMax.from(gsap,.5, {css: {left: 1000, opacity: "0"}, ease: Linear.easeOut}));

        descTextPara.each (function(index, elem){

            _loadBannerTL.add(TweenMax.from(elem, .6,{left: 1000, opacity: "0", delay:1}));
        });

        browserImages.each (function(index, elem){
            _loadBannerTL.add(TweenMax.from(elem,.2, {left: 300, top: -300, rotation: 360,  opacity: "0"}));
        });

        _loadBannerTL.add(TweenMax.to(descTextBox, .3, {left: 300, opacity: 0, delay: 1}))
        .add(TweenMax.from(titleText, .3, {left: 600, opacity: 0},.1))
        .addLabel("title")

        .add(TweenMax.from(gsap, .3, {opacity: 0},.10));

        return _loadBannerTL;
    }

    //we set the css properites for the content wrapper and banner so we can animate them.
    var _loadBannerAnimation = function(){

    }

    //this is a different approach for tweening elements using the staggerTo.
    //here we are building in the full website
    var _buildInWebsite = function(){
        TweenMax.staggerTo(fullBar ,.5, {opacity: "1", display: "block"});
        TweenMax.staggerTo(banner, 1,{top: 0});
        TweenMax.staggerTo([events, info, footer], .4,{opacity:1, display: "block", delay:1.1},.5);
    }

    //public API
    return {
        introAnimation:  _introTimeLine
    }
})();