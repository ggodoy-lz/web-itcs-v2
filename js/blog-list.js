(function () {
  var root  = document.getElementById('blog-posts-mount');
  if (!root) return;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  var STATIC_POSTS = [
    { slug: 'xdr-empresas',          gradient: 'a', category: 'Ciberseguridad', read_minutes: 5, title: '¿Por qué su empresa necesita XDR?',                      excerpt: 'Sophos: IA unificada en endpoints, redes y correo.' },
    { slug: 'backup-veeam',           gradient: 'b', category: 'Backup',         read_minutes: 4, title: 'Backup inteligente con Veeam',                           excerpt: 'Ransomware y defensa de datos críticos.' },
    { slug: 'redes-wifi-aruba',       gradient: 'c', category: 'Networking',     read_minutes: 6, title: 'Redes Wi-Fi empresariales (Aruba)',                      excerpt: 'Misión crítica en hospitales, bancos y universidades.' },
    { slug: 'iso-27001-paraguay',     gradient: 'a', category: 'Seguridad',      read_minutes: 5, title: 'ISO 27001 en Paraguay: lo que su empresa debe saber',   excerpt: 'Certificación de seguridad de la información para empresas locales.' },
    { slug: 'infraestructura-hibrida',gradient: 'b', category: 'Infraestructura',read_minutes: 7, title: 'Infraestructura híbrida: VMware + Azure en Paraguay',   excerpt: 'Cómo migrar cargas críticas a la nube sin perder control.' },
    { slug: 'soporte-sla-paraguay',   gradient: 'c', category: 'Soporte',        read_minutes: 3, title: 'SLA real: soporte 24/7 con ingenieros certificados',    excerpt: 'Tiempo de respuesta garantizado para su operación crítica.' }
  ];

  function card(p) {
    var g = ['a','b','c'].includes(p.gradient) ? p.gradient : 'a';
    var postUrl = 'blog-post.html?slug=' + encodeURIComponent(p.slug || '');
    return (
      '<div class="col-lg-4">' +
        '<a href="' + postUrl + '" class="itcs-home-blog-card itcs-blog-card-bg--' + g + '">' +
          '<div class="itcs-home-blog-fade"></div>' +
          '<div class="itcs-home-blog-body">' +
            '<div class="itcs-blog-tag mb-3">' + esc(p.category) + ' · ~' + (parseInt(p.read_minutes,10)||5) + ' min</div>' +
            '<h4 class="mb-2">' + esc(p.title) + '</h4>' +
            '<p class="mb-0">' + esc(p.excerpt) + '</p>' +
          '</div>' +
        '</a>' +
      '</div>'
    );
  }

  fetch('/api/posts')
    .then(function(r){ if(!r.ok) throw r; return r.json(); })
    .then(function(data){ root.innerHTML = (data.posts||[]).map(card).join('') || STATIC_POSTS.map(card).join(''); })
    .catch(function(){ root.innerHTML = STATIC_POSTS.map(card).join(''); });
})();
