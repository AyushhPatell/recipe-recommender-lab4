# Recipe Recommender App - Lab 4
## CSCI 3172 - Web Development


### Application Description
A user friendly Recipe Recommender web application that helps users discover delicious recipes based on their preferences. Users can search by ingredient, category, or cuisine type, or get surprised with random recipe suggestions.

### Netlify URL: https://recipe-recommender-lab4.netlify.app/
### GitHub Repository: https://github.com/AyushhPatell/recipe-recommender-lab4
### GitLab Repository: https://git.cs.dal.ca/aspatel/csci3172/-/tree/main/Labs/lab4


- API: TheMealDB API.

### Features:
1. Search Functionality.
2. Random Recipe Discovery.
3. Recipe Details


-- Installation & Setup --

1. Clone the repository from:
2. npm install
3. npm start
4. Open in browser: http://localhost:3000

## API Integration
- TheMealDB API:
  - For ingredient: `/filter.php?i={ingredient}`
  - For category: `/filter.php?c={category}`
  - For area: `/filter.php?a={area}`
  - For random recipe: `/random.php`
  - For full details: `/lookup.php?i={id}`

## Testing
The application includes unit testing. Try: npm test.

References:

- Bootstrap. (2025). Bootstrap. Getbootstrap.com. https://getbootstrap.com/

- Free Meal API | TheMealDB.com. (n.d.). Www.themealdb.com. https://www.themealdb.com/api.php

- Accessibility review. (n.d.). https://www.wda-association.org/accessibility-review?utm_source=google&utm_medium=cpc&utm_campaign=search_accessibility&utm_content=adgroupid_186845255648|creative_759380020703|device_c|loc_physical_ms_9061767&utm_term=keyword_wcag%20guidelines|placement_&gad_source=1&gad_campaignid=22697361259&gbraid=0AAAAArCVnVhIH3-7J2MwrvNbu_6p_2xLq&gclid=CjwKCAiAwqHIBhAEEiwAx9cTee6-wckgDoI5AFav2MxONmpUrs2uE9xfXch9fhIGDg4fW-rgMyxgZhoCRBQQAvD_BwE

- Bootstrap Icons. (n.d.). https://icons.getbootstrap.com/

- CORS errors - HTTP | MDN. (n.d.). https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors