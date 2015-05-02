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
    public class UsersController : ApiController
    {
        [HttpPost]
        public void Post(User user) {
            user.CreateDate = DateTime.UtcNow;

            UsersRepository usersRepository = new UsersRepository();
            usersRepository.InsertUser(user);
        }
    }
}
