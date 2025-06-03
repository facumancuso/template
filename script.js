// Scripts optimizados con sistema de administración completo

// Configuración del usuario predefinido
const ADMIN_USER = {
    username: 'admin',
    password: 'admin123' // Cambia esta contraseña por una más segura
};

// Configuración por defecto del sitio
const DEFAULT_SETTINGS = {
    seo: {
        title: 'Tu Título SEO - Palabra Clave Principal',
        description: 'Descripción optimizada para SEO de máximo 160 caracteres que incluya tus palabras clave principales y sea atractiva para los usuarios.',
        keywords: 'palabra clave 1, palabra clave 2, palabra clave 3',
        author: 'Tu Nombre',
        canonicalUrl: 'https://tudominio.com/',
        ogImage: 'https://tudominio.com/imagen-compartir.jpg'
    },
    content: {
        logo: 'Tu Logo',
        heroTitle: 'Bienvenido a Tu Sitio Web Optimizado',
        heroDescription: 'Descripción atractiva de tu negocio o servicio que incluya palabras clave importantes y conecte con tu audiencia objetivo.',
        ctaText: 'Conoce Más',
        aboutTitle: 'Acerca de Nosotros',
        aboutContent: 'Aquí va el contenido sobre tu empresa o proyecto. Incluye palabras clave naturalmente y cuenta tu historia de manera que conecte con tu audiencia. Este contenido es importante para SEO y para generar confianza con tus visitantes.'
    },
    services: {
        title: 'Nuestros Servicios',
        items: [
            {
                title: 'Servicio 1',
                description: 'Descripción detallada del servicio que incluya palabras clave relevantes y beneficios para el cliente.'
            },
            {
                title: 'Servicio 2',
                description: 'Descripción detallada del servicio que incluya palabras clave relevantes y beneficios para el cliente.'
            },
            {
                title: 'Servicio 3',
                description: 'Descripción detallada del servicio que incluya palabras clave relevantes y beneficios para el cliente.'
            }
        ]
    },
    contact: {
        email: 'contacto@tudominio.com',
        phone: '+34 XXX XXX XXX',
        address: 'Tu dirección completa',
        facebook: 'https://facebook.com/tupagina',
        twitter: 'https://twitter.com/tupagina',
        instagram: 'https://instagram.com/tupagina'
    },
    ads: {
        adsenseId: 'ca-pub-XXXXXXXXXX',
        showAds: true,
        ad1Code: '',
        ad2Code: ''
    },
    analytics: {
        gaId: 'GA_MEASUREMENT_ID'
    }
};

// Verificar si el usuario ya está logueado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadSiteSettings();
    initializeAdminPanel();
});

// ===================== FUNCIONES DE AUTENTICACIÓN =====================

function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    clearLoginForm();
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('loginTime', Date.now().toString());
        
        closeLogin();
        updateUIForLoggedInUser();
        showSuccessMessage('¡Inicio de sesión exitoso!');
        loadAdminSettings();
        
        trackEvent('login', 'Authentication', 'Success');
    } else {
        showError(errorDiv, 'Usuario o contraseña incorrectos');
        trackEvent('login', 'Authentication', 'Failed');
    }
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('loginTime');
    updateUIForLoggedOutUser();
    showSuccessMessage('Sesión cerrada correctamente');
    trackEvent('logout', 'Authentication', 'Success');
}

function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const loginTime = sessionStorage.getItem('loginTime');
    
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 horas
    const currentTime = Date.now();
    
    if (isLoggedIn && loginTime && (currentTime - parseInt(loginTime)) < sessionDuration) {
        updateUIForLoggedInUser();
        loadAdminSettings();
    } else {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('loginTime');
        updateUIForLoggedOutUser();
    }
}

function updateUIForLoggedInUser() {
    const authLink = document.getElementById('auth-link');
    const adminPanel = document.getElementById('adminPanel');
    
    authLink.innerHTML = '<span class="user-indicator">👤 Admin</span> <a href="javascript:void(0)" onclick="logout()">Cerrar Sesión</a>';
    adminPanel.style.display = 'block';
}

