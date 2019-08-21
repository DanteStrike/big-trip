import {getRandomNumber, getRandomFlag, getRandomElement, shuffle, Enum} from './utils/utils.js';
import getRandomDestination from './utils/getRandomDestination.js';
import getRandomEventTime from './utils/getRandomEventTime.js';
import {eventConfig, eventsListConfig} from './configs.js';


const eventsData = {
  types: {
    transport: new Set([`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`]),
    arrival: new Set([`Check-in`, `Sightseeing`, `Restaurant`])
  },
  destination: {
    cities: new Set([`Amsterdam`, `Geneva`, `Chamonix`, `France`]),
    sights: new Set([`Museum`, `Fountain`, `Palace`, `Park`]),
    eatingPoints: new Set([`Cafe`, `Hotel`, `Motel`]),
    checkinPoints: new Set([`Hotel`, `Motel`])
  },
  descriptions: [`Lorem ipsum dolor sit amet, consectetur adipiscing elit`, `Cras aliquet varius magna, non porta ligula feugiat eget`,
    `Fusce tristique felis at fermentum pharetra`, `Aliquam id orci ut lectus varius viverra`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante`, `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui`, `Sed sed nisi sed augue convallis suscipit in sed felis`,
    `Aliquam erat volutpat`, `Nunc fermentum tortor ac porta dapibus`, `In rutrum ac purus sit amet tempus`],

  offerDescriptions: [`Add luggage`, `Switch to comfort class`, `Add meal`, `Choose seats`]
};

const getOffer = (offerDescription, data) => ({
  description: offerDescription,
  price: getRandomNumber(data.offer.price.min, data.offer.price.max),
  isActive: getRandomFlag()
});

const getEventData = (data, config) => {
  const randomType = getRandomElement(new Set([...data.types.transport, ...data.types.arrival]));

  return {
    type: randomType,
    destination: getRandomDestination(randomType, data),
    description: shuffle(data.descriptions)
      .slice(0, getRandomNumber(config.descriptions.minAmount, config.descriptions.maxAmount))
      .join(`. `),
    time: getRandomEventTime(config.periodOfTime.past, config.periodOfTime.future),
    price: getRandomNumber(config.price.min, config.price.max),
    offers: shuffle(data.offerDescriptions)
      .slice(0, getRandomNumber(config.offer.minAmount, config.maxAmount))
      .map((offerDescription) => getOffer(offerDescription, config)),
    photos: new Array(getRandomNumber(config.photos.minAmount, eventConfig.photos.maxAmount))
      .fill(``)
      .map(() => config.photos.defaultURL + Math.random()),
    isFavorite: getRandomFlag(),

    //  Геттеры для удобного вывода в шаблон компонента event-edit и event
    get isTransportType() {
      return eventsData.types.transport.has(this.type);
    },
    get timeDuration() {
      return {
        duration: this.time.end - this.time.start,

        get days() {
          return Math.floor(this.duration / Enum.MILLISECONDS_IN_DAY);
        },
        get hours() {
          return Math.floor((this.duration - this.days * Enum.MILLISECONDS_IN_DAY) / Enum.MILLISECONDS_IN_HOUR);
        },
        get minutes() {
          return Math.floor((this.duration - this.days * Enum.MILLISECONDS_IN_DAY - this.hours * Enum.MILLISECONDS_IN_HOUR) / Enum.MILLISECONDS_IN_MINUTE);
        }
      };
    }
  };
};


const eventsList = new Array(getRandomNumber(eventsListConfig.minAmount, eventsListConfig.maxAmount))
  .fill(``)
  .map(() => getEventData(eventsData, eventConfig))
  .sort((a, b) => a.time.start - b.time.start);


export {eventsData, eventsList};