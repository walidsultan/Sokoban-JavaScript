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
    public class ExceptionsRepository
    {
        private SokobanEntities db = SokobanDataContextHelper.CurrentContext;

        public void InsertException(Sokoban.DataModels.Exception exception)
        {
            db.Exceptions.Add(exception);
            db.SaveChanges();
        }
    }
}
