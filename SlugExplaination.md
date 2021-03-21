How does the app gets info from URL (slug)

Code :
""""""""""""""""""""""""""""""""""""""""""""""""
if (address == null) {
if (router.query.slug !== undefined) {
let slug = router.query.slug;
let oldSlug = slug.slice(0);
setCurrentSlug('/' + oldSlug.join('/'));
let sentFilters = oldSlug[oldSlug.length - 2].split('+');
let sentScope = oldSlug[oldSlug.length - 1];
let postalcode = null;
let scopes = {"quartier" : 1, "ville" : 2, "departement" : 3}
postalcode = slug[1]
slug.pop();
slug.pop();
slug.reverse();
slug.splice(1, 1)
slug = slug.join(', ')
.replace(/[+]/g, ' ') // Rebuild adress replacing + by space
// Get filters
let filtersSlug = [];
let filtersId = { // We want them as id from string
"maison": "1",
"bureau": "4",
"appartement": "2",
"dependance": "3",
"terrain": "999"
}
sentFilters.forEach(filterString => { filtersSlug.push(filtersId[filterString]) })
// Dispatch adresse we processed from URL slug
dispatch(
actionsSearch.enterSearch(
slug,
postalcode,
filtersSlug, // Default all filters,
scopes[sentScope]
)
);
}
}
""""""""""""""""""""""""""""""""""""""""""""""""""""""

This codes takes the slug sent in the URL

---

For example : lyon/69006/69+rue+louis+blanc/maison+bureau+appartement+dependance+terrain/departement

In this example we have multiple values we're interrested in :

    - city
    - zipcode
    - address
    - filters (Maison, bureau ...)
    - scope (Ville, Quartier ...)

- First the function gets the slug from the router

- Then it creates a copy of this slug and store it in the state (oldSlug, im using slice(0) to create a copy so we don't interfer with the same memory adress)

- from this copy, we store the Filters and the Scope.

- then we proceed with the slug and converts it to multiple values we want to send in our dispatch function.
- First by storing the postalcode at index 1 in the slug

- we then pop the two last items of the slug (filters and scope) as we already stored them with the old slug as explained above.
- and we also remove the postal code, leaving only the city and the adress.

- we convert this to a string which would output likes this : 1+rue+de+paris, Lyon

- We then replace all the + to spaces output would be like : 1 Rue De Paris, Lyon

- Then we convert the filter strings to their corresponding ID (example : maison -> 1)
- and stores them in an array, for example : maison+bureau+terrain would give the array --> [1, 4, 999]

We then send all the values we converted to our state.

Creating the slug is the exact same process but, of course, the other way around.
