﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.User;
using MyHelper.Api.Services.Token;
using MyHelper.Api.Services.User;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/users")]
    public class AppUsersController : BaseController
    {
        private readonly IAppUserService _appUserService;

        public AppUsersController(IAppUserService appUserService, ITokenService tokenService) : base(tokenService)
        {
            _appUserService = appUserService;
        }

        [HttpGet]
        public async Task<ServerResponse<List<AppUserViewModel>>> GetAppUsersAsync(AppUserFilterRequest appUserFilterRequest)
        {
            return await _appUserService.GetAppUsersAsync(AccountId, appUserFilterRequest);
        }
    }
}