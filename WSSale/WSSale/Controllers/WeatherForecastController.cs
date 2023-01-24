using Microsoft.AspNetCore.Mvc;

namespace WSSale.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            List<WeatherForecast> forecasts = new List<WeatherForecast>();
            forecasts.Add(new WeatherForecast() { Id = 1, Name = "Orlando" });
            forecasts.Add(new WeatherForecast() { Id = 2, Name = "Juan" });
            forecasts.Add(new WeatherForecast() { Id = 3, Name = "Pablo" });
            return forecasts;
        }
    }
}