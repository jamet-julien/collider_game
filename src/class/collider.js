




export class EntityCollider{

  constructor(entities) {
    this.entities = entities;
  }

  check( subject) {

    this.entities.forEach( candidate => {

      if ( subject === candidate) {
        return;
      }

      if ( subject.bound.overlaps( candidate.bound)) {
        subject.hit.trigger(candidate);
        candidate.hit.trigger(subject);
      }

    });

  }
}