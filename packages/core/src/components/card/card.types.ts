export {};

export interface TdsCardClickEventDetail {
  cardId: string;
}

export interface CardClickEventEmitter<T = any> {
  emit: (data?: T) => CustomEvent<T>;
}

declare global {
  interface HTMLElementEventMap {
    tdsClick: CardClickEventEmitter<TdsCardClickEventDetail>;
  }
}
