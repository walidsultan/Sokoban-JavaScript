using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Sokoban.DataAccessLayer;

namespace Sokoban.WebAPI.Controllers
{
    [ApiController]
    [Route("Exceptions")]
    public class ExceptionsController : ControllerBase
    {
        [HttpPost]
        [EnableCors]
        public void Post(Sokoban.DataModels.Exception exception)
        {
            exception.CreateDate = DateTime.UtcNow;

            ExceptionsRepository exceptionsRepository = new ExceptionsRepository();
            exceptionsRepository.InsertException(exception);
        }
    }
}
