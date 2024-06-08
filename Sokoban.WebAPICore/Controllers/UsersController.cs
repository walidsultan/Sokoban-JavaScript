using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Sokoban.DataAccessLayer;
using Sokoban.DataModels;

namespace Sokoban.WebAPI.Controllers
{
    [ApiController]
    [Route("Users")]
    public class UsersController : ControllerBase
    {
        [HttpPost]
        [EnableCors]
        public void Post(User user) {
            user.CreateDate = DateTime.UtcNow;

            UsersRepository usersRepository = new UsersRepository();
            usersRepository.InsertUser(user);
        }
    }
}
