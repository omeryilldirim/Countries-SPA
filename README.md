# Single-page application with the following functionalities

- Query a public GraphQL API and show the results in a list. This functionality is already provided, but feel free to change the query as you see fit.

- The code currently uses the public Countries API. More info can be found here: https://studio.apollographql.com/public/countries/home?variant=current

- Create a text filter above the list with which you can filter and group the results

- E.g. if you input "search:tt group:size" it will search for the results containing "tt", and group those results by the value of a "size" field that they may have

- The items in the list should be selectable and de-selectable by clicking on them At most one item can be selected at a time

- The background color of the selected item should be different than the background color of unselected items

- The background color used for the selected item should be picked from a predefined set of colors (which you should define yourself). Make sure that when an item is selected, the color is different from the previous item that was selected

- After the items are loaded and after filtering, automatically select the 10th item, or the last one if the amount of items is smaller than 10 The implementation should take into account that the list can get very long.

### Tools used for the project:
- React, Apollo Client, GraphQL, Material UI, TypeScript, and react-toastify.

## Outcome
**<div align="center">![Project Snapshot](snapshot.png)</div>**

**<p align="center">&#9786; Happy Coding &#9997;</p>**