export interface Program {
  name: string;
  pauseSeconds: number;
  description?: string;
}

export interface ProgramWithId extends Program {
  id: string;
}
