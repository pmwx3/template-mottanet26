/* ══════════════════════════════════════════════
   1. HEADER — sombra ao rolar
══════════════════════════════════════════════ */
const header = document.querySelector('.site-header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
}

/* ══════════════════════════════════════════════
   2. FAQ ACCORDION
══════════════════════════════════════════════ */
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(el => {
            el.classList.remove('open');
            el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
            item.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

/* ══════════════════════════════════════════════
   3. TOC — fixo, posicionado logo abaixo do
   gmb-sidebar (avaliações Google)
══════════════════════════════════════════════ */
(function () {
    const HEADER_H = 82;
    const GAP = 18;   // gap entre gmb-sidebar e toc-card
    const tocCard = document.getElementById('toc-nav');
    const gmbSidebar = document.querySelector('.gmb-sidebar');

    /* Posiciona o TOC logo abaixo do gmb-sidebar */
    function positionToc() {
        if (!tocCard || !gmbSidebar) return;

        // Breakpoint: em telas pequenas o TOC é static, não precisa calcular
        if (window.innerWidth < 1200) {
            tocCard.style.position = '';
            tocCard.style.top = '';
            tocCard.style.left = '';
            tocCard.style.width = '';
            return;
        }

        const gmb = gmbSidebar.getBoundingClientRect();
        const topVal = gmb.bottom + GAP;          // px abaixo do viewport
        const left = gmb.left;                  // alinha com a sidebar
        const width = gmb.width + 'px';

        tocCard.style.position = 'fixed';
        tocCard.style.top = topVal + 'px';
        tocCard.style.left = left + 'px';
        tocCard.style.width = width;
    }

    positionToc();
    window.addEventListener('scroll', positionToc, { passive: true });
    window.addEventListener('resize', positionToc, { passive: true });

    /* ── Barra de progresso de leitura */
    const progressBar = document.getElementById('toc-progress');
    if (progressBar) {
        function updateProgress() {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            progressBar.style.width = (max > 0 ? Math.round((window.scrollY / max) * 100) : 0) + '%';
        }
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    /* ── Smooth scroll ao clicar no TOC */
    document.querySelectorAll('.toc-link[data-target]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const sec = document.getElementById(link.dataset.target);
            if (!sec) return;

            let top = 0, el = sec;
            while (el) { top += el.offsetTop || 0; el = el.offsetParent; }
            window.scrollTo({ top: top - HEADER_H - 8, behavior: 'smooth' });

            history.pushState(null, '', '#' + link.dataset.target);
            sec.setAttribute('tabindex', '-1');
            sec.focus({ preventScroll: true });
            sec.addEventListener('blur', () => sec.removeAttribute('tabindex'), { once: true });
        });
    });
})();