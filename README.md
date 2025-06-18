# Product Catalog Dashboard

This is a full-stack web application built with **Angular 20+** and **Node.js + LowDB**.  
The app allows users to view, search, filter, sort, and manage a catalog of products.

## Tech Stack

- **Frontend**: Angular 20 (Standalone API), TailwindCSS
- **Backend**: Node.js + Express + LowDB (lightweight JSON database)
- **Mock Data**: Stored in `db.json`
- **Unit Testing**: Karma + Jasmine

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/product-dashboard.git
cd product-dashboard
```

### 2. Install dependencies

#### For frontend
```bash
cd frontend
npm install
```

#### For backend
```bash
cd ../backend
npm install
```

### 3. Run the backend

```bash
cd backend
node index.js
```
#### Runs on http://localhost:3000

### 4. Run the frontend

```bash
cd frontend
npm start
```
#### Opens on http://localhost:4200

## Design Decisions

### Frontend (Angular)

- Standalone Components: Adopted Angular’s modern standalone API for simpler structure and better modularity.

- Component Structure: Separated into features (e.g., product-list, product-detail, create-product) inside products/pages, following Angular style guide.

- Routing: Used provideRouter() with standalone routing approach.

- Filters & Search: Implemented client-side filtering by unitCost, totalSales and search by name, without third-party state management.

- Reusable UI: Split filters and table views for better readability and possible reuse.

- Responsive UI: TailwindCSS was used for layout and responsive design, enabling smooth desktop/mobile adaptation.

### Backend (Node.js + LowDB)

- Minimal Express Server: Used express.Router() to define RESTful endpoints for GET, POST, PATCH, and DELETE operations.

- LowDB: Chosen for simplicity and persistence during development. It auto-generates IDs and stores all products in a db.json file.

- Data Types: Ensured consistent ID types (converted to number) for sorting and filtering operations on the frontend.

- CORS: Enabled manually to support requests from localhost:4200.