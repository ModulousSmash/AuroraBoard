using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace S3
{
    public class Sponsor
    {
        public string name;
        public string icon;
    }

    class SponsorList
    {
        public IList<Sponsor> sponsors;
    }
}
