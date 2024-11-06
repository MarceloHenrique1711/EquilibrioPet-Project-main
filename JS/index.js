function menuAparecer(){
    let menuMobile = document.querySelector(".mobileMenu");
    if(menuMobile.classList.contains("open")){
        menuMobile.classList.remove("open")
    }else{
        menuMobile.classList.add("open")
    }
}


let count= 1;
document.getElementById("radio1").checked=true;

setInterval(function(){
    nextImg()
},5000)

function nextImg(){
    count++;
    if(count>3){
        count=1;
    }
    document.getElementById("radio"+count).checked=true
}
