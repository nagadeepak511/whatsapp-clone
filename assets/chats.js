function hideChat(){
    if(innerWidth<1024){
        document.getElementsByClassName('chatThumbs')[0].style.display='block'
        document.getElementsByClassName('detailedChat')[0].style.transform = 'translateX(100%)'
    }

}

function showChat(){
    if(innerWidth<1024){
        document.getElementsByClassName('detailedChat')[0].style.transform = 'translateX(0)'
        document.getElementsByClassName('chatThumbs')[0].style.display='none'
    }
}