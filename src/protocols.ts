import { Participant, Game, Bet } from '@prisma/client';

export type CreateParticipantInput = {
  name: string;
  balance: number;
};

export type ParticipantOutput = Participant[];

export type CreateGameInput = {
  homeTeamName: string;
  awayTeamName: string;
};

export type GameOutput = Game & { bets: Bet[] };

export type CreateBetInput = {
  homeTeamScore: number;
  awayTeamScore: number;
  amountBet: number;
  gameId: number;
  participantId: number;
};

export type BetOutput = Bet;

export class ApplicationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message?: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends ApplicationError {
  constructor(message?: string) {
    super(message);
    this.name = 'ConflictError';
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message?: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export class InvalidCredentialsError extends ApplicationError {
  constructor(message?: string) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}
