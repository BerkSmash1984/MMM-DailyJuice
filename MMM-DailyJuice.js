Module.register("MMM-DailyJuice", {
  defaults: {
    updateInterval: 3600000, // 1 hour
  },

  start: function () {
    this.juice = null;
    this.getJuiceRecipe();
    setInterval(() => {
      this.getJuiceRecipe();
    }, this.config.updateInterval);
  },

  getStyles: function () {
    return ["MMM-DailyJuice.css"];
  },

  getJuiceRecipe: function () {
    this.sendSocketNotification("GET_JUICE_RECIPE", {});
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "JUICE_RECIPE_RESULT") {
      this.juice = payload;
      this.updateDom();
    }
  },

  getDom: function () {
    const wrapper = document.createElement("div");
    if (!this.juice) {
      wrapper.innerHTML = "Loading juice recipe...";
      return wrapper;
    }

    const juiceContainer = document.createElement("div");
    juiceContainer.className = "juice-container";

    const juiceImage = document.createElement("img");
    juiceImage.src = this.juice.image;
    juiceImage.alt = this.juice.title;
    juiceImage.className = "juice-image";
    juiceContainer.appendChild(juiceImage);

    const juiceTitle = document.createElement("a");
    juiceTitle.href = this.juice.link;
    juiceTitle.target = "_blank";
    juiceTitle.innerHTML = this.juice.title;
    juiceTitle.className = "juice-title";
    juiceContainer.appendChild(juiceTitle);

    const ingredientsList = document.createElement("ul");
    ingredientsList.className = "ingredients-list";
    this.juice.ingredients.forEach((ingredient) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = ingredient;
      ingredientsList.appendChild(listItem);
    });
    juiceContainer.appendChild(ingredientsList);

    wrapper.appendChild(juiceContainer);
    return wrapper;
  },
});
