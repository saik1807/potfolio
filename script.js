const sections = [
    { id: 'hero', label: 'start' },
    { id: 'profile', label: 'profile' },
    { id: 'skills', label: 'skills' },
    { id: 'experience', label: 'experience' },
    { id: 'projects', label: 'projects' },
    { id: 'contact', label: 'contact' },
  ];
  
  const track = document.getElementById('track');
  const pctEl = document.getElementById('pct');
  
  sections.forEach((s, i) => {
    const node = document.createElement('button');
    node.className = 'tracker-node';
    node.dataset.target = s.id;
    node.innerHTML = '<span class="dot"></span><span class="label">' + s.label + '</span>';
    node.addEventListener('click', () => {
      document.getElementById(s.id).scrollIntoView({ behavior: 'smooth' });
    });
    track.appendChild(node);
    if (i < sections.length - 1) {
      const line = document.createElement('div');
      line.className = 'tracker-line';
      track.appendChild(line);
    }
  });
  
  const nodes = Array.from(track.querySelectorAll('.tracker-node'));
  
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0;
    pctEl.textContent = pct + '%';
  
    let activeIndex = 0;
    sections.forEach((s, i) => {
      const el = document.getElementById(s.id);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.5) activeIndex = i;
    });
  
    nodes.forEach((node, i) => {
      node.classList.remove('active', 'done');
      if (i < activeIndex) node.classList.add('done');
      else if (i === activeIndex) node.classList.add('active');
    });
  }
  
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();