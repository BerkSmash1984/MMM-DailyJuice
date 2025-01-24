# MMM-DailyJuice

A MagicMirror module that displays a random juice recipe daily, including the image, title, and ingredients.

## Features
- Displays a random juice recipe with an image, title, and ingredients list.
- Clickable title links to the full recipe on JuiceRecipes.com.
- Automatically updates once every 24 hours (or any time interval desired).

## Screenshots
![image](https://github.com/user-attachments/assets/cef80d05-7c51-4816-8bf3-210052ca2f47)

![image](https://github.com/user-attachments/assets/612b0878-58fa-41a1-ae9a-712b3955dc2e)


## Installation
1. Clone this repository into the `modules` folder of your MagicMirror installation:
   ```bash
   cd MagicMirror/modules
   git clone https://github.com/BerkSmash1984/MMM-DailyJuice.git

2. Install dependencies:
   ```bash
   cd MMM-DailyJuice
   npm install
   
## Configuration
1. Add the module to the `config.js` file in your MagicMirror directory:
   ```bash
   {
      module: "MMM-DailyJuice",
      header: "The Daily Juice",
      position: "top_center",
      config: {
         updateInterval: 86400000 // Update interval in milliseconds (24 hours). Can use any interval you want.
       }
   }
