'use strict';


var arCurrPr = {
	'USD': 2,
	'EUR': 2,
	'RUB': 2,
	'BTC': 8,
	'ETH': 8,
	'BTE': 8,
	'BTA': 6,
	'BTB': 8,
	'BCH': 8,
	'LTC': 8,
	'DAA': 8,
	'UST': 2,
	'XRP': 6,
	'DOG': 6,
};


$(document).ready(function() {

    //$('.smslct').SumoSelect();

    $('.SlectBox').SumoSelect();

    $('.perfect-scroll').each(function(idx) {
        $(this).addClass('perfect-scroll--' + idx);
        var ps = new PerfectScrollbar('.perfect-scroll--' + idx);
    });

    //change language flag
     var flag = $('.header-option').find('img');
     var flagImages = {
         en: 'en.svg',
         ru: 'ru.svg',
         ge: 'ge.svg',
         es: 'es.png',
         fr: 'fr.svg',
         cn: 'cn.png',
		 ua: 'ua.png',
		 mx: 'mx.png',
		 pa: 'pa.png'
     };

    $('.SumoSelect').click(function(){
      $(this).toggleClass('open');
    });
    $('.SumoSelect li').click(function(){
      var selected = $(this).data('lang'),
      urlPage = $(this).data('urlpage');
      if (selected) {
         flag.attr('src', '/style/images/' + flagImages[selected]);
      }
      if(urlPage) {
         window.location.href = urlPage;
      }
    });


    function mobileSectionSlider() {
        var windowWidth = $(window).width();
        var $carousel = $('.product-items').not('.slick-initialized');
        var isInitialized = $carousel.hasClass('slick-initialized');

        $carousel.slick({
          // mobileFirst: true,

          responsive: [
            {
                breakpoint: 9999,
                settings: "unslick"
            },
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
                centerMode: true,
                centerPadding: '20%',
                arrows: false
              }
            }
          ]
        });

    }
    mobileSectionSlider();

    //Map tabs
    $('.btn--menu').click( function() {
        var height = window.innerHeight;
        $(this).toggleClass('open');
        $('.page').toggleClass('page--menu-opened');
        if($('.page').hasClass('page--menu-opened')){
          $('.page').css('height', height);
        } else {
          $('.page').css('height', 'auto');
        }
    });

    $(window).resize(function() {
        mobileSectionSlider();
    });

    $('.contacts-tabs button').click(function(){
      var tab_id = $(this).attr('data-tab');

      $('.contacts-tabs button').removeClass('active');
      $('.contacts-map iframe').removeClass('active');
      $('.contacts-item').removeClass('active');

      $('.contacts-item[data-tab="' + tab_id + '"]').addClass('active');
      $(this).addClass('active');
      $("#"+tab_id).addClass('active');
    })

    //Open poup
    $('.btn--msg').click( function() {
      $('.popup').addClass('open');
    });

    //Close popup


    //Popup tabs
    $('.popup-questions ul li').click(function(){
        var tab_id = $(this).attr('data-question');

        $('.popup-questions ul li').removeClass('active');
        $('.popup-tab').removeClass('active');

        $(this).addClass('active');
        $("#"+tab_id).addClass('active');
    });

    function setDirectionSelectView() {
        var $select = $('.SlectBox--direction');

        $select.each(function() {

            var $options = $(this).find('option');

            $options.each(function(idx) {

                addIcon($(this), idx);

            });

            addIcon($(this));

            $(this).on('change', function() {
                $(this).closest('.SumoSelect').find('.SumoSelect-icon').remove();
                addIcon($(this));
            });

        });

        function addIcon(selector, index) {
            if (index === undefined) {
                var self = selector;
                selector = selector.find('option[value="' + selector.val() +  '"]');
            }

            var icon = selector.data('icon');
            var color = selector.data('color');

            var $element = $('<span><i></i></span>');
            $element.find('i').addClass(icon);
            $element.css('background-color', 'rgba(' + color + ', 1)');

            if (index === undefined) {
                $element.addClass('SumoSelect-icon');
                self.closest('.SumoSelect').find('.CaptionCont').prepend($element);
                self.closest('.SumoSelect').find('.optWrapper').css('border-color', 'rgba(' + color + ', .14)');
                self.closest('.SumoSelect').find('.CaptionCont').css('border-color', 'rgba(' + color + ', 1)');
                self.closest('.SumoSelect').find('.CaptionCont > label').css('color', 'rgba(' + color + ', 1)');
            } else {
                var $label = selector.closest('.SumoSelect').find('li.opt label');
                $($label[index]).prepend($element);
            }

        }

    }
    setDirectionSelectView();

    function setTableHeaderWidth() {
        var $table = $('.subtable');

        $table.each(function() {
            var $td = $(this).find('table tr:first-child td');

            $td.each(function(idx) {
                var i = idx + 1;
                var width = $(this).outerWidth();

                $(this).closest('.subtable').find('.subtable-header div:nth-child(' + i + ')').css({
                    flexBasis: width + 'px',
                    maxWidth: width + 'px'
                });
            });
        });
    }
    setTableHeaderWidth();


    function toggleChat() {
        $('#chat-open').on('click', function() {
            var $button = $(this);
            $button.addClass('hide');
            $('.subcol--chat').addClass('show');
            $('.subcol--chart').addClass('slim');
            $('.chat-container').addClass('show');
            setTimeout(function() {
                $('.chat-container').show();
            }, 50);
            setTimeout(function() {
                $button.hide();
            }, 350);
        });

        $('.chat-close').on('click', function() {
            var $button = $('#chat-open');
            $button.show();

            $('.subcol--chat').removeClass('show');
            $('.subcol--chart').removeClass('slim');
            $('.chat-container').removeClass('show');

            setTimeout(function() {
                $button.removeClass('hide');
            }, 150);

            setTimeout(function() {
                $('.chat-container').hide();
            }, 350);
        });
    }
    toggleChat();

    function orderTabs() {
        $('.order-calctabs').on('click', 'button', function() {
            var $button = $(this);
            var id = $button.attr('id');
            var $buttons = $('.order-calctabs button');
            var $forms = $('form.order-calc');
            var $form = $('form[data-id="' + id + '"]');

            $forms.removeClass('current');
            $buttons.removeClass('current');

            $form.addClass('current');
            $button.addClass('current');


        });

        $('.order-tabs').on('click', 'button', function() {
            var $button = $(this);
            var $buttons = $button.parent().find('button');
            var id = $button.attr('id');

            var $order = $button.closest('.order');
            var $contents = $order.find('[data-id]:not(.order-calc)');
            var $content = $order.find('[data-id="' + id + '"]');

            $contents.removeClass('current');
            $buttons.removeClass('current');

            $content.addClass('current');
            $button.addClass('current');

            setTableHeaderWidth();
        });
    }
    orderTabs();

    $(window).resize(function() {
        setTableHeaderWidth();
    });

    //Scroll to div
    $('.article-nav a').click( function(e) {
      e.preventDefault();
      $('.article-nav li').removeClass('active');
      $(this).parent().addClass('active');

      var anchor = $(this).attr('href');
      var block = $(anchor);
      var sectionTopPos = block.offset().top - 50 + "px";

      $('body, html').animate({
        scrollTop: sectionTopPos
      }, 500);

    });

    var someWidth = $(window).width();

    function resize() {
      $(window).on('resize', function() {
        someWidth = $(window).width();
        parallax();
      });
      return someWidth;
    }
    resize();


    function parallax() {
      if (someWidth > 965) {
        $('.js-img-parallax').each(function(){
          var $bgobj = $(this);
          var direction = $bgobj.data('direction')
          $(window).scroll(function() {

            if (direction === 1) {

              var yPos = (($(window).scrollTop() + $(window).height()) / $bgobj.data('speed'));
            } else {
              var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
            }

            $bgobj.css({ 'transform': 'translateY(' + yPos + 'px)' });
          });
        });

      } else {
        return false;
      }
    }

    parallax();

    // Position fixed
    // function fix_scroll() {
    //     var s = $(window).scrollTop();
    //     var height = $('.protection-nav').offset().top;

    //     console.log(s, height);
    //     var distance = (height - s);
    //     var divHeight = $('.protection-nav').height();

    //     var fixedBlock = $('.protection-nav');
    //     if(s >= height - 30) {
    //         fixedBlock.addClass('fixed');
    //         // fixedBlock.css('top', s + 30 + 'px');
    //     } else if (s <= height - 30) {
    //         fixedBlock.removeClass('fixed');
    //     }

    //     // fixedBlock.css('top',(s + 20) + 'px');

    //   }fix_scroll();


    var lastItemId,
      navBlock = $(".protection-nav"),
      navBlockHeight = navBlock.outerHeight(),
      navItems = navBlock.find("a"),

      scrollItems = navItems.map(function() {
        var item = $($(this).attr("href"));
        if (item.length) {
          return item;
        }
      });


    $(window).scroll(function() {
      var fromTop = $(this).scrollTop() + 58;
        if (!scrollItems.length) {
        return;
      }
      var cur = scrollItems.map(function() {
        if ($(this).offset().top < fromTop)
          return this;
      });

      cur = cur[cur.length - 1];


     var id = cur && cur.length ? cur[0].id : scrollItems[0].attr('id');
      if (lastItemId !== id) {
        lastItemId = id;
        navItems
          .parent().removeClass("active")
          .end().filter("[href='#" + id + "']").parent().addClass("active");
      }
    });

    var pos = $('.article-nav');
    if (pos.length){
        pos = pos.offset().top;
    }

    $(window).on('scroll',function(e) {
        var s = $(window).scrollTop() + 90;
        var fixedBlock = $('.article-nav');
        if (!fixedBlock.length) {
            return;
        }
        var curPos = $('.article-nav').offset().top;
        //console.log(s, curPos, $(document).height());

        var bottomHeight = fixedBlock.closest('.section').next().offset().top;
        var rawHeight = $(document).height() - bottomHeight + fixedBlock.height();
        //console.log('test', bottomHeight);




        if(s >= pos) {

            if (s >= bottomHeight - fixedBlock.height() - 80) {
                fixedBlock.removeClass('fixed').addClass('absolute');
            }
            else {
                fixedBlock.removeClass('absolute').addClass('fixed');
            }
        } else {
            fixedBlock.removeClass('absolute').removeClass('fixed');
        }
    });



    var attachedFiles = [];

    $('.inputfile').each( function() {
        function handleFileSelect(evt) {
            var files = evt.target.files;
            for (var i = 0, f; f = files[i]; i++) {
                var button = $('<button class="btn--delete"><i class="icon-close"></i></button>');
                button.click( function(e) {
                    e.preventDefault();
                    $(this).parent().remove();
                });
                var output = '<li><span>' + f.name +'</span>'+ button[0].outerHTML +'</li>';
            }

            attachedFiles.push(output);
            $('.files ul').html(attachedFiles.join(''));
        };

        //Delete file
        $('.btn--delete').click( function(e) {
            e.preventDefault();
            $(this).parent().remove();
        });

        $('#file').on('change', handleFileSelect);

    });
    var forms = $('form');
    forms.each(function(){
        checkRequiredFields($(this));
    });
    $('input[required]').on('input change', function(){
        checkRequiredFields($(this).closest('form'));
    });
   function checkRequiredFields (form) {
        var reqInputs = form.find('input[required]');
        var emptyFields = false;
        var submitBtn = form.find('[type="submit"]');
        reqInputs.each(function(){
            if (!$(this).val()) {
                emptyFields = true;
                return false;
            }
            if ($(this).attr('type') === 'checkbox') {
                if ($(this).prop('checked') === false) {
                     emptyFields = true;
                return false;
                }
            }
        });
        if (emptyFields) {
            submitBtn.prop('disabled', true);
        } else {
            submitBtn.prop('disabled', false);
        }
   }

   initPopUps();

   function initPopUps() {
    $('[data-target="popup-btn"]').click(function(event){

        event.preventDefault();
        $('[data-target="popup"]').removeClass('open');
        $('body, html').css('overflow', 'hidden');
        var targetPopup = $('[data-target="popup"][data-popup="' + $(this).data('popup') + '"]');
        targetPopup.addClass('open');
        var contentTrg = $(this).data('content');
        if(contentTrg == 'content-2'){
           $.ajax({
             url: '/ru/ajax/public/report.php',
             dataType: "text",
             type: "POST",
             data: {type: "modules"},
             cache: false,
             success: function(data)
             {
                $('#teg-modules').html(data);
             },
             error: function()
             {
             }
          });
       }
        if ($(this).data('content')) {
           console.log($(this).data('content'));
           var targetTabs = $('a[data-related="' + $(this).data('popup') + '"]');
           targetTabs.removeClass('active');
           var targetContent = $('a[data-related="' + $(this).data('popup') + '"][data-content="' + $(this).data('content') + '"]');
           targetContent.addClass('active');


            targetPopup.find('.side-popup-content[data-content]').removeClass('active');
            targetPopup.find('.side-popup-content[data-content="' + $(this).data('content') + '"]').addClass('active');
            targetPopup.find('.side-popup-content[data-content="' + $(this).data('content') + '"]').find('[data-target="slider"]').slick('setPosition');
            targetPopup.scrollTop(0);
        }
    });
    $('[data-target="close-pop-ups"]').click( function(event) {
        event.preventDefault();
        $('body, html').css('overflow', 'auto');
        $('[data-target="popup"]').removeClass('open');
    });
   }

   initSliders();

   function initSliders(){
    $('[data-target="slider"]').each(function(){
        //console.log('works')
        var slidesToShow = $(this).data('slides-show');
        var slidesToScroll = $(this).data('slides-scroll');
        var breakpoints = [];
        var breakpointsText = $(this).data('resp')
        if (breakpointsText){
            breakpointsText = breakpointsText.split(',');
            breakpointsText.forEach(function(string){
                var values = string.split('|');
                var obj = {
                    settings: {}
                };
                obj.breakpoint = parseInt(values[0]);
                obj.settings.slidesToShow = parseInt(values[1]);
                obj.settings.slidesToScroll = parseInt(values[2]);
                breakpoints.push(obj);
            });
        }

        $(this).removeClass('hide');

        $(this).slick({
            infinite: true,
            slidesToShow: slidesToShow,
            slidesToScroll: slidesToScroll,
            dots: true,
            responsive: breakpoints,
				autoplay: true,
				autoplaySpeed: 10000,
				variableWidth: true,
        });

    });
   }

   var accountTables = $('[data-target="account-table"]');
   if (accountTables.length) {
     toggleAccountTableView();
       $(window).resize(function(){
        toggleAccountTableView();
        });

   }


   function adjustChartDropdown() {
    if ($('.chart-direction').length) {
        $('.chart-direction').find('.optWrapper').removeClass('isFloating').css('min-height', 200);
    }
   }

   $('.chart-direction').find('.SumoSelect').click(function(){
    setTimeout(function(){
        adjustChartDropdown();
    }, 0);
   });

   adjustChartDropdown();
   $(window).resize(function(){
        adjustChartDropdown()
   });


   function toggleAccountTableView() {
    var width = $(window).width();
        accountTables.each(function(){

            if (width < 760) {
                if ($(this).data('active')) {
                    return false;
                } else {
                    var targets = $(this).find('tr').find('td:nth-child(3), th:nth-child(3), td:nth-child(5), th:nth-child(5)');
                    targets.each(function(){
                        $(this).prev().html($(this).prev().html() + '<br /><span class="js-inserted">' + $(this).html() + '</span>');
                        $(this).remove();
                    });
                    $(this).data('active', true);
                }
            } else {
                if ($(this).data('active')) {
                    var targets = $(this).find('tr').find('td:nth-child(2), th:nth-child(2), td:nth-child(3), th:nth-child(3)');
                    targets.each(function(){
                        var target = $(this).find('.js-inserted')
                        var targetHTML = target.html();
                        var newElem;
                        if ($(this).is('td')){
                            newElem = $('<td></td>');
                        } else {
                            newElem = $('<th></th>');
                        }
                        newElem.html(targetHTML);
                        newElem.insertAfter($(this));
                        target.prev().remove();
                        target.remove();

                    });
                    $(this).data('active', false);

                }
            }

        })

   }

   $('textarea').keydown(function(){
    $(this).scrollTop($(this)[0].scrollHeight);
   });
   var textareaCounters = $('[data-target="textarea-conter"]');
   if (textareaCounters.length) {
    initTextAreaCounters();
   }

   function initTextAreaCounters() {
    textareaCounters.each(function(){
        var textArea = $(this).parent().find('textarea');
        var symbols = $(this).find('[data-symbols]');
        var symbolsMax = $(this).find('[data-symbols-max]').data('symbols-max');

        var self = $(this);
        textArea.focus(function(){
            self.addClass('is-active');
        })
        textArea.blur(function(){
            self.removeClass('is-active');
        })


        textArea.on('keyup', function(event){
            var value = $(this).val();
            if (value.length > symbolsMax) {
                if (event.which !== 8 && event.which !== 46) {
                    event.preventDefault();
                    return false;
                }
            } else {
                symbols.text(value.length);
            }
        });
        textArea.bind('paste', function(event){
            var pastedData = event.originalEvent.clipboardData.getData('text');
            if ($(this).val().length + pastedData.length > symbolsMax) {
                var self = $(this);
                setTimeout(function(){
                    self.val(self.val().slice(0, symbolsMax - 1));
                    symbols.text(symbolsMax);
                }, 0);

            }

        });
        textArea.contextmenu(function(event){
            event.preventDefault();
            return false;
        });
    });
   }

   $('[data-target="tab-content-link"]').click(function(){
      var targetTabs = $('[data-tabs-name="' + $(this).data('related') + '"]');
      targetTabs.find('[data-content][data-related="' + $(this).data('related') + '"]').removeClass('active');
      var targetContent = targetTabs.find('[data-content="' + $(this).data('content') + '"][data-related="' + $(this).data('related') + '"]');
      targetContent.addClass('active');

      if ($(this).data('related-link')) {
         targetTabs.find('[data-target="tab-content-link"][data-content="' + $(this).data('related-link') + '"]').addClass('active');
      }
      targetContent.find('[data-target="slider"]').slick('setPosition');

      if (targetTabs.data('tabs-name') === 'side-popup') {
         targetTabs.scrollTop(0);
      }
   });


});

