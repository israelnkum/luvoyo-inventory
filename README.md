<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://lh5.googleusercontent.com/p/AF1QipPtqjJLwsmU7tbiSg77yL48pd2zQnoPXyxCI7ZI=w203-h203-k-no" width="200"></a></p>

### About TechLineAfrica

TechLineAfrica is a provider of custom softwares and IT consulting services.     
We provide IT training under a broad category of Professional courses.

### Contact Us
Email: info@techlineafrica.com  
Mobile: +233 544 513 074

## Project Setup
### Frontend Setup
> _node version: 17.0.1_

### Installing Dependencies
```bash
npm install
```
> _tip_: `npm i`is shorthand for `npm install`

### Backend Setup
> _php version: 8.1_

### Installing Dependencies
```bash
composer install
```

Copy the ``.env-example`` and rename it as ``.env``

### Generate project key
```bash
php artisan key:generate
```

### Database Setup
Create a database with the name ``tla_inventory``

Run the command below to create database tables
```base
php artisan migrate
```

### Create Default Account

```bash
php artisan db:seed
```

### Running The project
Run the follow commands in different terminals

Running the backend
```
php artisan serve
```
Running the frontend
```
php artisan serve --port=3000
```

To compile as you work, run the command below
```
npm run watch
```
