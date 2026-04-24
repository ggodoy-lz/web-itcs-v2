(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = (params.get('slug') || '').trim();
  const mount = document.getElementById('blog-article-mount');
  if (!mount || !slug) {
    if (mount) {
      mount.innerHTML =
        '<p class="lead">Falta el parámetro <code>slug</code> en la URL.</p><p><a href="blog.html" class="btn-main fx-slide"><span>Volver al blog</span></a></p>';
    }
    return;
  }

  function esc(s) {
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  fetch('/api/post?slug=' + encodeURIComponent(slug))
    .then(function (r) {
      if (r.status === 404) return null;
      if (!r.ok) throw new Error('Error ' + r.status);
      return r.json();
    })
    .then(function (data) {
      if (!data || !data.post) {
        mount.innerHTML =
          '<p class="lead">No encontramos ese artículo.</p><p><a href="blog.html" class="btn-main fx-slide"><span>Volver al blog</span></a></p>';
        document.title = 'Artículo no encontrado — Blog iTCS';
        return;
      }
      const p = data.post;
      const g = ['a', 'b', 'c'].includes(p.gradient) ? p.gradient : 'a';
      document.title = (p.title || 'Blog') + ' — Blog iTCS';
      const meta = document.querySelector('meta[name="description"]');
      if (meta && p.excerpt) meta.setAttribute('content', p.excerpt);
      const h1 = document.getElementById('blog-post-title');
      if (h1) h1.textContent = p.title || '';
      const sub = document.getElementById('blog-post-meta');
      if (sub) {
        sub.textContent =
          (p.category || '') + ' · ~' + String(parseInt(p.read_minutes, 10) || 5) + ' min';
      }
      const crumb = document.getElementById('blog-post-crumb');
      if (crumb) crumb.textContent = p.title || 'Artículo';

      mount.innerHTML =
        '<div class="itcs-blog-thumb itcs-blog-card-bg--' +
        g +
        ' rounded-1 mb-4" style="height:12rem" role="img" aria-label=""></div>' +
        '<div class="itcs-blog-body">' +
        (p.body || '') +
        '</div>' +
        '<div class="spacer-single"></div>' +
        '<a href="' +
        esc(p.cta_url || 'contact.html') +
        '" class="btn-main fx-slide"><span>' +
        esc(p.cta_label || 'Contacto') +
        '</span></a>' +
        '<p class="mt-4 mb-0"><a href="blog.html" class="text-muted">← Volver al blog</a></p>';
    })
    .catch(function (e) {
      console.error(e);
      mount.innerHTML =
        '<p class="text-danger">No se pudo cargar el artículo.</p><p><a href="blog.html">Volver al blog</a></p>';
    });
})();
