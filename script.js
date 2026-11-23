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
  const rolesByLang={en:['Python Developer','Frontend Developer','Software Builder','AI Tool Enthusiast'],fa:['توسعه‌دهنده پایتون','توسعه‌دهنده فرانت‌اند','سازنده نرم‌افزار','علاقه‌مند به ابزارهای هوش مصنوعی']};
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
      'nav.about':'About','nav.skills':'Skills','nav.projects':'Projects','nav.contact':'Contact',
      'hero.badge':'Developer Profile — Rev. 03',
      'hero.description':'I build practical software projects with Python and web technologies, from automation tools and terminal applications to responsive websites and AI-powered utilities.',
      'hero.viewProjects':'View Projects','hero.hireMe':'Contact Me',
      'about.fig':'Fig. 01 — Profile',
      'about.title':'Python &amp; Frontend Developer <span class="accent">Building Practical Tools</span>',
      'about.subtitle':'I build software tools, command-line applications, and responsive web interfaces, with Python as my strongest programming language.',
      'about.p1':'I\'m a developer and technology enthusiast who enjoys learning by building real projects. I\'m highly proficient in <strong>Python</strong> and have completed Python training with a certificate. I have a strong foundation in <strong>HTML and CSS</strong>, and I\'m currently learning <strong>JavaScript</strong> to expand my frontend skills. I also use <strong>Bash</strong> and <strong>Docker</strong> in practical projects.',
      'about.p2':'I enjoy turning ideas into working tools, exploring existing solutions, and combining technologies to build useful projects. I also use AI development tools when they help me research, compare approaches, or speed up implementation.',
      'about.journey':'How I Work',
      'about.t1title':'Build','about.t1desc':'Turn ideas into practical projects and working prototypes.',
      'about.t2title':'Research','about.t2desc':'Compare documentation, examples, and existing solutions.',
      'about.t3title':'Improve','about.t3desc':'Test, refine, and keep learning through hands-on development.',
      'skills.fig':'Fig. 03 — Toolkit','skills.title':'Skills &amp; <span class="accent">Technologies</span>','skills.subtitle':'Technologies I use, practice, and continue to learn.',
       'skills.python':'Strong proficiency · Certificate','skills.web':'Strong foundation in frontend structure and styling','skills.js':'Currently learning and building with JavaScript','skills.bash':'Used for scripting and command-line workflows','skills.docker':'Used in project setup and deployment workflows','skills.linux':'Basic hands-on experience, including Kali Linux on WSL','skills.git':'Version control and publishing open-source projects','skills.ai':'Use AI tools for research, iteration, and selected implementation tasks',
       'project.agent':'An AI-powered terminal agent with streaming responses, multiple model-provider options, conversation history, and built-in tools for everyday terminal tasks. Developed primarily by me, with AI-assisted implementation of local-model support.',
       'project.direct':'A multi-panel configuration tool for 3x-ui, Pasarguard, and Marzban. Integrates my earlier scanner project with panel-management and configuration workflows. Based on pdnczone/3x-ui-pro-configs, with additional integration and modifications.',
       'project.scanner':'A Python utility for scanning IP ranges and checking candidate endpoints, designed for practical use in Linux and Termux environments.',
       'project.railway':'A project exploring deployment of a 3x-ui / Xray-core-based panel on Railway without managing a traditional VPS, using Docker and shell scripts.',
       'project.mirror':'A GitHub Pages website that organizes and presents shell-script resources collected from different public repositories, using HTML, CSS, and JavaScript.',
       'project.downwib':'A web platform project for presenting software downloads across desktop and mobile operating systems.',
       'project.chat':'A chat application project. Explore the repository for its current implementation and features.',
       'projects.fig':'Fig. 04 — Repositories',
      'projects.title':'My <span class="accent">Projects</span>',
      'projects.subtitle':'Tools and utilities I\'ve built, from scanners to chat and web apps.',
      'contact.fig':'Fig. 05 — Contact','contact.title':'Let\'s <span class="accent">Connect</span>','contact.subtitle':'Reach out via any of the channels below.','contact.email':'Email',
      'footer.text':'&copy; 2026 Ayhan Mansur. Built with <span class="heart">&hearts;</span> and code.',
      'meta.title':'Ayhan Mansur | Python Developer &amp; Frontend Developer (HTML/CSS/JS/Bash)'
    },
    fa:{
      'nav.about':'درباره','nav.skills':'مهارت‌ها','nav.projects':'پروژه‌ها','nav.contact':'تماس',
      'hero.badge':'پروفایل توسعه‌دهنده — نسخه ۰۳',
      'hero.description':'با Python و فناوری‌های وب پروژه‌های کاربردی می‌سازم؛ از ابزارهای اتوماسیون و برنامه‌های ترمینالی تا وب‌سایت‌های واکنش‌گرا و ابزارهای مجهز به هوش مصنوعی.',
      'hero.viewProjects':'مشاهده پروژه‌ها','hero.hireMe':'ارتباط با من',
      'about.fig':'شکل ۰۱ — پروفایل',
      'about.title':'توسعه‌دهنده Python و فرانت‌اند <span class="accent">که ابزارهای کاربردی می‌سازد</span>',
      'about.subtitle':'ابزارهای نرم‌افزاری، برنامه‌های خط فرمان و رابط‌های وب واکنش‌گرا می‌سازم و زبان اصلی برنامه‌نویسی من Python است.',
      'about.p1':'من توسعه‌دهنده‌ای علاقه‌مند به فناوری هستم و از یادگیری از طریق ساخت پروژه‌های واقعی لذت می‌برم. در <strong>Python</strong> مهارت بالایی دارم و گواهی آموزش پایتون دریافت کرده‌ام. در <strong>HTML و CSS</strong> پایهٔ قوی دارم و در حال یادگیری <strong>JavaScript</strong> هستم. همچنین در پروژه‌های عملی از <strong>Bash</strong> و <strong>Docker</strong> استفاده می‌کنم.',
      'about.p2':'از تبدیل ایده‌ها به ابزارهای قابل استفاده، بررسی راه‌حل‌های موجود و ترکیب فناوری‌ها برای ساخت پروژه‌های مفید لذت می‌برم. همچنین هرجا مفید باشد از ابزارهای هوش مصنوعی برای تحقیق، مقایسهٔ راه‌حل‌ها و سرعت‌دادن به پیاده‌سازی کمک می‌گیرم.',
      'about.journey':'روش کار من',
      'about.t1title':'ساختن','about.t1desc':'تبدیل ایده‌ها به پروژه‌های کاربردی و نمونه‌های قابل اجرا.',
      'about.t2title':'تحقیق','about.t2desc':'بررسی مستندات، نمونه‌کدها و راه‌حل‌های موجود.',
      'about.t3title':'بهبود','about.t3desc':'آزمایش، اصلاح و ادامهٔ یادگیری از طریق توسعهٔ عملی.',
      'skills.fig':'شکل ۰۳ — ابزارها','skills.title':'مهارت‌ها و <span class="accent">فناوری‌ها</span>','skills.subtitle':'فناوری‌هایی که استفاده می‌کنم، تمرین می‌کنم و همچنان در حال یادگیری آن‌ها هستم.',
       'skills.python':'تسلط بالا · دارای گواهی پایتون','skills.web':'پایهٔ قوی در ساختار و طراحی رابط کاربری وب','skills.js':'در حال یادگیری و ساخت پروژه با JavaScript','skills.bash':'استفاده در اسکریپت‌نویسی و کارهای خط فرمان','skills.docker':'استفاده در راه‌اندازی و استقرار پروژه‌ها','skills.linux':'تجربهٔ عملی پایه، از جمله Kali Linux روی WSL','skills.git':'کنترل نسخه و انتشار پروژه‌های متن‌باز','skills.ai':'استفاده از ابزارهای هوش مصنوعی برای تحقیق، بهبود و بخشی از پیاده‌سازی‌ها',
       'project.agent':'یک ایجنت هوش مصنوعی برای ترمینال با پاسخ‌دهی جریانی، پشتیبانی از چند ارائه‌دهندهٔ مدل، تاریخچهٔ گفتگو و ابزارهای داخلی برای کارهای روزمرهٔ ترمینال. توسعهٔ اصلی پروژه توسط من انجام شده و پیاده‌سازی پشتیبانی از مدل محلی با کمک هوش مصنوعی انجام شده است.',
       'project.direct':'ابزاری برای کار با پنل‌های 3x-ui، Pasarguard و Marzban که اسکنر قبلی من را با روندهای مدیریت پنل و نصب کانفیگ یکپارچه می‌کند. این پروژه بر پایهٔ pdnczone/3x-ui-pro-configs ساخته شده و شامل یکپارچه‌سازی‌ها و تغییرات تکمیلی است.',
       'project.scanner':'ابزار پایتونی برای اسکن محدوده‌های IP و بررسی آدرس‌های کاندید، با هدف استفادهٔ عملی در محیط‌های لینوکس و ترموکس.',
       'project.railway':'پروژه‌ای برای بررسی استقرار پنل مبتنی بر 3x-ui و Xray-core روی Railway بدون مدیریت VPS سنتی، با استفاده از Docker و اسکریپت‌های Shell.',
       'project.mirror':'وب‌سایتی مبتنی بر GitHub Pages برای مرتب‌سازی و نمایش منابع اسکریپت‌های Shell که از مخزن‌های عمومی مختلف گردآوری شده‌اند؛ ساخته‌شده با HTML، CSS و JavaScript.',
       'project.downwib':'پروژه‌ای تحت وب برای نمایش و ارائهٔ دانلود نرم‌افزارها در سیستم‌عامل‌های دسکتاپ و موبایل.',
       'project.chat':'پروژهٔ یک اپلیکیشن چت. برای مشاهدهٔ پیاده‌سازی و قابلیت‌های فعلی، مخزن آن را ببینید.',
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
