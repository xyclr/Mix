/**
 * Created by Alex on 17/1/6.
 */
const KEY = 'ToDoList'
export default {
  fetch: function () {
    return JSON.parse(window.localStorage.getItem(KEY)) || []
  },
  save: function (items) {
    window.localStorage.setItem(KEY, JSON.stringify(items))
  }
}
