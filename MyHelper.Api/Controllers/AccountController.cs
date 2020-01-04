﻿using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Account;
using MyHelper.Api.Services.Token;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}")]
    public class AccountController : BaseController
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService appUserService, ITokenService tokenService) : base(tokenService)
        {
            _accountService = appUserService;
        }

        [HttpPost("login")]
        public async Task<ServerResponse<AuthorizationTokenResponse>> LoginAsync([FromBody]LoginRequest request)
        {
            return await _accountService.LoginAsync(request);
        }

        [HttpPost("registration")]
        public async Task<ServerResponse<AuthorizationTokenResponse>> RegisterAsync([FromBody]RegistrationRequest request)
        {
            return await _accountService.RegisterAsync(request);
        }
    }
}