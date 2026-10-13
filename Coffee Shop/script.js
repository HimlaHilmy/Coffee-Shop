// ---------- Mobile navigation ----------
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('open', open);
    }

    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    menu.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
})();

// ---------- Contact form validation ----------
(function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const status = document.getElementById('form-status');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const rules = {
        name: (v) => (v.length < 2 ? 'Please enter your name.' : ''),
        email: (v) => (!v ? 'Please enter your email address.' : !emailPattern.test(v) ? 'Please enter a valid email address.' : ''),
        message: (v) => (v.length < 10 ? 'Please enter a message (at least 10 characters).' : '')
    };

    function check(field) {
        const input = form.elements[field];
        const error = document.getElementById(field + '-error');
        const msg = rules[field](input.value.trim());
        error.textContent = msg;
        input.setAttribute('aria-invalid', msg ? 'true' : 'false');
        return !msg;
    }

    Object.keys(rules).forEach((field) => {
        form.elements[field].addEventListener('blur', () => check(field));
        form.elements[field].addEventListener('input', () => {
            if (form.elements[field].getAttribute('aria-invalid') === 'true') check(field);
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.hidden = true;

        const results = Object.keys(rules).map(check);
        if (results.includes(false)) {
            form.querySelector('[aria-invalid="true"]').focus();
            return;
        }

        // Front-end only: connect this to a backend or form service to receive messages.
        form.reset();
        status.textContent = 'Thank you! Your message has been sent. We will get back to you soon.';
        status.hidden = false;
    });
})();