function updateUIForLoggedOutUser() {
    const authLink = document.getElementById('auth-link');
    const adminPanel = document.getElementById('adminPanel');
    
    authLink.innerHTML = '<a href="javascript:void(0)" onclick="showLogin()">Iniciar Sesión</a>';
    adminPanel.style.display = 'none';
}

// ===================== SISTEMA DE ADMINISTRACIÓN =====================

function initializeAdminPanel() {
    // Agregar estilos CSS para el panel de administración
    addAdminStyles();
}

function showTab(tabId) {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover clase active de todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar pestaña seleccionada
    document.getElementById(tabId).classList.add('active');
    
    // Activar botón correspondiente
    event.target.classList.add('active');
}

function loadSiteSettings() {
    const settings = getSiteSettings();
    
    // Aplicar configuración SEO
    updateSEOElements(settings.seo);
    
    // Aplicar contenido
    updateContentElements(settings.content);
    
    // Aplicar servicios
    updateServicesElements(settings.services);
    
    // Aplicar contacto
    updateContactElements(settings.contact);
    
    // Aplicar anuncios
    updateAdsElements(settings.ads);
    
    // Aplicar analytics
    updateAnalyticsElements(settings.analytics);
}

function loadAdminSettings() {
    const settings = getSiteSettings();
    
    // Cargar valores en el panel de admin
    loadAdminSEOValues(settings.seo);
    loadAdminContentValues(settings.content);
    loadAdminServicesValues(settings.services);
    loadAdminContactValues(settings.contact);
    loadAdminAdsValues(settings.ads);
    loadAdminAnalyticsValues(settings.analytics);
}

// ===================== FUNCIONES DE ACTUALIZACIÓN SEO =====================

function updateSEO() {
    const seoData = {
        title: document.getElementById('admin-title').value,
        description: document.getElementById('admin-meta-desc').value,
        keywords: document.getElementById('admin-keywords').value,
        author: document.getElementById('admin-author').value,
        canonicalUrl: document.getElementById('admin-canonical').value,
        ogImage: document.getElementById('admin-og-image').value
    };
    
    updateSEOElements(seoData);
    saveSiteSettings('seo', seoData);
    showSuccessMessage('Configuración SEO actualizada');
}

function updateSEOElements(seoData) {
    // Actualizar title
    document.getElementById('page-title').textContent = seoData.title;
    document.title = seoData.title;
    
    // Actualizar meta tags
    updateMetaTag('meta-description', 'content', seoData.description);
    updateMetaTag('meta-keywords', 'content', seoData.keywords);
    updateMetaTag('meta-author', 'content', seoData.author);
    updateMetaTag('canonical-url', 'href', seoData.canonicalUrl);
    
    // Actualizar Open Graph
    updateMetaTag('og-title', 'content', seoData.title);
    updateMetaTag('og-description', 'content', seoData.description);
    updateMetaTag('og-image', 'content', seoData.ogImage);
    updateMetaTag('og-url', 'content', seoData.canonicalUrl);
    
    // Actualizar Twitter Cards
    updateMetaTag('twitter-title', 'content', seoData.title);
    updateMetaTag('twitter-description', 'content', seoData.description);
    updateMetaTag('twitter-image', 'content', seoData.ogImage);
    
    // Actualizar Schema.org
    updateSchemaData(seoData);
}

function updateMetaTag(id, attribute, value) {
    const element = document.getElementById(id);
    if (element) {
        element.setAttribute(attribute, value);
    }
}

function updateSchemaData(seoData) {
    const schemaWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": seoData.title,
        "url": seoData.canonicalUrl,
        "description": seoData.description
    };
    
    const schemaElement = document.getElementById('schema-website');
    if (schemaElement) {
        schemaElement.textContent = JSON.stringify(schemaWebsite);
    }
}

