var allSkills = ['git', 'nodejs', 'postgresql', 'backbone', 'less', 
                'sass', 'gulp', 'angular', 'ruby', 'rails', 'python']

function makeMeteors(){
  var skill = allSkills[Math.floor(Math.random () * allSkills.length)];
  var str = '<span class="devicons devicons-' + skill + '">';
  var $el = $(str).addClass('heavenly');
  $('body').append($el);
  window.setTimeout(function(){
    $el.addClass('earthly');
  }, 200);
}

window.setInterval(makeMeteors, 2000);