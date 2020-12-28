using CallOfDuty;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Options;
using WarStatsApi.Repositories;
using WarStatsApi.Services;

namespace WarStatsApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            ConventionRegistry.Register(
                "DictionaryRepresentationConvention",
                new ConventionPack { new DictionaryRepresentationConvention(DictionaryRepresentation.ArrayOfArrays) },
                _ => true);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
            {
                
            });

            services.AddCallOfDutyApi();
            services.AddSingleton<TournamentRepository, TournamentRepository>();
            services.AddSingleton<StatisticsRepository, StatisticsRepository>();
            services.AddSingleton<MatchRepository, MatchRepository>();
            services.AddSingleton<UpdateStatisticsService, UpdateStatisticsService>();
            services.AddSingleton<CallOfDutyApiAdapter, CallOfDutyApiAdapter>();
            services.Configure<MongoDatabaseSettings>(
                Configuration.GetSection(nameof(MongoDatabaseSettings)));

            services.AddSingleton(sp =>
                sp.GetRequiredService<IOptions<MongoDatabaseSettings>>().Value);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
