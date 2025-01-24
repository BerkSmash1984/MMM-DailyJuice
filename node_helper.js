const NodeHelper = require("node_helper");
const axios = require("axios");
const { JSDOM } = require("jsdom");

module.exports = NodeHelper.create({
  start: function () {
    console.log("MMM-DailyJuice helper started...");
  },

  socketNotificationReceived: async function (notification, payload) {
    if (notification === "GET_JUICE_RECIPE") {
      try {
        const juiceData = await this.fetchRandomJuice();
        this.sendSocketNotification("JUICE_RECIPE_RESULT", juiceData);
      } catch (error) {
        console.error("Error fetching juice recipe:", error);
      }
    }
  },

  fetchRandomJuice: async function () {
    const randomPage = Math.floor(Math.random() * 6) + 1; // Pages 1-6
    const url = `https://juicerecipes.com/recipes/?page=${randomPage}&o=title`;

    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const document = dom.window.document;

    // Select all recipe cards
    const recipes = Array.from(document.querySelectorAll("article.card-recipe"));
    if (recipes.length === 0) {
      throw new Error(`No recipes found on page ${randomPage}.`);
    }

    // Pick a random recipe
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

    // Extract the title, link, and ingredients
    let link = randomRecipe.querySelector("a").href;
    let image = randomRecipe.querySelector("img").src;
    const title = randomRecipe.querySelector("img").alt;

    const ingredients = Array.from(
      randomRecipe.querySelectorAll(".recipe-ingredients li")
    ).map((item) => item.textContent.trim());

    // Check if the link URL is relative and prepend the base URL
    if (!link.startsWith("http")) {
      link = `https://juicerecipes.com${link}`;
    }

    // Check if the image URL is relative and prepend the base URL
    if (!image.startsWith("http")) {
      image = `https://juicerecipes.com${image}`;
    }

    if (!title || !link || !image || ingredients.length === 0) {
      throw new Error("Incomplete recipe data.");
    }

    return {
      title,
      link,
      image,
      ingredients,
    };
  },
});
