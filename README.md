# Gestion des Décaissements AMO

> Administrative payment management portal for Moroccan Compulsory Health Insurance (AMO)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-demo-green.svg)]()
[![Version](https://img.shields.io/badge/version-06%2F2024-orange.svg)]()

---

## 📋 Overview

**Gestion des Décaissements AMO** is a web-based administrative portal designed for Moroccan social security and health insurance agencies (CNSS, mutual insurance companies, etc.). It allows authorized agents to **consult, track, and manage payment orders** (décaissements) issued to insured individuals under the *Assurance Maladie Obligatoire* (AMO).

The application provides a complete, multi-screen workflow from authentication to detailed payment history, enabling efficient back-office operations.

---

## 🎯 Purpose

| Feature | Description |
|---------|-------------|
| **No database required** | Uses mock data for demonstration |
| **Pure frontend** | HTML/CSS/JS only – no backend needed |
| **Production-ready UI** | Clean, professional French administrative interface |
| **Fully responsive** | Works on desktop, tablet, and mobile |
| **Complete navigation** | All 5 screens with working buttons |

---

## 🖥️ Screens (5 Screens)

| # | Screen Name | Description |
|---|-------------|-------------|
| 1 | **Connexion** | Login page – no sign-up, any credentials work |
| 2 | **Consultation décaissement** | Search/filter payment orders by multiple criteria |
| 3 | **OP Assuré** | List of payment orders with status, amount, references |
| 4 | **Historique Situation** | Status change audit trail |
| 5 | **Détails Assuré** | Complete details of a single payment order |

---


---

## 🚀 Demo

### Live Preview

Open `index.html` in any modern browser – no installation required.

### Default Login

| Field | Value (any works) |
|-------|-------------------|
| Identifiant | `agent` (or anything) |
| Mot de passe | `anything` |

> ⚠️ This is a **demo version** with mock authentication. Do not use with real sensitive data.

---
---
## 📁 File Structure
gestion-decaissements-amo/
│
├── index.html # Complete application (all screens + logic)
├── README.md # This file
└── LICENSE # MIT License (optional)
---
🎨 Design System
Element	Style
Primary Color	#1e466e (dark blue)
Secondary	#e2e8f0 (light gray)
Background	#eef2f5
Border Radius	20px (cards), 40px (buttons)
Font	Arial / Segoe UI, sans-serif
Responsive	Yes – mobile-first
📊 Mock Data
The application includes realistic mock data:

Payment Orders (9 rows)
Type	Date	Montant	Etat
MO	01/06/2021	245.00	Genere apres deblocage
MO	01/07/2021	499.80	Genere apres deblocage
MO	23/09/2021	5 250.00	Genere
...	...	...	...
Total Amount: 17 404.31 MAD

Status History (3 rows)
Numéro	Date	Motif	Situation	Utilisateur
OP-2021-001	10/05/2021	CRE	INIT	AG Rabat
OP-2021-001	01/06/2021	VAL	VALIDE	AG Casa
OP-2021-001	15/06/2021	DEB	PAYE	Téléservice

🧪 Testing
---
Test Case	Expected Result
Login with any credentials	Navigates to Consultation screen
Click [Annuler]	Clears all input fields
Click [Afficher]	Shows OP Assuré screen with table
Click on a table row	Row highlights (selected for Detail view)
Click [Historique]	Shows status history table
Click [Detail]	Shows details of selected payment order
Click [Retour] on any screen	Returns to previous screen
Click [Quitter]	Returns to login screen
---

