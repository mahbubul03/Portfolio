# Portfolio Website

A modern, professional, and responsive developer portfolio built with Django REST Framework and React.

## Features

- **Full-stack Architecture**: Django backend with REST API + React frontend
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Dark Mode**: Toggle between light and dark themes
- **Dynamic Content**: Projects and skills fetched from Django API
- **Contact Form**: Submit messages through REST API
- **Smooth Animations**: Enhanced user experience with CSS animations

## Tech Stack

### Backend
- Django 5.0
- Django REST Framework
- SQLite (can be upgraded to PostgreSQL)

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- Lucide React (Icons)

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (optional, for admin panel):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Adding Sample Data

You can populate the database with sample data using the management command:

```bash
cd backend
python manage.py populate_sample_data
```

Alternatively, you can:
1. Access the Django admin panel at `http://localhost:8000/admin`
2. Log in with your superuser credentials
3. Add Projects and Skills through the admin interface

## Project Structure

```
Portfolio/
├── backend/
│   ├── portfolio_backend/     # Django project settings
│   ├── portfolio/             # Main app
│   │   ├── models.py          # Database models
│   │   ├── views.py           # API views
│   │   ├── serializers.py     # DRF serializers
│   │   └── admin.py           # Admin configuration
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API services
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}/` - Get project details
- `GET /api/skills/` - Get skills grouped by category
- `POST /api/contact/` - Submit contact message

## License

This project is open source and available under the MIT License.

