# Installation de Payload

---

## Prérequis logiciels

Payload nécessite les éléments suivants :

- Un gestionnaire de paquets JavaScript (Yarn, NPM, ou pnpm - **pnpm est préféré**)
- Node.js version 20.9.0 ou plus
- Une base de données compatible (MongoDB ou Postgres)

**Important** : Assurez-vous que ces prérequis sont remplis avant de continuer.

---

## Démarrage rapide avec `create-payload-app`

Pour créer rapidement une application Payload, exécutez la commande suivante :

```bash
npx create-payload-app
```

Suivez les instructions ! Cette commande crée un nouveau dossier contenant une application Payload fonctionnelle que vous pouvez configurer immédiatement.

---

## Ajouter Payload à une application existante

Payload peut être intégré à une application Next.js existante de manière très simple.

### Si vous avez déjà une application Next.js :

- Exécutez `npx create-payload-app` dans le dossier de votre projet Next.js.
- **Ou** suivez les étapes manuelles ci-dessous.

### Si vous n’avez pas encore d’application Next.js :

- Créez une nouvelle application Next.js avec la commande suivante :
  ```bash
  npx create-next-app
  ```
- Puis, suivez les étapes manuelles ci-dessous pour installer Payload.

---

## Étapes d'installation manuelle

### 1. Installer les paquets nécessaires

Ajoutez les paquets requis à votre projet avec la commande suivante (remplacez `pnpm` par votre gestionnaire de paquets si nécessaire) :

```bash
pnpm i payload @payloadcms/next @payloadcms/richtext-lexical sharp graphql
```

#### Installer un Database Adapter

Payload nécessite un **Database Adapter** pour se connecter à une base de données. Installez-en un avec l'une des commandes suivantes :

**Pour MongoDB** :

```bash
pnpm i @payloadcms/db-mongodb
```

**Pour Postgres** :

```bash
pnpm i @payloadcms/db-postgres
```

> **Note** : De nouveaux Database Adapters sont régulièrement ajoutés. Consultez la documentation officielle pour la liste mise à jour.

---

### 2. Copier les fichiers Payload dans le dossier `/app` de Next.js

Payload fonctionne dans le dossier `/app` de votre projet Next.js. Vous devrez copier certains fichiers spécifiques dans ce dossier. Ces fichiers sont disponibles dans le **Blank Template** sur GitHub.

Une fois les fichiers en place, votre structure devrait ressembler à ceci :

```
app/
├─ (payload)/
│  ├─ // Fichiers Payload
├─ (my-app)/
│  ├─ // Fichiers de votre application
```

> **Note** : Vous pouvez nommer le dossier `(my-app)` comme vous le souhaitez. Les noms courants incluent `(frontend)` ou `(app)`.

Ces fichiers ne sont pas régénérés et ne changent jamais. Une fois configurés, vous n'aurez plus besoin de les modifier.

---

### 3. Ajouter le plugin Payload à la configuration Next.js

Payload utilise un plugin pour assurer la compatibilité avec des paquets comme `mongodb` ou `drizzle-kit`.

Modifiez votre fichier `next.config.js` pour inclure `withPayload` :

```javascript
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration Next.js
  experimental: {
    reactCompiler: false,
  },
}

// Ajoutez le plugin Payload
export default withPayload(nextConfig)
```

#### Important :

- Payload est un projet entièrement en ESM. Configurez votre projet pour utiliser ESM en ajoutant `"type": "module"` à votre fichier `package.json`.
- Ou bien, renommez votre fichier `next.config.js` en `next.config.mjs`.

---

### 4. Créer un fichier de configuration Payload

Créez un fichier `payload.config.ts` à la racine de votre projet ou à côté du dossier `/app`. Voici un exemple minimal :

```typescript
import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'

export default buildConfig({
  editor: lexicalEditor(), // Pour Rich Text (optionnel)
  collections: [], // Définissez vos collections ici
  secret: process.env.PAYLOAD_SECRET || '', // Secret sécurisé
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '', // URI de votre base de données
  }),
  sharp, // Nécessaire pour gérer les images (optionnel)
})
```

Ajoutez également un chemin vers cette configuration dans votre fichier `tsconfig.json` :

```json
{
  "compilerOptions": {
    "paths": {
      "@payload-config": ["./payload.config.ts"]
    }
  }
}
```

> **Remarque** : Consultez la documentation officielle pour la liste complète des options de configuration disponibles.

---

### 5. Démarrer le projet

Pour lancer votre projet, utilisez la commande suivante dans votre dossier d'application :

```bash
pnpm dev
```

> Remplacez `pnpm` par votre gestionnaire de paquets si nécessaire.

Accédez à [http://localhost:3000/admin](http://localhost:3000/admin) pour créer votre premier utilisateur Payload !
