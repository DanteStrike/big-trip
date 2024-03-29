import {capitalizeFirstLetter} from '../utils/utils.js';
import {transferTypes} from '../configs/configs.js';

/** Класс представляет адаптер между сервером и приложением по данным точек*/
class Point {
  constructor(data) {
    this.id = data[`id`];
    this.type = {
      name: data[`type`],
      icon: data[`type`],
      title: transferTypes.has(data[`type`]) ? `${capitalizeFirstLetter(data[`type`])} to` : `${capitalizeFirstLetter(data[`type`])} in`
    };
    this.destination = data[`destination`];
    this.time = {
      start: data[`date_from`],
      end: data[`date_to`]
    };
    this.basePrice = data[`base_price`];
    this.offers = data[`offers`];
    this.isFavorite = data[`is_favorite`];
  }

  toRAW() {
    return {
      'id': this.id,
      'type': this.type.name,
      'destination': this.destination,
      'date_from': this.time.start,
      'date_to': this.time.end,
      'base_price': this.basePrice,
      'offers': this.offers,
      'is_favorite': this.isFavorite
    };
  }

  static parsePoint(pointData) {
    return new Point(pointData);
  }

  static parsePoints(pointsData) {
    return pointsData.map((pointData) => new Point(pointData));
  }

  static getDefaultPoint() {
    const defaultPointData = {
      'id': null,
      'type': `flight`,
      'destination': {
        name: null,
        description: null,
        pictures: []
      },
      'date_from': Date.now(),
      'date_to': Date.now(),
      'base_price': 0,
      'offers': [],
      'is_favorite': false
    };

    return new Point(defaultPointData);
  }
}


export default Point;
