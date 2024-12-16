# The Vault FE
Latest update: **16 Dec 2024**

## Description
The vault is a personal project. It's a website for anime/manga lovers that allows them to search for their favorite titles, save their progress, and write reviews.

## Challenges

- Persist advanced search filters after closing the advanced search or refreshing the browser
- Whenever the browser is refreshed, associating components are not rendered
- How can I check similarity between 2 strings? Return a list of the most similar strings

## Mock JSON servers

- Animes: json-server -p 3200 -w ./data/animeListData.json
- Mangas: json-server -p 3300 -w ./data/mangaListData.json
- Related entries: json-server -p 3400 -w ./data/relatedEntryListData.json
- Characters: json-server -p 3500 -w ./data/characterListData.json
- Staff: json-server -p 3600 -w ./data/staffListData.json
- Stats: json-server -p 3700 -w ./data/statListData.json
- Reviews: json-server -p 3800 -w ./data/reviewListData.json
- Users: json-server -p 3900 -w ./data/userAccountListData.json

## Tasks

- Persist login for Add to list & Add review features
- Basic search feature
- Search with advanced filters

## Future features

- Styling all error pages
- Remember login credentials
