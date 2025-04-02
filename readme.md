
```markdown
# 🍕 Homemade Memory Match

A fun and lightweight memory game built with HTML, CSS, and JavaScript.  
Match delicious food emojis, track your time and number of moves, and challenge yourself with multiple difficulty levels!


## 🧠 Features

- 🍔 Emoji-based memory cards (Food-themed)
- 🧩 Three difficulty levels: Easy, Medium, Hard
- 🌗 Dark Mode toggle
- ⏱️ Timer & Move counter
- ✅ Win screen with "Play Again" option
- 📱 Responsive design for mobile devices
- 🐳 Fully Dockerized for easy deployment

## 📦 Tech Stack

- HTML5
- CSS3
- JavaScript (Vanilla)
- Docker + Nginx

## 🐳 Run with Docker

Build the image:

```bash
docker build -t memory-game .
```

Run the container:

```bash
docker run -p 8080:80 memory-game
```

Then open: [http://localhost:8080](http://localhost:8080)

## 🛠️ Local Development

You can also run it locally without Docker:

1. Open `index.html` directly in your browser  
**or**
2. Use the Live Server extension in VS Code

## ⚙️ CI/CD with GitHub Actions

Every time changes are pushed to the `main` branch, the app is automatically built and pushed to:

```
registry.robin-joseph.fr/izaak/memory-game:latest
```

## 📁 Project Structure

```
.
├── css/
├── js/
├── index.html
├── Dockerfile
├── docker-compose.yml
└── .github/
    └── workflows/
        └── docker.yml
```


## 🙌 Author

**Izaak** – 5th year CS & Cybersecurity student at INSA Hauts-de-France  
Looking for a dev or IT project management internship from April 2025  
➡️ [LinkedIn](https://linkedin.com/in/votre-lien)

---

Feel free to clone, fork, or suggest improvements ✌️  