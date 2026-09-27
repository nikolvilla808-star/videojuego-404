# Videojuego 404

Mini juego web de tres niveles. Cada nivel se desarrolla y publica en su propio commit.

## Nivel 1: La puerta bloqueada

Introduce el código secreto `2026` para abrir la puerta. El juego está hecho con HTML, CSS y JavaScript y funciona en escritorio y móvil.

## Nivel 2: La bomba digital

Tras abrir la puerta, ERROR-404 activa una autodestrucción de 45 segundos. Resuelve `10 + 5 * 2` respetando la prioridad de operaciones y elige `20` para desactivar la bomba. Una respuesta incorrecta consume tiempo; si el contador llega a cero, se puede reiniciar el intento.

## Ejecutar

Abre `index.html` en un navegador. No requiere instalación ni servidor.

## Publicar cambios

Usa un commit descriptivo por nivel, por ejemplo:

```sh
git add index.html styles.css script.js README.md .gitignore
git commit -m "Nivel 2: desactiva la bomba digital"
git push -u origin main
```

No agregues `.env` al repositorio; puede contener secretos.