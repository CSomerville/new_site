var allSkills = ['git', 'nodejs', 'postgresql', 'backbone', 'less', 
                'sass', 'gulp', 'angular', 'ruby', 'rails', 'python',
                'react']

function makeMeteors(){

  if (Math.floor(Math.random() * 4) < 3) return;

  var skill = allSkills[Math.floor(Math.random () * allSkills.length)];
  var str = '<span class="devicons devicons-' + skill + '">';
  var pos = Math.floor(Math.random() * $(window).width());

  var $el = $(str).addClass('heavenly').css('left', pos + 'px');
  $('.backdrop-wrapper').prepend($el);
  window.setTimeout(function(){
    $el.addClass('earthly').css('left', (pos - 200) + 'px');
  }, 200);
}

function cleanMeteors() {
  $('.devicons').each(function(){
    if (parseInt($(this).css('top')) === 1000) {
      $(this).remove();
    }
  });
};

window.setInterval(function(){
  makeMeteors();
  cleanMeteors();
}, 500);

$('window').on('wheel', function(){
  console.log('wtf')
});