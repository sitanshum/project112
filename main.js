prediction_1=""

Webcam.set({
    width:350,
    height:300,
image_format:"png",
png_quality:100
});

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";
    });
}

Classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Yn-EtBFwS/model.json",modelLoaded);

function modelLoaded(){
    console.log("model has loaded");
}

function speak(){
    synth=window.speechSynthesis;
    speak_data_1="prediction is "+ prediction_1;
    Utterthis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(Utterthis);
}

function check(){
    img=document.getElementById("captured_image");
    Classifier.classify(img,gotResults);
}

function gotResults(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML=results[0].label
    prediction_1=resluts[0].label
    speak();
    if(results[0].label=="amazing"){
        document.getElementById("update_emoji").innerHTML="&#128076;";
    }
    if(results[0].label=="best"){
        document.getElementById("update_emoji").innerHTML="&#128077;";
    }
    if(results[0].label=="victory"){
        document.getElementById("update_emoji").innerHTML="&#9996;";
    }
}
}