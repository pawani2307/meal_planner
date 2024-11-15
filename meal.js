let dailyCalories = {
  breakfast: 0,
  lunch: 0,
  dinner: 0,
  snacks: 0,
};

let draggedFood = null;

document.querySelectorAll(".food").forEach(food => {
  food.addEventListener("dragstart", event => {
    draggedFood = event.target;
  });
});

const plate = document.getElementById("plate");

plate.addEventListener("dragover", event => {
  event.preventDefault();
});

plate.addEventListener("drop", () => {
  if (draggedFood) {
    const foodName = draggedFood.dataset.name;
    const foodCalories = draggedFood.dataset.calories;

    // Show the modal for quantity and meal selection
    document.getElementById("food-name").textContent = `Selected Food: ${foodName}`;
    document.getElementById("quantity-modal").classList.remove("hidden");

    document.getElementById("add-to-meal").onclick = () => {
      const quantity = parseInt(document.getElementById("quantity").value);
      const mealType = document.getElementById("meal-select").value;

      if (!quantity || quantity <= 0) {
        alert("Please enter a valid quantity.");
        return;
      }

      const calories = (foodCalories * quantity) / 100;

      // Update calories for the selected meal
      dailyCalories[mealType] += calories;

      // Update UI
      document.getElementById(`${mealType}-calories`).textContent = dailyCalories[mealType].toFixed(2);
      document.getElementById("daily-total-calories").textContent = Object.values(dailyCalories)
        .reduce((sum, cal) => sum + cal, 0)
        .toFixed(2);

      // Hide modal and reset input
      document.getElementById("quantity-modal").classList.add("hidden");
      document.getElementById("quantity").value = "";
    };
  }
});
