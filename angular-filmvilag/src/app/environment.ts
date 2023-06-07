// Ez a konfigurációs objektum a következő kulcs-érték párokat tartalmazza:

// production: A gyártási környezet jelzője (true vagy false).
// apiUrl: Az API végpont URL-je.
// apiKey: Az API kulcsa.
// autToken: Az autentikációs token.
// imagePath: Az alapértelmezett képek elérési útja a TMDB szolgáltatásban.
// defaultImage: Az alapértelmezett kép URL-je.
export const environment = {
    production: false,
    apiUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'fb0fd8e0ccdb1764c2b89554c35d613d',
    autToken: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjBmZDhlMGNjZGIxNzY0YzJiODk1NTRjMzVkNjEzZCIsInN1YiI6IjY0N2UzMjg0OTM4MjhlMDBmOWQ4OTg1NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LwDIUjyVox8vfw0LIvsC3JKQ_qGtcRBipRPPJgV5lAw",
    imagePath: "https://image.tmdb.org/t/p/w500",
    defaultImage: "https://www.bing.com/images/blob?bcid=Tk1xZKplIK8FqxcxoNWLuD9SqbotqVTdP1w"
};