export interface IMWWeeklyStats {
    mp: Mp;
    wz: Wz;
}

export interface Mp {
    all:  All;
    mode: MpMode;
    map:  Map;
}

export interface All {
    properties: { [key: string]: number };
}

export interface Map {
}

export interface MpMode {
    koth: All;
}

export interface Wz {
    all:  All;
    mode: WzMode;
    map:  Map;
}

export interface WzMode {
    br_all:     All;
    br_brquads: All;
    br_brduos:  All;
}
