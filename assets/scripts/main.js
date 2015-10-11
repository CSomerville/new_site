$(function(){
  app();
});

function app() {

  // add listeners

  $('section').on('click', transition);

  $('a').on('click', function(e) { e.stopPropagation(); });

  $(window).resize(setFrostyWindow);

  // interval appends and removes animated DOM elements
  window.setInterval(function(){
    makeMeteors();
    cleanMeteors();
  }, 500);

  window.setTimeout(setFrostyWindow, 500);
}

function makeMeteors(){

  // 3/4 chance function doesn't run--so the animation clusters.
  if (Math.floor(Math.random() * 4) < 3) return;


  var fallingIcons = ['git', 'nodejs', 'postgresql', 'backbone', 'less', 
                'sass', 'gulp', 'angular', 'ruby', 'rails', 'python',
                'react'];

  var icon = fallingIcons[Math.floor(Math.random() * fallingIcons.length)];
  var str = '<span class="devicons devicons-' + icon + '">';
  var pos = Math.floor(Math.random() * $(window).width());

  var $el = $(str).addClass('heavenly').css('left', pos + 'px');

  // the element has been created ... now for a copy (to be blurred).
  var cpOffset = $('.blurred-speech').offset();
  var $copy = $el.clone().css({
                            left: pos - cpOffset.left + 'px',
                            top: -100 - cpOffset.top + 'px'
                          });

  $('.backdrop-wrapper').prepend($el);
  $('.blurred-speech').prepend($copy);

  // wait a hot sec, add css class to begin animation. Save positions for later.
  window.setTimeout(function(){
    $el.addClass('earthly')
        .css('left', pos - 200 + 'px')
        .data({ destL: pos - 200 });

    $copy.addClass('earthly')
        .css({
          'left': pos - cpOffset.left - 200 + 'px', 
          'top': 1000 - cpOffset.top + 'px' 
        })
        .data({
          destL: pos - cpOffset.left - 200, 
          destT: 1000 - cpOffset.top
        });
  }, 200);
}

function cleanMeteors() {

  $('.devicons').each(function(){
    if (parseInt($(this).css('top')) >= 1000) {
      $(this).remove();
    }
  });

}

function setFrostyWindow() {

  var pos = $('.shown').offset();
  var width = $('.shown').outerWidth();
  var height = $('.shown').outerHeight();

  $('.blurred-speech').css({
    top: pos.top + 'px', 
    left: pos.left + 'px', 
    width: width, 
    height: height 
  });
}

function transition() {

  var args = initiateTrans();

  window.setTimeout(function(){
    args = trans(args[0], args[1], args[2], args[3]);

    window.setTimeout(function(){
      disposeTrans(args[0], args[1], args[2], args[3]);

    }, 100);
  }, 1100);
}

function initiateTrans() {

  $('.section').off('click');
  
  var $sections = $('section');
  var $shown = $('.shown');
  var prevInd;

  var prevPos = $shown.offset();

  $sections.each(function(i){

    if (this === $shown[0]) {
      prevInd = i;
      $(this).removeClass('shown').addClass('blurred');
      return false;
    }
  });
  return [$sections, $shown, prevPos, prevInd];
}

function trans($sections, $shown, prevPos, prevInd) {

  $shown.removeClass('blurred').addClass('hidden');
  $($sections[(prevInd + 1) % 4]).removeClass('hidden').addClass('blurred');

  var newPos = $('.blurred').offset();
  var lDiff = newPos.left - prevPos.left;
  var tDiff = newPos.top - prevPos.top;

  $('.backdrop-wrapper').find('.devicons').each(function(){
    var offset = $(this).offset();
    $(this).removeClass('earthly');
    $(this).offset({top: offset.top, left: offset.left });
  });

  $('.blurred-speech').find('.devicons').each(function(){
    var offset = $(this).offset();
    $(this).removeClass('earthly');
    $(this).offset({top: offset.top - tDiff, left: offset.left - lDiff});
  });

  return [$sections, lDiff, tDiff, prevInd];
}

function disposeTrans($sections, lDiff, tDiff, prevInd) {

  $($sections[(prevInd + 1) % 4]).removeClass('blurred').addClass('shown');

  setFrostyWindow();

  $('.backdrop-wrapper').find('.devicons').each(function(){
    $(this).css({top: '', left: $(this).data('destL') + 'px'});
    $(this).addClass('earthly');
  });

  $('.blurred-speech').find('.devicons').each(function(){
    $(this).css({
      top: $(this).data('destT') - tDiff + 'px', 
      left: $(this).data('destL') - lDiff + 'px' 
    });
    $(this).addClass('earthly');    
  });

  $('section').on('click', transition);
}
















