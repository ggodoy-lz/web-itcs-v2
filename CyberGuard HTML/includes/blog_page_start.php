<?php
/** @var string $pageTitle */
/** @var string $pageDesc */
$pageTitle = $pageTitle ?? 'Blog — iTCS S.A.';
$pageDesc = $pageDesc ?? 'Artículos sobre tecnología, ciberseguridad e infraestructura en Paraguay — iTCS.';
?><!DOCTYPE html>
<html lang="es">
<head>
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?></title>
    <link rel="icon" href="images/favicon-itcs.png" type="image/png" sizes="32x32">
    <link rel="icon" href="images/favicon-itcs.png" type="image/png" sizes="16x16">
    <link rel="apple-touch-icon" href="images/apple-touch-icon-itcs.png" sizes="180x180">
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="<?= htmlspecialchars($pageDesc, ENT_QUOTES, 'UTF-8') ?>" name="description">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,800&family=Inter:wght@400;600;800&family=Manrope:wght@400;600;800&family=Outfit:wght@400;600;800&family=Plus+Jakarta+Sans:wght@400;600;800&family=Space+Grotesk:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet">
    <script>
        (function () {
            try {
                var t = localStorage.getItem("itcs-theme");
                if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
                var f = localStorage.getItem("itcs-font");
                if (f) document.documentElement.setAttribute("data-font", f);
            } catch (e) {}
        })();
    </script>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" id="bootstrap">
    <link href="css/plugins.css" rel="stylesheet" type="text/css">
    <link href="css/style.css" rel="stylesheet" type="text/css">
    <link id="colors" href="css/colors/scheme-1.css" rel="stylesheet" type="text/css">
    <link href="css/itcs-theme.css" rel="stylesheet" type="text/css">
</head>
<body>
    <div id="wrapper">
        <div class="float-text show-on-scroll"><span><a href="#">Ir arriba</a></span></div>
        <div class="scrollbar-v show-on-scroll"></div>
        <div id="de-loader"></div>
        <header>
            <div id="topbar">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="d-flex justify-content-between align-items-center flex-wrap xs-hide">
                                <div class="d-flex flex-wrap">
                                    <div class="topbar-widget me-3"><a href="contact.html"><i class="icofont-location-pin"></i>Asunción, Paraguay</a></div>
                                    <div class="topbar-widget me-3"><a href="tel:+595217288222"><i class="icofont-phone"></i>+595 21 728-8222</a></div>
                                    <div class="topbar-widget me-3"><a href="mailto:info@itcs.com.py"><i class="icofont-envelope"></i>info@itcs.com.py</a></div>
                                </div>
                                <div class="itcs-accessibility d-flex align-items-center gap-2 mt-2 mt-lg-0">
                                    <label class="visually-hidden" for="itcs-font-select">Familia tipográfica</label>
                                    <select id="itcs-font-select" class="form-select form-select-sm" aria-label="Elegir fuente del sitio">
                                        <option value="inter">Inter</option>
                                        <option value="plus-jakarta">Plus Jakarta Sans</option>
                                        <option value="outfit">Outfit</option>
                                        <option value="space-grotesk">Space Grotesk</option>
                                        <option value="dm-sans">DM Sans</option>
                                        <option value="manrope">Manrope</option>
                                        <option value="source-sans">Source Sans 3</option>
                                    </select>
                                    <button type="button" class="btn-itcs-theme btn btn-sm">Oscuro</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="de-flex sm-pt10">
                            <div class="de-flex-col">
                                <div id="logo">
                                    <a href="index.html">
                                        <img class="logo-main itcs-logo-header-w" src="images/logos/logo-itcs-blanco.webp" alt="iTCS S.A.">
                                        <img class="logo-mobile" src="images/logos/logo-itcs-blanco.webp" alt="iTCS S.A.">
                                    </a>
                                </div>
                            </div>
                            <div class="de-flex-col header-col-mid">
                                <ul id="mainmenu">
                                    <li><a class="menu-item" href="index.html">Inicio</a></li>
                                    <li><a class="menu-item" href="about.html">Empresa</a>
                                        <ul>
                                            <li><a href="about.html">Quiénes somos</a></li>
                                            <li><a href="partners.html">Partners</a></li>
                                            <li><a href="certificaciones.html">Certificaciones</a></li>
                                            <li><a href="politicas.html">Políticas ISO</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="menu-item" href="partners.html">Partners</a></li>
                                    <li><a class="menu-item" href="services.html">Servicios</a>
                                        <ul>
                                            <li><a href="services.html#infra">Infraestructura &amp; Productividad</a></li>
                                            <li><a href="services.html#ciber">Ciberseguridad</a></li>
                                            <li><a href="services.html#net">Networking &amp; Telecomunicaciones</a></li>
                                            <li><a href="services.html#bd">Base de Datos</a></li>
                                            <li><a href="services.html#dev">Desarrollo de Sistemas</a></li>
                                            <li><a href="services.html#backup">Backup &amp; Continuidad</a></li>
                                            <li><a href="services.html#mision">Cómputo de Misión Crítica</a></li>
                                            <li><a href="services.html#soporte">Soporte Técnico</a></li>
                                            <li><a href="services.html#obras">Obras Civiles</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="menu-item" href="productos.html">Productos</a>
                                        <ul>
                                            <li><a href="producto-veeam.html">Veeam</a></li>
                                            <li><a href="producto-sophos.html">Sophos</a></li>
                                            <li><a href="producto-prtg.html">PRTG Monitor</a></li>
                                            <li><a href="producto-hpe.html">HPE</a></li>
                                            <li><a href="producto-aruba.html">Aruba</a></li>
                                            <li><a href="producto-motor-gestion.html">Motor de Gestión</a></li>
                                            <li><a href="producto-samsung.html">Samsung</a></li>
                                        </ul>
                                    </li>
                                    <li><a class="menu-item" href="blog.html">Blog</a></li>
                                </ul>
                            </div>
                            <div class="de-flex-col">
                                <div class="menu_side_area">
                                    <a href="contact.html" class="btn-main fx-slide"><span>Contacto</span></a>
                                    <span id="menu-btn"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div class="no-bottom no-top" id="content">
            <div id="top"></div>
