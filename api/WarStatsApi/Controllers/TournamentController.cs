using CallOfDuty;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using WarStatsApi.Entities;
using WarStatsApi.Repositories;

namespace WarStatsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class TournamentController : ControllerBase
    {
        private readonly TournamentRepository _tournamentRepository;

        public TournamentController(TournamentRepository tournamentRepository)
        {
            _tournamentRepository = tournamentRepository;
        }

        [HttpGet]
        public IEnumerable<Tournament> All()
        {
            return _tournamentRepository.All();
        }

        [HttpGet]
        public IEnumerable<Tournament> Active()
        {
            return _tournamentRepository.NowActive();
        }

        [HttpGet]
        public string Add(string name, string start, string end)
        {
            var newTournament = new Tournament()
            {
                Name = name,
                Start = DateTime.Parse(start),
                End = DateTime.Parse(end),
                Teams = new List<Team>(),
                Rules = defaultRules
            };

            _tournamentRepository.Save(newTournament);

            return newTournament.Id;
        }

        [HttpGet]
        public void Remove(string name)
        {
            _tournamentRepository.Delete(name);
        }

        [HttpGet]
        public string AddPlayerToTeam(string tournamentId, string gamertag, string platform, string teamId = null)
        {
            Tournament tournament = _tournamentRepository.Get(tournamentId);
            Team team = !string.IsNullOrEmpty(teamId) ? tournament.Teams.FirstOrDefault(x => x.Id == teamId) : new Team();
            team.Players.Add(new Player
            {
                GamerTag = gamertag,
                Platform = platform
            });
            tournament.Teams.Add(team);
            _tournamentRepository.Save(tournament);

            return team.Id;
        }

        private Rules defaultRules = new Rules()
        {
            Description = "Mooie regels",
            PointsPerKill = 1,
            PointsPerPlacement = new Dictionary<int, int>()
                    {
                        {1,10},{2,8},{3,6},{4,4},{5,2},{6,1},{7,1},{8,1},{9,1},{10,1}
                    },
            Type = RuleType.KillsAndPlacement
        };

        [HttpGet]
        public void AddTestTournament()
        {
            var tournament = _tournamentRepository.GetTestTournament();
            _tournamentRepository.Save(tournament);
        }
    }
}
