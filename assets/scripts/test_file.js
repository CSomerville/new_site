var allSkills = ['git', 'nodejs', 'postgresql', 'backbone', 'less', 
                'sass', 'gulp', 'angular', 'ruby', 'rails', 'python',
                'react'];

var copyOffsetL, copyOffsetT;

function makeMeteors(){

  if (Math.floor(Math.random() * 4) < 3) return;

  var skill = allSkills[Math.floor(Math.random () * allSkills.length)];
  var str = '<span class="devicons devicons-' + skill + '">';
  var pos = Math.floor(Math.random() * $(window).width());

  var $el = $(str).addClass('heavenly').css('left', pos + 'px');
  var copies = [];
  var $copy = $el.clone().css({'left': pos - copyOffsetL + 'px', 'top': (0 - 100 - copyOffsetT) + 'px'});

  $('.backdrop-wrapper').prepend($el);
  $('.blurred-speech').prepend($copy);
  window.setTimeout(function(){
    $el.addClass('earthly').css('left', (pos - 200) + 'px').data({dest: (pos - 200) + 'px'});
    $copy.addClass('earthly').css({'left': (pos - copyOffsetL - 200) + 'px', 'top': 1000 - copyOffsetT }).data({dest: (pos - copyOffsetL - 200) + 'px'});
  }, 200);
}

function cleanMeteors() {
  $('.devicons').each(function(){
    if (parseInt($(this).css('top')) === 1000) {
      $(this).remove();
    }
  });
};

function setFrostyWindow() {
  var p = $('.shown').first().position();
  var w = $('.shown').outerWidth();
  var h = $('.shown').outerHeight();

  $('.blurred-speech').css({top: (parseInt(p.top)) + 'px', left: (parseInt(p.left)) + 'px', width: (w), height: (h) });

  leftDifference = p.left - copyOffsetL;

  copyOffsetL = p.left;
  copyOffsetT = p.top;

  $('.backdrop-wrapper').find('.devicons').each(function(){
    $(this).css({top: '', left: $(this).data('dest')});
    $(this).addClass('earthly');
  });

  $('.blurred-speech').find('.devicons').each(function(){
    $(this).css({top: '', left: parseInt($(this).data('dest')) - leftDifference + 'px' });
    $(this).addClass('earthly');    
  })

  // $('.blurred-speech').find('.devicons').each(function(){
  //   var offset = $(this).offset();
  //   $(this).offset({top: offset.top, left: offset.left + leftDifference});
  // });
}

function stopTime() {
  var p = $('.blurred').first().position();

  leftDifference = p.left - copyOffsetL;

  $('.backdrop-wrapper').find('.devicons').each(function(){
    var offset = $(this).offset();
    $(this).removeClass('earthly');
    $(this).offset({top: offset.top, left: offset.left })
  });

  $('.blurred-speech').find('.devicons').each(function(){
    var offset = $(this).offset();
    $(this).removeClass('earthly');
    $(this).offset({top: offset.top, left: offset.left - leftDifference});
  });
}

function flipPages() {
  var $allSections = $('section');
  var $shown = $('.shown');
  var i;

  $allSections.each(function(ind){
    self = $(this)
    if (this === $shown[0]) {
      i = ind;
      self.removeClass('shown').addClass('blurred');
      return false;
    }
  });

  window.setTimeout(function(){
    self.removeClass('blurred').addClass('hidden');
    $($allSections[(i + 1) % 4]).removeClass('hidden').addClass('blurred');
    stopTime();
    window.setTimeout(function(){
      $($allSections[(i + 1) % 4]).removeClass('blurred').addClass('shown');
      setFrostyWindow();
    }, 100)
  }, 1100);
}

function stopBubbling(e) {
  e.stopPropagation();
}

function addListeners() {
  $('section').on('click', flipPages);
  $('a').on('click', stopBubbling);
}

window.setInterval(function(){
  makeMeteors();
  cleanMeteors();
}, 500);

$(document).ready(function(){
  window.setTimeout(function(){
    setFrostyWindow();
    addListeners();
  }, 500)  
});

$(window).resize(function(){
  setFrostyWindow();
});