// ===================== FUNCIONES DE CONTENIDO =====================

function updateContent() {
    const contentData = {
        logo: document.getElementById('admin-logo').value,
        heroTitle: document.getElementById('admin-hero-title').value,
        heroDescription: document.getElementById('admin-hero-desc').value,
        ctaText: document.getElementById('admin-cta-text').value,
        aboutTitle: document.getElementById('admin-about-title').value,
        aboutContent: document.getElementById('admin-about-content').value
    };
    
    updateContentElements(contentData);
    saveSiteSettings('content', contentData);
    showSuccessMessage('Contenido actualizado');
}

function updateContentElements(contentData) {
    // Actualizar logo
    updateElementText('site-logo', contentData.logo);
    
    // Actualizar hero section
    updateElementText('hero-title', contentData.heroTitle);
    updateElementText('hero-description', contentData.heroDescription);
    updateElementText('cta-button', contentData.ctaText);
    
    // Actualizar about section
    updateElementText('about-title', contentData.aboutTitle);
    updateElementText('about-content', contentData.aboutContent);
    
    // Actualizar navegación footer
    updateElementText('footer-inicio', 'Inicio');
    updateElementText('footer-servicios', 'Servicios');
    updateElementText('footer-acerca', 'Acerca');
    updateElementText('footer-contacto', 'Contacto');
}

// ===================== FUNCIONES DE SERVICIOS =====================

function updateServices() {
    const servicesData = {
        title: document.getElementById('admin-services-title').value,
        items: []
    };
    
    // Recopilar servicios
    const serviceItems = document.querySelectorAll('#services-list .service-item');
    serviceItems.forEach((item, index) => {
        const title = item.querySelector('.service-title').value;
        const description = item.querySelector('.service-desc').value;
        
        if (title || description) {
            servicesData.items.push({
                title: title,
                description: description
            });
        }
    });
    
    updateServicesElements(servicesData);
    saveSiteSettings('services', servicesData);
    showSuccessMessage('Servicios actualizados');
}

function updateServicesElements(servicesData) {
    // Actualizar título de la sección
    updateElementText('services-section-title', servicesData.title);
    
    // Actualizar servicios individuales
    servicesData.items.forEach((service, index) => {
        updateElementText(`service-${index + 1}-title`, service.title);
        updateElementText(`service-${index + 1}-desc`, service.description);
    });
}

function addService() {
    const servicesList = document.getElementById('services-list');
    const serviceCount = servicesList.children.length + 1;
    
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-item';
    serviceItem.innerHTML = `
        <h4>Servicio ${serviceCount}</h4>
        <input type="text" class="service-title" placeholder="Título del servicio">
        <textarea class="service-desc" placeholder="Descripción del servicio"></textarea>
        <button onclick="removeService(this)" class="admin-btn danger">Eliminar</button>
    `;
    
    servicesList.appendChild(serviceItem);
}

function removeService(button) {
    button.parentElement.remove();
}

// ===================== FUNCIONES DE CONTACTO =====================

function updateContact() {
    const contactData = {
        email: document.getElementById('admin-email').value,
        phone: document.getElementById('admin-phone').value,
        address: document.getElementById('admin-address').value,
        facebook: document.getElementById('admin-facebook').value,
        twitter: document.getElementById('admin-twitter').value,
        instagram: document.getElementById('admin-instagram').value
    };
    
    updateContactElements(contactData);
    saveSiteSettings('contact', contactData);
    showSuccessMessage('Información de contacto actualizada');
}

function updateContactElements(contactData) {
    updateElementText('contact-email', contactData.email);
    updateElementText('contact-phone', contactData.phone);
    updateElementText('contact-address', contactData.address);
    
    // Actualizar enlaces de redes sociales
    updateElementLink('footer-facebook', contactData.facebook);
    updateElementLink('footer-twitter', contactData.twitter);
    updateElementLink('footer-instagram', contactData.instagram);
}

