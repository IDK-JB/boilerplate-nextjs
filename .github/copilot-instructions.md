---
applyTo: "**"
---
# DIRECTIVES D'ARCHITECTURE ET DE DÉVELOPPEMENT

Ce document définit les règles architecturales strictes du projet Next.js (App Router). Toute génération de code ou modification doit se conformer aux principes suivants.

## 1. HIERARCHIE DES COMPOSANTS (DESIGN ATOMIQUE ADAPTÉ)

La structure des composants combine le Design Atomique pour les éléments globaux et la colocation pour les éléments spécifiques aux routes.

**Composants Globaux (`src/components/`)**

* `src/components/ui/` (Atomes) : Éléments d'interface de base, indivisibles, agnostiques, sans logique métier ni dépendance asynchrone (ex: Button, Input, Badge).
* `src/components/molecules/` : Combinaisons d'atomes formant une unité UI avec une logique locale uniquement (ex: SearchBar, Input avec Label et gestion d'erreur UI).
* `src/components/organisms/` : Blocs fonctionnels majeurs et autonomes combinant atomes et molécules. Peuvent interagir avec le store client ou déclencher des Server Actions (ex: Header, Sidebar, DataTables).
* `src/components/form/` : Composants de formulaires complexes mais réutilisables transversalement.

**Composants Locaux (`src/app/[route]/_components/`)**

* Tout composant ayant une utilité exclusive à une page ou une route spécifique doit être colocalisé dans un dossier `_components/` au sein de cette route. Ne jamais polluer le dossier global `src/components/` avec des éléments à usage unique.

## 2. GESTION DES DONNÉES, MUTATIONS ET INTERCEPTIONS (PROXY)

Le projet repose sur l'architecture orientée fonctionnalités (Feature-Sliced Design) native de Next.js.

* **Proxy (anciennement Middleware) :** L'interception des requêtes (redirections, réécritures, vérification de session réseau) s'effectue via le fichier **`src/proxy.ts`** situé à la racine du dossier `src`. Il remplace l'ancien concept de `middleware.ts` et s'exécute sur le runtime Node.js.
* **Récupération (Fetch) :** Les requêtes Drizzle sont exécutées directement dans les Server Components (`page.tsx`, `layout.tsx`). Aucune couche de service ou de repository abstraite n'est autorisée.
* **Mutations :** Les modifications d'état serveur s'effectuent via des Server Actions (fonctions asynchrones `"use server"`). Ces actions sont colocalisées dans le fichier du Server Component ou dans un fichier `actions.ts` situé dans le même dossier que le composant client qui les invoque.

## 3. SÉPARATION DE LA LOGIQUE (`lib` vs `utils`)

La distinction est basée sur la pureté des fonctions et les effets de bord. La structure est plate.

**Logique Globale**

* `src/utils/` : Fonctions pures et déterministes. Aucun effet de bord, aucune interaction réseau, aucune dépendance externe lourde (ex: formatage de dates, manipulation de classes CSS, calculs mathématiques).
* `src/lib/` : Code impur et infrastructure. Instanciations de services, connecteurs de base de données, wrappers d'API (ex: `db.ts`, `redis.ts`, `auth.ts`).

**Logique Locale**

* Si une fonction utilitaire ou une configuration n'est pertinente que pour une route spécifique, elle doit être colocalisée (ex: `src/app/[route]/_utils/` ou `src/app/[route]/_lib/`).

## 4. ÉTAT ET CACHE

La séparation entre l'état client et l'état serveur est stricte. L'état serveur ne doit jamais être dupliqué dans l'état client.

* **État Client (Zustand - `src/store/`) :** Strictement limité à l'état éphémère de l'interface utilisateur nécessitant une réactivité globale côté client (ex: thème, état de menus globaux, formulaires multi-étapes non soumis).
* **Cache et État Serveur (Redis & Next.js) :** * La majorité des données est gérée par le Data Cache / Router Cache de Next.js.
* L'invalidation du cache suite à une mutation s'effectue via `revalidatePath` ou `revalidateTag`.
* Les données nécessitant un cache serveur externe ou un stockage clé-valeur rapide sont gérées via Redis (`src/lib/redis.ts`).