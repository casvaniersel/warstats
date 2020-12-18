export interface IMWWzMatchDetails {
    summary: Summary;
    matches: Match[];
}

export interface Match {
    utcStartSeconds: number;
    utcEndSeconds:   number;
    map:             Map;
    mode:            Mode;
    matchID:         string;
    duration:        number;
    playlistName:    null;
    version:         number;
    gameType:        GameType;
    playerCount:     number;
    playerStats:     { [key: string]: number };
    player:          Player;
    teamCount:       number;
    rankedTeams:     null;
    draw:            boolean;
    privateMatch:    boolean;
}

export enum GameType {
    Wz = "wz",
}

export enum Map {
    MpDon3 = "mp_don3",
}

export enum Mode {
    BrBrduos = "br_brduos",
    BrBrquads = "br_brquads",
    BrBrtrios = "br_brtrios",
    BrKingslayerKingsltrios = "br_kingslayer_kingsltrios",
}

export interface Player {
    team:            string;
    rank:            number;
    awards:          Awards;
    username:        Username;
    uno:             string;
    clantag:         Clantag;
    brMissionStats?: BrMissionStats;
    loadout:         Loadout[];
}

export interface Awards {
}

export interface BrMissionStats {
    missionsComplete:           number;
    totalMissionXpEarned:       number;
    totalMissionWeaponXpEarned: number;
    missionStatsByType:         MissionStatsByType;
}

export interface MissionStatsByType {
    assassination?: Ination;
    domination?:    Ination;
}

export interface Ination {
    weaponXp: number;
    xp:       number;
    count:    number;
}

export enum Clantag {
    The31B7 = "^31B^7",
}

export interface Loadout {
    primaryWeapon:   AryWeapon;
    secondaryWeapon: AryWeapon;
    perks:           Perk[];
    extraPerks:      Perk[];
    killstreaks:     Killstreak[];
    tactical:        Lethal;
    lethal:          Lethal;
}

export interface Perk {
    name:             ExtraPerkName;
    label:            null;
    image:            null;
    imageMainUi:      null;
    imageProgression: null;
}

export enum ExtraPerkName {
    Null = "null",
    SpecialtyCovertOps = "specialty_covert_ops",
    SpecialtyExtraShrapnel = "specialty_extra_shrapnel",
    SpecialtyGuerrilla = "specialty_guerrilla",
    SpecialtyHustle = "specialty_hustle",
    SpecialtyNull = "specialty_null",
    SpecialtyScavengerPlus = "specialty_scavenger_plus",
    SpecialtySurveillance = "specialty_surveillance",
    SpecialtyTwoprimaries = "specialty_twoprimaries",
}

export interface Killstreak {
    name:  KillstreakName;
    label: null;
}

export enum KillstreakName {
    HoverJet = "hover_jet",
    None = "none",
    PrecisionAirstrike = "precision_airstrike",
    Uav = "uav",
}

export interface Lethal {
    name:             string;
    label:            null;
    image:            null;
    imageLarge:       null;
    progressionImage: null;
}

export interface AryWeapon {
    name:        string;
    label:       null;
    imageLoot:   null;
    imageIcon:   null;
    variant:     string;
    attachments: Attachment[];
}

export interface Attachment {
    name:     string;
    label:    null;
    image:    null;
    category: null;
}

export enum Username {
    Mbp = "MBP",
}

export interface Summary {
    all:                       { [key: string]: number };
    br_brtrios:                { [key: string]: number };
    br_brquads:                { [key: string]: number };
    br_brduos:                 { [key: string]: number };
    br_kingslayer_kingsltrios: { [key: string]: number };
}
