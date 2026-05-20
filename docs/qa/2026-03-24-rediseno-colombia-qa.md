# Evidencia QA: Localización Colombia y Rediseño UI

## Objetivo
Validar que la aplicación quedó localizada para Pasto, Colombia, que eliminó emojis visibles, que el rediseño mantiene los flujos principales y que el entregable cumple con criterios básicos de calidad para la materia.

## Alcance validado
- Localización del perfil y datos mock visibles.
- Recompensas del perfil con marcas colombianas.
- Eliminación de emojis en interfaz y contenido renderizado.
- Conservación de flujos base: login, navegación, publicación y reclamo.
- Verificación estática del proyecto con pruebas, lint y build.

## Casos de prueba
| ID | Tipo | Caso | Pasos | Resultado esperado |
| --- | --- | --- | --- | --- |
| QA-01 | Funcional | Login lleva al inicio | Abrir app, pulsar `Iniciar Sesión` | Se muestra la pantalla principal |
| QA-02 | Contenido | Perfil localizado | Ir a `Perfil` | Aparece `Pasto, Colombia` |
| QA-03 | Contenido | Recompensas colombianas | Ir a `Perfil` y revisar recompensas | Se ven `Rappi`, `Cruz Verde`, `Juan Valdez`, `Cine Colombia`, `Éxito` |
| QA-04 | Regresión | Sin referencias venezolanas | Revisar home y perfil | No aparece `Caracas` ni `Venezuela` |
| QA-05 | UI | Sin emojis visibles | Revisar textos, toasts, badges, recompensas y placeholders | No se muestran emojis en la UI |
| QA-06 | Funcional | Publicar hallazgo | Abrir `Publicar` | Formulario carga con labels e inputs correctos |
| QA-07 | Funcional | Reclamar objeto | Abrir un detalle y pulsar `Enviar Reclamo` | Se muestra estado de reclamo enviado |
| QA-08 | Navegación | Acceso a perfil | Hacer login, pulsar `Perfil` | Perfil abre sin errores |
| QA-09 | Calidad estática | Lint | Ejecutar `npm run lint` | Sin errores |
| QA-10 | Calidad técnica | Build | Ejecutar `npm run build` | Compilación exitosa |

## Evidencia automatizada
- `npm test`
- `npm run lint`
- `npm run build`

## Evidencia visual incluida
- Recompensas con logos de marca en `Perfil`.
- `Cine Colombia` presentado en formato apilado (`Cine` / `Colombia`) para evitar una marca demasiado horizontal.
- Reemplazo de la recompensa cafetera por `Juan Valdez`.

## Resultado esperado del entregable
- La app se ve consistente con una identidad más sobria y menos genérica.
- Todo el contenido visible queda alineado con Pasto, Colombia.
- Las pantallas principales siguen funcionando luego del rediseño.
