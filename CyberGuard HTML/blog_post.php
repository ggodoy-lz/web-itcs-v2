<?php

declare(strict_types=1);

require __DIR__ . '/includes/blog_store.php';

$data = itcs_blog_load();
$slug = isset($_GET['slug']) ? trim((string) $_GET['slug']) : '';
$post = $slug !== '' ? itcs_blog_find_by_slug($data, $slug) : null;

if ($post === null) {
    http_response_code(404);
    $pageTitle = 'Artículo no encontrado — Blog iTCS';
    $pageDesc = 'El artículo solicitado no existe o no está publicado.';
    require __DIR__ . '/includes/blog_page_start.php';
    ?>
            <section id="subheader" class="section-dark bg-dark text-light relative jarallax">
                <div class="gradient-edge-top"></div>
                <img src="images/background/3.webp" class="jarallax-img" alt="">
                <div class="container relative z-2">
                    <div class="row gy-4 gx-5 align-items-center">
                        <div class="spacer-double sm-hide"></div>
                        <div class="col-lg-8">
                            <h1 class="mb-0">404</h1>
                            <ul class="crumb">
                                <li><a href="index.html">Inicio</a></li>
                                <li><a href="blog.html">Blog</a></li>
                                <li class="active">No encontrado</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section class="pt-5 pb-5">
                <div class="container">
                    <p class="lead">No encontramos ese artículo.</p>
                    <p><a href="blog.html" class="btn-main fx-slide"><span>Volver al blog</span></a></p>
                </div>
            </section>
    <?php
    require __DIR__ . '/includes/blog_page_end.php';
    exit;
}

$title = (string) ($post['title'] ?? '');
$excerpt = (string) ($post['excerpt'] ?? '');
$cat = (string) ($post['category'] ?? '');
$read = (int) ($post['read_minutes'] ?? 5);
$g = (string) ($post['gradient'] ?? 'a');
if (!in_array($g, ['a', 'b', 'c'], true)) {
    $g = 'a';
}
$body = (string) ($post['body'] ?? '');
$ctaLabel = (string) ($post['cta_label'] ?? 'Contacto');
$ctaUrl = (string) ($post['cta_url'] ?? 'contact.html');

$pageTitle = $title . ' — Blog iTCS';
$pageDesc = $excerpt !== '' ? $excerpt : $title;
require __DIR__ . '/includes/blog_page_start.php';
?>
            <section id="subheader" class="section-dark bg-dark text-light relative jarallax">
                <div class="gradient-edge-top"></div>
                <img src="images/background/3.webp" class="jarallax-img" alt="">
                <div class="container relative z-2">
                    <div class="row gy-4 gx-5 align-items-center">
                        <div class="spacer-double sm-hide"></div>
                        <div class="col-lg-10">
                            <div class="subtitle s2 mb-2"><?= htmlspecialchars($cat, ENT_QUOTES, 'UTF-8') ?> · ~<?= $read ?> min</div>
                            <h1 class="mb-0 wow fadeInUp" data-wow-delay=".2s"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></h1>
                            <ul class="crumb wow fadeInUp">
                                <li><a href="index.html">Inicio</a></li>
                                <li><a href="blog.html">Blog</a></li>
                                <li class="active"><?= htmlspecialchars($title, ENT_QUOTES, 'UTF-8') ?></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section class="pt-5 pb-5">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="itcs-blog-thumb itcs-blog-card-bg--<?= htmlspecialchars($g, ENT_QUOTES, 'UTF-8') ?> rounded-1 mb-4" style="height: 12rem;" role="img" aria-label=""></div>
                            <div class="itcs-blog-body">
                                <?= $body ?>
                            </div>
                            <div class="spacer-single"></div>
                            <a href="<?= htmlspecialchars($ctaUrl, ENT_QUOTES, 'UTF-8') ?>" class="btn-main fx-slide"><span><?= htmlspecialchars($ctaLabel, ENT_QUOTES, 'UTF-8') ?></span></a>
                            <p class="mt-4 mb-0"><a href="blog.html" class="text-muted">← Volver al blog</a></p>
                        </div>
                    </div>
                </div>
            </section>
<?php require __DIR__ . '/includes/blog_page_end.php';
