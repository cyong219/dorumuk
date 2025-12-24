document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');
    M.Slider.init(sliders, {
        indicators: true,
        duration: 500,
        interval: 5000
    });
});

  window.addEventListener('load', function () {
    console.log(location.hash)
    if (location.hash) {
      const target = document.querySelector(location.hash);
      console.log(target)
      if (!target) return;

      const navHeight = document.querySelector('nav').offsetHeight;
      const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        console.log(y)
        setTimeout(function(){
            window.scrollTo({ top: y });
        },500)
      
    }
  });
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();

        const navHeight = document.querySelector('nav').offsetHeight;
        const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });

        history.pushState(null, '', this.getAttribute('href'));
    });
});