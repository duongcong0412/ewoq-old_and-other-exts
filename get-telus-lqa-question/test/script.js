
window.onload = () => {
    let q = document.getElementsByClassName("q")[0]
    let text = q.innerText;
    let newText = text.replace("\nCopy text", "");

    let arrChar = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

    for (let i = 0; i < 4; i++) {
        newText = newText.replace("\n", arrChar[i] + "-")
    }

    for (let i = 0; i < 4; i++) {
        newText = newText.replace(arrChar[i] + "-", "\n" + arrChar[i] + ". ")
    }



    // navigator.clipboard.writeText(newText);
    console.log(newText)

}






/*
Please select the correct answer.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bias, transparency, and acountability.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bias, transparensy, and accountability.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bias, transparency, and accountability.
While the development of artificial intelligence and machine learning algorithms holds tremendous promise for everything from healthcare to finance, it also poses significant challenges around issues of bais, transparency, and accountability.
Copy text

*/