// ===================== FUNCIONES DE PUBLICIDAD =====================

function updateAds() {
    const adsData = {
        adsenseId: document.getElementById('admin-adsense-id').value,
        showAds: document.getElementById('admin-show-ads').value === 'true',
        ad1Code: document.getElementById('admin-ad1-code').value,
        ad2Code: document.getElementById('admin-ad2-code').value
    };
    
    updateAdsElements(adsData);
    saveSiteSettings('ads', adsData);
    showSuccessMessage('Configuración de anuncios actualizada');
}

function updateAdsElements(adsData) {
    // Actualizar script de AdSense
    if (adsData.adsenseId) {
        const adsenseScript = document.getElementById('google-adsense-script');
        adsenseScript.innerHTML = `
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsData.adsenseId}" crossorigin="anonymous"></script>
        `;
    }
    
    // Mostrar/ocultar anuncios
    const adSpaces = document.querySelectorAll('.ad-container');
    adSpaces.forEach(adSpace => {
        adSpace.style.display = adsData.showAds ? 'block' : 'none';
    });
    
    // Actualizar códigos de anuncios
    if (adsData.ad1Code) {
        document.getElementById('ad-space-1').innerHTML = adsData.ad1Code;
    }
    
    if (adsData.ad2Code) {
        document.getElementById('ad-space-2').innerHTML = adsData.ad2Code;
    }
}

// ===================== FUNCIONES DE ANALYTICS =====================

function updateAnalytics() {
    const analyticsData = {
        gaId: document.getElementById('admin-ga-id').value
    };
    
    updateAnalyticsElements(analyticsData);
    saveSiteSettings('analytics', analyticsData);
    showSuccessMessage('Google Analytics actualizado');
}

function updateAnalyticsElements(analyticsData) {
    if (analyticsData.gaId && analyticsData.gaId !== 'GA_MEASUREMENT_ID') {
        const gaScript = document.getElementById('google-analytics-script');
        gaScript.innerHTML = `
            <script async src="https://www.googletagmanager.com/gtag/js?id=${analyticsData.gaId}"></script>
            <script>
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analyticsData.gaId}');
            </script>
        `;
    }
}

// ===================== FUNCIONES DE CARGA DE VALORES EN ADMIN =====================

function loadAdminSEOValues(seoData) {
    setValue('admin-title', seoData.title);
    setValue('admin-meta-desc', seoData.description);
    setValue('admin-keywords', seoData.keywords);
    setValue('admin-author', seoData.author);
    setValue('admin-canonical', seoData.canonicalUrl);
    setValue('admin-og-image', seoData.ogImage);
}

function loadAdminContentValues(contentData) {
    setValue('admin-logo', contentData.logo);
    setValue('admin-hero-title', contentData.heroTitle);
    setValue('admin-hero-desc', contentData.heroDescription);
    setValue('admin-cta-text', contentData.ctaText);
    setValue('admin-about-title', contentData.aboutTitle);
    setValue('admin-about-content', contentData.aboutContent);
}

function loadAdminServicesValues(servicesData) {
    setValue('admin-services-title', servicesData.title);
    
    const serviceItems = document.querySelectorAll('#services-list .service-item');
    servicesData.items.forEach((service, index) => {
        if (serviceItems[index]) {
            serviceItems[index].querySelector('.service-title').value = service.title;
            serviceItems[index].querySelector('.service-desc').value = service.description;
        }
    });
}

function loadAdminContactValues(contactData) {
    setValue('admin-email', contactData.email);
    setValue('admin-phone', contactData.phone);
    setValue('admin-address', contactData.address);
    setValue('admin-facebook', contactData.facebook);
    setValue('admin-twitter', contactData.twitter);
    setValue('admin-instagram', contactData.instagram);
}

function loadAdminAdsValues(adsData) {
    setValue('admin-adsense-id', adsData.adsenseId);
    setValue('admin-show-ads', adsData.showAds.toString());
    setValue('admin-ad1-code', adsData.ad1Code);
    setValue('admin-ad2-code', adsData.ad2Code);
}

