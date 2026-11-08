
(function(){
  'use strict';
  const isTouch=('ontouchstart' in window)||(navigator.maxTouchPoints>0);
  const isLowPower=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile=window.innerWidth<768||isTouch;

  const navToggle=document.getElementById('navToggle'),navLinks=document.getElementById('navLinks'),navOverlay=document.getElementById('navOverlay');
  function openNav(){navLinks.classList.add('open');navOverlay.classList.add('active');navToggle.classList.add('active');navToggle.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';}
  function closeNav(){navLinks.classList.remove('open');navOverlay.classList.remove('active');navToggle.classList.remove('active');navToggle.setAttribute('aria-expanded','false');document.body.style.overflow='';}
  navToggle.addEventListener('click',()=>{navToggle.getAttribute('aria-expanded')==='true'?closeNav():openNav();});
  navOverlay.addEventListener('click',closeNav);
  document.querySelectorAll('.nav-links a').forEach(l=>l.addEventListener('click',closeNav));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});

  const typingText=document.getElementById('typingText');
  const rolesByLang={en:['Python Developer','Frontend Developer','Bash Automation','Tool Builder'],fa:['توسعه‌دهنده پایتون','توسعه‌دهنده فرانت‌اند','اتوماسیون Bash','سازنده ابزار']};
  let roles=rolesByLang.en,roleIndex=0,charIndex=0,isDeleting=false,typingTimeout=null;
  const typeSpeed=isMobile?95:75,deleteSpeed=isMobile?48:38,pause=isMobile?1800:1600;
  function typeEffect(){
    const current=roles[roleIndex];
    if(isDeleting){
      typingText.textContent=current.substring(0,charIndex-1);charIndex--;
      if(charIndex===0){isDeleting=false;roleIndex=(roleIndex+1)%roles.length;typingTimeout=setTimeout(typeEffect,350);return;}
      typingTimeout=setTimeout(typeEffect,deleteSpeed);
    }else{
      typingText.textContent=current.substring(0,charIndex+1);charIndex++;
      if(charIndex===current.length){isDeleting=true;typingTimeout=setTimeout(typeEffect,pause);return;}
      typingTimeout=setTimeout(typeEffect,typeSpeed);
    }
  }
  function restartTyping(lang){
    roles=rolesByLang[lang]||rolesByLang.en;roleIndex=0;charIndex=0;isDeleting=false;clearTimeout(typingTimeout);
    if(!isLowPower)typeEffect();else typingText.textContent=roles[0];
  }
  if(!isLowPower)typeEffect();else{typingText.textContent=roles[0];document.getElementById('typingCursor').style.display='none';}

  const reveals=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const ro=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting)en.target.classList.add('visible');});},{threshold:0.12,rootMargin:'0px 0px -20px 0px'});
    reveals.forEach(el=>ro.observe(el));
  }else reveals.forEach(el=>el.classList.add('visible'));

  const backBtn=document.getElementById('backToTop');let st=false;
  window.addEventListener('scroll',()=>{if(!st){st=true;requestAnimationFrame(()=>{backBtn.classList.toggle('visible',window.scrollY>500);st=false;});}},{passive:true});
  backBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  const translations={
    en:{
      'nav.about':'About','nav.projects':'Projects','nav.contact':'Contact',
      'hero.badge':'Developer Profile — Rev. 03',
      'hero.description':'Building practical tools and clean web interfaces with Python, HTML, CSS, JavaScript, and Bash. Focused on automation, cross-platform utilities, and interfaces people actually enjoy using.',
      'hero.viewProjects':'View Projects','hero.hireMe':'Hire Me',
      'about.fig':'Fig. 01 — Profile',
      'about.title':'Python &amp; Frontend Developer <span class="accent">Building Practical Tools</span>',
      'about.subtitle':'I build automation scripts, command-line tools, and responsive web interfaces using Python, HTML, CSS, JavaScript, and Bash.',
      'about.p1':'I\'m a developer and technology enthusiast who enjoys learning, experimenting, and building projects. I specialize in <strong>Python</strong> for scripting and automation, and <strong>HTML/CSS/JavaScript</strong> for building clean, responsive front-end interfaces. I also write <strong>Bash</strong> scripts for Linux and Termux environments.',
      'about.p2':'I like solving problems, finding practical solutions, and improving ideas that already exist. I\'m most interested in useful websites and software, new technologies, and combining AI capabilities with digital products.',
      'about.journey':'Journey',
      'about.t1title':'Started Building Tools','about.t1desc':'Began developing Python utilities for security and networking.',
      'about.t2title':'First Public Repositories','about.t2desc':'Released downwib and AyhanX-Fredom-Scanner.',
      'about.t3title':'Building &amp; Improving','about.t3desc':'Continuing to develop and refine tools with a focus on performance and UI.',
      'projects.fig':'Fig. 04 — Repositories',
      'projects.title':'My <span class="accent">Projects</span>',
      'projects.subtitle':'Tools and utilities I\'ve built, from scanners to chat and web apps.',
      'contact.fig':'Fig. 05 — Contact','contact.title':'Let\'s <span class="accent">Connect</span>','contact.subtitle':'Reach out via any of the channels below.','contact.email':'Email',
      'footer.text':'&copy; 2026 Ayhan Mansur. Built with <span class="heart">&hearts;</span> and code.',
      'meta.title':'Ayhan Mansur | Python Developer &amp; Frontend Developer (HTML/CSS/JS/Bash)'
    },
    fa:{
      'nav.about':'درباره','nav.projects':'پروژه‌ها','nav.contact':'تماس',
      'hero.badge':'پروفایل توسعه‌دهنده — نسخه ۰۳',
      'hero.description':'ابزارهای کاربردی و رابط‌های وب تمیز با Python، HTML، CSS، JavaScript و Bash می‌سازم. تمرکزم روی اتوماسیون، ابزارهای چندسکویی و رابط‌های کاربرپسنده.',
      'hero.viewProjects':'مشاهده پروژه‌ها','hero.hireMe':'استخدامم کن',
      'about.fig':'شکل ۰۱ — پروفایل',
      'about.title':'توسعه‌دهنده Python و فرانت‌اند <span class="accent">که ابزارهای کاربردی می‌سازد</span>',
      'about.subtitle':'اسکریپت‌های اتوماسیون، ابزارهای خط فرمان و رابط‌های وب واکنش‌گرا با Python، HTML، CSS، JavaScript و Bash می‌سازم.',
      'about.p1':'من یک توسعه‌دهنده و علاقه‌مند به تکنولوژی هستم که از یادگیری، آزمایش و ساخت پروژه لذت می‌برم. در <strong>Python</strong> برای اسکریپت‌نویسی و اتوماسیون، و در <strong>HTML/CSS/JavaScript</strong> برای ساخت رابط‌های فرانت‌اند تمیز و واکنش‌گرا تخصص دارم. همچنین اسکریپت‌های <strong>Bash</strong> برای لینوکس و ترموکس می‌نویسم.',
      'about.p2':'من از حل مسئله، پیدا کردن راه‌حل‌های کاربردی و بهبود ایده‌های موجود لذت می‌برم. بیشتر به وب‌سایت‌ها و نرم‌افزارهای کاربردی، تکنولوژی‌های جدید و ترکیب هوش مصنوعی با محصولات دیجیتال علاقه دارم.',
      'about.journey':'مسیر',
      'about.t1title':'شروع ساخت ابزارها','about.t1desc':'شروع توسعه ابزارهای پایتون برای امنیت و شبکه.',
      'about.t2title':'اولین مخزن‌های عمومی','about.t2desc':'انتشار downwib و AyhanX-Fredom-Scanner.',
      'about.t3title':'ساخت و بهبود','about.t3desc':'ادامه توسعه و بهبود ابزارها با تمرکز روی کارایی و رابط کاربری.',
      'projects.fig':'شکل ۰۴ — مخزن‌ها',
      'projects.title':'پروژه‌های <span class="accent">من</span>',
      'projects.subtitle':'ابزارهایی که ساختم، از اسکنر تا اپ‌های چت و وب.',
      'contact.fig':'شکل ۰۵ — تماس','contact.title':'بیا <span class="accent">در ارتباط باشیم</span>','contact.subtitle':'از هر کدوم از راه‌های زیر می‌تونی باهام در ارتباط باشی.','contact.email':'ایمیل',
      'footer.text':'&copy; ۲۰۲۶ آیهان منصور. ساخته‌شده با <span class="heart">&hearts;</span> و کد.',
      'meta.title':'آیهان منصور | توسعه‌دهنده Python و فرانت‌اند'
    }
  };

  const langToggle=document.getElementById('langToggle');
  function applyLanguage(lang){
    const dict=translations[lang]||translations.en;
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='fa'?'rtl':'ltr';
    langToggle.textContent=lang==='fa'?'EN':'FA';
    document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(dict[k]!==undefined)el.textContent=dict[k];});
    document.querySelectorAll('[data-i18n-html]').forEach(el=>{const k=el.getAttribute('data-i18n-html');if(dict[k]!==undefined)el.innerHTML=dict[k];});
    if(dict['meta.title'])document.title=dict['meta.title'].replace(/&amp;/g,'&');
    restartTyping(lang);
  }
  let currentLang='en';
  langToggle.addEventListener('click',()=>{currentLang=currentLang==='fa'?'en':'fa';applyLanguage(currentLang);});
})();