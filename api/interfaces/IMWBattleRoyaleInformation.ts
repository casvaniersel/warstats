export interface Welcome {
    br:     Br;
    br_dmz: Br;
    br_all: Br;
}

export interface Br {
    wins:           number;
    kills:          number;
    kdRatio:        number;
    downs:          number;
    topTwentyFive:  number;
    topTen:         number;
    contracts:      number;
    revives:        number;
    topFive:        number;
    score:          number;
    timePlayed:     number;
    gamesPlayed:    number;
    tokens:         number;
    scorePerMinute: number;
    cash:           number;
    deaths:         number;
    title:          string;
}
