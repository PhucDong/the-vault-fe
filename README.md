# The Vault FE

Latest update: **8 July 2025**

## Description

The vault is a personal project. It's a website for anime/manga lovers that allows them to search for their favorite titles, save their progress, and write reviews.

## Challenges

- Persist search value & advanced filters after closing the advanced search or refreshing the browser
  - Persist only some states, not EVERYTHING
  - Persist states of certain location.pathname
- How can I check similarity between 2 strings? Return a list of the most similar strings

## Solutions

- Use \*\*redux-persist" to store Redux states to localStorage

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
- Update producers & studios to animes
- Code Home Page of registered user
- Code navbar for registered users
- Code Profile Page for registered users
- Implement likes, dislikes, comments of each review (done)
- Implement CRUD of comments for each review
- Update allowed text length from 600 (min) to 10000 (max) characters in ReviewEditor.page.js
- Fixed displaying UI for liked/disliked comments

## Challenges

- Advanced filters:
  - Animes: genres, studio, year, & airing status
  - Mangas: genres, year, & publishing status
- Next destination after registering
  - Lead users to their Home Page
- Datepickers: enable finishDate has to be selected behind startDate

## Bugs

- [x] In Recommendations tab, anime/manga cards don't have the same height
- [ ] On mobile screens, hover/click on the Profile icon, no modal (Profile & Log Out) appears
- [ ] On Footer, Login & Register are still available after successful registration
- [x] Update responsive layouts of detailed anime/manga pages on all device screens
- [ ] Fill in the Add To List form and then save. However, nothing happens
- [ ] Press Write Review button, but the route was broken

## Future features

- [x] Styling all error pages
- [x] Remember login credentials
- [ ] Update User Profile page
- [x] Add img to all animes, mangas, and users
- [x] Add debounce to search feature
- [ ] Refine UX/UI of all pages
