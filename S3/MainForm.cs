using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using ImageMagick;
using Nancy.Hosting.Self;
using Newtonsoft.Json;
namespace S3
{
    public partial class MainForm : Form
    {
        private NancyHost hostg;
        public MainForm()
        {
            InitializeComponent();
            Globals.CurrentInformationUpdate = new InformationUpdate();
            Globals.CurrentInformationUpdate.Player1 = new Player();
            Globals.CurrentInformationUpdate.Player2 = new Player();
            Globals.CurrentInformationUpdate.Player1.name = "EIREXE";
            Globals.CurrentInformationUpdate.Player2.name = "BoastingToast";
            parseComboBoxItems();
            SendUpdate();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void SendUpdateButton_Click(object sender, EventArgs e)
        {
            SendUpdate();
            
        }

        private void SendUpdate()
        {
            Globals.CurrentInformationUpdate.Player1.name = Player1Name.Text;
            Globals.CurrentInformationUpdate.Player2.name = Player2Name.Text;
            Globals.CurrentInformationUpdate.Player1.sponsor = (Sponsor)((ComboboxItem)Player1Sponsor.SelectedItem).Value;
            Globals.CurrentInformationUpdate.Player2.sponsor = (Sponsor)((ComboboxItem)Player2Sponsor.SelectedItem).Value;
            Globals.CurrentInformationUpdate.Player1.character = (Character)((ComboboxItem)Player1Character.SelectedItem).Value;
            Globals.CurrentInformationUpdate.Player2.character = (Character)((ComboboxItem)Player2Character.SelectedItem).Value;
            Globals.CurrentInformationUpdate.Player1.score = Decimal.ToInt32(Player1Score.Value);
            Globals.CurrentInformationUpdate.Player2.score = Decimal.ToInt32(Player2Score.Value);
            Globals.CurrentInformationUpdate.tournamentName = tournamentNameTextbox.Text;
            Globals.CurrentInformationUpdate.round = RoundNameTextbox.Text;
            Globals.CurrentInformationUpdate.caster = CasterTextbox.Text;
            Globals.CurrentInformationUpdate.streamer = StreamerTextbox.Text;
            Globals.CurrentInformationUpdate.Player1.flag = ((Flag) ((ComboboxItem) FlagsCombo.SelectedItem).Value);
            Globals.CurrentInformationUpdate.Player2.flag = ((Flag)((ComboboxItem)FlagsComboP2.SelectedItem).Value);
        }
        private void parseComboBoxItems()
        {
            string file = Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "characters.json");
            string contents = File.ReadAllText(file);
            CharacterList list = JsonConvert.DeserializeObject<CharacterList>(contents);
            
            foreach(Character c in list.characters)
            {
                ComboboxItem item = new ComboboxItem();
                item.Text = c.name;
                item.Value = c;
                Player1Character.Items.Add(item);
                Player2Character.Items.Add(item);
                
            }
            Player1Character.SelectedIndex = 0;
            Player2Character.SelectedIndex = 0;


            string sponsors = Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "sponsors.json");
            string sponsorsContents = File.ReadAllText(sponsors);
            SponsorList sponsorslist = JsonConvert.DeserializeObject<SponsorList>(sponsorsContents);

