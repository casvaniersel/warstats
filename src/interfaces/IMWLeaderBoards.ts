export interface IMWLeaderBoards {
    title: string;
    platform: string;
    leaderboardType: string;
    gameMode: string;
    page: number;
    resultsRequested: number;
    totalPages: number;
    sort: null;
    columns: string[];
    entries: Entry[];
}

export interface Entry {
    rank: number;
    username: string;
    updateTime: number;
    rating: number;
    values: { [key: string]: number };
}
