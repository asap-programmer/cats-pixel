

$(function() {

    let nav = $("#header__links");
    let navToggle = $("#navToggle");
    let header = $("#header");
    let intro = $("#about");
    let introH = intro.innerHeight();
    let scrollPos = $(window).scrollTop();

    // Team Carousel
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        navText: [''],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })


    // Smooth scrolling
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let elementId = $(this).data('scroll');
        let elementOffset = $(elementId).offset().top;

        $("html, body").animate({
            scrollTop: elementOffset -100
        }, 100);

    });

    // To animate Logo

    function animate(elem){
        var effect = elem.data("effect");

        if(!effect || elem.hasClass(effect)) return false;
        elem.addClass(effect);

        setTimeout( function(){
            elem.removeClass(effect);
        }, 1000);
    };

    $(".social_ref").mouseenter(function() {
        animate($(this));
    });


    // Shelter tabs
    $(function() {
        $("ul.tabs__caption").on("click", "li:not(.active)", function() {
          $(this)
            .addClass("active")
            .siblings()
            .removeClass("active")
            .closest("div.tabs")
            .find("div.shelter__content")
            .removeClass("active")
            .eq($(this).index())
            .addClass("active");
        });
      });

    //   Burger
    navToggle.add(".menu__item").on("click", function(event) {
        event.preventDefault();
        $('.burger__item').toggleClass("active");

        if (nav.hasClass('show')) {
            nav.animate({
                top: '-400px'
            }, 200);

            $('body').animate({
                top: '0px'
            }, 200)

            nav.removeClass('show');

        } else {
            nav.addClass("show");

            nav.animate({
                top: '100%'
            }, 200);

            $('body').animate({
                top: '400px'
            }, 200)
        }

    });

    // $(".menu__item").on("click", function(event) {
    //     event.preventDefault();
    //     $('.burger__item').toggleClass("active");

    //     if (nav.hasClass('show')) {
    //         nav.animate({
    //             top: '-400px'
    //         }, 200);
    //         nav.removeClass('show');
    //     }
    // });


    // $(function (event) {
    //     let scroll = $(window).scrollTop();
    //     console.log(scroll);
    //     let scrollMy = $('#tv').offset().top;
    //     let test = $('#book').offset().top;

    //     if (scroll = scrollMy - test)
    //     {
    //     }
    // });

    // Fixed header

    let logo = $(".logo");
    let headerLinks = $(".header__links");
    let socialRef = $(".social_ref");
    let web3Fixed = $(".web3");
    let audioFixed = $(".audio");

    $(window).on("scroll load resize", function() {
        introH = intro.innerHeight();

        scrollPos = $(this).scrollTop();
        if (scrollPos > introH) {
            header.addClass("fixed");
            logo.addClass("logo-fixed");
            headerLinks.addClass("header-fixed");
            socialRef.addClass("social_ref-fixed");
            web3Fixed.addClass("web3-fixed");
            audioFixed.addClass("audio-fixed");

        } else {
            header.removeClass("fixed");
            logo.removeClass("logo-fixed");
            headerLinks.removeClass("header-fixed");
            socialRef.removeClass("social_ref-fixed");
            web3Fixed.removeClass("web3-fixed");
            audioFixed.removeClass("audio-fixed");

        }
    });



    //Book effect

    let book = $(".pages");
    // let shadow = $(".shadow");
    let cuurentPage = 0;
    var pages = document.getElementsByClassName('page');
    for(var i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (i % 2 === 0) {
            page.style.zIndex = (pages.length - i);
        }
    }

    for(var i = 0; i < pages.length; i++) {

        var page = pages[i];
        page.pageNum = i + 1;
        page.onclick=function() {
            if (this.pageNum % 2 === 0 && this.pageNum  == cuurentPage) {
                if (this.pageNum === pages.length) {
                    book.addClass("bookCenter");
                    book.removeClass("bookRight");
                }

                if (this.pageNum === 2) {
                    book.removeClass("bookCenter");
                    // shadow.addClass("show__shadow");
                }
                cuurentPage = this.pageNum - 2;
                this.classList.remove('flipped');
                this.previousElementSibling.classList.remove('flipped');
            }
            else if ( this.pageNum  == (cuurentPage + 1)) {
                if (this.pageNum === 1) {
                    book.addClass("bookCenter");
                    // shadow.removeClass("show__shadow");
                }
                if (this.pageNum == (pages.length - 1)) {
                    book.addClass("bookRight");
                    book.removeClass("bookCenter");
                }
                cuurentPage = this.pageNum + 1;
                this.classList.add('flipped');
                this.nextElementSibling.classList.add('flipped');
            }
        }
    }


    // Panel

    $(function(){
        $('.panel-right').tabSlideOut({
            tabHandle: '.handle-right',
            imageHeight: '100%',
            imageWidth: '40px',
            tabLocation: 'right',
            speed: 400,
            action: 'click',
            topPos: '0',
            fixedPosition: false
        });
    });
    $(function(){
        $('.panel-left').tabSlideOut({
            tabHandle: '.handle-left',
            imageHeight: '100%',
            imageWidth: '40px',
            tabLocation: 'left',
            speed: 400,
            action: 'click',
            topPos: '0',
            fixedPosition: false
        });
    });

    $("team__card").hover(function() {
        if ($('team__img').addClass('team__img-wider')) {

        }
    });

    $('.rank__card').hover(
        function() {
          $('.rank__img').addClass('rank__img-wider');
        }, function() {
          $('.rank__img').removeClass('rank__img-wider');
        }
      );


    // Mint Button

    var accounts = null;
    var contract = null;
    // var connectBtn = $('.connect');
    // var mintBtn = $('.mint');
    const ADDRESS = "0x6FA3Be2b3da44a681fe56aFD7c8B0e0f1139e450";

    // (async () => {
    //     if (window.ethereum) {
    //         await window.ethereum.send('eth_requestAccounts');
    //         window.web3 = new Web3(window.ethereum);
    //         var accounts = await web3.eth.getAccounts();
    //         account = accounts[0];
    //         contract = new web3.eth.Contract(ABI, ADDRESS);

    //         document.getElementById('mint').onclick = () => {
    //             contract.methods.mint().send({from: account, value: "0"});
    //         }
    //     }
    // })();

    const connect = async() => {
        if (window.ethereum) {
            await window.ethereum.send('eth_requestAccounts');
            window.web3 = new Web3(window.ethereum);
            var accounts = await web3.eth.getAccounts();
            account = accounts[0];
        }

    };

    const mint = async() => {
        contract = new web3.eth.Contract(ABI, ADDRESS);
        contract.methods.mint().send({from: account, value: "0"});
    };


    // document.getElementById('connect').onclick = () => {
    //     console.log("conn");
    //     connect();
    //     // connectBtn.addClass('hide');
    //     // mintBtn.addClass('show');
    // }

    // document.getElementById('mint').onclick = () => {
    //     mint();
    // }

    $(document).ready(function() {
        $(".audio .fa-play-circle-o").on('click', function() {
            $(this).hide();
            $(".fa-pause-circle-o").fadeIn();
            $("#audio")[0].play();
        });

        $(".audio .fa-pause-circle-o").on('click', function() {
            $(this).hide();
            $(".fa-play-circle-o").fadeIn();
            $("#audio")[0].pause();
        });
    });

    $(document).ready(function() {
        $(".audio-mobile .fa-play-circle-o").on('click', function() {
            $(this).hide();
            $(".fa-pause-circle-o").fadeIn();
            $("#audio")[0].play();
        });

        $(".audio-mobile .fa-pause-circle-o").on('click', function() {
            $(this).hide();
            $(".fa-play-circle-o").fadeIn();
            $("#audio")[0].pause();
        });
    });

    $(document).ready(function() {
        $(".connect__text").on('click', function() {
            $(this).addClass("hide");
            connect();
            $(".mint__text").fadeIn().css("display","block");;
        });

        $(".mint__text").on('click', function() {
            mint();
        });
    });

    // For mobile
    $(document).ready(function() {
        $(".connect__text-smart").on('click', function() {
            $(this).addClass("hide");
            connect();
            $(".mint__text-smart").fadeIn().css("display","flex");;
        });

        $(".mint__text-smart").on('click', function() {
            mint();
        });
    });



});