let origin_messages = null;

function popQRCode() {
    document.getElementById("qrcode-overlay").style.display = 'block';
    document.getElementById("qr-code").style.display = 'block';
}

function closeQRCode() {
    document.getElementById("qrcode-overlay").style.display = 'none';
    document.getElementById("qr-code").style.display = 'none';
}

function popSuccess() {
    document.getElementById("success-overlay").style.display = 'block';
    document.getElementById("success").style.display = 'block';
}

function scrollToTop() {
    if (window.openDatebase)
        window.scrollTo({left: 0, top: 0, behavior: 'auto'})
    else
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'})
}

function loadXMLDoc(url) {
    let xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return xmlhttp.responseXML;
}

function update() {
    let xmlDoc = loadXMLDoc("http://wbbb1233.natapp1.cc/WBBB/messages.xml");
    if (origin_messages != null && xmlDoc.getElementsByTagName("messages")[0].isEqualNode(origin_messages)) {
        // console.log("same");
        return;
    }
    origin_messages = xmlDoc.getElementsByTagName("messages")[0];
    let array = xmlDoc.getElementsByTagName("message");
    let messages = $("<div></div>");
    messages.attr("id", "messages");
    for (let i = 0; i < array.length; i++) {
        let message = $("<div></div>")
        message.attr("class", "message")

        try {
            let name = $("<p></p>").text(array[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + "：");
            name.attr("class", "name")
            message.append(name);

            let lines = array[i].getElementsByTagName("content")[0].childNodes[0].nodeValue.split("\n");
            let content = $("<p></p>");
            content.attr("class", "content");
            for (let j = 0; j < lines.length; j++) {
                content.append($("<span></span>").text(lines[j]));
                content.append($("<br>"))
            }
            message.append(content);

            let time = $("<p></p>").text(array[i].getElementsByTagName("time")[0].childNodes[0].nodeValue);
            time.attr("class", "time")
            message.append(time);
            if (i > 0) {
                message.append($("<hr>"));
            }
        } catch (e) {
            continue;
        }

        messages.prepend(message);
    }
    $("#messages").remove();
    $("#message-board").append(messages);
}

function refresh() {
    let name = $("input[name='name']");
    let content = $("textarea[name='content']");
    if (name.val() === "" || content.val() === "") {
        return;
    }
    popSuccess();
    setTimeout(function reload() {location.reload();}, 2000);
}

setInterval(update, 5000);
