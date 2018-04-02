import * as R from "ramda"

const msgs = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIE_INPUT: "CALORIE_INPUT",
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_MEAL: "DELETE_MEAL",
  EDIT_MEAL: "EDIT_MEAL"
};

export function editMealMsg(editId) {
  return { type: msgs.EDIT_MEAL, editId }
}

export function deleteMealMsg(id) {
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
      const calories = R.pipe(
        parseInt,
        R.defaultTo(0)
      )(msg.calories);
      return {
        ...model,
        calories
      };

    case msgs.SAVE_MEAL:
      const { editId } = model;
      const updatedModel = editId !== null ?
        editMeal(msg, model) :
        saveMeal(msg, model);
      // return saveMeal(msg, model);
      return updatedModel;
    
    case msgs.DELETE_MEAL:
      const { id } = msg;
      const meals = R.filter(meal => meal.id !== id)(model.meals);
      return {
        ...model, meals
      };

    case msgs.EDIT_MEAL:
      const editingId = msg.editId
      const meal = R.find(meal => meal.id === editingId)(model.meals);
      const editCalories = meal.calories;
      const editDescription = meal.description;

      return {
        ...model,
        editId: editingId,
        description: editDescription,
        calories: editCalories,
        showForm: true
      };

    default:
      return model;
  }
}

function editMeal(msg, model) {
  const {description, calories, editId } = model;
  const meals = R.map(meal => {
    if(meal.id ===editId) {
      return { ...meal, description, calories };
    }
    return meal;
  })(model.meals);

  return {
    ...model,
    editId: null,
    description: "",
    showForm: false,
    calories: 0,
    meals
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
