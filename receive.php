<?php
$xmlDoc = new DOMDocument();
$xmlDoc->preserveWhiteSpace = false;
$xmlDoc->load("messages.xml");
$xmlDoc->formatOutput = true;

$name = $xmlDoc->createElement("name");
$text1 = $xmlDoc->createTextNode($_POST["name"]);
$name->appendChild($text1);

$content = $xmlDoc->createElement("content");
$text2 = $xmlDoc->createTextNode($_POST["content"]);
$content->appendChild($text2);

date_default_timezone_set("PRC");
$time = $xmlDoc->createElement("time");
$text3 = $xmlDoc->createTextNode(date("Y-m-d H:i:s", time()));
$time->appendChild($text3);

$message = $xmlDoc->createElement("message");
$message->appendChild($name);
$message->appendChild($content);
$message->appendChild($time);

if ($text1 != "" && $text2 != "" && $text3 != "") {
    $messages = $xmlDoc->getElementsByTagName("messages")[0];
    $messages->appendChild($message);

    $file = fopen("messages.xml", "w");
    fwrite($file, $xmlDoc->saveXML());
    fclose($file);
}