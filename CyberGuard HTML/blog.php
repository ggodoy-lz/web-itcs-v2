<?php

declare(strict_types=1);

require __DIR__ . '/includes/blog_store.php';

$pageTitle = 'Blog — iTCS S.A.';
$pageDesc = 'Artículos sobre tecnología, ciberseguridad e infraestructura en Paraguay — iTCS.';
require __DIR__ . '/includes/blog_page_start.php';

$data = itcs_blog_load();
$posts = itcs_blog_published_sorted($data);
?>
            <section id="subheader" class="section-dark bg-dark text-light relative jarallax">
                <div class="gradient-edge-top"></div>
                <img src="images/background/3.webp" class="jarallax-img" alt="">
                <div class="container relative z-2">
                    <div class="row gy-4 gx-5 align-items-center">
                        <div class="spacer-double sm-hide"></div>
                        <div class="col-lg-8">
                            <h1 class="mb-0 wow fadeInUp" data-wow-delay=".2s">Blog</h1>
                            <ul class="crumb wow fadeInUp">
                                <li><a href="index.html">Inicio</a></li>
                                <li class="active">Blog</li>
                            </ul>
                        </div>
                        <div class="col-lg-4 text-lg-end sm-hide">
                            <h3 class="fs-24">Tecnología y seguridad en Paraguay</h3>
                        </div>
                    </div>
                </div>
            </section>

            <section class="pt-5 pb-5">
                <div class="container">
                    <div class="row g-4">
                        <?php foreach ($posts as $p) {
                            $g = (string) ($p['gradient'] ?? 'a');
                            if (!in_array($g, ['a', 'b', 'c'], true)) {
                                $g = 'a';
                            }
                            $slug = (string) ($p['slug'] ?? '');
                            $title = (string) ($p['title'] ?? '');
                            $excerpt = (string) ($p['excerpt'] ?? '');
                            $cat = (string) ($p['category'] ?? '');
                            $read = (int) ($p['read_minutes'] ?? 5);
                            $ctaLabel = (string) ($p['cta_label'] ?? 'Contacto');
                            $ctaUrl = (string) ($p['cta_url'] ?? 'contact.html');
                            $postUrl = 'blog-post.html?' . http_build_query(['slug' => $slug]);
                            ?>
                        <div class="col-lg-4">
                            <div class="bg-light rounded-1 overflow-hidden h-100">
                                <a href="<?= htmlspecialchars($postUrl, ENT_QUOTES, 'UTF-8') ?>" class="d-block text-decoration-none text-body">
                                    <div class="itcs-blog-thumb itcs-blog-card-bg--<?= htmlspecialchars($g, ENT_QUOTES, 'UTF-8') ?>" role="img" aria-label=""></div>
                                </a>
                                <div class="p-4">
                                    <div class="subtitle s2 mb-2"><?= htmlspecialchars($cat, ENT_QUOTES, 'UTF-8') ?> · ~<?= $read ?> min</div>
                                    <h4 class="mb-3"><a href="<?= htmlspecialchars($postUrl, ENT_QUOTES, 'UTF-8') ?>" class="text-dark text-decoration-none"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></a></h4>
                                    <p><?= htmlspecialchars($excerpt, ENT_QUOTES, 'UTF-8') ?></p>
                                    <a href="<?= htmlspecialchars($ctaUrl, ENT_QUOTES, 'UTF-8') ?>" class="btn-main fx-slide btn-sm"><span><?= htmlspecialchars($ctaLabel, ENT_QUOTES, 'UTF-8') ?></span></a>
                                </div>
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                    <?php if (count($posts) === 0) { ?>
                    <p class="text-center text-muted">Todavía no hay artículos publicados.</p>
                    <?php } ?>
                    <p class="text-center mt-5 mb-0 small text-muted">Autores: equipo iTCS. ¿Tema para el próximo artículo? <a href="contact.html">Escribinos</a>.</p>
                </div>
            </section>
<?php require __DIR__ . '/includes/blog_page_end.php';
