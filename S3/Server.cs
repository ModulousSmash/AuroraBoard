using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nancy;
using Nancy.Bootstrapper;
using Nancy.Conventions;
using Nancy.Diagnostics;
using Nancy.Hosting.Self;
using Nancy.Routing;
using Nancy.TinyIoc;
using Newtonsoft.Json;

namespace S3
{
    public class InformationUpdate
    {
        public Player Player1;
        public Player Player2;
        public string round;
        public string tournamentName;
        public string caster;
        public string streamer;

    }

    public class Player
    {
        public string name;
        public Character character;
        public Sponsor sponsor;
        public int score;
        public Flag flag;
    }
    public class Server : NancyModule
    {
        public Server()
        {
            Get["/getCurrentValues"] = parameters =>
            {
                InformationUpdate update = Globals.CurrentInformationUpdate;
                string data = JsonConvert.SerializeObject(update);
                Response response = (Response)data;
                response.ContentType = "application/json";
                return response;
            };
            Get["/scoreboard"] = paramaters =>
            {
                return Response.AsFile("Content/index.html", "text/html");
            };
        }

        public static NancyHost Run(Uri uri)
        {
            try
            {
                HostConfiguration config = new HostConfiguration();
                config.UrlReservations.CreateAutomatically = true;
                NancyHost host = new NancyHost(config, uri);
                
                host.Start();
                return host;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw;
            }

        }
    }

    public class CustomBootstrapper : DefaultNancyBootstrapper
    {
        protected override void ApplicationStartup(TinyIoCContainer container, IPipelines pipelines)
        {
            // your customization goes here
        }

        protected override void RequestStartup(TinyIoCContainer container, IPipelines pipelines, NancyContext context)
        {

            //CORS Enable
            pipelines.AfterRequest.AddItemToEndOfPipeline((ctx) =>
            {
                ctx.Response.WithHeader("Access-Control-Allow-Origin", "*")
                    .WithHeader("Access-Control-Allow-Methods", "POST,GET")
                    .WithHeader("Access-Control-Allow-Headers", "Accept, Origin, Content-type");

            });
        }
        protected override void ConfigureConventions(NancyConventions conventions)
        {
            base.ConfigureConventions(conventions);

            conventions.StaticContentsConventions.Add(
                StaticContentConventionBuilder.AddDirectory("assets", @"Content/html/*")
            );
        }
    }
}
