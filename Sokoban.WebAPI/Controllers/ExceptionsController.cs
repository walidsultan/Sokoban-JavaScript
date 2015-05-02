using Sokoban.DataAccessLayer;
using Sokoban.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Sokoban.WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ExceptionsController : ApiController
    {
        [HttpPost]
        public void Post(Sokoban.DataModels.Exception exception)
        {
            ExceptionsRepository exceptionsRepository = new ExceptionsRepository();
            exceptionsRepository.InsertException(exception);
        }
    }
}
