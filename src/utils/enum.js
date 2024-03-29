export const TimeValue = {
  MILLISECONDS_IN_SECOND: 1000,
  SECONDS_IN_MINUTE: 60,
  MINUTES_IN_HOUR: 60,
  HOURS_IN_DAY: 24,
  MILLISECONDS_IN_MINUTE: 1000 * 60,
  MILLISECONDS_IN_HOUR: 1000 * 60 * 60,
  MILLISECONDS_IN_DAY: 1000 * 60 * 60 * 24,
};

export const NOT_FOUND = -1;

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export const SortType = {
  TIME: `time`,
  PRICE: `price`,
  DEFAULT: `default`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const Action = {
  CREATE: `create`,
  UPDATE: `update`,
  PATCH_FAVORITE: `patch-favorite`,
  DELETE: `delete`,
  NONE: `none`
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export const BoardState = {
  NO_POINTS: `no-points`,
  FIRST_POINT: `first-point`,
  DEFAULT: `default`,
  LOADING: `loading`
};

export const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export const Key = {
  ESCAPE: `Escape`,
  IE_ESC: `Esc`
};

export const TagName = {
  INPUT: `INPUT`,
  A: `A`
};

export const Page = {
  TABLE: `table`,
  STATS: `stats`
};

export const ChartType = {
  MONEY: `money`,
  TRANSPORT: `transport`,
  TIME: `time`
};

export const Emoji = {
  FLAG: `🚩`,
  BUS: `🚍`,
  CHECK_IN: `🏨`,
  DRIVE: `🚘`,
  FLIGHT: `✈️`,
  RESTAURANT: `🍴`,
  SHIP: `🚢`,
  SIGHTSEEING: `👁️`,
  TAXI: `🚖`,
  TRAIN: `🚂`,
  TRANSPORT: `🚆`,
  TRIP: `🗻`
};
