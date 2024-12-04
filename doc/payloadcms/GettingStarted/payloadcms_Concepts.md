# Payload Concepts

Payload repose sur un ensemble simple et intuitif de concepts haut niveau. Familiarisez-vous avec ces notions avant de travailler avec Payload pour établir un langage commun.

---

## Concepts Clés

### Config

- La configuration Payload est centrale et permet une personnalisation approfondie via une API intuitive.
- C'est un objet JavaScript entièrement typé et extensible.
- [Plus de détails](#).

---

### Database

- **Database agnostic** : Payload fonctionne avec n'importe quelle base de données grâce à un **Database Adapter**.
- [Plus de détails](#).

---

### Collections

- Une **Collection** est un groupe d'enregistrements (appelés Documents) partageant un même schéma.
- Chaque Collection est stockée en base de données selon les **Fields** que vous définissez.
- [Plus de détails](#).

---

### Globals

- Similaires aux Collections, mais correspondent à un seul Document unique.
- Stockés en base de données selon les **Fields** définis.
- [Plus de détails](#).

---

### Fields

- Les **Fields** définissent le schéma des Documents en base de données.
- Génèrent automatiquement l'UI correspondante dans l'Admin Panel.
- [Plus de détails](#).

---

### Hooks

- Permettent d'exécuter des effets secondaires pendant le cycle de vie des Documents (par ex. : avant lecture, après création, etc.).
- [Plus de détails](#).

---

### Authentication

- Gestion sécurisée et portable des comptes utilisateurs intégrée.
- Utilisable dans l'Admin Panel et les applications externes.
- [Plus de détails](#).

---

### Access Control

- Détermine ce qu'un utilisateur peut ou ne peut pas faire avec un Document (lecture, mise à jour, etc.).
- Contrôle également ce qui est visible dans l'Admin Panel.
- [Plus de détails](#).

---

### Admin Panel

- Interface dynamique, entièrement typée, générée automatiquement pour gérer vos données et utilisateurs.
- Construit avec **React** et le **Next.js App Router**.
- [Plus de détails](#).

---

## APIs Disponibles

Payload expose toutes ses fonctionnalités via trois API principales :

1. **Local API** - Accès direct et ultra rapide à la base de données.
2. **REST API** - Endpoints HTTP standard pour les requêtes.
3. **GraphQL API** - API GraphQL complète avec un Playground intégré.

### Local API

- Accès direct à la base de données sans surcharge HTTP.
- Entièrement typée avec TypeScript.
- Exemple d'utilisation dans un composant serveur React :

  ```typescript
  import React from 'react'
  import config from '@payload-config'
  import { getPayload } from 'payload'

  const MyServerComponent: React.FC = () => {
    const payload = await getPayload({ config })
    const findResult = await payload.find({ collection: 'pages' })

    return (
      <ul>
        {findResult.docs.map((page) => (
          <li key={page.id}>{page.title}</li>
        ))}
      </ul>
    )
  }
  ```

- [Plus de détails](#).

### REST API

- Montée automatiquement à `/api`.
- Exemple :
  ```javascript
  fetch('https://localhost:3000/api/pages')
    .then((res) => res.json())
    .then((data) => console.log(data))
  ```
- [Plus de détails](#).

### GraphQL API

- Expose des requêtes et mutations GraphQL via `/api/graphql`.
- Playground GraphQL disponible à `/api/graphql-playground`.
- Compatible avec des clients GraphQL comme :
  - `graphql-request`
  - `@apollo/client`
- [Plus de détails](#).

---

## Structure des Packages

Payload est divisé en packages dédiés pour rester léger. Installez uniquement ce dont vous avez besoin.

### Packages Principaux

#### `payload`

- Contient toute la logique centrale (CRUD, Hooks, Access Control, etc.).
- Utilisable dans n'importe quel environnement Node.js.
- Fournit toutes les définitions TypeScript nécessaires.

Exemple d'import :

```typescript
import { Config, CollectionConfig, GlobalConfig, Field } from 'payload'
```

#### `@payloadcms/next`

- Responsable de l'Admin Panel et de la couche HTTP (REST et GraphQL).

#### `@payloadcms/graphql`

- Contient toutes les fonctionnalités GraphQL, sans impact sur les performances si non utilisé.

#### `@payloadcms/ui`

- Librairie utilisée par l'Admin Panel.
- Permet de réutiliser les composants dans vos propres extensions ou apps React.

#### Adapters pour bases de données

- `@payloadcms/db-postgres`
- `@payloadcms/db-vercel-postgres`
- `@payloadcms/db-mongodb`

Choisissez un seul adapter pour un projet donné.

#### Rich Text

- Packages disponibles :
  - `@payloadcms/richtext-lexical` (recommandé pour les nouveaux projets)
  - `@payloadcms/richtext-slate` (supporté mais moins recommandé).
- Rich Text est optionnel.
