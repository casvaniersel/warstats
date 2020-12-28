namespace CallOfDuty
{
    internal static class CookieHelper
    {
        private static readonly string baseCookie = "new_SiteId=cod;ACT_SSO_LOCALE=en_US;country=NL;XSRF-TOKEN=68e8b62e-1d9d-4ce1-b93f-cbe5ff31a041;";

        public static string BaseCookie
        {
            get
            {
                return baseCookie;
            }
        }

        public static string CreateApiCookie(string RtknToken, string ActSsoCookie, string AtknToken)
        {
            return $"{baseCookie}rtkn={RtknToken};ACT_SSO_COOKIE={ActSsoCookie};atkn={AtknToken}";
        }
    }
}
