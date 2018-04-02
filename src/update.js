import * as R from "ramda"

const msgs = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIE_INPUT: "CALORIE_INPUT",
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
    
    default:
      return model;
  }
}

export default update;
