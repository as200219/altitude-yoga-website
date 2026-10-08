// Teacher bios are copied word for word from 01-content/Copy/Altitude Website Info.txt. Do not summarize.
const teachers = [
  {
    name: 'Carolyn',
    bio: 'With more than 30 years of experience in the fitness industry, Carolyn began teaching group exercise in 1990 and has been passionate about helping others move and feel their best ever since. Today, she teaches Reformer Pilates, mat Pilates, and light weight training classes with a focus on building strength, improving mobility, and creating a welcoming environment where clients of all levels can thrive.',
    image: 'assets/headshots/Carolyn.jpg'
  },
  {
    name: 'Caroline',
    bio: 'Caroline grew up in Zebulon, NC, and is a full-time freelance artist and instructor who teaches private voice and piano, leads yoga and fitness classes, and performs with opera companies and performing arts organizations. She began practicing yoga in her twenties to support herself through the challenges and triumphs of higher education, and in 2021, completed her RYT(200). Caroline believes the body is our instrument and she strives to create an inclusive space where every body, every story, and every unique “music” is honored as part of the beautiful orchestra of life.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=760&fit=crop&crop=faces&q=80'
  },
  {
    name: 'Stacy',
    bio: 'Stacy is a Trauma-Informed RYT500 who is also Warriors at Ease (WAE) level 1 trained and Yoga Nidra certified. With more than a decade of experience across a wide range of yoga and sculpt formats, she is incredibly passionate about making movement accessible to everyone regardless of experience, age, or mobility. Expect music-driven, lighthearted vibes.',
    image: 'assets/headshots/Stacy.jpg'
  },
  {
    name: 'Erin',
    bio: 'With nearly 10 years of experience as a 200-hour certified yoga instructor, Erin shares her love of yoga through creative flows inspired by a background in gymnastics and dance. She specializes in vinyasa flow and inversions; and is enthusiastic about helping students learn to challenge themselves in a safe and supportive environment. With classes focused on alignment, strength, and mindfulness, she can guide students through their practice and learn to appreciate what they are capable of.',
    image: 'assets/headshots/Erin.jpg'
  },
  {
    name: 'Sophia',
    bio: 'Sophia is an RYT200 who has a love for movement and helping others cultivate a deeper connection with, and appreciation for, their bodies. She is a former professional dancer who found yoga through injuries and has continued her practice over the last decade. Her classes will focus on vinyasa style yoga, bringing together breath, mind, and body. Expect classes to guide you finding your strength, focus, and surrender on the mat.',
    image: 'assets/headshots/Sophia.jpg'
  },
  {
    name: 'Jennifer',
    bio: 'Jennifer earned her 200- and 300-hour level certifications through Indigo Hot Yoga of Raleigh. In addition, she has completed Empower Movement training through The Yoga Joint, as well as trainings in Yoga Assists, Yin, Trauma Informed/Sensitive Yoga, Yoga Sculpt, Inversions and Arm Balancing, Creative Vinyasa and Functional Movement Sequencing, Breathwork, Yoga Nidra, Myofascial Release, and Yoga for Athletes. A former collegiate dancer at UNC and a lifelong lover of music, Jennifer loves sharing her passion for the healing powers of movement, paired with ever-changing playlists. She loves teaching (and learning from) every unique student, from helping beginners learn the fundamentals, to guiding yogis craving restoration and stillness as a counterbalance to the pace of modern life, to challenging experienced yogis with opportunities to play, explore, and grow. All are welcome.',
    image: 'assets/headshots/Jen.jpg'
  },
  {
    name: 'Amy',
    bio: 'Amy believes that movement is a celebration of what the body can do. Her classes blend a deep love for creative yoga sequencing with an unwavering commitment to inclusivity. Every body, age, and ability level is welcome. Together, Amy and her students build a supportive space to connect and feel right at home. Expect mindful, accessible flows set to fun, hand-crafted playlists that will keep you motivated and smiling.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&h=760&fit=crop&crop=faces&q=80'
  },
  {
    name: 'Jessica',
    // Bio pending in the source document; replace when supplied.
    bio: 'Bio coming soon.',
    image: 'assets/headshots/Jessica.jpg'
  },
  {
    name: 'Kyahna',
    bio: 'Kyahna grew up in San Diego, CA and works in crisis counseling and higher education. She became an RYT200 earlier this year after years of a dedicated personal practice. In her free time, she enjoys doing yoga, playing the piano, listening to music, and spending time with loved ones. Kyahna believes in always giving yourself room to grow - that life is about learning, trying new things, and becoming a better version of yourself along the way.',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=600&h=760&fit=crop&crop=faces&q=80'
  }
];

const teacherList = document.querySelector('#teacher-list');
const orderedTeachers = [...teachers].sort((firstTeacher, secondTeacher) => {
  if (firstTeacher.name === 'Stacy') return -1;
  if (secondTeacher.name === 'Stacy') return 1;
  return firstTeacher.name.localeCompare(secondTeacher.name);
});

if (teacherList) {
  teacherList.innerHTML = orderedTeachers.map((teacher) => `
    <article class="card">
      <div class="card-img ratio-port"><img src="${teacher.image}" alt="Portrait of ${teacher.name}" loading="lazy" /></div>
      <h3>${teacher.name}</h3>
      <p class="teacher-bio">${teacher.bio}</p>
      <details class="bio-details"><summary>Read more</summary><p>${teacher.bio}</p></details>
    </article>
  `).join('');
}

// Classes carousel: one row that advances on its own; pauses while the visitor is interacting
const carousel = document.querySelector('#class-carousel');

if (carousel) {
  const prevBtn = document.querySelector('[data-carousel-prev]');
  const nextBtn = document.querySelector('[data-carousel-next]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;
  let paused = false;

  const step = () => {
    const card = carousel.querySelector('.card');
    return card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).columnGap || 0) : carousel.clientWidth;
  };
  const atEnd = () => carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;

  function advance(direction = 1) {
    if (direction > 0 && atEnd()) carousel.scrollTo({ left: 0 });
    else if (direction < 0 && carousel.scrollLeft <= 4) carousel.scrollTo({ left: carousel.scrollWidth });
    else carousel.scrollBy({ left: step() * direction });
  }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(() => { if (!paused && !document.hidden) advance(1); }, 4000);
  }

  prevBtn?.addEventListener('click', () => advance(-1));
  nextBtn?.addEventListener('click', () => advance(1));
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); advance(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); advance(-1); }
  });

  const section = carousel.closest('section');
  section.addEventListener('mouseenter', () => { paused = true; });
  section.addEventListener('mouseleave', () => { paused = false; });
  section.addEventListener('focusin', () => { paused = true; });
  section.addEventListener('focusout', () => { paused = false; });
  carousel.addEventListener('touchstart', () => { paused = true; }, { passive: true });
  carousel.addEventListener('touchend', () => { setTimeout(() => { paused = false; }, 6000); }, { passive: true });

  start();
}

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('#mobile-menu');

function setMenu(open) {
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', open);
}

menuBtn.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !menu.hidden) setMenu(false); });
window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });
