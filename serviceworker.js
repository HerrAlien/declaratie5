/* declaratie2503 - a form to fill during these times

Copyright 2020 Herr_Alien <alexandru.garofide@gmail.com>

This program is free software: you can redistribute it and/or modify it under 
the terms of the GNU General Public License as published by the 
Free Software Foundation, either version 3 of the License, or (at your option)
any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

(function() {
var CACHE_PREFIX = 'Cache-for-declaratie-5';
var CACHE_VERSION = '3';
var CACHE_NAME = CACHE_PREFIX + '-' + CACHE_VERSION;

var urlsToCache = [
".",
"index.html",
"manifest.json",
"style.css",
"code.js",
"icon.png",
"icon-144.png",
"icon-192.png",
"icon-256.png",
"print.svg"
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil( caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

function cacheNameFromUrl (url) {
  return CACHE_NAME;
}


function fetchAndCache (req) {
  return fetch (req.clone()).then (resp => {
    if(!resp || resp.status !== 200 || resp.type !== 'basic') {
      return resp;
    }

    var responseToCache = resp.clone();

    caches.open(cacheNameFromUrl(responseToCache.url))
      .then(function(cache) {
        cache.put(req, responseToCache);
       });

    return resp;
  });
}

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          // analyze it
          return response.clone().blob().then(dataAsBlob => {

            if (!dataAsBlob || dataAsBlob.size == 0) {
              return fetchAndCache(event.request);
            }

            return response;
            
          });
         
        } else {
          return fetchAndCache (event.request);
        }
      }
    )
  );
});

function shouldDestroy(name){
    return ((name.startsWith(CACHE_PREFIX)) && (name != CACHE_NAME)) ;
}

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (shouldDestroy(cacheName)) {
            console.log("Deleting cache " + cacheName + " ...");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

})();
