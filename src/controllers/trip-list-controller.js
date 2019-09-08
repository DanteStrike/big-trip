import PointController from './point-controller';
import {Mode, render, TimeValue, Position} from '../utils/utils';
import TripDay from '../components/trip-day';

class TripListController {
  constructor(container, createTaskContainer, onDataChange) {
    this._container = container;
    this._createTaskContainer = createTaskContainer;
    this._events = [];
    this._creatingEvent = null;
    this._onBoardDataChange = onDataChange;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  createEvent() {
    //  Запретить создавать более одной карточки за раз
    if (this._creatingEvent) {
      return;
    }

    const defaultEventData = {
      type: {
        name: `flight`,
        icon: `flight`,
        title: `Flight to`
      },
      destination: null,
      description: null,
      time: {
        start: Date.now(),
        end: Date.now(),
      },
      price: null,
      offers: [],
      photos: [],
      isFavorite: false
    };

    this._creatingEvent = new PointController(this._createTaskContainer, defaultEventData, Mode.ADDING, this._onChangeView,
        (...arg) => {
          this._creatingEvent = null;
          this._onDataChange(...arg);
        });
    this._creatingEvent.init();
  }

  setEvents(events) {
    //  Убрать всех слушателей
    this._onChangeView();
    this._subscriptions = [];

    //  Ререндер
    this._events = events;
    this._container.innerHTML = ``;

    if (this._events.length === 0) {
      return;
    }

    const newTripDay = new TripDay();
    render(this._container, newTripDay.getElement(), Position.BEFOREEND);

    for (const event of events) {
      this._renderEvent(event, newTripDay.getEventsListElement());
    }
  }

  setEventsByDays(events) {
    //  Убрать всех слушателей
    this._onChangeView();
    this._subscriptions = [];

    //  Ререндер
    this._events = events;
    this._container.innerHTML = ``;

    if (this._events.length === 0) {
      return;
    }

    const sortedByEvent = this._events.sort((a, b) => a.time.start - b.time.start);
    const firstTripDay = new Date(this._events[0].time.start).setHours(0, 0, 0, 0);
    const lastTripDay = new Date(this._events[this._events.length - 1].time.start).setHours(0, 0, 0, 0);
    let dayIndex = 0;

    for (let day = firstTripDay; day <= lastTripDay; day += TimeValue.MILLISECONDS_IN_DAY) {
      const dayEvents = sortedByEvent.filter((event) => new Date(event.time.start).setHours(0, 0, 0, 0) === day);
      dayIndex++;

      //  Не вставлять в разметку пустые дни
      if (dayEvents.length === 0) {
        continue;
      }

      const newTripDay = new TripDay(dayIndex, day);
      render(this._container, newTripDay.getElement(), Position.BEFOREEND);

      for (const dayEvent of dayEvents) {
        this._renderEvent(dayEvent, newTripDay.getEventsListElement());
      }
    }
  }

  _renderEvent(event, listElement) {
    const newPointController = new PointController(listElement, event, Mode.DEFAULT, this._onChangeView, this._onDataChange);
    newPointController.init();

    this._subscriptions.push(newPointController.setDefaultView.bind(newPointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((sub) => sub());
  }

  _onDataChange(oldData, newData) {

    // NONE
    if (oldData === null && newData === null && this._events.length !== 0) {
      return;
    }

    //  ADD
    if (oldData === null && newData !== null) {
      this._events = [newData, ...this._events];
    }

    //  DEL
    if (oldData !== null && newData === null) {
      const index = this._events.findIndex((event) => event === oldData);
      this._events = [...this._events.slice(0, index), ...this._events.slice(index + 1)];
    }

    //  UPDATE
    if (oldData !== null && newData !== null) {
      const index = this._events.findIndex((event) => event === oldData);
      this._events[index] = newData;
    }

    this._onBoardDataChange(this._events);
  }
}

export default TripListController;