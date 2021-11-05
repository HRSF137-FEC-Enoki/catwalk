[![CircleCI](https://circleci.com/gh/HRSF137-FEC-Enoki/catwalk/tree/main.svg?style=svg)](https://circleci.com/gh/HRSF137-FEC-Enoki/catwalk/tree/main)

# Project Catwalk by Effervescent Enoki
A Hack Reactor Front-End Capstone project using NodeJS and React. This is a single page e-commerce application with a backend retrieving product data from an external API.
* Node v14.17.2
* React 17.0.2

## Components and Features

<div align="center">
  <h3>Product Overview</h3>
  <img src="https://media4.giphy.com/media/dVdsrkK6077FfzQOdV/giphy.gif?cid=790b7611bb688366696a9da1d16be426d6ea6bffea866c47&rid=giphy.gif&ct=g" alt="Product Overview">
</div>
* Contains an image carousel with a zoom-in and expand feature. Displays various photos of the currently selected style of a product. 
* Users are able to select different styles of a product, which dynamically updates the images in the coursel.
* A product information section details a product's name, category, price and available styles. Selecting different styles updates this section's information.
* An add to cart feature allows users to see available sizes and stock of product. Users are able to add items to a cart and are prompted to select a size and quantity if one or both are not chosen.

<div align="center">
  <h3>Related Products</h3>
  <img src="https://media2.giphy.com/media/fUSeEgN8Mk1p38UkDV/giphy.gif?cid=790b761152d30305cb45ceb2435cce9f344cfd8b6d467239&rid=giphy.gif&ct=g" alt="Related Products">
</div>
* Displays products related to the currently selected product.
* Able to select various styles of each related product without reloading page.
* Clicking the star on a related product displays a modal comparing details of the current product and the related product.

<div align="center">
  <h3>Product Reviews</h3>
  <img src="https://media0.giphy.com/media/G4ne2bBY5ozySC7e85/giphy.gif?cid=790b76119e66eaffc9799ddfffad6addbefb84b72a67ab91&rid=giphy.gif&ct=g" alt="Related Products">
</div>
* Displays reviews of the product, which can be sorted based on relevance, helpfulness, and time.
* Aggregate review data is displayed on the left
* Users can insert their own reviews through a modal.


## Setup
Make a copy of `config.example.js` and rename it `config.js` and be sure to replace **YOUR_GITHUB_API_TOKEN** with your token from github and **CAMPUS_CODE** with your cohort's campus code (i.e. hr-sfo, hr-nyc, or hr-rfp)

## Running the App

Install the dependencies
```
$ npm install
```
Use webpack to bundle files
```
$ npm run build
```
Start the server
```
$ npm start
```
## Technologies
* React.js
* Node.js
* Express.js
* Axios
* Webpack
* Babel
* Sass
* React-testing library
* Jest
* Brotli compression


## Team Members
- <a href="https://github.com/jleiandy">Andy Lei</a>
- <a href="https://github.com/cschucode">Chris Schuhmacher</a>
- <a href="https://github.com/runhui2010">Runhui Huang</a>

