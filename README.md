# SWU Ladesäulen Proxy

Dieses kleine Script lädt die Infos zu den Ladesäulen in Ulm und bereitet das GeoJSON so auf, dass es in Digitransit mit einem Icon dargestellt wird. Außerdem werden attribute so aufbereitet, dass Standort und Status in Digitransit sichtbar werden. Die Daten werden alle 5 Minuten aktualisiert.

`node proxy.js 8080`