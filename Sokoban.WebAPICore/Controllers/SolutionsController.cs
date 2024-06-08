using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Sokoban.DataAccessLayer;
using Sokoban.DataModels;

namespace Sokoban.WebAPI.Controllers
{
    [ApiController]
    [Route("Solutions")]
    public class SolutionsController : ControllerBase
    {
        [HttpPost]
        [EnableCors]
        public void Post(Solution solution)
        {
            solution.CreateDate = DateTime.UtcNow;

            SolutionsRepository solutionsRepository = new SolutionsRepository();
            solutionsRepository.InsertSolution(solution);
        }
    }
}
