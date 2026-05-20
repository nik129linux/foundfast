# FoundFast

Aplicación web académica para reportar objetos perdidos y facilitar su devolución. El proyecto está localizado para Pasto, Colombia, con rediseño visual, QA y evidencia de calidad basada en ISO/IEC 25010.

## Objetivo del proyecto

Permitir que una persona:

- reporte un objeto encontrado,
- revise publicaciones recientes,
- inicie un reclamo,
- consulte su perfil y recompensas,
- use una interfaz clara, localizada y consistente.

## Tecnologías usadas

- `React 18`
- `TypeScript`
- `Vite`
- `Tailwind CSS`
- `Vitest`
- `React Testing Library`

## Cómo ejecutar la app

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador:

```text
http://localhost:8080/
```

## Cómo mostrar la app en la exposición

Guion sugerido:

1. Abrir la app y explicar que está localizada para `Pasto, Colombia`.
2. Pulsar `Iniciar Sesión`.
3. Mostrar `Inicio` y resaltar referencias locales como `Plaza de Nariño` y `Universidad de Nariño`.
4. Ir a `Publicar` para enseñar el formulario de registro de objetos encontrados.
5. Ir a un objeto y mostrar el flujo de `Reclamo`.
6. Abrir `Perfil` para enseñar puntos, insignias y recompensas con marcas colombianas como `Rappi`, `Cruz Verde`, `Juan Valdez`, `Cine Colombia` y `Éxito`.

## Cómo mostrar los tests y validaciones

### Pruebas automatizadas

Ejecutar:

```bash
npm test
```

Esto corre las pruebas de:

- localización del perfil,
- referencias de Pasto en inicio,
- smoke test de login y navegación,
- estabilidad de `Publicar`,
- estabilidad de `Reclamar`.

### Lint

Ejecutar:

```bash
npm run lint
```

Sirve para demostrar revisión estática del código y consistencia básica de calidad.

### Build

Ejecutar:

```bash
npm run build
```

Sirve para demostrar que el proyecto compila correctamente para producción.

## Evidencia QA

La evidencia manual y funcional está documentada en:

- [docs/qa/2026-03-24-rediseno-colombia-qa.md](docs/qa/2026-03-24-rediseno-colombia-qa.md)

Ahí se encuentran:

- objetivo,
- alcance,
- matriz de casos de prueba,
- validaciones esperadas,
- evidencia estática y visual.

## Relación con ISO/IEC 25010

La ISO/IEC 25010 define características de calidad del software. En este proyecto se evidencian así:

| Característica | Cómo se evidencia en el proyecto |
| --- | --- |
| Adecuación funcional | La app permite login, consulta de objetos, publicación, reclamo y visualización de recompensas. |
| Eficiencia de desempeño | La navegación es ligera porque trabaja con datos mock y una interfaz web simple construida con Vite. |
| Compatibilidad | Se ejecuta en navegador y se adapta a una estructura responsive de aplicación web. |
| Usabilidad | La interfaz está en español, con jerarquía visual clara, navegación inferior y sin emojis distractores. |
| Fiabilidad | Se agregaron pruebas automatizadas y smoke tests para reducir regresiones en flujos clave. |
| Seguridad | El prototipo incorpora preguntas de verificación para reclamos, aunque no implementa autenticación real de backend. |
| Mantenibilidad | El código está separado en componentes, datos mock, registro de iconos y pruebas automatizadas. |
| Portabilidad | Cualquier entorno con `Node.js` y `npm` puede ejecutar la app con comandos estándar. |

## Qué decir sobre calidad en la exposición

Un resumen útil:

- Se aplicó localización real a Colombia y específicamente a Pasto.
- Se eliminó ruido visual como emojis para hacer la interfaz más sobria.
- Se mejoró la experiencia visual con recompensas de marcas reconocibles.
- Se añadieron pruebas automáticas para respaldar cambios funcionales.
- Se documentó una matriz QA para evidenciar control de calidad.
- Se puede relacionar el entregable con ISO/IEC 25010 desde funcionalidad, usabilidad, mantenibilidad y fiabilidad.

## Estructura útil del proyecto

- `src/components`: pantallas y componentes reutilizables.
- `src/data/mockData.ts`: datos mock localizados a Pasto.
- `src/test`: pruebas automatizadas.
- `public/brands`: logos usados en recompensas.
- `docs/qa`: documentación QA para la exposición.

## Comandos clave

```bash
npm run dev
npm test
npm run lint
npm run build
```

## Nota académica

Este proyecto funciona como prototipo frontend orientado a la materia de calidad de software. Por eso la evidencia más fuerte está en la interfaz, la documentación QA, la localización del contenido y la automatización de pruebas, no en una capa backend real.
