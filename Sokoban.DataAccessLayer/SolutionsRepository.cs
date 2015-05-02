using Sokoban.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
namespace Sokoban.DataAccessLayer
{
    public class SolutionsRepository
    {
        private SokobanEntities db = SokobanDataContextHelper.CurrentContext;

        public void InsertSolution(Solution solution) {
            db.Solutions.Add(solution);
            db.SaveChanges();
        }
    }
}
