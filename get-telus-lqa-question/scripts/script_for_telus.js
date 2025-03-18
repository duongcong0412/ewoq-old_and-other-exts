/* Copyright (C) 2023 Duong Cong - All Rights Reserved
* Email: duongcong0412hc@gmail.com
*/

window.onload = () => {
    console.log("Imported")

    


    // Worker
    var blob = new Blob(["setInterval(function() {postMessage('');}, 1000); "]);
    var counterWorker = new Worker(window.URL.createObjectURL(blob));

    counterWorker.onmessage = () => {

        for (let i = 10; i <= 100; i++) {
            id = "question-" + i;
            let q = document.getElementById(id)
            if (q != null) {

                //
                let copyIdo = 'copy-' + id + '-o';
                let existsCpo = document.getElementById(copyIdo);
                if (existsCpo == null) {
                    let copyo = document.createElement("div");
                    copyo.innerHTML = '<button id="' + copyIdo + '" style="margin-top: 10px;border-radius: 20%;">Copy original text</button>';
                    q.appendChild(copyo)
                    // console.log(id)
                    document.getElementById(copyIdo).addEventListener("click", () => {
                        let text = q.innerText;
                        let newText = text.replace("\nCopy original text", "");
                        newText = newText.replace("\nCopy with A, B,...", "");
                        // console.log(newText)
                        navigator.clipboard.writeText(newText);
                        alert("Copied!")
                    })
                }
                //

                let copyIdc = 'copy-' + id + '-c';
                let existsCpc = document.getElementById(copyIdc);
                if (existsCpc == null) {
                    let copyc = document.createElement("div");
                    copyc.innerHTML = '<button id="' + copyIdc + '" style="margin-top: 10px;border-radius: 20%;">Copy with A, B,...</button>';
                    q.appendChild(copyc)
                    // console.log(id)
                    document.getElementById(copyIdc).addEventListener("click", () => {
                        let text = q.innerText;
                        let newText = text.replace("\nCopy original text", "");
                        newText = newText.replace("\nCopy with A, B,...", "");
                        let arrChar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

                        for (let i = 0; i < 4; i++) {
                            newText = newText.replace("\n", arrChar[i] + "-")
                        }
                        for (let i = 0; i < 4; i++) {
                            newText = newText.replace(arrChar[i] + "-", "\n" + arrChar[i] + ". ")
                        }
                        // console.log(newText)
                        navigator.clipboard.writeText(newText);
                        alert("Copied!")
                    })
                }
            }

        }
    }

}

// "matches": ["https://telusinternational.headway.ai/*"],


/*
Please select the correct answer.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bias, transparency, and acountability.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bias, transparensy, and accountability.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bias, transparency, and accountability.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bais, transparency, and accountability.
Copy text

*/