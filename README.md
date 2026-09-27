# Videojuego 404

Mini juego web de tres niveles. Cada nivel se desarrolla y publica en su propio commit.

## Nivel 1: La puerta bloqueada

Introduce el código secreto `2026` para abrir la puerta. El juego está hecho con HTML, CSS y JavaScript y funciona en escritorio y móvil.

## Ejecutar

Abre `index.html` en un navegador. No requiere instalación ni servidor.

## Publicar cambios

Usa un commit descriptivo por nivel, por ejemplo:

```sh
git add index.html styles.css script.js README.md .gitignore
git commit -m "Nivel 1: abre la puerta con el codigo secreto"
git push -u origin main
```

No agregues `.env` al repositorio; puede contener secretos.