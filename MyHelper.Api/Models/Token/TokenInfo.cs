﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Models.Token
{
    public class TokenInfo
    {
        public string Token { get; set; }

        public DateTime ExpiredDate { get; set; }
    }
}
