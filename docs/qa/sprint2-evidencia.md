# Evidencia QA — Sprint 2
**Fecha:** 2026-05-20
**Proyecto:** FoundFast — Plataforma de objetos perdidos y hallados
**Suite:** Vitest 3.2.4 · @vitest/coverage-v8 3.2.4 · React Testing Library 16

---

## Resumen de ejecución

```
Test Files  8 passed (8)
     Tests  15 passed (15)   ← eran 5, ahora son 15
  Start at  01:05:35
  Duration  4.54s
```

---

## Tests del Sprint 2 (nuevos)

| ID | Archivo | Caso | Resultado | KAN |
|----|---------|------|-----------|-----|
| TC-06 | not-found.test.tsx | NotFound muestra código 404 | PASS | KAN-23 |
| TC-07 | not-found.test.tsx | NotFound muestra mensaje comprensible | PASS | KAN-23 |
| TC-08 | not-found.test.tsx | NotFound tiene enlace para volver al inicio | PASS | KAN-23 |
| TC-09 | publish-screen-validation.test.tsx | No llama onPublish con campos vacíos | PASS | KAN-24 |
| TC-10 | publish-screen-validation.test.tsx | Muestra error de título cuando está vacío | PASS | KAN-24 |
| TC-11 | publish-screen-validation.test.tsx | Muestra error de ubicación cuando está vacío | PASS | KAN-24 |
| TC-12 | publish-screen-validation.test.tsx | Llama onPublish con todos los campos completos | PASS | KAN-24 |
| TC-13 | xss.test.tsx | Script tag se renderiza como texto plano | PASS | KAN-25 |
| TC-14 | xss.test.tsx | img tag con onerror no se inyecta en el DOM | PASS | KAN-25 |
| TC-15 | xss.test.tsx | HTML en descripción se renderiza como texto plano | PASS | KAN-25 |

---

## Cobertura de código (KAN-22)

Ejecutado con: `vitest run --coverage`
Reporte HTML guardado en: `docs/qa/coverage/`

### Componentes propios (src/components — excluye shadcn/ui)

| Archivo | Statements | Branches | Functions | Lines |
|---------|-----------|----------|-----------|-------|
| BottomNav.tsx | 100% | 100% | 100% | 100% |
| ClaimScreen.tsx | 91.86% | 42.85% | 33.33% | 91.86% |
| HomeScreen.tsx | 100% | 75% | 20% | 100% |
| InitialAvatar.tsx | 100% | 100% | 100% | 100% |
| LoginScreen.tsx | 100% | 33.33% | 25% | 100% |
| ProfileScreen.tsx | 100% | 90.9% | 100% | 100% |
| PublishScreen.tsx | 97.34% | 88.23% | 85.71% | 97.34% |
| RewardBrandLogo.tsx | 100% | 50% | 100% | 100% |
| **pages/NotFound.tsx** | **100%** | **100%** | **100%** | **100%** |
| pages/Index.tsx | 85% | 100% | 33.33% | 85% |

### Brechas identificadas para Sprint 3
- `NavLink.tsx` — 0% cobertura (componente sin test)
- `use-mobile.tsx` — 0% cobertura (hook sin test)
- `ClaimScreen.tsx` — branches 42.85% (flujos de error no cubiertos)
- `LoginScreen.tsx` — branches 33.33% (solo flujo feliz cubierto)

---

## Cambios de código implementados (KAN-27)

**Búsqueda textual — HomeScreen.tsx**
La búsqueda ahora filtra por título Y descripción:
```ts
const matchesSearch = !q || item.title.toLowerCase().includes(q)
                         || item.description.toLowerCase().includes(q);
```
Antes solo filtraba por título.

**Validación de formulario — PublishScreen.tsx**
Campos obligatorios: título, categoría, ubicación.
Si alguno está vacío al publicar, se muestra `<p role="alert">` con el mensaje de error y `onPublish` no se invoca.

---

## Lighthouse — KAN-26

**Estado:** Ejecutado con Brave (Chromium) en modo headless — 2026-05-20
**Reporte HTML:** `docs/qa/lighthouse-sprint2.html`

### Scores

| Categoría | Score |
|-----------|-------|
| Performance | **82 / 100** |
| Accessibility | 83 / 100 |
| Best Practices | **100 / 100** |
| SEO | **100 / 100** |

### Métricas de rendimiento (ISO/IEC 25010)

| Métrica | Medido | Meta ISO | Estado |
|---------|--------|----------|--------|
| First Contentful Paint (FCP) | 3.4 s | < 1.8 s | Necesita mejora |
| Largest Contentful Paint (LCP) | 3.4 s | < 2.5 s | Necesita mejora |
| Speed Index | 4.7 s | < 3.4 s | Necesita mejora |
| Total Blocking Time (TBT) | 0 ms | < 200 ms | Excelente |
| Time to Interactive (TTI) | 3.4 s | < 3.8 s | Cumple |
| Cumulative Layout Shift (CLS) | 0 | < 0.1 | Excelente |

**Análisis:** FCP y LCP elevados se explican porque el bundle JS (350 kB / 109 kB gzip) bloquea el render inicial. TBT de 0 ms indica que no hay tareas largas en el hilo principal. Optimización del bundle (code splitting, lazy loading de rutas) es la acción prioritaria para Sprint 3 o cuando se integre el backend.

**Bundle:** JS 350 kB / 109 kB gzip · CSS 68 kB / 12 kB gzip — Build: 3.65 s

---

## Atributos ISO/IEC 25010 cubiertos en Sprint 2

| Atributo | Brecha Sprint 1 | Evidencia Sprint 2 |
|----------|----------------|-------------------|
| Testeabilidad | Sin baseline de cobertura | Cobertura medida: 96%+ en componentes propios |
| Disponibilidad | Rutas inválidas no probadas | TC-06, TC-07, TC-08 — NotFound PASS |
| Seguridad Funcional | Validación de campos no probada | TC-09 a TC-12 — validación PASS |
| Seguridad | XSS no verificado | TC-13, TC-14, TC-15 — XSS PASS |
| Usabilidad | Búsqueda solo por título | Búsqueda extendida a título + descripción |
| Rendimiento | Sin métricas FCP/LCP/TTI | Pendiente Lighthouse manual |
