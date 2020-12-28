using CallOfDuty.Domain;
using CallOfDuty.Helpers;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;

namespace CallOfDuty
{
    public class CallOfDutyApi : ICallOfDutyApi
    {

        private readonly HttpClient client;

        public CallOfDutyApi(IHttpClientFactory httpClientFactory)
        {
            this.client = httpClientFactory.CreateClient();
        }

        public async Task<CallOfDutyWarzoneStatistics> GetWzStats(string platform, string gamertag, int start = 0, int end = 0)
        {
            var requestContent = new StringContent(JsonConvert.SerializeObject(DeviceIdHelper.GetDeviceId()), Encoding.UTF8, MediaTypeNames.Application.Json);
            requestContent.Headers.Add("Cookie", CookieHelper.BaseCookie);
            var response = await client.PostAsync(UriHelper.GetRegisterDeviceUri, requestContent).ConfigureAwait(true);
            var deserialized = JsonConvert.DeserializeObject<ResponseDeviceId>(await response.Content.ReadAsStringAsync());
            if (string.IsNullOrEmpty(deserialized.data.authHeader))
                throw new Exception("No authheader recieved");

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", deserialized.data.authHeader);

            var credentials = CredentialsHelper.CreateCredentials();
            if (string.IsNullOrEmpty(credentials.Email) || string.IsNullOrEmpty(credentials.Password))
                throw new Exception("No credentials loaded");

            var requestLogin = new StringContent(JsonConvert.SerializeObject(credentials), Encoding.UTF8, MediaTypeNames.Application.Json);
            var deviceId = DeviceIdHelper.GetDeviceIdString();
            if (string.IsNullOrEmpty(deviceId))
                throw new Exception("No deviceId Loader");

            requestLogin.Headers.Add("x_cod_device_id", deviceId);
            var loginResponse = await client.PostAsync(UriHelper.GetLoginUri, requestLogin);
            var responseString = await loginResponse.Content.ReadAsStringAsync();
            var deserializedLoginResponse = JsonConvert.DeserializeObject<ResponseLogin>(responseString);
            if (string.IsNullOrEmpty(deserializedLoginResponse.ActSsoToken) || string.IsNullOrEmpty(deserializedLoginResponse.AtknToken) || string.IsNullOrEmpty(deserializedLoginResponse.RtknToken))
                throw new Exception("Login response not complete");

            var requestMatchData = new StringContent(JsonConvert.SerializeObject(""), Encoding.UTF8, MediaTypeNames.Application.Json);
            requestMatchData.Headers.Add("Cookie", CookieHelper.CreateApiCookie(deserializedLoginResponse.RtknToken, deserializedLoginResponse.ActSsoToken, deserializedLoginResponse.AtknToken));

            var responseMatchData = await client.PostAsync(UriHelper.CreateWzUri(platform, gamertag, start, end), requestMatchData);
            var responseContentString = await responseMatchData.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<CallOfDutyWarzoneStatistics>(responseContentString);
            if (result == null || string.IsNullOrEmpty(result.status) || result.status != "success")
                throw new Exception("Failed to get warzone statistics");

            return result;
        }
    }
}
