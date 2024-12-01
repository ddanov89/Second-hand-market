Second-hand market

Angular Project

Overview

The application is front-end app (SPA) for a Second-hand market for baby goods.

The main "unit" in this platform is the catalog page where you can view, like, create, edit and delete depending on certain user roles.

Guests can view pages: Home, Catalog, Search. They can login with an email and password or register with an email ,password to access other functionalities.

Logged-in users can view, create and subscribe to products, which saves the created product to their profile.

Creators can edit and delete products, they've created. They don't have access to the subscribe functionality as this is a job for other users, which have not created that specific product.

This project was created by Daniel Danov for the purposes of an Angular SoftUni Course, October-December 2024.

Public part - available for guests and logged-in users.

Home Page -> You can find introductory information about the application.
Catalog Page -> Offers a list of all added products by different users. Guests have access to the details of the product, however they do not have access to any CRUD operations.
Details Sub-Page -> Lists additional information in regards to the chosen product. When you click over the details button, you can to go to the specific product's details page. 
Search-> Offers a search functionality to search for a specific product based on one's preferences(name and/or category).
Login/Register -> These two pages offer a new guest to register himself or an existing user to sign in and gain access to a variety of functionality.

Private part - available for logged-in users.

Create page -> Offers the opportunity to create your own product and add it to the Catalog.
Edit/Delete functionality - available for creators of a specific product.
Subscribe functionality - available for non-creators.
Profile page -> Offers access to a collection of the user's created products in a neat place, which has access to the details page of those specific products as well as access to update the information or delete the product if necessary.
Logout -> Clears the user's token.

Users are (initialized on server):

daniel@abv.bg - 1234
michael@abv.bg- 1234

Technical Details

The client application is build with:

HTML + CSS 
Angular

The server side is built with:

Express
MongoDb

If you want to run the project all required dependencies must be installed, after which you have to navigate to the client folder and run:

ng serve

The server used is built with Express and MongoDb, which also needs to be run by navigating to the server folder in the terminal and running:

npm start

Once the above have been done, in your browser of choice, you can view and interact with the app on http://localhost:4200.