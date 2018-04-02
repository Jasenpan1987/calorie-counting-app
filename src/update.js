import * as R from "ramda"

const msgs = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIE_INPUT: "CALORIE_INPUT",
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_MEAL: "DELETE_MEAL"
};

export function deleteMeal(id) {
  return { type: msgs.DELETE_MEAL, id };
}

export function saveMealMsg() {
  return { type: msgs.SAVE_MEAL };
}

export function showFormMsg(showForm) {
  return {
    type: msgs.SHOW_FORM,
    showForm
  }
}

export function mealInputMsg(description) {
  return {
    type: msgs.MEAL_INPUT,
    description
  }
}

export function calorieInputMsg(calories) {
  return {
    type: msgs.CALORIE_INPUT,
    calories
  }
}

// const initModel = {
//   description: "",
//   calories: 0,
//   showForm: false,
//   nextId: 0,
//   editId: null,
//   meals: []
// };

function update(msg, model) {
  switch(msg.type) {
    case msgs.SHOW_FORM:
      const { showForm } = msg;
      return {
        ...model,
        showForm,
        description: "",
        calories: 0
      };
    
    case msgs.MEAL_INPUT:
      const { description } = msg;
      return {
        ...model,
        description
      };
    
    case msgs.CALORIE_INPUT:
      // const { calories } = msg;
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(msg.calories);
      return {
        ...model,
        calories
      };

    case msgs.SAVE_MEAL:
      return saveMeal(msg, model);
    
    case msgs.DELETE_MEAL:
      const { id } = msg;
      const meals = R.filter(meal => meal.id !== id)(model.meals);
      return {
        ...model, meals
      };

    default:
      return model;
  }
}

function saveMeal(msg, model) {
  const { nextId, description, calories } = model;
  const newMeal = { id: nextId, description, calories };
  const meals = [ ...model.meals, newMeal ];
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: "",
    calories: 0,
    showForm: false
  };
}

export default update;
