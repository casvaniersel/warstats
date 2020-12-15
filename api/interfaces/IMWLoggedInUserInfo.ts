export interface Welcome {
    status:                      null;
    exceptionMessageList:        any[];
    errors:                      Errors;
    exceptionMessageCode:        null;
    userInfo:                    UserInfo;
    identities:                  Identity[];
    sessionID:                   null;
    accountPercentageCompletion: number;
    facebookLinked:              boolean;
    twitterLinked:               boolean;
    youtubeLinked:               boolean;
    twitchLinked:                boolean;
    amazonLinked:                boolean;
    emailValidated:              boolean;
    gamerAccountLinked:          boolean;
    codPreferences:              CodPreferences;
    playerSupportPreferences:    PlayerSupportPreferences;
}

export interface CodPreferences {
    in_game_events_sms:             boolean;
    gameplay_help_and_tips_sms:     boolean;
    news_and_community_updates:     boolean;
    esports_sms:                    boolean;
    sales_and_promotions:           boolean;
    news_and_community_updates_sms: boolean;
    gameplay_help_and_tips:         boolean;
    in_game_events:                 boolean;
    sales_and_promotions_sms:       boolean;
    esports:                        boolean;
}

export interface Errors {
}

export interface Identity {
    provider:           string;
    username:           null | string;
    tokens:             null;
    authorized:         boolean;
    created:            Date;
    updated:            Date;
    accountID:          string;
    secondaryAccountID: null | string;
}

export interface PlayerSupportPreferences {
    service_and_support:     boolean;
    service_and_support_sms: boolean;
    my_support:              boolean;
    my_support_sms:          boolean;
}

export interface UserInfo {
    userName:          string;
    friendCount:       number;
    notificationCount: number;
    isAuthenticated:   boolean;
    profilImageUrl:    null;
    phoneNumber:       string;
    countryCode:       string;
    postalCode:        string;
    isElite:           null;
    isGraceLogin:      boolean;
    graceLoginCount:   number;
    userNameEmpty:     boolean;
    jiveUserName:      string;
}
