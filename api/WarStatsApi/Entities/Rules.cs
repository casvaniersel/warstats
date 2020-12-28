using System;
using System.Collections;
using System.Collections.Generic;

namespace WarStatsApi
{
    public class Rules
    {
        public string Description { get; set; }
        public RuleType Type {get; set;}
        public int PointsPerKill { get; set; }
        public Dictionary<int,int> PointsPerPlacement { get; set; }
        public int NumberOfBestGames { get; set; }
    }

    public enum RuleType
    {
        Kills,
        Placement,
        KillsAndPlacement,
        Bracket
    }
}