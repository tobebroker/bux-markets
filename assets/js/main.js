document.addEventListener('DOMContentLoaded', function () {
    // ---------- Mobile menu ----------
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (toggle && mobileNav) {
        toggle.addEventListener('click', function () {
            const open = mobileNav.classList.toggle('show');
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', open);
        });

        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('show');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1100) {
                mobileNav.classList.remove('show');
                toggle.classList.remove('open');
            }
        });
    }

    // ---------- Back to top ----------
    const toTop = document.querySelector('.to-top');

    if (toTop) {
        window.addEventListener('scroll', function () {
            toTop.classList.toggle('show', window.scrollY > 500);
        }, { passive: true });

        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- Reveal on scroll ----------
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(function (el) { observer.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    // ---------- Contact form ----------
    // No backend yet: validates and shows a message.
    // To make it send, set the form's action="" to your endpoint and remove e.preventDefault().
    const form = document.querySelector('#contact-form');

    if (form) {
        const note = form.querySelector('.form-note');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valid = true;

            form.querySelectorAll('[required]').forEach(function (field) {
                const wrap = field.closest('.form-field');
                let ok = field.value.trim() !== '';

                if (ok && field.type === 'email') {
                    ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
                }

                wrap.classList.toggle('error', !ok);
                if (!ok) valid = false;
            });

            if (!valid) {
                note.textContent = 'Please fill in all fields correctly.';
                note.className = 'form-note err';
                return;
            }

            note.textContent = 'Thank you! Your message has been sent.';
            note.className = 'form-note ok';
            form.reset();
        });

        form.querySelectorAll('input, textarea').forEach(function (field) {
            field.addEventListener('input', function () {
                field.closest('.form-field').classList.remove('error');
            });
        });
    }
});
