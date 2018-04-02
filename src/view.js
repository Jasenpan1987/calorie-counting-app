import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import * as R from "ramda";
import {
  showFormMsg, calorieInputMsg, mealInputMsg,
  saveMealMsg, deleteMealMsg, editMealMsg
} from "./update";

const {
  pre, div, h1, button, form, label, input, oninput,
  table, thead, tbody, tr, td, th, i
} = hh(h);


function cell(tag, className, value) {
  return tag({ className }, value);
}

const tableHeader = thead([
  tr([
    cell(th, "pa2 tl", "Meal"),
    cell(th, "pa2 tr", "Calories"),
    cell(th, "", "")
  ])
]);

function mealRow(dispatch, className, meal) {
  return tr({ className }, [
    cell(td, "pa2", meal.description),
    cell(td, "pa2 tr", meal.calories),
    cell(td, "pa2 tr", [
      i({ className: "ph1 fa fa-trash-o pointer", onclick: () => dispatch(deleteMealMsg(meal.id)) }),
      i({ className: "ph1 fa fa-pencil-square-o pointer", onclick: () => dispatch(editMealMsg(meal.id)) })
    ]),
  ])
}

function totalRow(meals) {
  const total = R.pipe(
    R.map(meal => meal.calories),
    R.sum
  )(meals);

  return tr({ className: "bt b" }, [
    cell(td, "pa2 tr", "Total: "),
    cell(td, "pa2 tr", total),
    cell(td, "", "")
  ]);
}

function mealsBody(dispatch, className, meals) {
  const rows = R.map(
    R.partial(mealRow, [dispatch, "stripe-dark"]),
    meals
  );
  const rowWithTotal = [...rows, totalRow(meals)];

  return tbody({ className }, rowWithTotal);
}

function tableView(dispatch, meals) {
  if (meals.length === 0) {
    return div({ className: "mv2 i black-50" }, "No Meals To Show...");
  }

  return table({ className: "mv2 w-100 collapse" }, [
    tableHeader,
    mealsBody(dispatch, '', meals)
  ]);
}

function fieldSet(labelText, inputValue, oninput) {
  return div([
    label({ className: "db mb1"}, labelText),
    input({ 
      className: "pa2 input-reset ba w-100 mb2",
      type: "text",
      value: inputValue,
      oninput
    })
  ]);
}

function buttonSet(dispatch) {
  return div([
    button({
      className: "f3 pv2 ph3 bg-blue white bn mr2 dim br1",
      type: "submit",
    }, "Save"),

    button({
      className: "f3 pv2 ph3 bg-light-gray bn dim br1",
      type: "button",
      onclick: () => dispatch(showFormMsg(false))
    }, "Cancel")
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;

  if(showForm) {
    return form(
      {
        className: "w-100 mv2",
        onsubmit: e => {
          e.preventDefault();
          dispatch(saveMealMsg())
        }
      }, [
        fieldSet("Meal", description, e => dispatch(mealInputMsg(e.target.value))),
        fieldSet("Calories", calories || "", e => dispatch(calorieInputMsg(e.target.value))),
        buttonSet(dispatch)
      ]
    );
  } else {
    return button(
      {
        className: "f3 pv2 ph3 br1 bg-blue white bn",
        onclick: () => dispatch(showFormMsg(true))
      },
      "Add Meal",
    );
  }
}

function view(dispatch, model) {
  return div({ className: "mw6 center" }, [
    h1({ className: 'f2 pv2 bb'}, 'Calorie Counting App'),
    formView(dispatch, model),
    tableView(dispatch, model.meals),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
