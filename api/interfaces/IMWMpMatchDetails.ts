export interface Welcome {
    summary: Summary;
    matches: Match[];
}

export interface Match {
    utcStartSeconds: number;
    utcEndSeconds:   number;
    map:             string;
    mode:            Mode;
    matchID:         string;
    duration:        number;
    playlistName:    null;
    version:         number;
    gameType:        GameType;
    result:          Result;
    winningTeam:     Team;
    gameBattle:      boolean;
    team1Score:      number;
    team2Score:      number;
    isPresentAtEnd:  boolean;
    player:          Player;
    playerStats:     { [key: string]: number };
    weaponStats:     WeaponStats;
    allPlayers:      null;
    arena:           boolean;
    privateMatch:    boolean;
}

export enum GameType {
    Mp = "mp",
}

export enum Mode {
    Koth = "koth",
}

export interface Player {
    team:            Team;
    rank:            number;
    awards:          Awards;
    nemesis:         string;
    username:        Username;
    uno:             string;
    platform:        Platform;
    killstreakUsage: KillstreakUsage;
    loadout:         Loadout[];
    mostKilled?:     string;
    clantag?:        string;
}

export interface Awards {
}

export interface KillstreakUsage {
    uav?: number;
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
    name:             string;
    label:            null | string;
    image:            null;
    imageMainUi:      null | string;
    imageProgression: null | string;
}

export interface Killstreak {
    name:  KillstreakName;
    label: KillstreakLabel | null;
}

export enum KillstreakLabel {
    PrecisionAirstrike = "Precision Airstrike",
    Uav = "UAV",
    VTOLJet = "VTOL Jet",
}

export enum KillstreakName {
    HoverJet = "hover_jet",
    None = "none",
    PrecisionAirstrike = "precision_airstrike",
    Uav = "uav",
}

export interface Lethal {
    name:             LethalName;
    label:            LethalLabel;
    image:            Image;
    imageLarge:       ImageLarge;
    progressionImage: ProgressionImage;
}

export enum Image {
    HudIconEquipmentC4 = "hud_icon_equipment_c4",
    HudIconEquipmentFrag = "hud_icon_equipment_frag",
    HudIconEquipmentHbSensor = "hud_icon_equipment_hb_sensor",
    HudIconEquipmentSemtex = "hud_icon_equipment_semtex",
    HudIconEquipmentSmoke = "hud_icon_equipment_smoke",
    HudIconEquipmentStun = "hud_icon_equipment_stun",
}

export enum ImageLarge {
    HudIconEquipmentHbSensor = "hud_icon_equipment_hb_sensor",
    IconEquipmentSlotC4 = "icon_equipment_slot_c4",
    IconEquipmentSlotFrag = "icon_equipment_slot_frag",
    IconEquipmentSlotSemtex = "icon_equipment_slot_semtex",
    IconEquipmentSlotSmoke = "icon_equipment_slot_smoke",
    IconEquipmentSlotStun = "icon_equipment_slot_stun",
}

export enum LethalLabel {
    C4 = "C4",
    FragGrenade = "Frag Grenade",
    HeartbeatSensor = "Heartbeat Sensor",
    Semtex = "Semtex",
    SmokeGrenade = "Smoke Grenade",
    StunGrenade = "Stun Grenade",
}

export enum LethalName {
    EquipC4 = "equip_c4",
    EquipConcussion = "equip_concussion",
    EquipFrag = "equip_frag",
    EquipHbSensor = "equip_hb_sensor",
    EquipSemtex = "equip_semtex",
    EquipSmoke = "equip_smoke",
}

export enum ProgressionImage {
    IconEquipmentC4 = "icon_equipment_c4",
    IconEquipmentFrag = "icon_equipment_frag",
    IconEquipmentHbSensor = "icon_equipment_hb_sensor",
    IconEquipmentSemtex = "icon_equipment_semtex",
    IconEquipmentSmoke = "icon_equipment_smoke",
    IconEquipmentStun = "icon_equipment_stun",
}

export interface AryWeapon {
    name:        PrimaryWeaponName;
    label:       PrimaryWeaponLabel;
    imageLoot:   ImageLoot;
    imageIcon:   ImageIcon;
    variant:     string;
    attachments: Attachment[];
}

export interface Attachment {
    name:     AttachmentName;
    label:    null;
    image:    null;
    category: null;
}

export enum AttachmentName {
    Barcust2 = "barcust2",
    Calcust = "calcust",
    Fastreload = "fastreload",
    Fmj = "fmj",
    Gripang = "gripang",
    Gripvert = "gripvert",
    None = "none",
    Pistolgrip02 = "pistolgrip02",
    Pistolgrip03 = "pistolgrip03",
    Reflexmini3 = "reflexmini3",
    Silencer = "silencer",
    Stockh = "stockh",
    Stockno = "stockno",
    Thermalvz = "thermalvz",
    Xmagslrg = "xmagslrg",
}

export enum ImageIcon {
    IconCacWeaponArMike4 = "icon_cac_weapon_ar_mike4",
    IconCacWeaponMeSoscarKnife = "icon_cac_weapon_me_soscar_knife",
    IconCacWeaponSmMpapa5 = "icon_cac_weapon_sm_mpapa5",
    IconCacWeaponSnHdromeo = "icon_cac_weapon_sn_hdromeo",
}

export enum ImageLoot {
    UILootWeaponArMike4 = "ui_loot_weapon_ar_mike4",
    UILootWeaponMeSoscar = "ui_loot_weapon_me_soscar",
    UILootWeaponSmMpapa5 = "ui_loot_weapon_sm_mpapa5",
    UILootWeaponSnHdromeo = "ui_loot_weapon_sn_hdromeo",
}

export enum PrimaryWeaponLabel {
    CombatKnife = "Combat Knife",
    Hdr = "HDR",
    M4A1 = "M4A1",
    Mp5 = "MP5",
}

export enum PrimaryWeaponName {
    Iw8ArMike4 = "iw8_ar_mike4",
    Iw8Knife = "iw8_knife",
    Iw8SmMpapa5 = "iw8_sm_mpapa5",
    Iw8SnHdromeo = "iw8_sn_hdromeo",
}

export enum Platform {
    Psn = "psn",
}

export enum Team {
    Allies = "allies",
    Axis = "axis",
}

export enum Username {
    Mbp = "MBP",
}

export enum Result {
    Loss = "loss",
    Win = "win",
}

export interface WeaponStats {
    iw8_sm_mpapa5?: C4MpP;
    iw8_knife?:     C4MpP;
    semtex_mp?:     C4MpP;
    none?:          C4MpP;
    iw8_ar_mike4?:  C4MpP;
    c4_mp_p?:       C4MpP;
}

export interface C4MpP {
    hits:             number;
    kills:            number;
    headshots:        number;
    loadoutIndex:     number;
    shots:            number;
    startingWeaponXp: number;
    deaths:           number;
    xpEarned:         number;
}

export interface Summary {
    all:  { [key: string]: number };
    koth: { [key: string]: number };
}
