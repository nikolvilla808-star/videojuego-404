# Videojuego 404

Mini juego web de tres niveles. Cada nivel se desarrolla y publica en su propio commit.

## Nivel 1: La puerta bloqueada

Introduce el código secreto `2026` para abrir la puerta. El juego está hecho con HTML, CSS y JavaScript y funciona en escritorio y móvil.

## Nivel 2: La bomba digital

Tras abrir la puerta, ERROR-404 activa una autodestrucción. Resuelve `10 + 5 * 2` respetando la prioridad de operaciones y elige `20` para desactivar la bomba. Una respuesta incorrecta consume tiempo; si el contador llega a cero, se puede reiniciar el intento.

## Nivel 3: Hackear la terminal

Introduce una contraseña de cuatro números que empiece en `7`, termine en `3` y sume `18`. Por ejemplo, `7443` cumple las tres pistas. La validación acepta cualquier contraseña que satisfaga las reglas.

## Ejecutar

Abre `index.html` en un navegador. No requiere instalación ni servidor.

## Publicar cambios

Usa un commit descriptivo por nivel, por ejemplo:

```sh
git add index.html styles.css script.js README.md .gitignore
git commit -m "Nivel 3: hackea la terminal de ERROR-404"
git push -u origin main
```

No agregues `.env` al repositorio; puede contener secretos.