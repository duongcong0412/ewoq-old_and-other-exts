namespace QRExtension
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.ExtInstall = new System.Windows.Forms.Button();
            this.ExtIDLabel = new System.Windows.Forms.Label();
            this.ExtUninstall = new System.Windows.Forms.Button();
            this.ExtIDInput = new System.Windows.Forms.RichTextBox();
            this.txtTest = new System.Windows.Forms.RichTextBox();
            this.SuspendLayout();
            // 
            // ExtInstall
            // 
            this.ExtInstall.Location = new System.Drawing.Point(12, 49);
            this.ExtInstall.Name = "ExtInstall";
            this.ExtInstall.Size = new System.Drawing.Size(75, 23);
            this.ExtInstall.TabIndex = 0;
            this.ExtInstall.Text = "Install";
            this.ExtInstall.UseVisualStyleBackColor = true;
            this.ExtInstall.Click += new System.EventHandler(this.ExtInstall_Click);
            // 
            // ExtIDLabel
            // 
            this.ExtIDLabel.AutoSize = true;
            this.ExtIDLabel.Location = new System.Drawing.Point(12, 22);
            this.ExtIDLabel.Name = "ExtIDLabel";
            this.ExtIDLabel.Size = new System.Drawing.Size(75, 13);
            this.ExtIDLabel.TabIndex = 2;
            this.ExtIDLabel.Text = "Extension IDs:";
            // 
            // ExtUninstall
            // 
            this.ExtUninstall.Location = new System.Drawing.Point(12, 90);
            this.ExtUninstall.Name = "ExtUninstall";
            this.ExtUninstall.Size = new System.Drawing.Size(75, 23);
            this.ExtUninstall.TabIndex = 4;
            this.ExtUninstall.Text = "Uninstall";
            this.ExtUninstall.UseVisualStyleBackColor = true;
            this.ExtUninstall.Click += new System.EventHandler(this.ExtUninstall_Click);
            // 
            // ExtIDInput
            // 
            this.ExtIDInput.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.ExtIDInput.Location = new System.Drawing.Point(103, 22);
            this.ExtIDInput.Name = "ExtIDInput";
            this.ExtIDInput.Size = new System.Drawing.Size(568, 210);
            this.ExtIDInput.TabIndex = 5;
            this.ExtIDInput.Text = "";
            // 
            // txtTest
            // 
            this.txtTest.Location = new System.Drawing.Point(103, 263);
            this.txtTest.Name = "txtTest";
            this.txtTest.Size = new System.Drawing.Size(568, 126);
            this.txtTest.TabIndex = 6;
            this.txtTest.Text = "";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(721, 438);
            this.Controls.Add(this.txtTest);
            this.Controls.Add(this.ExtIDInput);
            this.Controls.Add(this.ExtUninstall);
            this.Controls.Add(this.ExtIDLabel);
            this.Controls.Add(this.ExtInstall);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button ExtInstall;
        private System.Windows.Forms.Label ExtIDLabel;
        private System.Windows.Forms.Button ExtUninstall;
        private System.Windows.Forms.RichTextBox ExtIDInput;
        private System.Windows.Forms.RichTextBox txtTest;
    }
}

