export class Step {
  from: number | Frame;
  to: number | Frame;
  loop?: boolean;
  forceStart?: boolean;
  speed?: number;
}

export enum Frame {
  CURRENT = 1
}
