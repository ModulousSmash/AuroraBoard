using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace S3
{
    public partial class SettingsForm : Form
    {
        public SettingsForm()
        {
            InitializeComponent();
            if (!Globals.settings.tintEnabled)
            {
                ColorTextBox.Enabled = false;
                
            }
            else
            {
               
                TintingEnableCheckbox.Checked = true;
               
            }
            ServerPortbox.Value = Globals.settings.serverPort;
            ColorTextBox.Text = Globals.settings.tintColor;
        }

        private void TintingEnableCheckbox_CheckedChanged(object sender, EventArgs e)
        {
            if (TintingEnableCheckbox.Checked)
            {
                ColorTextBox.Enabled = true;
            }
            else
            {
                ColorTextBox.Enabled = false;
            }
        }

        private void OkButton_Click(object sender, EventArgs e)
        {
            Globals.settings.serverPort = Convert.ToInt32(ServerPortbox.Value);
            Globals.settings.tintColor = ColorTextBox.Text;
            Globals.settings.tintEnabled = TintingEnableCheckbox.Checked;
            Close();
        }

        private void CancelButton_Click(object sender, EventArgs e)
        {
            Close();
        }
    }
}
