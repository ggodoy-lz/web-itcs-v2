(function () {
  const root = document.getElementById('blog-posts-mount');
  const errEl = document.getElementById('blog-load-error');
  if (!root) return;

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  function card(p) {
    const g = ['a', 'b', 'c'].includes(p.gradient) ? p.gradient : 'a';
    const slug = encodeURIComponent(p.slug || '');
    const postUrl = 'blog-post.html?slug=' + slug;
    const ctaUrl = esc(p.cta_url || 'contact.html');
    const ctaLabel = esc(p.cta_label || 'Contacto');
    return (
      '<div class="col-lg-4">' +
      '<div class="bg-light rounded-1 overflow-hidden h-100">' +
      '<a href="' +
      postUrl +
      '" class="d-block text-decoration-none text-body">' +
      '<div class="itcs-blog-thumb itcs-blog-card-bg--' +
      g +
      '" role="img" aria-label=""></div></a>' +
      '<div class="p-4">' +
      '<div class="subtitle s2 mb-2">' +
      esc(p.category || '') +
      ' · ~' +
      String(parseInt(p.read_minutes, 10) || 5) +
      ' min</div>' +
      '<h4 class="mb-3"><a href="' +
      postUrl +
      '" class="text-dark text-decoration-none">' +
      esc(p.title || '') +
      '</a></h4>' +
      '<p>' +
      esc(p.excerpt || '') +
      '</p>' +
      '<a href="' +
      ctaUrl +
      '" class="btn-main fx-slide btn-sm"><span>' +
      ctaLabel +
      '</span></a>' +
      '</div></div></div>'
    );
  }

  fetch('/api/posts')
    .then(function (r) {
      if (!r.ok) throw new Error('No se pudo cargar el blog (' + r.status + ')');
      return r.json();
    })
    .then(function (data) {
      const posts = data.posts || [];
      if (posts.length === 0) {
        root.innerHTML =
          '<div class="col-12"><p class="text-center text-muted mb-0">Todavía no hay artículos publicados.</p></div>';
        return;
      }
      root.innerHTML = posts.map(card).join('');
    })
    .catch(function (e) {
      console.error(e);
      if (errEl) errEl.hidden = false;
      root.innerHTML =
        '<div class="col-12"><p class="text-center text-danger">Error al cargar entradas. Si estás en Vercel, revisá que Redis (Upstash) y las variables de entorno estén configuradas.</p></div>';
    });
})();
