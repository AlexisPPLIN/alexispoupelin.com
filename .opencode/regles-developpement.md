# Règles de développement pour le site

## Organisation des fichiers CSS

Le site utilise une organisation de fichiers CSS modulaire pour une meilleure maintenabilité :

### Structure des fichiers CSS
- `_includes/css/main.css` : Styles généraux du site (héros, projets, statistiques, etc.)
- `_includes/css/blog/styles.css` : Styles spécifiques aux pages de blog (images, tags, métadonnées, etc.)
- Autres fichiers CSS spécifiques à des sections du site

### Bundle CSS
Le fichier `css-bundle.njk` combine tous les fichiers CSS nécessaires :

## Règles de développement pour les images de blog

### Ajout d'images dans les articles
Dans le frontmatter des articles Markdown :
```yaml
---
title: Mon article avec image
date: 2026-08-17
categories: ["javascript","cats"]
tags: ["tech", "tutorial"]
image: /img/blog/mon-article.jpg
---
```

## Règles de développement pour les tags

### Ajout de tags dans les articles
Dans le frontmatter des articles Markdown :
```yaml
---
title: Mon article avec tags
date: 2026-08-17
tags: ["tech", "tutorial", "javascript"]
---
```

## Structure de dossiers

```
_includes/
├── css/
│   ├── main.css
│   ├── blog/
│   │   └── styles.css
│   ├── footer.css
│   ├── mes-experiences.css
│   ├── mes-competences.css
│   └── theme-switcher.css
└── img/
    └── blog/
        └── (images de blog)
```

## Bonnes pratiques

1. **Séparation des responsabilités** : Chaque fichier CSS a une responsabilité claire
2. **Extensibilité** : Nouvelles sections peuvent ajouter leurs propres fichiers CSS
3. **Performance** : Utilisation de minification pour les fichiers CSS
4. **Maintenabilité** : Modification locale des styles sans impact sur d'autres parties