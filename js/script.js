// Custom cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animateCursor() {
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();
document.querySelectorAll('a, button, .project-card, .skill-cat, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px'; cursor.style.height = '20px';
    ring.style.width = '56px'; ring.style.height = '56px'; ring.style.opacity = '0.8';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px'; cursor.style.height = '12px';
    ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.5';
  });
});

// Typed text
const titles = [
  'Full Stack Developer',
  'UI/UX Designer',
  'Flutter Developer',
  'Android Developer',
  'Computer Vision Explorer',
];
let ti = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed');
function type() {
  const t = titles[ti];
  if (!del) {
    typedEl.textContent = t.slice(0, ++ci);
    if (ci === t.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = t.slice(0, --ci);
    if (ci === 0) { del = false; ti = (ti + 1) % titles.length; }
  }
  setTimeout(type, del ? 45 : 80);
}
type();

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.background =
    window.scrollY > 50 ? 'rgba(6,10,16,0.95)' : 'rgba(6,10,16,0.7)';
});

// Contact form → Google Sheets
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbyXvXJ6pL__Kyebs_Ea3eM-aqStjXwgtHUvb158tlognjjXWS2NjUqXwVSRlZvnO03M_w/exec';

async function submitForm() {
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const phone   = document.getElementById('fphone').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in Name, Email, and Message.');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    await fetch(SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, subject, message })
    });

    document.getElementById('formSuccess').style.display = 'block';
    document.getElementById('fname').value    = '';
    document.getElementById('femail').value   = '';
    document.getElementById('fphone').value   = '';
    document.getElementById('fsubject').value = '';
    document.getElementById('fmessage').value = '';
    setTimeout(() => { document.getElementById('formSuccess').style.display = 'none'; }, 6000);
  } catch (err) {
    alert('Something went wrong. Please try emailing me directly at jenishjoshi1210@gmail.com');
  } finally {
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  });
});