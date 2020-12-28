using CallOfDuty;
using CallOfDuty.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WarStatsApi.Entities;
using WarStatsApi.Repositories;

namespace WarStatsApi.Services
{
    public class UpdateStatisticsService
    {
        private readonly CallOfDutyApiAdapter codApi;
        private readonly TournamentRepository tournamentRepository;
        private readonly StatisticsRepository statsRepository;
        private readonly MatchRepository matchRepository;

        public UpdateStatisticsService(CallOfDutyApiAdapter codApi, TournamentRepository tournamentRepository, StatisticsRepository statsRepository, MatchRepository matchRepository)
        {
            this.codApi = codApi;
            this.tournamentRepository = tournamentRepository;
            this.statsRepository = statsRepository;
            this.matchRepository = matchRepository;
        }

        internal async Task Update()
        {
            foreach (Tournament tournament in tournamentRepository.NowActive())
            {
                await Update(tournament);
            }
        }

        private async Task Update(Tournament tournament)
        {
            foreach (var team in tournament.Teams)
            {
                await UpdateStatsFor(team);
            }

            AddMatchDataToTournament(tournament);
            ScoreCalculator.Calculate(tournament);
            tournamentRepository.Save(tournament);
        }

        private void AddMatchDataToTournament(Tournament tournament)
        {
            foreach (var team in tournament.Teams)
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

        private async Task UpdateStatsFor(Entities.Team team)
        {
            foreach (var player in team.Players)
            {
                CallOfDutyWarzoneStatistics stats = await codApi.GetStatisticsOfPlayer(player);
                statsRepository.Insert(stats);
            }
        }
    }
}