import {Position, TimeValue, Mode} from '../utils/enum.js';
import {render} from '../utils/dom.js';
import PointController from './point-controller.js';
import TripDay from '../components/trip-day.js';
import Point from '../data/point.js';

/** Класс представляет управление списком точек*/
class TripListController {
  constructor(container, onDataChange) {
    this._container = container;
    this._points = [];
    this._creatingPoint = null;
    this._onBoardDataChange = onDataChange;
    this._subscriptions = [];

    this._pointDefaultOptions = {
      container: this._container,
      renderPosition: Position.BEFOREEND,
      data: null,
      destinations: [],
      offers: [],
      mode: Mode.DEFAULT,

      onChangeView: this._onChangeView.bind(this),
      onDataChange: this._onDataChange.bind(this)
    };
  }

  setDestinations(destinations) {
    this._pointDefaultOptions.destinations = destinations;
  }

  setOffers(offers) {
    this._pointDefaultOptions.offers = offers;
  }

  setPoints(points) {
    this._updatePoints(points);
    if (this._points.length === 0) {
      return;
    }

    const newTripDay = new TripDay();
    render(this._container, newTripDay.getElement(), Position.BEFOREEND);
    for (const point of this._points) {
      this._renderPoint(point, newTripDay.getElement().querySelector(`.trip-events__list`));
    }
  }

  setPointsByDays(points) {
    this._updatePoints(points);
    if (this._points.length === 0) {
      return;
    }

    const sortedByEventPoints = this._points.sort((a, b) => a.time.start - b.time.start);
    const firstTripDay = new Date(this._points[0].time.start).setHours(0, 0, 0, 0);
    const lastTripDay = new Date(this._points[this._points.length - 1].time.start).setHours(0, 0, 0, 0);
    let dayIndex = 0;

    for (let day = firstTripDay; day <= lastTripDay; day += TimeValue.MILLISECONDS_IN_DAY) {
      const dayPoints = sortedByEventPoints.filter((point) => new Date(point.time.start).setHours(0, 0, 0, 0) === day);
      dayIndex++;

      if (dayPoints.length === 0) {
        continue;
      }

      const newTripDay = new TripDay(dayIndex, day);
      render(this._container, newTripDay.getElement(), Position.BEFOREEND);
      for (const dayEvent of dayPoints) {
        this._renderPoint(dayEvent, newTripDay.getElement().querySelector(`.trip-events__list`));
      }
    }
  }

  createPoint(createButton, container, renderPosition) {
    this._onChangeView();

    const pointOptions = Object.assign({}, this._pointDefaultOptions);
    pointOptions.container = container;
    pointOptions.renderPosition = renderPosition;
    pointOptions.data = Point.getDefaultPoint();
    pointOptions.mode = Mode.ADDING;
    pointOptions.onTripListAddPointClose = () => {
      this._creatingPoint = null;
      createButton.disabled = false;
    };
    this._creatingPoint = new PointController(pointOptions);
    this._creatingPoint.init();
  }

  _updatePoints(points) {
    this._onChangeView();
    this._subscriptions = [];
    this._points = points;
  }

  _renderPoint(point, listElement) {
    const pointOptions = Object.assign({}, this._pointDefaultOptions);
    pointOptions.container = listElement;
    pointOptions.data = point;

    const newPointController = new PointController(pointOptions);
    newPointController.init();
    this._subscriptions.push(newPointController.setDefaultView.bind(newPointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((sub) => sub());
  }

  _onDataChange(action, update, initiator) {
    this._onBoardDataChange(action, update, initiator);
  }
}


export default TripListController;
