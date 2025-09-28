# 🗺️ Guide de Correspondance Code/Zone - Electro'colo

## 📄 Page d'Accueil (index.html)

### Header (En-tête)
```html
<header class="header" role="banner">
```
- **Logo** : `<div class="header__logo">`
- **Nom de l'entreprise** : `<span>Electro'colo</span>`
- **Menu burger** : `<button class="header__burger">`
- **Navigation** : `<nav class="header__nav">`

### Hero Section (Section Principale)
```html
<section class="hero">
```
- **Titre principal** : `<h1>Ressourcerie Solidaire Electro'colo</h1>`
- **Sous-titre** : `<p>Électroménager reconditionné...</p>`
- **Boutons d'action** : `<div class="hero__actions">`

### Section Missions
```html
<section class="section">
    <h2>Nos missions</h2>
    <div class="missions">
```
- **Carte Solidarité** : `<div class="mission-card">` (première carte)
- **Carte Écologie** : `<div class="mission-card">` (deuxième carte)
- **Carte Économie circulaire** : `<div class="mission-card">` (troisième carte)

### Section Produits
```html
<section class="section produits">
    <h2>Nos appareils reconditionnés</h2>
    <div class="product-grid">
```
- **Cafetière** : `<div class="product-card">` (première carte)
- **Micro-ondes** : `<div class="product-card">` (deuxième carte)
- **Grille-pain** : `<div class="product-card">` (troisième carte)
- **Robot** : `<div class="product-card">` (quatrième carte)

### Footer (Pied de page)
```html
<footer class="footer">
```
- **Réseaux sociaux** : `<div style="display: flex; gap: 1rem;">`
- **Copyright** : `<p>&copy; 2024 Ressourcerie Éco-Électro...</p>`

## 🛍️ Page Produits (products.html)

### Filtres
```html
<section class="filters">
```
- **Catégories** : `<div class="categories-besoins">`
- **Filtres spéciaux** : `<div class="filters__special">`

### Statistiques
```html
<section class="stats">
```
- **500+ Familles** : `<div class="stat-card">` (première)
- **2 tonnes** : `<div class="stat-card">` (deuxième)
- **18 mois** : `<div class="stat-card">` (troisième)
- **-75%** : `<div class="stat-card">` (quatrième)

### Grille Produits
```html
<section class="products-grid">
```
- Chaque produit a sa propre `<div class="product-card">`

## 🛠️ Page Ateliers (ateliers.html)

### Grille Ateliers
```html
<section class="ateliers-grid">
```
- **Repair Café** : `<div class="atelier-card" data-type="reparation">`
- **Initiation Électronique** : `<div class="atelier-card" data-type="formation">`
- **Sensibilisation** : `<div class="atelier-card" data-type="sensibilisation">`
- **Événement Familial** : `<div class="atelier-card" data-type="sensibilisation">`

### Formulaire d'Inscription
```html
<section class="inscription-form" id="inscription">
```

## 📞 Page Contact (contact.html)

### Informations de Contact
```html
<div class="contact-info">
```
- **Adresse** : `<div class="info-item">` (première)
- **Téléphone** : `<div class="info-item">` (deuxième)
- **Email** : `<div class="info-item">` (troisième)

### Formulaire de Contact
```html
<div class="contact-form">
```

### Horaires
```html
<section class="horaires">
```

### Services
```html
<section class="services">
```

## 🎨 Fichiers CSS Correspondants

- **Page d'accueil** : `Styles/styleAccueil.css`
- **Page produits** : `Styles/styleProduct.css`
- **Page ateliers** : `Styles/styleAteliers.css`
- **Page contact** : `Styles/styleContact.css`

## 📱 Fichiers JavaScript

- **Navigation** : `JS/navigation.js`
- **Page d'accueil** : `JS/accueil.js`
- **Page produits** : `JS/products.js`
- **Page ateliers** : `JS/ateliers.js`
- **Page contact** : `JS/contact.js`
