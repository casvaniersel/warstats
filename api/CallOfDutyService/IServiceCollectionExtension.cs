using Microsoft.Extensions.DependencyInjection;

namespace CallOfDuty
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection AddCallOfDutyApi(this IServiceCollection services)
        {
            HttpClientFactoryServiceCollectionExtensions.AddHttpClient(services);
            services.AddSingleton<ICallOfDutyApi, CallOfDutyApi>();
            return services;
        }
    }
}
