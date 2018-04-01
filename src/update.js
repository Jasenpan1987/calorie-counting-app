const msgs = {
  SHOW_FORM: "SHOW_FORM",
}

export function showFormMsg(showForm) {
  return {
    type: msgs.SHOW_FORM,
    showForm
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
    
    default:
      return model;
  }
}

export default update;
