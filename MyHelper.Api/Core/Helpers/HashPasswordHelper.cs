﻿using CryptoHelper;

namespace MyHelper.Api.Core.Helpers
{
    public static class HashPasswordHelper
    {
        public static string Hash(string password)
        {
            return Crypto.HashPassword(password);
        }

        public static bool Verify(string hash, string password)
        {
            return Crypto.VerifyHashedPassword(hash, password);
        }
    }
}
