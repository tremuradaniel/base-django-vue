.PHONY: setup up down build shell-backend shell-frontend migrations migrate logs check-db createsuperuser

setup:
	@echo "Building containers..."
	docker compose build
	@echo "Waiting for DB to be healthy... (skipping formal check)"
	@echo "Installing Django in backend volume..."
	docker compose run --rm backend django-admin startproject core . || echo "Django project already exists"
	@echo "Making initial migrations..."
	docker compose run --rm backend python manage.py migrate || echo "Waiting or already migrated"
	@echo "Setup complete! Run 'make up' to start."

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

shell-backend:
	docker compose exec backend bash

shell-frontend:
	docker compose exec frontend sh

migrations:
	docker compose exec backend python manage.py makemigrations

migrate:
	docker compose exec backend python manage.py migrate

logs:
	docker compose logs -f


# django

createsuperuser:
	docker compose exec backend python manage.py createsuperuser
