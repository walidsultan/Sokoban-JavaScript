using Sokoban.DataModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Sokoban.DataAccessLayer
{
        public static class SokobanDataContextHelper
        {
            public static SokobanEntities CurrentContext
            {
                get
                {
                    if (HttpContext.Current.Items["SokobanDataContext"] == null)
                    {
                        HttpContext.Current.Items["SokobanDataContext"]
                            = new SokobanEntities();
                    }
                    return (SokobanEntities)HttpContext.Current.Items["SokobanDataContext"];
                }
            }
        }
}