function loadAdminAnalyticsValues(analyticsData) {
    setValue('admin-ga-id', analyticsData.gaId);
}

// ===================== FUNCIONES AUXILIARES =====================

function updateElementText(id, text) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = text;
    }
}

function updateElementLink(id, url) {
    const element = document.getElementById(id);
    if (element) {
        element.href = url;
    }
}

function setValue(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.value = value || '';
    }
}

function getSiteSettings() {
    const stored = localStorage.getItem('siteSettings');
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
}

function saveSiteSettings(section, data) {
    const currentSettings = getSiteSettings();
    currentSettings[section] = data;
    localStorage.setItem('siteSettings', JSON.stringify(currentSettings));
}

function saveAllSettings() {
    updateSEO();
    updateContent();
    updateServices();
    updateContact();
    updateAds();
    updateAnalytics();
    showSuccessMessage('¡Todas las configuraciones guardadas exitosamente!');
}

// ===================== FUNCIONES DE UI Y UTILIDADES =====================

function showError(errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 1001;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

function clearLoginForm() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginError').classList.remove('show');
}

function addAdminStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .admin-panel {
            background: #f8f9fa;
            border-top: 3px solid #007bff;
            padding: 20px 0;
            margin-top: 20px;
        }
        
        .admin-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .tab-button {
            padding: 10px 20px;
            border: 1px solid #ddd;
            background: white;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .tab-button:hover {
            background: #f0f0f0;
        }
        
        .tab-button.active {
            background: #007bff;
            color: white;
            border-color: #007bff;
        }
        
        .tab-content {
            display: none;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .tab-content.active {
            display: block;
        }
        
        .form-group {
            margin-bottom: 15px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #333;
        }
        
        .form-group input, .form-group textarea, .form-group select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .form-group textarea {
            min-height: 80px;
            resize: vertical;
        }
        
        .admin-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            margin-right: 10px;
            margin-bottom: 10px;
            transition: all 0.3s ease;
        }
        
        .admin-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .admin-btn {
            background: #007bff;
            color: white;
        }
        
        .admin-btn.secondary {
            background: #6c757d;
            color: white;
        }
        
        .admin-btn.danger {
            background: #dc3545;
            color: white;
        }
        
        .admin-btn.primary {
            background: #28a745;
            color: white;
            font-weight: bold;
        }
        
        .service-item {
            border: 1px solid #ddd;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
            background: #f9f9f9;
        }
        
        .service-item h4 {
            margin-top: 0;
            color: #007bff;
        }
        
        .admin-actions {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
        }
        
        .user-indicator {
            color: #28a745;
            font-weight: bold;
            margin-right: 10px;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @media (max-width: 768px) {
            .admin-tabs {
                flex-direction: column;
            }
            
            .tab-button {
                text-align: center;
            }
            
            .admin-btn {
                width: 100%;
                margin-right: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLogin();
    }
}

// ===================== NAVEGACIÓN Y OPTIMIZACIONES =====================

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy loading mejorado para imágenes
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================== ANALYTICS Y TRACKING =====================

function trackEvent(action, category, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Tracking de clics en CTA
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('click', 'CTA', 'Hero Button');
        });
    });
});

// Tracking de tiempo en página
let startTime = Date.now();
window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    trackEvent('timing', 'Engagement', 'Time on Page', timeSpent);
});

// Performance monitoring
window.addEventListener('load', () => {
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
            trackEvent('performance', 'Core Web Vitals', 'LCP', Math.round(lastEntry.startTime));
        }).observe({entryTypes: ['largest-contentful-paint']});

        // First Input Delay
        new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
                trackEvent('performance', 'Core Web Vitals', 'FID', Math.round(entry.processingStart - entry.startTime));
            });
        }).observe({entryTypes: ['first-input']});
    }
});