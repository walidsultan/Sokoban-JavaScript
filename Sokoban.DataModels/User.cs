//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Sokoban.DataModels
{
    using System;
    using System.Collections.Generic;
    
    public partial class User
    {
        public User()
        {
            this.Solutions = new HashSet<Solution>();
        }
    
        public System.Guid Id { get; set; }
        public string Name { get; set; }
        public string IPAddress { get; set; }
        public System.DateTime CreateDate { get; set; }
    
        public virtual ICollection<Solution> Solutions { get; set; }
    }
}
