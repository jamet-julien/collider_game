export default class Trait {

  ///
  constructor(name) {
    this.NAME  = name;
    this.tasks = [];
  }

  finalize() {
    this.tasks.forEach(task => task());
    this.tasks.length = 0;
  }

  queue(task) {
    this.tasks.push(task);
  }

  ///
  trigger( entity, arg) {

  }

  ///
  update(deltaTime) {
    console.warn('créer méthode update');
  }

}
