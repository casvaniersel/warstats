export interface IMWWzDetails {
    title:            string;
    platform:         string;
    username:         string;
    type:             string;
    level:            number;
    maxLevel:         number;
    levelXpRemainder: number;
    levelXpGained:    number;
    prestige:         number;
    prestigeId:       number;
    maxPrestige:      number;
    totalXp:          number;
    paragonRank:      number;
    paragonId:        number;
    s:                number;
    p:                number;
    lifetime:         Lifetime;
    weekly:           Weekly;
    engagement:       null;
}

export interface Lifetime {
    all:             All;
    mode:            { [key: string]: All };
    map:             Map;
    itemData:        ItemData;
    scorestreakData: ScorestreakData;
    accoladeData:    AccoladeData;
}

export interface AccoladeData {
    properties: { [key: string]: number };
}

export interface All {
    properties: { [key: string]: number };
}

export interface ItemData {
    weapon_sniper:        WeaponSniper;
    tacticals:            Tacticals;
    lethals:              Lethals;
    weapon_lmg:           { [key: string]: WeaponAssaultRifle };
    weapon_launcher:      WeaponLauncher;
    weapon_pistol:        WeaponPistol;
    weapon_assault_rifle: { [key: string]: WeaponAssaultRifle };
    weapon_other:         WeaponOther;
    weapon_shotgun:       WeaponShotgun;
    weapon_smg:           { [key: string]: WeaponAssaultRifle };
    weapon_marksman:      WeaponMarksman;
    weapon_melee:         WeaponMelee;
}

export interface Lethals {
    equip_frag:           Equip;
    equip_thermite:       Equip;
    equip_semtex:         Equip;
    equip_claymore:       Equip;
    equip_c4:             Equip;
    equip_at_mine:        Equip;
    equip_throwing_knife: Equip;
    equip_molotov:        Equip;
}

export interface Equip {
    properties: EquipAtMineProperties;
}

export interface EquipAtMineProperties {
    hits:      number;
    kills:     number;
    shots:     number;
    deaths:    number;
    headShots: number;
}

export interface Tacticals {
    equip_gas_grenade:      Equip;
    equip_snapshot_grenade: Equip;
    equip_decoy:            Equip;
    equip_smoke:            Equip;
    equip_concussion:       Equip;
    equip_hb_sensor:        Equip;
    equip_flash:            Equip;
    equip_adrenaline:       Equip;
}

export interface WeaponAssaultRifle {
    properties: WeaponAssaultRifleProperties;
}

export interface WeaponAssaultRifleProperties {
    hits:      number;
    kills:     number;
    kdRatio:   number;
    headshots: number;
    accuracy:  number;
    shots:     number;
    deaths:    number;
}

export interface WeaponLauncher {
    iw8_la_gromeo: WeaponAssaultRifle;
    iw8_la_rpapa7: WeaponAssaultRifle;
    iw8_la_juliet: WeaponAssaultRifle;
    iw8_la_kgolf:  WeaponAssaultRifle;
    iw8_la_mike32: WeaponAssaultRifle;
}

export interface WeaponMarksman {
    iw8_sn_sbeta:    WeaponAssaultRifle;
    iw8_sn_crossbow: WeaponAssaultRifle;
    iw8_sn_kilo98:   WeaponAssaultRifle;
    iw8_sn_mike14:   WeaponAssaultRifle;
    iw8_sn_sksierra: WeaponAssaultRifle;
}

export interface WeaponMelee {
    iw8_me_akimboblunt:  WeaponAssaultRifle;
    iw8_me_akimboblades: WeaponAssaultRifle;
    iw8_knife:           WeaponAssaultRifle;
}

export interface WeaponOther {
    iw8_me_riotshield: WeaponAssaultRifle;
}

export interface WeaponPistol {
    iw8_pi_cpapa:    WeaponAssaultRifle;
    iw8_pi_mike9:    WeaponAssaultRifle;
    iw8_pi_mike1911: WeaponAssaultRifle;
    iw8_pi_golf21:   WeaponAssaultRifle;
    iw8_pi_decho:    WeaponAssaultRifle;
    iw8_pi_papa320:  WeaponAssaultRifle;
}

export interface WeaponShotgun {
    iw8_sh_mike26:     WeaponAssaultRifle;
    iw8_sh_charlie725: WeaponAssaultRifle;
    iw8_sh_oscar12:    WeaponAssaultRifle;
    iw8_sh_romeo870:   WeaponAssaultRifle;
    iw8_sh_dpapa12:    WeaponAssaultRifle;
}

export interface WeaponSniper {
    iw8_sn_alpha50:  WeaponAssaultRifle;
    iw8_sn_hdromeo:  WeaponAssaultRifle;
    iw8_sn_delta:    WeaponAssaultRifle;
    iw8_sn_xmike109: WeaponAssaultRifle;
}

export interface Map {
}

export interface ScorestreakData {
    lethalScorestreakData:  { [key: string]: LethalScorestreakDatum };
    supportScorestreakData: SupportScorestreakData;
}

export interface LethalScorestreakDatum {
    properties: LethalScorestreakDatumProperties;
}

export interface LethalScorestreakDatumProperties {
    extraStat1:   number;
    uses:         number;
    awardedCount: number;
}

export interface SupportScorestreakData {
    airdrop:               LethalScorestreakDatum;
    radar_drone_overwatch: LethalScorestreakDatum;
    scrambler_drone_guard: LethalScorestreakDatum;
    uav:                   LethalScorestreakDatum;
    airdrop_multiple:      LethalScorestreakDatum;
    directional_uav:       LethalScorestreakDatum;
}

export interface Weekly {
    all:  All;
    mode: Mode;
    map:  Map;
}

export interface Mode {
    koth: All;
}
