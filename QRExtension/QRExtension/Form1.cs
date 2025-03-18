using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.IO.Abstractions;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using io.github.ba32107.Chrome.NativeMessaging;
using Newtonsoft.Json;

namespace QRExtension
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            string _OutputPath = RootDir() + "\\QRExtension\\data\\" + "ExtensionInstalled.txt";
            string extIDs = File.ReadAllText(_OutputPath);
            ExtIDInput.Text = extIDs;

            test();
        }

        public static string RootDir() => Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, @"..\..\..\"));


        private void Install(string[] extIDs)
        {
            var manifest = GetManifest(extIDs);
            var fs = new FileSystem();

            var installer = NativeMessagingHostInstallerFactory.CreateInstaller(fs);
            var installedManifestPaths = installer.Install(manifest);
            installedManifestPaths
                .ToList()
                .ForEach(manifestPath => { });
        }

        private void Uninstall(string[] extIDs)
        {
            var manifest = GetManifest(extIDs);
            var fs = new FileSystem();

            var installer = NativeMessagingHostInstallerFactory.CreateInstaller(fs);
            installer.Uninstall(manifest);
        }

        private static NativeMessagingHostManifest GetManifest(string[] extIDs)
        {
            return new NativeMessagingHostManifest
            {
                Name = "com.duongcongit.qrextension",
                Description = "QRExtension",
                Path = Process.GetCurrentProcess().MainModule?.FileName,
                AllowedOrigins = extIDs
            };
        }

        private void ExtInstall_Click(object sender, EventArgs e)
        {
            var chromeExtensionIds = ExtIDInput.Text;
            string[] extIDs = chromeExtensionIds.Split('\n');
            if (chromeExtensionIds.Length > 0)
            { Install(extIDs);  }
            else { Uninstall(extIDs); }

            string _OutputPath = RootDir() + "\\QRExtension\\data\\" + "ExtensionInstalled.txt";
            File.WriteAllText(_OutputPath, chromeExtensionIds);
        }

        private void ExtUninstall_Click(object sender, EventArgs e)
        {

            var chromeExtensionIds = ExtIDInput.Text;
            string[] extIDs = chromeExtensionIds.Split('\n');
            Uninstall(extIDs);

            string _OutputPath = RootDir() + "\\QRExtension\\data\\" + "ExtensionInstalled.txt";
            File.WriteAllText(_OutputPath, string.Empty);

        }

        public void test()
        {
            //// Đọc dữ liệu từ Chrome Extension
            //string input = ReadMessage();
            //txtTest.Text = input;
            

            //// Xử lý dữ liệu và gửi phản hồi
            //var response = new { response = "running" };
            //string output = JsonConvert.SerializeObject(response);
            //SendMessage(output);

            string imageUrl = "https://rating.ewoq.google.com/http/rendering/qrcode?url=https%3A%2F%2Fwww.hertzcarsales.com%2Fcatcher.esl%3Fvin%3D1FMSK7FH1PGA86859%26store%3D2322%3Fstore%3D2322%26ddcref%3Dfluency%26tcdcmpid%3D1482657%26tcdadid%3D%26tcdkwid%3D%26mkwid%3D%26crid%3D%26mp_kw%3D%26mp_mt%3D%26gbraid%3DabcXYZ%26wbraid%3DabcXYZ&size=400&eval_ref=00f22454cd7a11f3917a46200582a7309238abc4380fb14c6c645595ca6f727ca596b4196b94be7461&user_id=471240398138";
            string savePath = @"D:\Cong\Projects\QRExtension\QRExtension\data";

            using (WebClient client = new WebClient())
            {
                try
                {
                    // Tải ảnh về và lưu vào file
                    client.DownloadFile(imageUrl, savePath);
                    Console.WriteLine("Ảnh đã được tải về và lưu tại: " + savePath);

                    // Hoặc tải ảnh về dưới dạng byte array
                    byte[] imageData = client.DownloadData(imageUrl);
                    using (MemoryStream ms = new MemoryStream(imageData))
                    {
                        Bitmap image = new Bitmap(ms);
                        Console.WriteLine("Đã tải ảnh vào bộ nhớ.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Lỗi: " + ex.Message);
                }
            }


        }

        static string ReadMessage()
        {
            var stdin = Console.OpenStandardInput();
            var lengthBytes = new byte[4];
            stdin.Read(lengthBytes, 0, 4);

            int length = BitConverter.ToInt32(lengthBytes, 0);
            var buffer = new byte[length];
            stdin.Read(buffer, 0, length);

            return Encoding.UTF8.GetString(buffer);
        }

        static void SendMessage(string message)
        {
            var stdout = Console.OpenStandardOutput();
            var bytes = Encoding.UTF8.GetBytes(message);
            var lengthBytes = BitConverter.GetBytes(bytes.Length);

            stdout.Write(lengthBytes, 0, 4);
            stdout.Write(bytes, 0, bytes.Length);
            stdout.Flush();
        }


        // Hàm tải ảnh từ URL và trả về Bitmap
        static Bitmap DownloadImageFromUrl(string url)
        {
            using (WebClient client = new WebClient())
            {
                byte[] imageData = client.DownloadData(url);

                using (MemoryStream ms = new MemoryStream(imageData))
                {
                    return new Bitmap(ms);
                }
            }
        }




    }
}
