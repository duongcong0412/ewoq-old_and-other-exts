/* Copyright (C) 2023 Duong Cong - All Rights Reserved
 * Email: duongcong0412hc@gmail.com
 */

window.onload = () => {

    // Get clear button
    const getClearImgBtn = async () => {
        let clearBtn = document.querySelectorAll('[aria-label="Clear image"]');
        if (clearBtn.length == 0) {
            clearBtn = document.querySelectorAll('[aria-label="Xoá hình ảnh"]');
        }
        return clearBtn;
    }

    // Get paste button
    const getPasteImgBtn = async () => {
        let pasteBtn = document.querySelectorAll('[aria-label="Paste an image from clipboard"]');
        if (pasteBtn.length == 0) {
            pasteBtn = document.querySelectorAll('[aria-label="Dán hình ảnh từ bảng nhớ tạm"]');
        }
        return pasteBtn;
    }
    
    // Check
    setInterval(async () => {
        var btnPasteImage = document.createElement("div");
        // Image translated
        var imgArr = document.querySelectorAll('[src ^= "blob:https://translate.google.com/"]');
        if (imgArr.length > 0) {
            let clearBtn = await getClearImgBtn();
            if (clearBtn.length > 0) {
                // Create paste new button
                let prr = clearBtn[0].parentNode.parentNode;
                btnPasteImage.innerHTML = '<button class="pasteNewImage" style="color: grey; border: none;background-color: white;cursor: pointer;">'
                    + '<svg style="margin-top: 10px;" focusable="false" width="24" height="24" viewBox="0 0 24 24">'
                    + '<path d="M19 2h-4.18C14.4.84 13.3 0 12 0S9.6.84 9.18 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z">'
                    + '</path> </svg></button>';

                // Check if button existed
                let isBtn = document.getElementsByClassName("pasteNewImage");
                if (isBtn.length == 0) {
                    prr.insertBefore(btnPasteImage, prr.firstChild);
                    // Click event
                    btnPasteImage.addEventListener("click", async function () {
                        clearBtn[0].click();
                        setTimeout(async () => {
                            let pasteBtn = await getPasteImgBtn();
                            if (pasteBtn.length > 0) { pasteBtn[0].click(); }
                        }, 150);
                    })
                }

            }
        }
    }, 2000);

    // Drag
    window.ondragover = async function () {
        let clearBtn = await getClearImgBtn();
        //
        if (clearBtn.length > 0) { clearBtn[0].click(); }
    };
}