function checkMobile(userAgent) {
   var type = 'web';
   if(/Android|webOS|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(userAgent)) {
      type = 'android';
   }
   if(/iPhone|iPad|iPod/i.test(userAgent)) {
      type = 'ios';
   }
   return type;
}


function number_format( number, decimals, dec_point, thousands_sep )
{
	var i, j, kw, kd, km;

	if( isNaN(decimals = Math.abs(decimals)) )
	{
		decimals = 2;
	}
	if( dec_point == undefined )
	{
		dec_point = ",";
	}
	if( thousands_sep == undefined )
	{
		thousands_sep = ".";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");

	return km + kw + kd;
}


function tradeAmountFormat(amount, tag = 'span', sup = '')
{
   var oAmount = amount.replace(',', '') * 1;

   var arAmount = amount.split('.');
   var prec = arAmount[1].length;

   amount = number_format(amount, prec, '.', ',');

   var res = amount;

   if (prec > 2)
   {
     res = res.replace(/(.+\..*?)([0]+?)$/, '$1<'+tag+' class="insgnzrs">$2</'+tag+'>');
   }
   else
   {
     res = res.replace('.00', '<'+tag+' class="insgnzrs">.00</'+tag+'>');
   }

   res = res.replace('.<'+tag+' class="insgnzrs">', '<'+tag+'>.');

   if (sup.length)
   {
      var arRes = res.split('.');

      res = arRes[0]+'<'+sup+'>.'+arRes[1]+'</'+sup+'>';
      res = res.replace('<'+tag+'><'+sup+'>', '<'+sup+'><'+tag+'>');
      res = res.replace('</'+sup+'></'+tag+'>', '</'+tag+'></'+sup+'>');
   }

   return res;
}
