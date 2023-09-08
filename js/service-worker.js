var name = 'espeka';
var urls = [
    '/',
    '/css/atlantis.min.css',
    '/css/bootstrap.min.css',
    '/css/custom.css',
    '/img/bg-math.png',
    '/img/icon.ico',
    '/img/logo-secondary.png',
    '/img/logo-white.png',
    '/js/atlantis.min.js',
    '/js/bootstrap.min.js',
    '/js/fontawesome.min.js',
    '/js/jquery.min.js',
    '/js/listener.js',
    '/js/popper.min.js',
    '/js/solver.js'
];

addEventListener('install', function (e) {
    e.waitUntil(caches.open(name).then(function (c) {
        return c.addAll(urls);
    }));
});

addEventListener('fetch', function (e) {
    e.respondWith(caches.match(e.request).then(function (r) {
        if (r) {
            return r;
        }
        return fetch(e.request);
    }));
});

addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (n) {
        return Promise.all(n.filter(function (c) {
            return c != name;
        }).map(function (c) {
            return caches.delete(c);
        }));
    }));
});