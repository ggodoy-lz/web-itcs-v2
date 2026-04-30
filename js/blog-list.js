(function () {
  var root  = document.getElementById('blog-posts-mount');
  var errEl = document.getElementById('blog-load-error');
  if (!root) return;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  var STATIC_POSTS = [
    {
      slug: 'xdr-empresas',
      gradient: 'a',
      category: 'Ciberseguridad',
      read_minutes: 5,
      title: '¿Por qué su empresa necesita XDR?',
      excerpt: 'Sophos: IA unificada en endpoints, redes y correo.',
      cta_url: 'contact.html',
      cta_label: 'Consultanos'
    },
    {
      slug: 'backup-veeam',
      gradient: 'b',
      category: 'Backup',
      read_minutes: 4,
      title: 'Backup inteligente con Veeam',
      excerpt: 'Ransomware y defensa de datos críticos.',
      cta_url: 'producto-veeam.html',
      cta_label: 'Ver Veeam'
    },
    {
      slug: 'redes-wifi-aruba',
      gradient: 'c',
      category: 'Networking',
      read_minutes: 6,
      title: 'Redes Wi-Fi empresariales (Aruba)',
      excerpt: 'Misión crítica en hospitales, bancos y universidades.',
      cta_url: 'producto-aruba.html',
      cta_label: 'Ver Aruba'
    },
    {
      slug: 'iso-27001-paraguay',
      gradient: 'a',
      category: 'Seguridad',
      read_minutes: 5,
      title: 'ISO 27001 en Paraguay: lo que su empresa debe saber',
      excerpt: 'Certificación de seguridad de la información para empresas locales.',
      cta_url: 'certificaciones.html',
      cta_label: 'Ver certificaciones'
    },
    {
      slug: 'infraestructura-hibrida',
      gradient: 'b',
      category: 'Infraestructura',
      read_minutes: 7,
      title: 'Infraestructura híbrida: VMware + Azure en Paraguay',
      excerpt: 'Cómo migrar cargas críticas a la nube sin perder control.',
      cta_url: 'services.html',
      cta_label: 'Ver servicios'
    },
    {
      slug: 'soporte-sla-paraguay',
      gradient: 'c',
      category: 'Soporte',
      read_minutes: 3,
      title: 'SLA real: soporte 24/7 con ingenieros certificados',
      excerpt: 'Tiempo de respuesta garantizado para su operación crítica.',
      cta_url: 'contact.html',
      cta_label: 'Agendar reunión'
    }
  ];

  function card(p) {
    var g       = ['a','b','c'].includes(p.gradient) ? p.gradient : 'a';
    var postUrl = 'blog-post.html?slug=' + encodeURIComponent(p.slug || '');
    var ctaUrl  = esc(p.cta_url   || 'contact.html');
    var ctaLabel= esc(p.cta_label || 'Contacto');
    return (
      '<div class="col-lg-4">' +
        '<div class="itcs-blog-card rounded-1 overflow-hidden h-100 d-flex flex-column">' +
          '<a href="' + postUrl + '" class="d-block text-decoration-none">' +
            '<div class="itcs-blog-thumb itcs-blog-card-bg--' + g + '" role="img"></div>' +
          '</a>' +
          '<div class="p-4 d-flex flex-column flex-grow-1">' +
            '<div class="itcs-blog-badge mb-2">' + esc(p.category || '') + ' · ~' + (parseInt(p.read_minutes,10)||5) + ' min</div>' +
            '<h4 class="mb-2 flex-grow-1">' +
              '<a href="' + postUrl + '" class="text-decoration-none" style="color:inherit">' + esc(p.title || '') + '</a>' +
            '</h4>' +
            '<p class="mb-3" style="color:var(--text-soft)">' + esc(p.excerpt || '') + '</p>' +
            '<a href="' + ctaUrl + '" class="btn-main fx-slide btn-sm align-self-start"><span>' + ctaLabel + '</span></a>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* Intentar API; caer en estáticos si falla */
  fetch('/api/posts')
    .then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then(function (data) {
      var posts = data.posts || [];
      root.innerHTML = posts.length
        ? posts.map(card).join('')
        : STATIC_POSTS.map(card).join('');
    })
    .catch(function () {
      root.innerHTML = STATIC_POSTS.map(card).join('');
    });
})();
