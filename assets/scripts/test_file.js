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
    $el.addClass('earthly').css('left', (pos - 200) + 'px');
    $copy.addClass('earthly').css({'left': (pos - copyOffsetL - 200) + 'px', 'top': 1000 - copyOffsetT });
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

  copyOffsetL = p.left;
  copyOffsetT = p.top;  
}

window.setInterval(function(){
  makeMeteors();
  cleanMeteors();
}, 500);

$(document).ready(function(){
  window.setTimeout(function(){
    setFrostyWindow();
  }, 500)  
});

$(window).resize(function(){
  setFrostyWindow();
});
