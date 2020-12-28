using MoreLinq;
using System;
using System.Linq;
using WarStatsApi.Entities;

namespace WarStatsApi
{
    public static class ScoreCalculator
    {

        public static void Calculate(Tournament tournament)
        {
            CalculatePoints(tournament);
            CalculateRanks(tournament);
        }

        private static void CalculateRanks(Tournament tournament)
        {
            var teams = tournament.Teams.OrderByDescending(x => x.Score.Points).ToArray();
            for (int i = 1; i < teams.Count(); i++)
            {
                teams[i].Score.Rank = i;
                if (i+1 == teams.Count())
                    return;

                if (teams[i].Score.Points == teams[i + 1].Score.Points)
                {
                    //Tie-break

                }
            }
        }

        private static void CalculatePoints(Tournament tournament)
        {
            foreach (Team team in tournament.Teams)
            {
                team.Score.Points = InnerCalculater(tournament.Rules, team.Score);
            }
        }

        private static int InnerCalculater(Rules rules, TeamScore score)
        {
            switch (rules.Type)
            {
                case RuleType.Kills:
                    return CalculateForKills(rules, score);
                case RuleType.Placement:
                    return CalculateForPlacement(rules, score);
                case RuleType.KillsAndPlacement:
                    return CalculateForKillsAndPlacement(rules, score);
                case RuleType.Bracket:
                default:                
                    throw new NotImplementedException("");
            }
            
        }

        private static int CalculateForKills(Rules rules, TeamScore score)
        {
            return score.Matches.Take(rules.NumberOfBestGames).Sum(x => x.TotalKills);
        }

        private static int CalculateForPlacement(Rules rules, TeamScore score)
        {
            var distinctMatches = score.Matches.DistinctBy(x => x.Id);
            return distinctMatches.Sum(x => (rules.PointsPerPlacement.ContainsKey(x.Placement) ? rules.PointsPerPlacement[x.Placement] : 0));
        }

        private static int CalculateForKillsAndPlacement(Rules rules, TeamScore score)
        {
            var placementpoints = CalculateForPlacement(rules, score);
            var killspoints = CalculateForKills(rules, score);

            //team.Score.Matches.OrderByDescending(x => x.Points).Take(tournament.Rules.NumberOfBestGames).Sum(x => x.Points);

            return placementpoints + killspoints;
        }
    }
}