            foreach (Sponsor s in sponsorslist.sponsors)
            {
                ComboboxItem item = new ComboboxItem();
                item.Text = s.name;
                item.Value = s;
                Player1Sponsor.Items.Add(item);
                Player2Sponsor.Items.Add(item);

            }
            Player1Character.SelectedIndex = 0;
            Player2Character.SelectedIndex = 0;
            Player1Sponsor.SelectedIndex = 0;
            Player2Sponsor.SelectedIndex = 0;
            string flags = Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "flags.json");
            string flagsContents = File.ReadAllText(flags);
            FlagList flagsList = JsonConvert.DeserializeObject<FlagList>(flagsContents);
            foreach (Flag flag in flagsList.flags)
            {
                ComboboxItem item = new ComboboxItem();
                item.Text = flag.name;
                item.Value = flag;
                FlagsCombo.Items.Add(item);
                FlagsComboP2.Items.Add(item);
            }
            FlagsCombo.SelectedIndex = 0;
            FlagsComboP2.SelectedIndex = 0;
        }

        private void SettingsButton_Click(object sender, EventArgs e)
        {
            SettingsForm form = new SettingsForm();
            form.ShowDialog();
        }

        private void openToolStripMenuItem_Click(object sender, EventArgs e)
        {
            OpenFileDialog dialog = new OpenFileDialog();
            dialog.Filter = "Scoreboard Settings Data(.auboard) | *.auboard | All Files(*.*) | *.*";
            DialogResult result = dialog.ShowDialog();
            if (result == DialogResult.OK || result == DialogResult.Yes)
            {
                string contents = File.ReadAllText(dialog.FileName);
                Settings settings = JsonConvert.DeserializeObject<Settings>(contents);
                Globals.settings = settings;
                updateData();
            }
        }

        private void saveAsToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SaveFileDialog dialog = new SaveFileDialog();
            dialog.Filter = "Scoreboard Settings Data(.auboard) | *.auboard | All Files(*.*) | *.*";
            Globals.settings.streamData = Globals.CurrentInformationUpdate;
            DialogResult result = dialog.ShowDialog();
            if (result == DialogResult.OK || result == DialogResult.Yes)
            {
                File.WriteAllText(dialog.FileName,JsonConvert.SerializeObject(Globals.settings, Formatting.Indented));
            }
            
        }

        private void updateData()
        {
            Player1Name.Text = Globals.settings.streamData.Player1.name;
            Player2Name.Text = Globals.settings.streamData.Player2.name;
            Player1Sponsor.Text = Globals.settings.streamData.Player1.sponsor.name;
            Player2Sponsor.Text = Globals.settings.streamData.Player2.sponsor.name;
            Player1Character.Text = Globals.settings.streamData.Player1.character.name;
            Player2Character.Text = Globals.settings.streamData.Player2.character.name;
            Player1Score.Text = Globals.settings.streamData.Player1.score.ToString();
            Player2Score.Text = Globals.settings.streamData.Player2.score.ToString();
            FlagsCombo.Text = Globals.settings.streamData.Player1.flag.name;
            FlagsComboP2.Text = Globals.settings.streamData.Player2.flag.name;
            RoundNameTextbox.Text = Globals.settings.streamData.round;
            tournamentNameTextbox.Text = Globals.settings.streamData.tournamentName;
            StreamerTextbox.Text = Globals.settings.streamData.streamer;
            CasterTextbox.Text = Globals.settings.streamData.caster;
            SendUpdate();
        }
        private bool isServerUp = false;
        private void StartServer_Click(object sender, EventArgs e)
        {


            
            if (isServerUp)
            {
                hostg.Stop();
                StartServer.Text = "Start Server";
                isServerUp = false;
            }
            else
            {
                if (Globals.settings.tintEnabled)
                {
                    foreach (string file in Directory.GetFiles(Path.Combine(Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "Content/html/img")))
                    {
                        using (MagickImage image = new MagickImage(file))
                        {
                            image.Colorize(new MagickColor(Globals.settings.tintColor), new Percentage(100));
                            image.Write(file);
                        }
                    }
                }
                isServerUp = true;
                try
                {
                    UrlLinkLabel.Text = "http://127.0.0.1:" + Globals.settings.serverPort + "/Content/html/scoreboard.html";
                    HostConfiguration config = new HostConfiguration();
                    config.UrlReservations.CreateAutomatically = true;
                    NancyHost host = new NancyHost(config, new Uri("http://127.0.0.1:" + Globals.settings.serverPort));

                    host.Start();
                    hostg = host;
                    StartServer.Text = "Stop Server";
                }
                catch (Exception ee)
                {
                    Console.WriteLine(ee.Message);
                    throw;
                }
            }
        }

        private void UrlLinkLabel_Click(object sender, EventArgs e)
        {
            Process.Start(UrlLinkLabel.Text);
        }
    }
}
