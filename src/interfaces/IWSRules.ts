export enum RuleType {
    Kills,
    Placement,
    KillsAndPlacement,
    Bracket,
}

export default interface Rules {
    description: string;
    type: RuleType;
    pointsPerKill: number;
    pointsPerPlacement: any;
    numberOfBestGames: number;
}
