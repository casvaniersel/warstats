using CallOfDuty;
using System.Collections.Generic;
using System.Linq;
using WarStatsApi.Entities;
using WarStatsApi.Repositories;

namespace WarStatsApi.Services
{
    public class ScoreService
    {
        private readonly MatchRepository matchRepository;

        public ScoreService(MatchRepository matchRepository)
        {
            this.matchRepository = matchRepository;
        }

        public void AddScores(Tournament tournament)
        {
            foreach(var team in tournament.Teams)
            {
                List<Match> matchesOfTeam = new List<Match>();
                foreach (var player in team.Players)
                {
                    var matchesOfPlayer = matchRepository.Get(player.GamerTag, TimestampConverter.ConvertToUnixTimestamp(tournament.Start), TimestampConverter.ConvertToUnixTimestamp(tournament.End));
                    matchesOfTeam.AddRange(matchesOfPlayer);
                }

                foreach (var match in matchesOfTeam)
                {
                    MatchScore matchScore = team.Score.Matches.FirstOrDefault(x => x.Id == match.matchID);
                    if (matchScore == null)
                    {
                        matchScore = new MatchScore()
                        {
                            Id = match.matchID,
                            Placement = (int)match.playerStats.teamPlacement
                        };
                    }

                    matchScore.PlayerScores.Add(new PlayerScore()
                    {
                        Kills = (int)match.playerStats.kills,
                        KD = match.playerStats.kdRatio
                    });
                }
            }
        }
    }
}
